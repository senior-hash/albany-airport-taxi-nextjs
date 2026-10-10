import Link from "next/link";
import type { Metadata } from "next";
import { getAirports } from "@/lib/content";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { RouteLine } from "@/components/RouteLine";
import { FlightStatusChecker } from "@/components/FlightStatusChecker";
import { getAirportDistance } from "@/lib/airport-distances";
import {
  PlaneIcon,
  RouteIcon,
  MapPinIcon,
  HeartPulseIcon,
  PackageIcon,
  ClockIcon,
  CarIcon,
  BuildingIcon,
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
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

const MORE_WAYS = [
  {
    href: "/long-distance",
    icon: RouteIcon,
    title: "Long Distance",
    description: "Trips beyond the Capital Region, including NYC.",
  },
  {
    href: "/hudson-valley",
    icon: MapPinIcon,
    title: "Hudson Valley",
    description: "Car service across Columbia, Greene, Ulster & Dutchess.",
  },
  {
    href: "/venues",
    icon: BuildingIcon,
    title: "Venues We Serve",
    description: "Hotels, colleges, wineries, museums, and more across the region.",
  },
  {
    href: "/services/non-emergency-medical-transportation",
    icon: HeartPulseIcon,
    title: "Medical Transportation",
    description: "Self-pay rides to and from appointments.",
  },
  {
    href: "/services/courier",
    icon: PackageIcon,
    title: "Courier & Messenger",
    description: "Same-day delivery for documents and packages.",
  },
  {
    href: "/services/airbnb-transportation",
    icon: HomeIcon,
    title: "Airbnb & Vacation Rentals",
    description: "Door-to-door rides for guests staying off the beaten path.",
  },
  {
    href: "/services/wedding",
    icon: UsersIcon,
    title: "Wedding Guest Shuttle",
    description: "Hotel and rental pickups to and from the venue.",
  },
  {
    href: "/services/corporate",
    icon: BriefcaseIcon,
    title: "Corporate Transportation",
    description: "Dependable rides for business travel and clients.",
  },
];

export default function HomePage() {
  const airports = getAirports();

  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <div className="hero-glow pointer-events-none absolute -left-24 top-0 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px]" />
        <RouteLine className="pointer-events-none absolute inset-0 h-full w-full text-accent-bright" />
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
                  <Icon className="h-5 w-5 shrink-0 text-accent-bright" />
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
            {airports.map((airport) => {
              const distance = getAirportDistance(airport.slug);
              return (
                <Link
                  key={airport.id}
                  href={`/airport-taxi/${airport.slug}`}
                  className="group rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                >
                  <PlaneIcon className="h-6 w-6 text-accent" />
                  <p className="mt-4 text-lg font-semibold text-primary">{airport.name}</p>
                  <p className="mt-2 text-sm text-ink-muted">Taxi &amp; airport transfer to and from {airport.name}.</p>
                  {distance && (
                    <p className="mt-2 text-xs text-ink-muted">
                      {distance.distanceMiles} &middot; {distance.driveTime}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">Flying soon?</h2>
              <p className="mt-3 max-w-md text-ink-muted">
                We automatically track your flight once you book, so delays
                and early arrivals are already accounted for before you
                land. You can also look up any flight&rsquo;s status
                yourself, anytime.
              </p>
            </div>
            <FlightStatusChecker />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">More Ways We Can Help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_WAYS.map(({ href, icon: Icon, title, description }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-4 font-semibold text-primary">{title}</p>
                <p className="mt-2 text-sm text-ink-muted">{description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
