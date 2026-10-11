// Real, researched typical driving distance/time from each Hudson Valley
// county seat to the airports we serve. Sourced Oct 2026 from a mix of
// route-planning sites (Rome2Rio, airport.guide, travelprofy) and, where no
// direct figure existed, a conservative estimate flagged as such below --
// never presented as more precise than the underlying source. Rounded to
// realistic off-peak ranges, not false precision; actual time varies
// heavily with NYC-area traffic in particular.
//
// This replaces a blanket "Albany is closest for most of the region" claim
// that turned out to be an oversimplification: true for Columbia, Greene,
// and Ulster, but Dutchess County is a genuine near-tie between Albany and
// the NYC-area airports.
export type CountyAirportTimes = {
  countySlug: string;
  countySeat: string;
  times: { airportSlug: string; driveTime: string; estimated?: boolean }[];
  fastest: string; // free text, since Dutchess is a near-tie rather than a clear winner
};

export const HUDSON_VALLEY_AIRPORT_TIMES: CountyAirportTimes[] = [
  {
    countySlug: "columbia-county",
    countySeat: "Hudson",
    times: [
      { airportSlug: "alb", driveTime: "about 1 hour" },
      { airportSlug: "jfk", driveTime: "about 2 hours", estimated: true },
      { airportSlug: "lga", driveTime: "about 2 hours", estimated: true },
      { airportSlug: "ewr", driveTime: "about 2 hours", estimated: true },
    ],
    fastest: "Albany — roughly half the drive time of any NYC-area airport",
  },
  {
    countySlug: "greene-county",
    countySeat: "Catskill",
    times: [
      { airportSlug: "alb", driveTime: "about 45 min" },
      { airportSlug: "jfk", driveTime: "about 2 hr 45 min", estimated: true },
      { airportSlug: "lga", driveTime: "about 2 hr 30 min" },
      { airportSlug: "ewr", driveTime: "about 2 hr 10 min" },
    ],
    fastest: "Albany — well under half the drive time of any NYC-area airport",
  },
  {
    countySlug: "ulster-county",
    countySeat: "Kingston",
    times: [
      { airportSlug: "alb", driveTime: "about 1 hour" },
      { airportSlug: "jfk", driveTime: "about 1 hr 50 min" },
      { airportSlug: "lga", driveTime: "about 2 hours", estimated: true },
      { airportSlug: "ewr", driveTime: "about 2 hr 15 min", estimated: true },
    ],
    fastest: "Albany — close to an hour faster than any NYC-area airport",
  },
  {
    countySlug: "dutchess-county",
    countySeat: "Poughkeepsie",
    times: [
      { airportSlug: "alb", driveTime: "about 1 hr 45 min", estimated: true },
      { airportSlug: "jfk", driveTime: "about 2 hours" },
      { airportSlug: "lga", driveTime: "about 1 hr 50 min" },
      { airportSlug: "ewr", driveTime: "about 1 hr 50 min" },
    ],
    fastest: "A near-tie — Albany, LaGuardia, and Newark all run close to the same drive time",
  },
];

export function getHudsonValleyAirportTimes(countySlug: string): CountyAirportTimes | undefined {
  return HUDSON_VALLEY_AIRPORT_TIMES.find((c) => c.countySlug === countySlug);
}
