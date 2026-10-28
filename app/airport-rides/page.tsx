import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Private Car Service to Every Major Airport",
  description:
    "Private car service — not a shared shuttle — to Albany, JFK, LaGuardia, Newark, Boston Logan, Bradley, and Syracuse airports, serving upstate NY, the Berkshires, and southern Vermont. Advance reservations recommended.",
  alternates: { canonical: "/airport-rides" },
};

export default function AirportRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Private Car Service to Every Major Airport",
          description:
            "Private car service to major regional airports, serving upstate New York, the Berkshires, and southern Vermont.",
          areaServedName: "Upstate New York, the Berkshires, and southern Vermont",
          url: "/airport-rides",
        })}
      />
      <PageHeading
        eyebrow="Airport rides"
        title="Private Car Service to Every Major Airport"
        description="A private car, not a shared shuttle — door-to-door, on your schedule."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Airport Rides", path: "/airport-rides" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Every ride is a private car reserved just for you and your
            group &mdash; not a shared shuttle with other passengers and
            extra stops. We serve upstate New York, the Berkshires, and
            southern Vermont, with door-to-door pickup anywhere in that area.
          </p>
          <h2>Airports we serve</h2>
          <ul>
            <li><Link href="/airport-taxi/alb">Albany International (ALB)</Link></li>
            <li><Link href="/airport-taxi/jfk">John F. Kennedy International (JFK)</Link></li>
            <li><Link href="/airport-taxi/lga">LaGuardia (LGA)</Link></li>
            <li><Link href="/airport-taxi/ewr">Newark Liberty International (EWR)</Link></li>
            <li><Link href="/airport-taxi/logan">Boston Logan International (BOS)</Link></li>
            <li>Bradley International (Hartford/Windsor Locks)</li>
            <li>Syracuse Hancock International</li>
          </ul>
          <h2>How to book</h2>
          <p>
            Call with your pickup location, flight time, and airport.{" "}
            <strong>Advance reservations recommended</strong>, especially
            for early-morning flights and holiday travel. Rates vary by
            route and day &mdash; call for today&rsquo;s rate.
          </p>
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book your ride" />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
