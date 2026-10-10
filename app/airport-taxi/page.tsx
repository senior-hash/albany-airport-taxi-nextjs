import Link from "next/link";
import type { Metadata } from "next";
import { getAirports } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { PlaneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Airport Taxi Service",
  description:
    "Airport taxi, car, and limo service to and from Albany International, JFK, LaGuardia, Newark, Boston Logan, and NYC.",
  alternates: { canonical: "/airport-taxi" },
};

export default function AirportsPage() {
  const airports = getAirports();
  return (
    <>
      <PageHeading
        eyebrow="Services"
        title="Airport Taxi & Car Service"
        description="Reliable, 24/7 transportation to and from every major airport serving the Capital Region."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Airports", path: "/airport-taxi" }]} />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map((airport) => (
            <Link
              key={airport.id}
              href={`/airport-taxi/${airport.slug}`}
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <PlaneIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 text-lg font-semibold text-primary">{airport.name}</p>
              <p className="mt-2 text-sm text-ink-muted">
                Taxi &amp; car service to and from {airport.name}.
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
