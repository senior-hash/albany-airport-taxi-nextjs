import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { ALBANY_NYC_TRAVEL_OPTIONS } from "@/lib/travel-options-albany-nyc";
import { ClockIcon, MapPinIcon, CarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Albany to NYC: Car Service vs. Train vs. Bus",
  description:
    "Comparing car service, Amtrak, and the Trailways bus for getting from Albany to New York City — travel time, typical fares, and what each actually involves.",
  alternates: { canonical: "/long-distance/albany-to-nyc/vs-train-and-bus" },
};

const POINTS = [
  {
    icon: MapPinIcon,
    title: "No getting yourself to a station",
    body: "Amtrak and Trailways both leave from a downtown Albany terminal — you still need a ride there and a ride from wherever you land in NYC. We pick up and drop off at your actual address on both ends.",
  },
  {
    icon: ClockIcon,
    title: "No fixed departure times",
    body: "Trains and buses run on a schedule, several hours apart. If your flight, meeting, or event doesn't line up with one of those windows, you're waiting around — or booking a connecting ride anyway.",
  },
  {
    icon: CarIcon,
    title: "One fare covers the group",
    body: "Train and bus fares are per person. If you're traveling as a couple, family, or small group, a car service often works out comparable or better once you add up multiple tickets — worth asking about when you call.",
  },
];

export default function AlbanyToNycVsTrainAndBusPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Albany to NYC Car Service vs. Train vs. Bus",
          description:
            "Comparing door-to-door car service with Amtrak and Trailways bus options for travel between Albany, NY and New York City.",
          areaServedName: "Albany, NY and New York City",
          url: "/long-distance/albany-to-nyc/vs-train-and-bus",
        })}
      />
      <PageHeading
        eyebrow="Long Distance"
        title="Albany to NYC: Car Service vs. Train vs. Bus"
        description="How door-to-door car service actually compares to Amtrak and the Trailways bus."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Long Distance", path: "/long-distance" },
          { name: "Albany to NYC", path: "/long-distance/albany-to-nyc" },
          { name: "Car Service vs. Train vs. Bus", path: "/long-distance/albany-to-nyc/vs-train-and-bus" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="prose prose-neutral max-w-none prose-headings:text-primary">
            <p>
              Amtrak and the Trailways bus are both real, reasonable ways to get between Albany
              and New York City. Here&rsquo;s an honest look at how each one compares to booking a
              car service for the whole trip.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="p-4 font-semibold text-primary">Option</th>
                  <th className="p-4 font-semibold text-primary">Travel time</th>
                  <th className="p-4 font-semibold text-primary">Typical fare</th>
                  <th className="p-4 font-semibold text-primary">Boards at</th>
                  <th className="p-4 font-semibold text-primary">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {ALBANY_NYC_TRAVEL_OPTIONS.map((opt) => (
                  <tr key={opt.mode} className="border-t border-border">
                    <td className="p-4 font-medium text-primary">{opt.mode}</td>
                    <td className="p-4 text-ink-muted">{opt.travelTime}</td>
                    <td className="p-4 text-ink-muted">{opt.typicalFare}</td>
                    <td className="p-4 text-ink-muted">{opt.boardsAt}</td>
                    <td className="p-4 text-ink-muted">{opt.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Train and bus figures are typical ranges researched from Amtrak and Trailways, current
            as of late 2026 — actual fares vary by booking window and demand, and schedules
            change. Check amtrak.com or trailways.com for current times and prices before you
            book.
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
            <h2>When the train or bus makes more sense</h2>
            <p>
              Traveling solo and already near the Albany-Rensselaer station or downtown bus
              terminal? Amtrak or Trailways can be the cheaper option, especially if you book
              ahead on a mid-week fare. Where a car service pulls ahead is everything around that
              trip — getting to and from the station, odd-hour departures, groups, and luggage.
            </p>
            <h2>If your train gets cancelled or delayed</h2>
            <p>
              The Amtrak Albany-Rensselaer station serves the same Empire Service line that runs
              further upstate through Schenectady, Utica, Syracuse, Rochester, and Buffalo — and
              like any train line, that service doesn&rsquo;t always run on time or at all. If
              you&rsquo;re stuck at the station without a way to finish your trip, we cover that
              corridor too: see our <Link href="/long-distance/syracuse">Albany to Syracuse</Link>,{" "}
              <Link href="/long-distance/utica">Albany to Utica</Link>, and{" "}
              <Link href="/long-distance/buffalo">Albany to Buffalo</Link> pages, or just call.
            </p>
            <p>
              See our full{" "}
              <Link href="/long-distance/albany-to-nyc">Albany to NYC car service page</Link> for
              round-trip booking, or call to ask how we compare for your specific trip.
            </p>
          </div>
        </div>
        <aside>
          <BookingCard heading="Book your trip" note="Round-trip and one-way options available." />
        </aside>
      </Container>
    </>
  );
}
