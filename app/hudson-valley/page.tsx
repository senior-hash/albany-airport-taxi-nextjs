import type { Metadata } from "next";
import Link from "next/link";
import { getCountyBySlug, getCitiesByCounty, getAirportBySlug } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { HUDSON_VALLEY_AIRPORT_TIMES } from "@/lib/hudson-valley-airport-times";

const COMPARED_AIRPORT_SLUGS = ["alb", "jfk", "lga", "ewr"] as const;

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
        <div>
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
            <h2>Which airport is actually fastest?</h2>
            <p>
              It depends more on which county you&rsquo;re in than you might think. For
              Columbia, Greene, and Ulster counties, Albany is clearly the
              fastest option &mdash; often by an hour or more. Dutchess County is
              different: it sits close enough to the city that Albany,
              LaGuardia, and Newark all run about the same drive time.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="p-4 font-semibold text-primary">County seat</th>
                  {COMPARED_AIRPORT_SLUGS.map((slug) => (
                    <th key={slug} className="p-4 font-semibold text-primary">
                      {getAirportBySlug(slug)?.code ?? slug.toUpperCase()}
                    </th>
                  ))}
                  <th className="p-4 font-semibold text-primary">Fastest</th>
                </tr>
              </thead>
              <tbody>
                {HUDSON_VALLEY_AIRPORT_TIMES.map((row) => (
                  <tr key={row.countySlug} className="border-t border-border">
                    <td className="p-4 font-medium text-primary">{row.countySeat}</td>
                    {COMPARED_AIRPORT_SLUGS.map((slug) => {
                      const t = row.times.find((x) => x.airportSlug === slug);
                      return (
                        <td key={slug} className="p-4 text-ink-muted">
                          {t?.driveTime ?? "—"}
                          {t?.estimated ? <span className="text-xs">*</span> : null}
                        </td>
                      );
                    })}
                    <td className="p-4 text-ink-muted">{row.fastest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Typical off-peak drive times from each county seat, researched Oct 2026 — not a
            live quote. * marks estimated figures where a direct source wasn&rsquo;t available.
            NYC-area traffic can add significant time; actual time depends on your exact pickup
            location.
          </p>

          <div className="prose prose-neutral max-w-none prose-headings:text-primary mt-10">
            <p>
              Whichever airport makes sense for your trip, every ride is scheduled door-to-door
              &mdash; no shared shuttles, no fixed stops. See our{" "}
              <Link href="/airport-taxi">full airport list</Link> for details on each one.
            </p>
            <h2>Wineries, farms &amp; hotels in the Hudson Valley</h2>
            <p>
              The Hudson Valley is also where most of the wineries and farms we
              serve are — a ride home from a tasting is one of the most common
              reasons people call us out here. See{" "}
              <Link href="/venues/hudson-chatham-winery">Hudson-Chatham Winery</Link>,{" "}
              <Link href="/venues/millbrook-vineyards-winery">Millbrook Vineyards &amp; Winery</Link>,{" "}
              and <Link href="/venues/mohonk-mountain-house">Mohonk Mountain House</Link>, or
              browse the full list of{" "}
              <Link href="/venues">venues we serve</Link>.
            </p>
          </div>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
