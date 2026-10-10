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
  // Farms & wineries — one of the clearest "people actually need a ride"
  // use cases that exists (no one wants to drive after a tasting). Real,
  // verified venues only, picked from Columbia (Hudson Valley) and
  // Saratoga County, not a fabricated or exhaustive list.
  {
    slug: "hudson-chatham-winery",
    name: "Hudson-Chatham Winery",
    category: "Winery",
    locality: "Ghent, NY",
    description:
      "Skip the drive after a tasting — door-to-door car service to and from Hudson-Chatham Winery in Ghent, a longtime Best Local Winery pick in the Capital Region. Great for group wine-tasting trips.",
  },
  {
    slug: "clermont-vineyards-winery",
    name: "Clermont Vineyards & Winery",
    category: "Winery",
    locality: "Germantown, NY",
    description:
      "Reliable car service to and from Clermont Vineyards & Winery in Germantown, set on a former dairy farm with Catskill views. Book a ride so the whole group can enjoy the tasting.",
  },
  {
    slug: "home-range-winery",
    name: "Home Range Winery",
    category: "Winery",
    locality: "Canaan, NY",
    description:
      "Door-to-door taxi and car service to Home Range Winery in Canaan, a small-batch, dog-friendly winery known for weekend events. We'll get your group there and home safely.",
  },
  {
    slug: "saratoga-winery",
    name: "Saratoga Winery",
    category: "Winery",
    locality: "Saratoga Springs, NY",
    description:
      "Car service to and from Saratoga Winery, just outside downtown Saratoga Springs and a popular stop for wood-fired pizza, brunch, and tastings. No need for a designated driver.",
  },
  {
    slug: "fossil-stone-farms",
    name: "Fossil Stone Farms",
    category: "Farm & Winery",
    locality: "Greenfield Center, NY",
    description:
      "Taxi and car service to Fossil Stone Farms, an estate winery in the Adirondack foothills crafting wine from its own grapes. Ideal for tasting-room groups and day trips.",
  },
  {
    slug: "dancing-grain-farm-brewery",
    name: "Dancing Grain Farm Brewery",
    category: "Farm Brewery",
    locality: "Moreau, NY",
    description:
      "Reliable car service to Dancing Grain Farm Brewery, a 300-acre working farm brewery growing most of its own ingredients. Book a ride for your group and skip the drive home.",
  },
  {
    slug: "ledge-rock-hill-winery",
    name: "Ledge Rock Hill Winery",
    category: "Winery",
    locality: "Corinth, NY",
    description:
      "Door-to-door car service to Ledge Rock Hill Winery in Corinth, in the Adirondack foothills between Saratoga Springs and Lake George.",
  },
  // Colleges & universities — students flying home for breaks, parents'
  // weekend visits, and move-in/move-out are a steady, recurring source of
  // airport trips across the whole service area. Real, verified campuses
  // only, one representative pick per county where a major one exists.
  {
    slug: "university-at-albany",
    name: "University at Albany (SUNY)",
    category: "College",
    locality: "Albany, NY",
    description:
      "Airport car service for UAlbany students and families — breaks, move-in/move-out weekends, and parent visits. Door-to-door between campus and ALB, JFK, LaGuardia, or Newark.",
  },
  {
    slug: "siena-college",
    name: "Siena College",
    category: "College",
    locality: "Loudonville, NY",
    description:
      "Reliable airport transportation for Siena College students and visiting families, with service to Albany International and the NYC-area airports.",
  },
  {
    slug: "rpi",
    name: "Rensselaer Polytechnic Institute (RPI)",
    category: "College",
    locality: "Troy, NY",
    description:
      "Door-to-door car service between RPI and the airport for students, faculty, and visiting families — a regular need at the start and end of every semester.",
  },
  {
    slug: "union-college",
    name: "Union College",
    category: "College",
    locality: "Schenectady, NY",
    description:
      "Airport taxi and car service for Union College students and parents, covering ALB and NYC-area airport runs around breaks and family weekends.",
  },
  {
    slug: "skidmore-college",
    name: "Skidmore College",
    category: "College",
    locality: "Saratoga Springs, NY",
    description:
      "Reliable car service between Skidmore College and the airport for students heading home and families visiting Saratoga Springs.",
  },
  {
    slug: "vassar-college",
    name: "Vassar College",
    category: "College",
    locality: "Poughkeepsie, NY",
    description:
      "Door-to-door airport transportation for Vassar College students and families in the Hudson Valley, serving Albany, JFK, LaGuardia, and Newark.",
  },
  {
    slug: "marist-university",
    name: "Marist University",
    category: "College",
    locality: "Poughkeepsie, NY",
    description:
      "Car service between Marist University and the airport — a regular trip for students and parents throughout the Hudson Valley.",
  },
  {
    slug: "suny-new-paltz",
    name: "SUNY New Paltz",
    category: "College",
    locality: "New Paltz, NY",
    description:
      "Airport car service for SUNY New Paltz students and visiting families, covering both Albany and the NYC-area airports.",
  },
  {
    slug: "suny-oneonta",
    name: "SUNY Oneonta",
    category: "College",
    locality: "Oneonta, NY",
    description:
      "Reliable car service between SUNY Oneonta and the airport for students and families in Otsego County.",
  },
  {
    slug: "hartwick-college",
    name: "Hartwick College",
    category: "College",
    locality: "Oneonta, NY",
    description:
      "Door-to-door airport transportation for Hartwick College students and visiting parents in Oneonta.",
  },
  {
    slug: "suny-cobleskill",
    name: "SUNY Cobleskill",
    category: "College",
    locality: "Cobleskill, NY",
    description:
      "Car service between SUNY Cobleskill and the airport for students and families in Schoharie County.",
  },
  {
    slug: "suny-delhi",
    name: "SUNY Delhi",
    category: "College",
    locality: "Delhi, NY",
    description:
      "Airport car service for SUNY Delhi students and visiting families throughout Delaware County.",
  },
  {
    slug: "paul-smiths-college",
    name: "Paul Smith's College",
    category: "College",
    locality: "Paul Smiths, NY",
    description:
      "Reliable car service between Paul Smith's College and the airport for students and families in the Adirondacks of Franklin County.",
  },
  {
    slug: "suny-plattsburgh",
    name: "SUNY Plattsburgh",
    category: "College",
    locality: "Plattsburgh, NY",
    description:
      "Door-to-door airport transportation for SUNY Plattsburgh students and families in Clinton County.",
  },
  {
    slug: "suny-adirondack",
    name: "SUNY Adirondack",
    category: "College",
    locality: "Queensbury, NY",
    description:
      "Car service between SUNY Adirondack and the airport for students and visiting families in Warren County.",
  },
  {
    slug: "fulton-montgomery-community-college",
    name: "Fulton-Montgomery Community College",
    category: "College",
    locality: "Johnstown, NY",
    description:
      "Reliable airport car service for FM Community College students and families across Fulton and Montgomery counties.",
  },
  {
    slug: "herkimer-college",
    name: "Herkimer College",
    category: "College",
    locality: "Herkimer, NY",
    description:
      "Door-to-door car service between Herkimer College and the airport for students and visiting families.",
  },
  {
    slug: "columbia-greene-community-college",
    name: "Columbia-Greene Community College",
    category: "College",
    locality: "Hudson, NY",
    description:
      "Airport car service for Columbia-Greene Community College students and families, serving the Hudson Valley.",
  },
  {
    slug: "bennington-college",
    name: "Bennington College",
    category: "College",
    locality: "Bennington, VT",
    description:
      "Car service between Bennington College and the airport for students and visiting families in southern Vermont.",
  },
  {
    slug: "castleton-university",
    name: "Castleton University",
    category: "College",
    locality: "Castleton, VT",
    description:
      "Reliable airport transportation for Castleton University students and families in Rutland County, Vermont.",
  },
  {
    slug: "williams-college",
    name: "Williams College",
    category: "College",
    locality: "Williamstown, MA",
    description:
      "Door-to-door car service between Williams College and the airport for students and visiting families in the Berkshires.",
  },
  {
    slug: "mcla",
    name: "Massachusetts College of Liberal Arts (MCLA)",
    category: "College",
    locality: "North Adams, MA",
    description:
      "Airport car service for MCLA students and families throughout Berkshire County, Massachusetts.",
  },
];

export function getVenues(): Venue[] {
  return VENUES;
}
export function getVenueBySlug(slug: string): Venue | undefined {
  return VENUES.find((v) => v.slug === slug);
}
