import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAirports,
  getAirportBySlug,
  getCounties,
  getCountyBySlug,
  getCities,
  getCityBySlug,
  getCitiesByCounty,
  getStateById,
} from "@/lib/content";
import { resolveCityMeta, generateCountyMeta } from "@/scripts/lib/meta";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";
import { CallButton } from "@/components/CallButton";
import { NearbyCities } from "@/components/NearbyCities";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

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
    const meta = resolveCityMeta(airport.name, city.name, state?.name ?? "", {
      mtitle: city.mtitle,
      mdesc: city.mdesc,
    });
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
    const meta = resolveCityMeta(airport.name, city.name, state?.name ?? "", {
      mtitle: city.mtitle,
      mdesc: city.mdesc,
    });
    const siblingCities = county ? getCitiesByCounty(county.id) : [];
    const fallbackBody = `<p>${airport.name} taxi and car service to and from ${city.name}, ${state?.name ?? ""}. Reliable, 24/7 door-to-door transportation.</p>`;

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
            <ProseContent html={city.detailHtml || fallbackBody} />
            {county && (
              <NearbyCities cities={siblingCities} currentSlug={city.slug} airportSlug={airport.slug} />
            )}
          </div>
          <aside>
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="font-medium text-primary">Book your ride</p>
              <p className="mt-2 text-sm text-ink-muted">Available 24 hours a day, 7 days a week.</p>
              <CallButton
                className="mt-4 w-full"
                phone={county?.trackingPhone ?? undefined}
                phoneDisplay={county?.trackingPhone ?? undefined}
              />
            </div>
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
    const fallbackBody = `<p>${airport.name} taxi and car service throughout ${county.name}, ${state?.name ?? ""}. Reliable, 24/7 door-to-door transportation.</p>`;

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
            <ProseContent html={county.detailHtml || fallbackBody} />
            {citiesInCounty.length > 0 && (
              <NearbyCities cities={citiesInCounty} currentSlug="" airportSlug={airport.slug} />
            )}
          </div>
          <aside>
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="font-medium text-primary">Book your ride</p>
              <p className="mt-2 text-sm text-ink-muted">Available 24 hours a day, 7 days a week.</p>
              <CallButton
                className="mt-4 w-full"
                phone={county.trackingPhone ?? undefined}
                phoneDisplay={county.trackingPhone ?? undefined}
              />
            </div>
          </aside>
        </Container>
      </>
    );
  }

  notFound();
}
