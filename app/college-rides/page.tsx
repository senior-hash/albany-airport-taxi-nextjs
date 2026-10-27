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
  title: "College Airport Rides & Rides Home for Break",
  description:
    "Private car service for college students and families — airport rides and trips home for break. Williams, Skidmore, Union, RPI, Vassar, Bard, Bennington, Cornell, Ithaca College, Hartwick, SUNY Oneonta, and SUNY Cobleskill. Advance reservations recommended.",
  alternates: { canonical: "/college-rides" },
};

export default function CollegeRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "College Airport Rides",
          description:
            "Private car service for college students between campus and the airport, and rides home for breaks.",
          areaServedName: "The Capital Region, Hudson Valley, Berkshires, and southern Vermont",
          url: "/college-rides",
        })}
      />
      <PageHeading
        eyebrow="College rides"
        title="College Airport Rides & Rides Home for Break"
        description="Private car service to and from the airport for students at area colleges — book it yourself, or a parent can book it for you."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "College Rides", path: "/college-rides" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Move-in day, a flight home for break, a family visiting for
            parents&rsquo; weekend &mdash; we run private car service (not a
            shared shuttle) for students and families at colleges across the
            Capital Region, Hudson Valley, Berkshires, and southern Vermont.
            Parents can call and book a ride for their student directly; you
            don&rsquo;t need to be the one riding to arrange it.
          </p>
          <h2>Colleges we serve</h2>
          <ul>
            <li><Link href="/college-rides/williams">Williams College</Link></li>
            <li><Link href="/venues/skidmore-college">Skidmore College</Link></li>
            <li><Link href="/venues/union-college">Union College</Link></li>
            <li><Link href="/venues/rpi">Rensselaer Polytechnic Institute (RPI)</Link></li>
            <li><Link href="/venues/vassar-college">Vassar College</Link></li>
            <li>Bard College</li>
            <li><Link href="/venues/bennington-college">Bennington College</Link></li>
            <li><Link href="/college-rides/cornell-ithaca">Cornell University &amp; Ithaca College</Link></li>
            <li><Link href="/venues/hartwick-college">Hartwick College</Link></li>
            <li><Link href="/venues/suny-oneonta">SUNY Oneonta</Link></li>
            <li><Link href="/venues/suny-cobleskill">SUNY Cobleskill</Link></li>
          </ul>
          <h2>Airports we connect to</h2>
          <p>
            Albany International is the closest airport for most of these
            campuses, but depending on where you&rsquo;re headed we also run
            long-distance trips to Syracuse, Rochester, Buffalo, JFK, Newark,
            LaGuardia, Bradley (Hartford/Windsor Locks), and Boston Logan.
          </p>
          <h2>How to book</h2>
          <p>
            Call with your pickup location, flight or travel time, and
            whether you&rsquo;re booking for yourself or your student.{" "}
            <strong>Advance reservations recommended</strong> &mdash; especially
            around move-in, finals week, and holiday breaks, when demand is
            highest. Rates vary by route and day &mdash; call for today&rsquo;s
            rate.
          </p>
        </div>
        <aside>
          <BookingCard heading="Book a college ride" />
        </aside>
      </Container>
    </>
  );
}
