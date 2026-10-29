import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { Phone } from "@/components/Phone";
import { PlaceholderNotice } from "@/components/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Cancellation & Changes",
  description: "How to cancel or change a booked ride with Albany Airport Taxi and Limo Service.",
  alternates: { canonical: "/cancellation-and-changes" },
};

export default function CancellationAndChangesPage() {
  return (
    <>
      <PageHeading title="Cancellation &amp; Changes" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Cancellation & Changes", path: "/cancellation-and-changes" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <h2>Need to cancel or change a ride?</h2>
          <p>
            Text or call us as early as possible at <Phone className="text-accent hover:underline" /> and
            we&rsquo;ll take care of it. The earlier you reach out, the more options we have — same-day
            and last-minute changes are harder to accommodate, especially during busy travel periods.
          </p>
          <PlaceholderNotice>
            Add your actual policy specifics here: how many hours of notice are needed for a free
            cancellation or change, what happens for a no-show or very late cancellation (fee
            amount or forfeited deposit, if any), and whether the policy differs for airport runs
            vs. local trips or peak travel days.
          </PlaceholderNotice>
          <h2>Flight delays and cancellations</h2>
          <p>
            For airport pickups, we automatically track your flight once you book, so a delay or
            early arrival doesn&rsquo;t require you to call and reschedule — we adjust the pickup
            time on our end. If your flight is cancelled outright, let us know as soon as you can
            so we can cancel or move your ride.
          </p>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
