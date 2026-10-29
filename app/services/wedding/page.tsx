import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { getPageFAQ } from "@/lib/faq";

const pageFAQ = getPageFAQ("services/wedding");

export const metadata: Metadata = {
  title: "Wedding Guest Transportation",
  description:
    "Private wedding guest transportation in the Albany, NY area — scheduled pickups from nearby hotels and vacation rentals, runs to and from the venue, and a safe ride home at the end of the night.",
  alternates: { canonical: "/services/wedding" },
};

export default function WeddingPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Wedding Guest Transportation",
          description:
            "Scheduled wedding guest transportation between nearby hotels or vacation rentals and the venue, including a return run at the end of the night.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/services/wedding",
        })}
      />
      {pageFAQ.length > 0 && <JsonLd data={faqSchema(pageFAQ)} />}
      <PageHeading
        eyebrow="Services"
        title="Wedding Guest Transportation"
        description="Scheduled pickups from nearby hotels and rentals, so your guests get to the venue and home again without anyone driving."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Wedding Guest Transportation", path: "/services/wedding" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Most of the wedding work we do isn&rsquo;t a limo for the couple — it&rsquo;s
            getting guests back and forth safely. Out-of-town guests are
            usually spread across a few nearby{" "}
            <Link href="/venues">hotels</Link> or{" "}
            <Link href="/services/airbnb-transportation">vacation rentals</Link>,
            and once the reception gets going, nobody wants to be the
            designated driver.
          </p>
          <h2>How it works</h2>
          <p>
            We schedule pickups at one or more hotels or rentals, run guests
            to the venue in time for the ceremony, and bring the vehicle back
            at the end of the night for the return trip — timed around your
            actual reception schedule, not a fixed hourly block. Larger
            guest lists can be split across multiple vehicles or multiple
            pickup locations.
          </p>
          <h2>How to book</h2>
          <p>
            Call us with your date, the venue and hotel(s) involved, roughly
            how many guests need rides, and your ceremony/reception timeline.
            We recommend booking as early as possible — wedding dates fill up
            fast, especially during peak season.
          </p>
          {pageFAQ.length > 0 && (
            <div className="not-prose mt-12">
              <FAQ items={pageFAQ} title="Wedding Guest Transportation FAQ" />
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Check availability" />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
