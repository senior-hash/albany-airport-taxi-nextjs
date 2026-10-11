export type Destination = {
  slug: string;
  name: string;
  description: string;
};

// Additional long-distance routes beyond the NYC flagship (which has its
// own dedicated page given its outsized keyword volume — see the plan's
// Competitive Analysis). These mirror what competitor sites already offer;
// hand-authored, original copy since no legacy content exists for these.
export const DESTINATIONS: Destination[] = [
  {
    slug: "boston",
    name: "Boston, MA",
    description:
      "Door-to-door car service between Albany and Boston, including Boston Logan International Airport — for business trips, events, or getting home. We run this route both ways, so Boston to Albany is just as easy to book as Albany to Boston.",
  },
  {
    slug: "philadelphia",
    name: "Philadelphia, PA",
    description:
      "Long-distance car service between Albany and Philadelphia, door to door — a comfortable alternative to driving yourself or coordinating train connections.",
  },
  {
    slug: "washington-dc",
    name: "Washington, DC",
    description:
      "Reliable car service between Albany and Washington, DC for business travel, events, or visiting family — door-to-door, no transfers.",
  },
  {
    slug: "niagara-falls",
    name: "Niagara Falls, NY",
    description:
      "Comfortable long-distance service from Albany to Niagara Falls, door to door — ideal for a day trip, weekend getaway, or one-way travel.",
  },
  {
    slug: "syracuse",
    name: "Syracuse, NY",
    description:
      "Door-to-door car service between Albany and Syracuse. A dependable option when you'd rather not drive yourself — and a real backup when an Amtrak Empire Service train along this corridor is delayed or cancelled and you need another way to get there.",
  },
  {
    slug: "utica",
    name: "Utica, NY",
    description:
      "Car service between Albany and Utica, door to door — including as a backup option when Amtrak service along the Empire Corridor is disrupted and you need a reliable way to finish your trip.",
  },
  {
    slug: "buffalo",
    name: "Buffalo, NY",
    description:
      "Long-distance car service from Albany to Buffalo, door to door — for business travel, events, or getting home, including when train service along the way isn't running.",
  },
  {
    slug: "burlington-vt",
    name: "Burlington, VT",
    description:
      "Car service between Albany and Burlington, Vermont, door to door — for business trips, University of Vermont visits, or getting home.",
  },
];

export function getDestinations(): Destination[] {
  return DESTINATIONS;
}
export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
