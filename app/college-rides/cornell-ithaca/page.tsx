import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cornell & Ithaca College Airport Rides",
  description:
    "Private car service for Cornell University and Ithaca College students and families — rides to Syracuse, Rochester, Buffalo, JFK, Newark, and NYC. Advance reservations recommended.",
  alternates: { canonical: "/college-rides/cornell-ithaca" },
};

export default function CornellIthacaRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Cornell & Ithaca College Airport Rides",
          description:
            "Private car service between Ithaca-area campuses and regional airports for Cornell University and Ithaca College students and families.",
          areaServedName: "Ithaca, NY",
          url: "/college-rides/cornell-ithaca",
        })}
      />
      <PageHeading
        eyebrow="College rides"
        title="Cornell & Ithaca College Airport Rides"
        description="Private car service for Cornell University and Ithaca College students and families."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "College Rides", path: "/college-rides" },
          { name: "Cornell & Ithaca College", path: "/college-rides/cornell-ithaca" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            We run private car service (not a shared shuttle) for Cornell
            University and Ithaca College students and families, with
            pickups on and around campus.
          </p>
          <h2>Where we take you</h2>
          <p>
            Syracuse Hancock International is the primary airport we connect
            Ithaca to, with trips also available to Rochester and Buffalo. For
            travel further out, we run longer-distance rides to JFK, Newark,
            and New York City &mdash; door-to-door, so you&rsquo;re not
            connecting through multiple legs with luggage. Parents can call
            and book a ride for their student directly.
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
          <BookingCard heading="Book a Cornell/Ithaca ride" />
        </aside>
      </Container>
    </>
  );
}
