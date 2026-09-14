const PHONE = "(518) 327-0700";

/** City page meta: use the DB's mtitle/mdesc override when present, else generate. */
export function resolveCityMeta(
  airportName: string,
  cityName: string,
  stateName: string,
  override: { mtitle: string; mdesc: string }
): { title: string; description: string } {
  if (override.mtitle.trim() && override.mdesc.trim()) {
    return { title: override.mtitle.trim(), description: override.mdesc.trim() };
  }
  return {
    title: `${airportName} Taxi to ${cityName}, ${stateName} | Albany Airport Taxi & Limo`,
    description: `Reliable ${airportName.toLowerCase()} taxi and car service to and from ${cityName}, ${stateName}. Available 24/7. Call ${PHONE} to book.`,
  };
}

/** County pages have no DB-level override column — always generated. */
export function generateCountyMeta(
  airportName: string,
  countyName: string,
  stateName: string
): { title: string; description: string } {
  return {
    title: `${airportName} Taxi Service in ${countyName}, ${stateName} | Albany Airport Taxi & Limo`,
    description: `Airport taxi and car service throughout ${countyName}, ${stateName} to and from ${airportName}. Available 24/7. Call ${PHONE} to book.`,
  };
}
