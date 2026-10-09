import Link from "next/link";
import type { Metadata } from "next";
import { getAirports } from "@/lib/content";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { RouteLine } from "@/components/RouteLine";
import {
  PlaneIcon,
  RouteIcon,
  MapPinIcon,
  HeartPulseIcon,
  PackageIcon,
  ClockIcon,
  CarIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  description:
    "24/7 taxi and airport transfer service to and from Albany International Airport, JFK, LaGuardia, Newark, Boston Logan, and NYC. Door-to-door, transparent pricing.",
  alternates: { canonical: "/" },
};

const TRUST_POINTS = [
  { icon: ClockIcon, label: "Available 24/7" },
  { icon: CarIcon, label: "Door-to-door, no shared stops" },
  { icon: PlaneIcon, label: "Flight tracking included" },
];

export default function HomePage() {
  const airports = getAirports();

  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <div className="hero-glow pointer-events-none absolute -left-24 top-0 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px]" />
        <RouteLine className="pointer-events-none absolute inset-0 h-full w-full text-accent" />
        <Container className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent-bright">
              Available 24 hours a day, 7 days a week
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Albany Airport Taxi &amp; Limo Service
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Reliable, door-to-door taxi and airport transfer service to and
              from Albany International, JFK, LaGuardia, Newark, Boston
              Logan, and New York City.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CallButton className="cta-glow" />
              <Link
                href="/long-distance/albany-to-nyc"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 font-medium text-white transition-colors hover:bg-white hover:text-primary"
              >
                Albany to NYC
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-white/80">
                  <Icon className="h-5 w-5 shrink-0 text-accent" />
                  <span>{label}</span>
                </div>
              ))}
            </dl>
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
                className="group rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <PlaneIcon className="h-6 w-6 text-accent" />
                <p className="mt-4 text-lg font-semibold text-primary">{airport.name}</p>
                <p className="mt-2 text-sm text-ink-muted">Taxi &amp; airport transfer to and from {airport.name}.</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">More Ways We Can Help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/long-distance"
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <RouteIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-semibold text-primary">Long Distance</p>
              <p className="mt-2 text-sm text-ink-muted">Trips beyond the Capital Region, including NYC.</p>
            </Link>
            <Link
              href="/hudson-valley"
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <MapPinIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-semibold text-primary">Hudson Valley</p>
              <p className="mt-2 text-sm text-ink-muted">Car service across Columbia, Greene, Ulster &amp; Dutchess.</p>
            </Link>
            <Link
              href="/services/non-emergency-medical-transportation"
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <HeartPulseIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-semibold text-primary">Medical Transportation</p>
              <p className="mt-2 text-sm text-ink-muted">Self-pay rides to and from appointments.</p>
            </Link>
            <Link
              href="/services/courier"
              className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <PackageIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-semibold text-primary">Courier &amp; Messenger</p>
              <p className="mt-2 text-sm text-ink-muted">Same-day delivery for documents and packages.</p>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
