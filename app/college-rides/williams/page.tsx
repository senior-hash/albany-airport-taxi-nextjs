import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Williams College Airport & Long-Distance Rides",
  description:
    "Private car service for Williams College students and families — Williamstown pickups to Albany, Bradley, Boston, JFK, and NYC. Advance reservations recommended.",
  alternates: { canonical: "/college-rides/williams" },
};

export default function WilliamsCollegeRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Williams College Airport Rides",
          description:
            "Private car service between Williamstown, MA and area airports for Williams College students and families.",
          areaServedName: "Williamstown, MA",
          url: "/college-rides/williams",
        })}
      />
      <PageHeading
        eyebrow="College rides"
        title="Williams College Airport & Long-Distance Rides"
        description="Private car service from Williamstown to Albany, Bradley, Boston, JFK, and NYC."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "College Rides", path: "/college-rides" },
          { name: "Williams College", path: "/college-rides/williams" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            We run private car service (not a shared shuttle) for{" "}
            <Link href="/venues/williams-college">Williams College</Link>{" "}
            students and families, picking up right in Williamstown for
            trips to the airport or home for break.
          </p>
          <h2>Where we take you</h2>
          <p>
            Door-to-door rides from Williamstown to Albany International
            &mdash; the closest airport &mdash; as well as longer trips to
            Bradley International (Hartford/Windsor Locks), Boston Logan,
            JFK, and New York City. Parents can call and book a ride for
            their student directly.
          </p>
          <h2>How to book</h2>
          <p>
            Call with your pickup time and destination. <strong>Advance
            reservations recommended</strong> &mdash; especially around
            move-in, finals, and breaks, when demand is highest. Rates vary
            by route and day &mdash; call for today&rsquo;s rate.
          </p>
        </div>
        <aside>
          <BookingCard heading="Book a Williams College ride" />
        </aside>
      </Container>
    </>
  );
}
