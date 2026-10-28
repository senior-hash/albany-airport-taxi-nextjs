import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAirports, getCounties } from "@/lib/content";
import { SOCIAL } from "@/lib/business";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { RouteLine } from "@/components/RouteLine";
import { FlightStatusChecker } from "@/components/FlightStatusChecker";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { getAirportDistance } from "@/lib/airport-distances";
import { GENERAL_FAQ } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";
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
  StarIcon,
} from "@/components/icons";

// Real company founding year (see About page: founded late 2002) — computed
// rather than hardcoded so this never needs an annual update.
const FOUNDED_YEAR = 2002;

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
    title: "Wedding Guest Transportation",
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
  const countyCount = getCounties().length;
  const yearsInBusiness = new Date().getFullYear() - FOUNDED_YEAR;

  const TRUST_STATS = [
    { value: `${yearsInBusiness} Years`, label: `In business since ${FOUNDED_YEAR}` },
    {
      value: (
        <span className="inline-flex items-center gap-1.5">
          <StarIcon className="h-6 w-6 text-accent-bright" />
          {SOCIAL.tripadvisorRating}
        </span>
      ),
      label: (
        <a href={SOCIAL.tripadvisor} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {SOCIAL.tripadvisorReviewCount} reviews on TripAdvisor
        </a>
      ),
    },
    { value: `${countyCount} Counties`, label: "Across NY, VT & MA" },
    { value: "24/7", label: "Always available" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-primary">
        <div className="hero-glow pointer-events-none absolute -left-24 top-0 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px]" />
        <RouteLine className="pointer-events-none absolute inset-0 h-full w-full text-sky" />
        <Container className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent-bright">
              Available 24 hours a day, 7 days a week
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              <span className="text-accent-bright">Albany</span> Airport Taxi &amp; Limo Service
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

      <section className="border-b border-border bg-background">
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {TRUST_STATS.map(({ value, label }, i) => (
              <div key={i} className="text-center sm:text-left">
                <dt className="font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">{value}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-primary">Airports We Serve</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {airports.map((airport) => {
              const distance = getAirportDistance(airport.slug);
              return (
                <Link
                  key={airport.id}
                  href={`/airport-taxi/${airport.slug}`}
                  className="group rounded-[20px] border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
                >
                  {airport.code ? (
                    <p className="font-display text-3xl font-extrabold tracking-tight text-primary">{airport.code}</p>
                  ) : (
                    <PlaneIcon className="h-6 w-6 text-accent" />
                  )}
                  <p className="mt-4 text-lg font-semibold text-primary">{airport.name}</p>
                  <p className="mt-2 text-sm text-ink-muted">Taxi &amp; airport transfer to and from {airport.name}.</p>
                  {distance && (
                    <p className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                      {distance.distanceMiles} &middot; {distance.driveTime}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-primary">Our Fleet</h2>
              <p className="mt-3 max-w-md text-ink-muted">
                A real, modern fleet — from everyday SUVs to all-electric vehicles
                like the Kia EV9 and Cadillac Escalade IQ. Whatever the trip,
                there&rsquo;s a vehicle sized to fit it.
              </p>
              <Link
                href="/cars"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                See our vehicles
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <Image
                src="/images/fleet/fleet-group-cadillac-pacifica.jpg"
                alt="Cadillac Escalade IQ and Chrysler Pacifica, part of the US Limo and Taxi fleet"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-primary">Flying soon?</h2>
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
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-primary">More Ways We Can Help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_WAYS.map(({ href, icon: Icon, title, description }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-[20px] border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
              >
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-4 font-semibold text-primary">{title}</p>
                <p className="mt-2 text-sm text-ink-muted">{description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-16">
          <JsonLd data={faqSchema(GENERAL_FAQ)} />
          <FAQ items={GENERAL_FAQ} />
        </Container>
      </section>
    </>
  );
}
