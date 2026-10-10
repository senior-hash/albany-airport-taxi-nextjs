import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding Transportation",
  description: "Wedding and special-event transportation in the Albany, NY area.",
  alternates: { canonical: "/services/wedding" },
};

export default function WeddingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Wedding Transportation",
          description: "Wedding-day and special-event transportation for the wedding party and guests.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/services/wedding",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Wedding Transportation"
        description="Comfortable, on-time transportation for your wedding day."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Wedding Transportation", path: "/services/wedding" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Your wedding day should run smoothly from start to finish. We
            provide reliable, on-time transportation for the couple, wedding
            party, and guests — between the ceremony, photos, reception, and
            hotel.
          </p>
          <h2>How to book</h2>
          <p>
            Call us with your date, timeline, and number of vehicles needed.
            We recommend booking as early as possible, since wedding dates
            fill up fast, especially during peak season.
          </p>
        </div>
        <aside>
          <BookingCard heading="Check availability" />
        </aside>
      </Container>
    </>
  );
}
