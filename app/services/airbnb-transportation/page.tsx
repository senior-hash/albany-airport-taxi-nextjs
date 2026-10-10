import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Airbnb & Vacation Rental Airport Transportation",
  description:
    "Reliable airport transportation for Airbnb and vacation rental guests across the Capital Region, Hudson Valley, and beyond. Door-to-door pickup, no street address required.",
  alternates: { canonical: "/services/airbnb-transportation" },
};

export default function AirbnbTransportationPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Airbnb & Vacation Rental Airport Transportation",
          description:
            "Door-to-door airport car service for Airbnb and vacation rental guests, coordinated directly with the guest rather than a hotel front desk.",
          areaServedName: "Albany, NY and the surrounding 23-county service area",
          url: "/services/airbnb-transportation",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Airbnb & Vacation Rental Transportation"
        description="A reliable ride to and from your rental — no front desk, no hotel shuttle, no problem."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Airbnb & Vacation Rental Transportation", path: "/services/airbnb-transportation" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Staying at an Airbnb, VRBO, or other vacation rental? There's no
            front desk to call a cab for you and often no hotel shuttle —
            just an address, sometimes a long way outside town. We provide
            door-to-door car service straight to and from your rental, timed
            around your actual flight.
          </p>
          <h2>Built for the areas rideshare apps skip</h2>
          <p>
            A lot of our service area is exactly where vacation rentals tend
            to be: rural towns, lakefronts, and farmhouses well outside the
            city, including near many of the{" "}
            <Link href="/venues">wineries, farms, and attractions</Link>{" "}
            featured on this site. See our{" "}
            <Link href="/taxi-vs-uber-lyft">comparison with Uber and Lyft</Link>{" "}
            for why that matters — rideshare driver coverage thins out fast
            once you're off the main roads, which is exactly where a lot of
            rentals sit.
          </p>
          <h2>Groups, luggage, and odd hours</h2>
          <p>
            Vacation stays usually mean more luggage and bigger groups than a
            typical business trip. Let us know your group size when you call
            and we'll make sure the right vehicle shows up — including larger
            vehicles for families or groups splitting a rental. Early-morning
            checkouts and late-night arrivals are no problem; we're
            available 24/7.
          </p>
          <h2>Hosts: add us to your welcome guide</h2>
          <p>
            If you manage a vacation rental, feel free to list our number in
            your check-in instructions or welcome guide as a reliable
            transportation option for guests who ask.
          </p>
        </div>
        <aside>
          <BookingCard heading="Book your airport ride" />
        </aside>
      </Container>
    </>
  );
}
