const PHONE = "(518) 327-0700";

// Locals in these counties search "Hudson Valley" by name, not by county —
// a regional competitor (Hudson Valley Airporter) owns "car service hudson
// valley" (150/mo, real volume) that we weren't targeting at all. See:
// Hudson Valley competitive research, Oct 2026.
const HUDSON_VALLEY_COUNTIES = new Set([
  "Columbia County",
  "Greene County",
  "Ulster County",
  "Dutchess County",
]);

// The legacy mtitle/mdesc override is spun, keyword-stuffed junk for every
// one of the 525 cities that has one — confirmed empirically. The mtitle
// varies slightly ("Taxi service {city}, NY JFK LGA EWR Albany Airport Car
// Limo" for most, a differently-worded variant for a handful like West
// Stockbridge), but the mdesc is the exact same template on all 525 with
// zero exceptions: "Call {phone}. Getting an Airport Taxi or taxi Service
// is only a phone call away!..." — a far more reliable single signature
// than the title variants, so detection keys off that. Using this
// "override" as authoritative means 93% of city pages were shipping
// duplicate, stuffed <title>/<meta description> tags instead of the clean
// generated ones below — exactly the problem the SEO rebuild exists to
// fix. Checked against both fields (belt and suspenders) rather than
// discarded wholesale, so a genuinely different override would still get
// used if one ever shows up.
const CITY_META_PLACEHOLDER_MARKERS = [
  /^Taxi service /i,
  /Getting an Airport.*taxi Service is only a phone call away/i,
];

function isPlaceholderCityMeta(mtitle: string, mdesc: string): boolean {
  return CITY_META_PLACEHOLDER_MARKERS.some((re) => re.test(mtitle) || re.test(mdesc));
}

/** City page meta: use the DB's mtitle/mdesc override when present (and not
 * known legacy spun-title junk), else generate. */
export function resolveCityMeta(
  airportName: string,
  cityName: string,
  stateName: string,
  override: { mtitle: string; mdesc: string },
  countyName?: string
): { title: string; description: string } {
  if (override.mtitle.trim() && override.mdesc.trim() && !isPlaceholderCityMeta(override.mtitle, override.mdesc)) {
    return { title: override.mtitle.trim(), description: override.mdesc.trim() };
  }
  // No brand suffix here — the root layout's title template
  // ("%s | Albany Airport Taxi and Limo Service") already appends it, so
  // adding one here used to double-stamp the brand name on every title.
  const hudsonValley = countyName ? HUDSON_VALLEY_COUNTIES.has(countyName) : false;
  return {
    title: hudsonValley
      ? `${airportName} Taxi to ${cityName}, ${stateName} | Hudson Valley Car Service`
      : `${airportName} Taxi to ${cityName}, ${stateName}`,
    description: hudsonValley
      ? `Reliable ${airportName.toLowerCase()} taxi and car service to and from ${cityName}, ${stateName}, serving the Hudson Valley. Available 24/7. Call ${PHONE} to book.`
      : `Reliable ${airportName.toLowerCase()} taxi and car service to and from ${cityName}, ${stateName}. Available 24/7. Call ${PHONE} to book.`,
  };
}

// Legacy per-city "detail" content turned out to be exactly two spun
// templates (confirmed empirically: 525 of 563 cities share one of these
// two ~5,800-character bodies word-for-word, with only the city name
// swapped in — "Coeymans, NY is a great city... attracts thousands of
// visitors" for a town of a few hundred people). Rendering that as unique
// page content is the duplicate-content problem the whole SEO rebuild
// exists to fix, so it's treated as placeholder here, the same way the
// county branch already guards against the legacy "Columbia county"
// one-liner — just detected by known template phrase instead of length,
// since this junk is long enough to pass a length check.
const CITY_DETAIL_PLACEHOLDER_MARKERS = [
  "best known car service in",
  "professional taxi Cab Company in",
];

export function hasRealCityDetail(html: string | undefined | null): boolean {
  const text = (html ?? "").trim();
  if (text.length === 0) return false;
  return !CITY_DETAIL_PLACEHOLDER_MARKERS.some((marker) => text.includes(marker));
}

/** County pages have no DB-level override column — always generated. */
export function generateCountyMeta(
  airportName: string,
  countyName: string,
  stateName: string
): { title: string; description: string } {
  const hudsonValley = HUDSON_VALLEY_COUNTIES.has(countyName);
  return {
    title: hudsonValley
      ? `${airportName} Taxi Service in ${countyName}, ${stateName} | Hudson Valley Car Service`
      : `${airportName} Taxi Service in ${countyName}, ${stateName}`,
    description: hudsonValley
      ? `Airport taxi and car service throughout ${countyName}, ${stateName}, serving the Hudson Valley, to and from ${airportName}. Available 24/7. Call ${PHONE} to book.`
      : `Airport taxi and car service throughout ${countyName}, ${stateName} to and from ${airportName}. Available 24/7. Call ${PHONE} to book.`,
  };
}
