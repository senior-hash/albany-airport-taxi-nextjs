import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Courier Service & Same-Day Messenger Delivery",
  description:
    "Same-day courier service and messenger delivery in the Albany, NY area. Documents and packages, door to door.",
  alternates: { canonical: "/services/courier" },
};

export default function CourierPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Courier & Messenger Service",
          description: "Same-day courier and messenger service for documents and packages.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/services/courier",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Courier & Messenger Service"
        description="Fast, reliable same-day delivery for documents and packages."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Courier", path: "/services/courier" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Need something delivered quickly and securely? We provide same-day
            courier and messenger service throughout the Albany area —
            documents, packages, and time-sensitive deliveries handled
            directly, door to door.
          </p>
          <h2>How to book</h2>
          <p>
            Call us with your pickup and drop-off details. We&rsquo;ll confirm
            timing and pricing before we head out.
          </p>
        </div>
        <aside>
          <BookingCard heading="Schedule a delivery" />
        </aside>
      </Container>
    </>
  );
}
