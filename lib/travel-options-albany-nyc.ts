// Real, researched comparison data for Albany <-> NYC travel options.
// Sourced Oct 2026 from Amtrak's own Empire Service page, the NY Governor's
// office announcement on restored Albany-Penn Station service (specific
// train example: 12:10pm ALB departure / 2:45pm Penn Station arrival), and
// Trailways/aggregator fare listings (Rome2Rio, trainfromto). Fares and
// schedules change and vary by booking window — presented as typical
// ranges, not quotes, with a disclaimer on the page itself.
export type TravelOption = {
  mode: string;
  travelTime: string;
  typicalFare: string;
  boardsAt: string;
  schedule: string;
};

export const ALBANY_NYC_TRAVEL_OPTIONS: TravelOption[] = [
  {
    mode: "Car service (us)",
    travelTime: "About 2.5–3 hours, door-to-door",
    typicalFare: "Flat rate, quoted when you book",
    boardsAt: "Your exact address",
    schedule: "Whenever you want to leave",
  },
  {
    mode: "Amtrak (Empire Service)",
    travelTime: "About 2 hr 20 min–2 hr 35 min",
    typicalFare: "Roughly $45–$120, demand-based",
    boardsAt: "Albany-Rensselaer station",
    schedule: "Several daily departures, fixed times",
  },
  {
    mode: "Trailways bus",
    travelTime: "About 2 hr 45 min–3 hours",
    typicalFare: "Roughly $29–$110, fare-type dependent",
    boardsAt: "Downtown Albany bus terminal",
    schedule: "Roughly every few hours, fixed times",
  },
];
