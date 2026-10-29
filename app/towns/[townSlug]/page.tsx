import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getCities, getCityBySlug, getCountyById, getStateById } from "@/lib/content";
import { getVenues, findVenueByName } from "@/lib/venues";
import { getTownHub, getTownHubNote } from "@/lib/town-hubs";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { PlaceLink } from "@/components/PlaceLink";

// Airport display names/order for the drive-time table — same 6 airports
// scripts/town-hubs/refresh-town-hubs.mjs pulls real drive times for.
const AIRPORTS = [
  { slug: "alb", label: "Albany International (ALB)" },
  { slug: "jfk", label: "JFK International (JFK)" },
  { slug: "lga", label: "LaGuardia (LGA)" },
  { slug: "ewr", label: "Newark Liberty (EWR)" },
  { slug: "logan", label: "Boston Logan (BOS)" },
  { slug: "bradley", label: "Bradley International (BDL)" },
];

// Two towns where real search-volume data showed the short-form phrase
// ("Saratoga taxi", "Pittsfield taxi") mattering enough to call out
// explicitly in the title and intro, distinct from the standard
// "Taxi & Car Service in {Town}, {State}" pattern used everywhere else.
const SHORT_NAME_OVERRIDES: Record<string, string> = {
  "saratoga-springs": "Saratoga",
  pittsfield: "Pittsfield",
};

type WikidataCoord = { lat: number; lon: number };
let coordsCache: Record<string, WikidataCoord> | undefined;
function loadTownCoords(): Record<string, WikidataCoord> {
  if (!coordsCache) {
    const readJson = (name: string): Record<string, WikidataCoord> => {
      const file = path.join(process.cwd(), "content", name);
      return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
    };
    // content/town-hub-osm-centers.json covers towns with no Wikidata match
    // (see scripts/town-hubs/extract_local_places.py) — merge both so
    // "nearby towns" distance-sorts correctly for them too.
    coordsCache = { ...readJson("town-hub-osm-centers.json"), ...readJson("town-hub-wikidata.json") };
  }
  return coordsCache!;
}

function haversineMiles(a: WikidataCoord, b: WikidataCoord): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(x));
}

export function generateStaticParams() {
  return getCities().map((c) => ({ townSlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ townSlug: string }>;
}): Promise<Metadata> {
  const { townSlug } = await params;
  const city = getCityBySlug(townSlug);
  if (!city) return {};
  const state = getStateById(city.stateId);
  const stateName = state?.name ?? "";
  const hub = getTownHub(townSlug);
  const shortName = SHORT_NAME_OVERRIDES[townSlug];
  const title = shortName
    ? `${shortName} Taxi & Car Service in ${city.name}, ${stateName} | Airport Rides to ALB, JFK & More`
    : `Taxi & Car Service in ${city.name}, ${stateName} | Airport Rides to ALB, JFK & More`;
  return {
    title,
    description: `Taxi, car service, and airport transportation in ${city.name}, ${stateName} — real drive times to ALB, JFK, LaGuardia, Newark, Boston Logan, and Bradley, plus nearby restaurants, parks, and appointments.`,
    alternates: { canonical: `/towns/${townSlug}` },
    robots: hub?.qualifies ? undefined : { index: false, follow: true },
  };
}

export default async function TownHubPage({ params }: { params: Promise<{ townSlug: string }> }) {
  const { townSlug } = await params;
  const city = getCityBySlug(townSlug);
  if (!city) notFound();

  const county = getCountyById(city.countyId);
  const state = getStateById(city.stateId);
  const hub = getTownHub(townSlug);
  const note = getTownHubNote(townSlug);
  const shortName = SHORT_NAME_OVERRIDES[townSlug];

  const nearbyVenues = county ? getVenues().filter((v) => v.county === county.name).slice(0, 6) : [];

  const coords = loadTownCoords();
  const myCoord = coords[townSlug];
  const neighborTowns = myCoord
    ? getCities()
        .filter((c) => c.slug !== townSlug && c.countyId === city.countyId && coords[c.slug])
        .map((c) => ({ city: c, miles: haversineMiles(myCoord, coords[c.slug]) }))
        .sort((a, b) => a.miles - b.miles)
        .slice(0, 6)
        .map((x) => x.city)
    : getCities()
        .filter((c) => c.slug !== townSlug && c.countyId === city.countyId)
        .slice(0, 6);

  return (
    <>
      <PageHeading
        eyebrow={county ? `${county.name}, ${state?.name ?? ""}` : state?.name ?? ""}
        title={`Taxi & Car Service in ${city.name}, ${state?.name ?? ""}`}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Towns We Serve", path: "/service-area" },
          { name: city.name, path: `/towns/${townSlug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          {shortName ? (
            <p>
              Looking for {shortName.toLowerCase()} taxi and car service? We
              provide door-to-door airport transportation in {city.name},{" "}
              {state?.name}, to Albany International, JFK, LaGuardia,
              Newark, Boston Logan, and Bradley, plus rides anywhere else
              you need to go.
            </p>
          ) : (
            <p>
              {city.name}, {state?.name} taxi and car service, door to door
              &mdash; airport transportation to Albany International, JFK,
              LaGuardia, Newark, Boston Logan, and Bradley, plus rides
              anywhere else you need to go.
            </p>
          )}
          {hub?.population != null && (
            <p className="text-sm text-ink-muted">
              Population: {hub.population.toLocaleString()}.{" "}
              {hub.wikidataQid ? (
                <a
                  href={`https://www.wikidata.org/wiki/${hub.wikidataQid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Source: Wikidata contributors
                </a>
              ) : (
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Source: OpenStreetMap contributors
                </a>
              )}
              .
            </p>
          )}

          {hub && Object.keys(hub.airportDistances).length > 0 && (
            <>
              <h2>Drive times from {city.name}</h2>
              <table className="not-prose w-full border-collapse text-sm">
                <tbody>
                  {AIRPORTS.filter((a) => hub.airportDistances[a.slug]).map((a) => (
                    <tr key={a.slug} className="border-b border-border">
                      <td className="py-2 pr-4 font-medium text-primary">{a.label}</td>
                      <td className="py-2 pr-4 text-ink-muted">{hub.airportDistances[a.slug].miles}</td>
                      <td className="py-2 text-ink-muted">{hub.airportDistances[a.slug].driveTime}</td>
                    </tr>
                  ))}
                  {hub.nearestAmtrak && (
                    <tr>
                      <td className="py-2 pr-4 font-medium text-primary">
                        Nearest Amtrak: {hub.nearestAmtrak.name}
                      </td>
                      <td className="py-2 pr-4 text-ink-muted">{hub.nearestAmtrak.miles}</td>
                      <td className="py-2 text-ink-muted">{hub.nearestAmtrak.driveTime}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {hub &&
            Object.entries(hub.places).map(([key, group]) => (
              <div key={key}>
                <h2>{group.label}</h2>
                <ul>
                  {group.items.map((item) => {
                    const venue = findVenueByName(item.name);
                    return (
                      <li key={item.name}>
                        <PlaceLink
                          name={item.name}
                          website={item.website}
                          venueHref={venue ? `/venues/${venue.slug}` : undefined}
                        />{" "}
                        &mdash; {item.driveTime}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          {hub && Object.keys(hub.places).length > 0 && (
            <p className="text-xs text-ink-muted">
              Nearby places from{" "}
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline">
                © OpenStreetMap contributors
              </a>
              .
            </p>
          )}

          {neighborTowns.length > 0 && (
            <>
              <h2>Nearby towns we serve</h2>
              <ul className="not-prose flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {neighborTowns.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/towns/${t.slug}`} className="text-accent hover:underline">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {nearbyVenues.length > 0 && (
            <>
              <h2>Venues nearby</h2>
              <ul className="not-prose flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {nearbyVenues.map((v) => (
                  <li key={v.slug}>
                    <Link href={`/venues/${v.slug}`} className="text-accent hover:underline">
                      {v.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {note && (
            <div className="not-prose mt-8 rounded-lg border border-border bg-surface p-4 text-sm">
              {note}
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <BookingCard phoneDisplay={county?.trackingPhone ?? undefined} />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
