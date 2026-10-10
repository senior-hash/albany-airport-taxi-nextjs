import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAirports, getAirportBySlug, getCounties, getStateById } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";
import { BookingCard } from "@/components/BookingCard";
import { FlightStatusChecker } from "@/components/FlightStatusChecker";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getAirportDistance } from "@/lib/airport-distances";

export function generateStaticParams() {
  return getAirports().map((a) => ({ airportSlug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ airportSlug: string }>;
}): Promise<Metadata> {
  const { airportSlug } = await params;
  const airport = getAirportBySlug(airportSlug);
  if (!airport) return {};
  const title = airport.mtitle.trim() || `${airport.name} Taxi Service`;
  const description =
    airport.mdesc.trim() ||
    `Reliable taxi and car service to and from ${airport.name}. Available 24/7.`;
  return {
    title,
    description,
    alternates: { canonical: `/airport-taxi/${airport.slug}` },
  };
}

export default async function AirportPage({
  params,
}: {
  params: Promise<{ airportSlug: string }>;
}) {
  const { airportSlug } = await params;
  const airport = getAirportBySlug(airportSlug);
  if (!airport) notFound();

  const counties = getCounties();
  const distance = getAirportDistance(airport.slug);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${airport.name} Taxi Service`,
          description: airport.mdesc || airport.title,
          areaServedName: "Albany, NY and the Capital Region",
          url: `/airport-taxi/${airport.slug}`,
        })}
      />
      <PageHeading eyebrow="Airport Taxi" title={airport.title} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Airports", path: "/airport-taxi" },
          { name: airport.name, path: `/airport-taxi/${airport.slug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          {distance && (
            <p className="mb-4 text-sm text-ink-muted">
              {distance.distanceMiles} from Albany &middot; typically{" "}
              {distance.driveTime} by car, depending on traffic.
            </p>
          )}
          <ProseContent html={airport.detailHtml} />
        </div>
        <aside className="space-y-6">
          <BookingCard />
          <FlightStatusChecker />
          <div>
            <p className="font-medium text-primary">Browse by county</p>
            <ul className="mt-3 space-y-1 text-sm">
              {counties.map((county) => {
                const state = getStateById(county.stateId);
                return (
                  <li key={county.id}>
                    <Link
                      href={`/airport-taxi/${airport.slug}/${county.slug}`}
                      className="text-accent hover:underline"
                    >
                      {county.name}{state ? `, ${state.name}` : ""}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}
