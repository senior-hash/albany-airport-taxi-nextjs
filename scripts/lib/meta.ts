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

/** City page meta: use the DB's mtitle/mdesc override when present, else generate. */
export function resolveCityMeta(
  airportName: string,
  cityName: string,
  stateName: string,
  override: { mtitle: string; mdesc: string },
  countyName?: string
): { title: string; description: string } {
  if (override.mtitle.trim() && override.mdesc.trim()) {
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
