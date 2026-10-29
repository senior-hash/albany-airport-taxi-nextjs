import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { ClockIcon, MapPinIcon, CarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Albany to JFK: Shuttle or Private Car?",
  description:
    "A shared scheduled shuttle vs. a private door-to-door car for Albany to JFK — how they actually compare on pickup, stops, schedule, and group size.",
  alternates: { canonical: "/jfk-shuttle-vs-private-car" },
};

const COMPARISON = [
  {
    option: "Shared shuttle",
    pickup: "A shared curb or lot pickup point, at a set time",
    stops: "Picks up and drops off other passengers along the route",
    schedule: "Fixed departure times, booked in advance",
    groupSize: "Seats and luggage space are shared with other riders",
  },
  {
    option: "Private car (us)",
    pickup: "Your actual door",
    stops: "Direct to JFK — no other passengers, no other stops",
    schedule: "You pick the time; book anytime, 24/7",
    groupSize: "The whole vehicle is yours, sized to your group and luggage",
  },
];

const POINTS = [
  {
    icon: MapPinIcon,
    title: "No shared stops",
    body: "A scheduled shuttle typically picks up and drops off several riders before you, which adds real time to a trip that's already long. A private car goes straight from your door to the terminal.",
  },
  {
    icon: ClockIcon,
    title: "No fixed departure window",
    body: "Shuttles run on a set schedule, often just a few times a day. If your flight time doesn't line up with one of those windows, you're either waiting around or arranging a separate ride anyway.",
  },
  {
    icon: CarIcon,
    title: "One vehicle, one group",
    body: "Traveling with family, coworkers, or extra luggage? A shared shuttle charges and seats by the person. With a private car, the whole vehicle — and its trunk space — is yours.",
  },
];

export default function JfkShuttleVsPrivateCarPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Albany to JFK Shuttle vs. Private Car Comparison",
          description:
            "Comparing a shared scheduled shuttle with a private door-to-door car service for travel between Albany, NY and JFK Airport.",
          areaServedName: "Albany, NY and JFK Airport",
          url: "/jfk-shuttle-vs-private-car",
        })}
      />
      <PageHeading
        eyebrow="Airport Taxi"
        title="Albany to JFK: Shuttle or Private Car?"
        description="An honest look at how a shared shuttle compares to booking a private car for the whole trip."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "JFK Airport Taxi", path: "/airport-taxi/jfk" },
          { name: "Shuttle vs. Private Car", path: "/jfk-shuttle-vs-private-car" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="prose prose-neutral max-w-none prose-headings:text-primary">
            <p>
              A shared, scheduled shuttle and a private car both get you to JFK — they just work
              very differently. Here&rsquo;s a fair side-by-side so you can decide what actually
              fits your trip.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="p-4 font-semibold text-primary">Option</th>
                  <th className="p-4 font-semibold text-primary">Pickup</th>
                  <th className="p-4 font-semibold text-primary">Stops</th>
                  <th className="p-4 font-semibold text-primary">Schedule</th>
                  <th className="p-4 font-semibold text-primary">Group &amp; luggage</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.option} className="border-t border-border">
                    <td className="p-4 font-medium text-primary">{row.option}</td>
                    <td className="p-4 text-ink-muted">{row.pickup}</td>
                    <td className="p-4 text-ink-muted">{row.stops}</td>
                    <td className="p-4 text-ink-muted">{row.schedule}</td>
                    <td className="p-4 text-ink-muted">{row.groupSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Shared shuttle fares and schedules vary by operator and how many stops your route
            includes — worth checking directly with whoever you&rsquo;re comparing. Every trip
            with us is quoted individually, so call or request a quote for an exact price.
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-6">
                <Icon className="h-6 w-6 text-accent" />
                <dt className="mt-4 font-semibold text-primary">{title}</dt>
                <dd className="mt-2 text-sm text-ink-muted">{body}</dd>
              </div>
            ))}
          </dl>

          <div className="prose prose-neutral max-w-none prose-headings:text-primary mt-10">
            <h2>When a shared shuttle makes more sense</h2>
            <p>
              Traveling solo, not in a hurry, and your flight happens to line up with a shuttle&rsquo;s
              departure window? A shared shuttle can be the lower-cost option, especially for a
              single rider with light luggage.
            </p>
            <h2>Where a private car pulls ahead</h2>
            <p>
              Early or late flights, groups, extra bags, or a tight connection all favor a direct,
              door-to-door ride on your own schedule. We also{" "}
              <Link href="/airport-taxi/jfk">track your flight automatically</Link> once you book,
              so a delay on either end doesn&rsquo;t throw off the pickup.
            </p>
            <p>
              See our full <Link href="/airport-taxi/jfk">Albany to JFK taxi page</Link> or our{" "}
              <Link href="/long-distance/albany-to-nyc">Albany to NYC car service page</Link> for
              booking details, or request a quote below.
            </p>
          </div>
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book your ride to JFK" note="Door-to-door, no shared stops." />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
