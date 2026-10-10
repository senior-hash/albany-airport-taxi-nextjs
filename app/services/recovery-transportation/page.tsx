import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Transportation to Recovery & Treatment Programs",
  description:
    "Private, reliable transportation to and from recovery and treatment programs in the Albany, NY area — airport transfers and direct long-distance trips to the program itself.",
  alternates: { canonical: "/services/recovery-transportation" },
};

export default function RecoveryTransportationPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Recovery & Treatment Program Transportation",
          description:
            "Private transportation to and from recovery and treatment programs, including airport transfers and direct long-distance trips to the program location.",
          areaServedName: "Albany, NY and the surrounding 23-county service area",
          url: "/services/recovery-transportation",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Transportation to Recovery & Treatment Programs"
        description="A private, judgment-free ride — to the airport or straight to the program, however far it is."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Recovery & Treatment Transportation", path: "/services/recovery-transportation" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Getting to a recovery or treatment program is stressful enough
            without worrying about the ride. We provide private,
            door-to-door transportation for clients and families — no
            judgment, no questions beyond what we need to get you there
            safely and on time.
          </p>
          <h2>Two ways we help</h2>
          <p>
            <strong>Airport transfers</strong> — if you or a family member is
            flying in or out for a program, we provide the same reliable
            airport car service we run every day, timed around the actual
            flight.
          </p>
          <p>
            <strong>Direct transport to the program</strong> — when the
            program itself is the destination, we'll drive there directly,
            including{" "}
            <Link href="/long-distance">long-distance trips</Link> well
            outside the Capital Region. One vehicle, one driver, the whole
            way.
          </p>
          <h2>Privacy</h2>
          <p>
            These trips are personal. We keep pickup and drop-off details
            private and coordinate quietly with family members arranging the
            ride when that's what's needed.
          </p>
          <h2>How to book</h2>
          <p>
            Call us with the pickup location, the program's address, and
            your timeline. We're available 24/7, including last-minute and
            early-morning pickups.
          </p>
        </div>
        <aside>
          <BookingCard heading="Arrange a ride" />
        </aside>
      </Container>
    </>
  );
}
