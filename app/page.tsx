import Link from "next/link";
import type { Metadata } from "next";
import { getAirports } from "@/lib/content";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const airports = getAirports();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              Available 24 hours a day, 7 days a week
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              Albany Airport Taxi &amp; Limo Service
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              Reliable, door-to-door taxi and car service to and from Albany
              International, JFK, LaGuardia, Newark, Boston Logan, and New
              York City.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CallButton />
              <Link
                href="/long-distance/albany-to-nyc"
                className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Albany to NYC
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">Airports We Serve</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {airports.map((airport) => (
              <Link
                key={airport.id}
                href={`/airport-taxi/${airport.slug}`}
                className="rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-md"
              >
                <p className="text-lg font-semibold text-primary">{airport.name}</p>
                <p className="mt-2 text-sm text-ink-muted">Taxi &amp; car service to and from {airport.name}.</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">More Ways We Can Help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Link href="/long-distance" className="rounded-lg border border-border p-6 transition-shadow hover:shadow-md">
              <p className="font-semibold text-primary">Long Distance</p>
              <p className="mt-2 text-sm text-ink-muted">Trips beyond the Capital Region, including NYC.</p>
            </Link>
            <Link href="/services/non-emergency-medical-transportation" className="rounded-lg border border-border p-6 transition-shadow hover:shadow-md">
              <p className="font-semibold text-primary">Medical Transportation</p>
              <p className="mt-2 text-sm text-ink-muted">Self-pay rides to and from appointments.</p>
            </Link>
            <Link href="/services/courier" className="rounded-lg border border-border p-6 transition-shadow hover:shadow-md">
              <p className="font-semibold text-primary">Courier &amp; Messenger</p>
              <p className="mt-2 text-sm text-ink-muted">Same-day delivery for documents and packages.</p>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
