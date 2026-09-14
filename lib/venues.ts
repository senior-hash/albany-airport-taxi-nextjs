export type Venue = {
  slug: string;
  name: string;
  category: string;
  locality: string;
  description: string;
};

// Curated list of well-known Capital Region venues/destinations, per the
// competitive analysis (two of three competitors have venue-specific pages;
// this site had none). Hand-authored, not DB-derived — no legacy content
// exists for these, so this is original copy, not a fabricated claim.
export const VENUES: Venue[] = [
  {
    slug: "albany-med",
    name: "Albany Medical Center",
    category: "Hospital",
    locality: "Albany, NY",
    description:
      "Reliable taxi and car service to and from Albany Medical Center — for patients, visitors, and staff. Available around the clock for appointments, admissions, and discharges.",
  },
  {
    slug: "crossgates-mall",
    name: "Crossgates Mall",
    category: "Shopping",
    locality: "Guilderland, NY",
    description:
      "Door-to-door service to and from Crossgates Mall in Guilderland, whether you're headed out for a shopping trip or need a ride home afterward.",
  },
  {
    slug: "empire-state-plaza",
    name: "Empire State Plaza",
    category: "Government / Events",
    locality: "Albany, NY",
    description:
      "Taxi and car service to and from the Empire State Plaza for state government business, events, or visits to The Egg and the New York State Museum.",
  },
  {
    slug: "times-union-center",
    name: "Times Union Center",
    category: "Arena / Events",
    locality: "Albany, NY",
    description:
      "Skip the parking hassle — book a ride to and from the Times Union Center for concerts, games, and events in downtown Albany.",
  },
  {
    slug: "rensselaer-amtrak-station",
    name: "Albany-Rensselaer Amtrak Station",
    category: "Transit",
    locality: "Rensselaer, NY",
    description:
      "Connecting to or from the train? We provide reliable taxi and car service to and from the Albany-Rensselaer Amtrak Station, coordinated around your train schedule.",
  },
];

export function getVenues(): Venue[] {
  return VENUES;
}
export function getVenueBySlug(slug: string): Venue | undefined {
  return VENUES.find((v) => v.slug === slug);
}
