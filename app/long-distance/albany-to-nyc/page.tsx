import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { PickupAreas } from "@/components/PickupAreas";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { getPageFAQ } from "@/lib/faq";

const pageFAQ = getPageFAQ("long-distance/albany-to-nyc");

// Flagship page — the single highest-value keyword opportunity found in the
// SEO research (1,900 searches/mo, difficulty 2). Covers both "Albany to NYC"
// and "Albany to New York City" phrasing on one page rather than splitting
// across two near-duplicate URLs, to avoid keyword cannibalization.
// Round-trip is sold directly here rather than on a separate "NYC to Albany"
// page, since that reverse phrase is dominated by large travel-planning
// sites (difficulty 78) — see plan.

export const metadata: Metadata = {
  title: "Albany to NYC Car Service | Albany to New York City",
  description:
    "Reliable car service to NYC and New York City from the Capital Region, Saratoga, Hudson Valley, Berkshires, and beyond, with round-trip options. Door-to-door, 24/7. Call (518) 327-0700 to book.",
  alternates: { canonical: "/long-distance/albany-to-nyc" },
};

export default function AlbanyToNycPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Albany to NYC Car Service",
          description:
            "Door-to-door car service between Albany, NY and New York City, with round-trip booking available.",
          areaServedName: "Albany, NY and New York City",
          url: "/long-distance/albany-to-nyc",
        })}
      />
      {pageFAQ.length > 0 && <JsonLd data={faqSchema(pageFAQ)} />}
      <PageHeading
        eyebrow="Long Distance"
        title="Albany to NYC & New York City Car Service"
        description="Comfortable, reliable door-to-door service between Albany and New York City — round trips welcome."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Long Distance", path: "/long-distance" },
          { name: "Albany to NYC", path: "/long-distance/albany-to-nyc" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Traveling between Albany and New York City? We provide comfortable,
            reliable car service the whole way — whether you&rsquo;re headed
            into Manhattan for business, catching a flight out of a{" "}
            <Link href="/airport-taxi">NYC-area airport</Link>, or just need a
            dependable ride home.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time. Rideshare and
            local taxi availability on the New York City end can be
            unpredictable — booking your return with us up front means
            you&rsquo;re not left waiting when you land or wrap up your trip.
          </p>
          <h2>Door-to-door, 24/7</h2>
          <p>
            We pick up and drop off at your exact address — home, office, or{" "}
            <Link href="/venues">hotel</Link> — any time of day or night. No
            need to coordinate train or bus schedules; your ride is ready
            when you are.
          </p>
          <p>
            Weighing this against Amtrak or the Trailways bus? See our{" "}
            <Link href="/long-distance/albany-to-nyc/vs-train-and-bus">
              full comparison of car service, train, and bus
            </Link>
            . Flying out of JFK instead? See how a{" "}
            <Link href="/jfk-shuttle-vs-private-car">shared shuttle compares to a private car</Link>.
          </p>
          <div className="not-prose mt-10">
            <PickupAreas destinationSlug="albany-to-nyc" />
          </div>
          {pageFAQ.length > 0 && (
            <div className="not-prose mt-12">
              <FAQ items={pageFAQ} title="Albany to NYC Car Service FAQ" />
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book your trip" note="Round-trip and one-way options available." />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
