import type { Metadata } from "next";
import Link from "next/link";
import { getCountyBySlug, getCitiesByCounty } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

// Flagship regional page — "car service hudson valley" (150/mo, real volume)
// is currently owned by a regional competitor (Hudson Valley Airporter) we
// hadn't identified before live-SERP research. Locals in Columbia, Greene,
// Ulster, and Dutchess counties search "Hudson Valley" by name, not by
// county — this page targets that phrasing directly and links into the
// existing per-county airport-taxi pages for those four counties.

const HUDSON_VALLEY_COUNTY_SLUGS = [
  "columbia-county",
  "greene-county",
  "ulster-county",
  "dutchess-county",
] as const;

export const metadata: Metadata = {
  title: "Hudson Valley Car Service | Airport Transfers & Taxi",
  description:
    "Car service and airport transfers throughout the Hudson Valley — Columbia, Greene, Ulster, and Dutchess counties. Door-to-door, 24/7. Call (518) 327-0700.",
  alternates: { canonical: "/hudson-valley" },
};

export default function HudsonValleyPage() {
  const counties = HUDSON_VALLEY_COUNTY_SLUGS.map((slug) => {
    const county = getCountyBySlug(slug);
    if (!county) return null;
    const cityCount = getCitiesByCounty(county.id).length;
    return { county, cityCount };
  }).filter((c): c is { county: NonNullable<ReturnType<typeof getCountyBySlug>>; cityCount: number } => c !== null);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Hudson Valley Car Service",
          description:
            "Door-to-door car service and airport transfers throughout the Hudson Valley region of New York.",
          areaServedName: "Hudson Valley, NY",
          url: "/hudson-valley",
        })}
      />
      <PageHeading
        eyebrow="Service Area"
        title="Hudson Valley Car Service & Airport Transfers"
        description="Reliable, door-to-door car service throughout the Hudson Valley — Columbia, Greene, Ulster, and Dutchess counties — to and from Albany, JFK, LaGuardia, and Newark."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Hudson Valley", path: "/hudson-valley" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Whether you&rsquo;re catching a flight out of Albany International,
            JFK, LaGuardia, or Newark, or just need a reliable ride across the
            region, we provide door-to-door car service throughout the Hudson
            Valley — Columbia, Greene, Ulster, and Dutchess counties.
          </p>
          <h2>Counties we serve in the Hudson Valley</h2>
          <ul>
            {counties.map(({ county, cityCount }) => (
              <li key={county.slug}>
                <Link href={`/airport-taxi/alb/${county.slug}`}>{county.name}</Link>
                {" — "}
                {cityCount} towns and cities, local number{" "}
                {county.trackingPhone ?? "(518) 327-0700"}
              </li>
            ))}
          </ul>
          <h2>Airport transfers from anywhere in the Hudson Valley</h2>
          <p>
            Albany International Airport is the closest option for most of the
            region, but we also run regular trips to JFK, LaGuardia, and
            Newark for travelers connecting through New York City. Every ride
            is scheduled door-to-door — no shared shuttles, no fixed stops.
          </p>
        </div>
        <aside className="rounded-lg border border-border bg-surface p-6">
          <p className="font-medium text-primary">Book your ride</p>
          <p className="mt-2 text-sm text-ink-muted">Available 24 hours a day, 7 days a week.</p>
          <CallButton className="mt-4 w-full" />
        </aside>
      </Container>
    </>
  );
}
