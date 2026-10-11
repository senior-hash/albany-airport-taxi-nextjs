import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { FlightStatusChecker } from "@/components/FlightStatusChecker";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { PhoneIcon, MapPinIcon, ClockIcon, CarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Taxi vs. Uber & Lyft",
  description:
    "How a local, dispatched taxi and car service compares to Uber and Lyft for airport transfers and rides across our rural service area — flat pricing, flight tracking, and real phone dispatch.",
  alternates: { canonical: "/taxi-vs-uber-lyft" },
};

const POINTS = [
  {
    icon: ClockIcon,
    title: "No surge pricing",
    body: "Our rates don't spike because it's raining, it's a holiday, or a concert just let out. The price you're quoted is the price you pay.",
  },
  {
    icon: MapPinIcon,
    title: "We cover the small towns too",
    body: "Most of our service area is rural, low-population towns across 23 counties in New York, Vermont, and Massachusetts. Rideshare apps are built around driver density — in a lot of these towns, there simply aren't nearby drivers to match you with, rain or shine.",
  },
  {
    icon: PhoneIcon,
    title: "A phone call works where an app can't",
    body: "We've taken calls from people stranded in the middle of nowhere after a rideshare app never found them a driver. Cell data can be thin to nonexistent in rural stretches of our service area, which an app depends on — a phone call doesn't.",
  },
  {
    icon: CarIcon,
    title: "Flight tracking, not guesswork",
    body: "We track your actual flight and adjust pickup timing for early arrivals or delays automatically, instead of you re-requesting a ride and hoping someone's nearby.",
  },
];

export default function TaxiVsRideshare() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Taxi & Car Service vs. Rideshare",
          description:
            "A local, dispatched taxi and car service alternative to Uber and Lyft, with flat pricing and coverage across rural service areas.",
          areaServedName: "Albany, NY and the surrounding 23-county service area",
          url: "/taxi-vs-uber-lyft",
        })}
      />
      <PageHeading
        eyebrow="Why Us"
        title="Taxi vs. Uber & Lyft"
        description="A real, local alternative to rideshare apps — especially once you're outside the city."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Taxi vs. Uber & Lyft", path: "/taxi-vs-uber-lyft" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="prose prose-neutral max-w-none prose-headings:text-primary">
            <p>
              Uber and Lyft work well in dense cities where drivers are
              constantly nearby. Our service area is different — it&rsquo;s the{" "}
              <Link href="/airport-taxi">Albany airport</Link> itself, plus
              23 counties across New York, Vermont, and Massachusetts, much
              of it rural. We&rsquo;ve built our business around being the
              reliable option specifically for that gap.
            </p>
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-6">
                <Icon className="h-6 w-6 text-accent" />
                <dt className="mt-4 font-semibold text-primary">{title}</dt>
                <dd className="mt-2 text-sm text-ink-muted">{body}</dd>
              </div>
            ))}
          </dl>
          <div className="prose prose-neutral max-w-none prose-headings:text-primary mt-10">
            <h2>When rideshare makes more sense</h2>
            <p>
              If you&rsquo;re already downtown in Albany on a weekday afternoon,
              Uber or Lyft will probably get to you quickly — we won&rsquo;t
              pretend otherwise. Where we&rsquo;re the better call is anywhere
              outside that dense core: airport runs, early-morning and
              late-night pickups, <Link href="/long-distance">long-distance
              trips</Link>, and anywhere in our{" "}
              <Link href="/venues">rural counties</Link> where rideshare
              driver coverage is thin or nonexistent.
            </p>
          </div>
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book a ride you can count on" />
          <FlightStatusChecker />
        </aside>
      </Container>
    </>
  );
}
