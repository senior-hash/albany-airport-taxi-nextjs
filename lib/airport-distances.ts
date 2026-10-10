// Real, researched typical driving distance/time from Albany to each
// NYC-area and Boston airport — not applicable to ALB itself (that's the
// local airport, not a destination to drive to). Sourced from multiple
// route-planning sites (Rome2Rio, Air Miles Calculator, Blade) in Oct 2026;
// rounded to realistic off-peak ranges rather than false precision, since
// actual time varies with traffic, especially near NYC.
export type AirportDistance = {
  airportSlug: string;
  distanceMiles: string;
  driveTime: string;
};

export const AIRPORT_DISTANCES: AirportDistance[] = [
  { airportSlug: "jfk", distanceMiles: "~155 miles", driveTime: "about 3 hours" },
  { airportSlug: "lga", distanceMiles: "~160 miles", driveTime: "about 3 hours" },
  { airportSlug: "ewr", distanceMiles: "~150 miles", driveTime: "about 2 hr 45 min" },
  { airportSlug: "logan", distanceMiles: "~170 miles", driveTime: "about 3 hours" },
];

export function getAirportDistance(airportSlug: string): AirportDistance | undefined {
  return AIRPORT_DISTANCES.find((d) => d.airportSlug === airportSlug);
}
