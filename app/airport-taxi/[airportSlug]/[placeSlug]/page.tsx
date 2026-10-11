import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAirports,
  getAirportBySlug,
  getCounties,
  getCountyBySlug,
  getCountyById,
  getCities,
  getCityBySlug,
  getCitiesByCounty,
  getStateById,
} from "@/lib/content";
import { resolveCityMeta, generateCountyMeta, hasRealCityDetail } from "@/scripts/lib/meta";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";
import { BookingCard } from "@/components/BookingCard";
import { NearbyCities } from "@/components/NearbyCities";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { AboutArea } from "@/components/AboutArea";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { getLocalFAQ } from "@/lib/faq";
import { getCountyArea } from "@/lib/county-area";

export function generateStaticParams() {
  const airports = getAirports();
  const counties = getCounties();
  const cities = getCities();
  const params: { airportSlug: string; placeSlug: string }[] = [];
  for (const airport of airports) {
    for (const county of counties) {
      params.push({ airportSlug: airport.slug, placeSlug: county.slug });
    }
    for (const city of cities) {
      params.push({ airportSlug: airport.slug, placeSlug: city.slug });
    }
  }
  return params;
}

type Params = { airportSlug: string; placeSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { airportSlug, placeSlug } = await params;
  const airport = getAirportBySlug(airportSlug);
  if (!airport) return {};

  const city = getCityBySlug(placeSlug);
  if (city) {
    const state = getStateById(city.stateId);
    const cityCounty = getCountyById(city.countyId);
    const meta = resolveCityMeta(
      airport.name,
      city.name,
      state?.name ?? "",
      { mtitle: city.mtitle, mdesc: city.mdesc },
      cityCounty?.name
    );
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `/airport-taxi/${airport.slug}/${city.slug}` },
    };
  }

  const county = getCountyBySlug(placeSlug);
  if (county) {
    const state = getStateById(county.stateId);
    const meta = generateCountyMeta(airport.name, county.name, state?.name ?? "");
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `/airport-taxi/${airport.slug}/${county.slug}` },
    };
  }

  return {};
}

export default async function PlacePage({ params }: { params: Promise<Params> }) {
  const { airportSlug, placeSlug } = await params;
  const airport = getAirportBySlug(airportSlug);
  if (!airport) notFound();

  const city = getCityBySlug(placeSlug);
  if (city) {
    const county = getCounties().find((c) => c.id === city.countyId);
    const state = getStateById(city.stateId);
    const meta = resolveCityMeta(
      airport.name,
      city.name,
      state?.name ?? "",
      { mtitle: city.mtitle, mdesc: city.mdesc },
      county?.name
    );
    const siblingCities = county ? getCitiesByCounty(county.id) : [];
    const isHudsonValley = county
      ? ["Columbia County", "Greene County", "Ulster County", "Dutchess County"].includes(county.name)
      : false;
    const fallbackBody = isHudsonValley
      ? `<p>${airport.name} taxi and car service to and from ${city.name}, ${state?.name ?? ""}, serving the Hudson Valley. Reliable, 24/7 door-to-door transportation.</p>`
      : `<p>${airport.name} taxi and car service to and from ${city.name}, ${state?.name ?? ""}. Reliable, 24/7 door-to-door transportation.</p>`;
    const hasRealDetail = hasRealCityDetail(city.detailHtml);

    return (
      <>
        <JsonLd
          data={serviceSchema({
            name: `${airport.name} Taxi to ${city.name}`,
            description: meta.description,
            areaServedName: `${city.name}, ${state?.name ?? ""}`,
            url: `/airport-taxi/${airport.slug}/${city.slug}`,
          })}
        />
        <PageHeading
          eyebrow={airport.name}
          title={`${airport.name} Taxi to ${city.name}, ${state?.name ?? ""}`}
        />
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Airports", path: "/airport-taxi" },
            { name: airport.name, path: `/airport-taxi/${airport.slug}` },
            { name: city.name, path: `/airport-taxi/${airport.slug}/${city.slug}` },
          ]}
        />
        <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <ProseContent html={hasRealDetail ? city.detailHtml : fallbackBody} />
            {county && (
              <NearbyCities cities={siblingCities} currentSlug={city.slug} airportSlug={airport.slug} />
            )}
          </div>
          <aside>
            <BookingCard
              phone={county?.trackingPhone ?? undefined}
              phoneDisplay={county?.trackingPhone ?? undefined}
            />
          </aside>
        </Container>
      </>
    );
  }

  const county = getCountyBySlug(placeSlug);
  if (county) {
    const state = getStateById(county.stateId);
    const meta = generateCountyMeta(airport.name, county.name, state?.name ?? "");
    const citiesInCounty = getCitiesByCounty(county.id);
    const isHudsonValley = ["Columbia County", "Greene County", "Ulster County", "Dutchess County"].includes(
      county.name
    );
    const fallbackBody = isHudsonValley
      ? `<p>${airport.name} taxi and car service throughout ${county.name}, ${state?.name ?? ""}, serving the Hudson Valley. Reliable, 24/7 door-to-door transportation. See our <a href="/hudson-valley">Hudson Valley service area</a> for the full region.</p>`
      : `<p>${airport.name} taxi and car service throughout ${county.name}, ${state?.name ?? ""}. Reliable, 24/7 door-to-door transportation.</p>`;
    // The legacy DB's county "detail" fields are often just a bare placeholder
    // like "Columbia county" — too short to be real content but still
    // truthy, so a plain `||` check would wrongly prefer it over the
    // generated fallback above.
    const hasRealDetail = (county.detailHtml ?? "").trim().length > 60;
    const countyArea = getCountyArea(county.name);
    const localFAQ = getLocalFAQ({
      countyName: county.name,
      stateName: state?.name ?? "",
      cityCount: citiesInCounty.length,
      trackingPhone: county.trackingPhone,
      airportName: airport.name,
    });

    return (
      <>
        <JsonLd
          data={serviceSchema({
            name: `${airport.name} Taxi Service in ${county.name}`,
            description: meta.description,
            areaServedName: `${county.name}, ${state?.name ?? ""}`,
            url: `/airport-taxi/${airport.slug}/${county.slug}`,
          })}
        />
        <JsonLd data={faqSchema(localFAQ)} />
        <PageHeading eyebrow={airport.name} title={meta.title.split(" | ")[0]} />
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Airports", path: "/airport-taxi" },
            { name: airport.name, path: `/airport-taxi/${airport.slug}` },
            { name: county.name, path: `/airport-taxi/${airport.slug}/${county.slug}` },
          ]}
        />
        <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <ProseContent html={hasRealDetail ? county.detailHtml : fallbackBody} />
            {citiesInCounty.length > 0 && (
              <NearbyCities cities={citiesInCounty} currentSlug="" airportSlug={airport.slug} />
            )}
            {countyArea && (
              <AboutArea area={countyArea} countyName={county.name} stateName={state?.name ?? ""} />
            )}
            <div className="mt-12">
              <FAQ items={localFAQ} title={`${county.name} FAQ`} />
            </div>
          </div>
          <aside>
            <BookingCard
              phone={county.trackingPhone ?? undefined}
              phoneDisplay={county.trackingPhone ?? undefined}
            />
          </aside>
        </Container>
      </>
    );
  }

  notFound();
}
