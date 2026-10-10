export type Venue = {
  slug: string;
  name: string;
  category: string;
  locality: string;
  /** Exact county name as it appears in content/counties.json, used to look
   * up that county's real call-tracking phone number. */
  county: string;
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
    county: "Albany County",
    description:
      "Reliable taxi and car service to and from Albany Medical Center — for patients, visitors, and staff. Available around the clock for appointments, admissions, and discharges.",
  },
  {
    slug: "crossgates-mall",
    name: "Crossgates Mall",
    category: "Shopping",
    locality: "Guilderland, NY",
    county: "Albany County",
    description:
      "Door-to-door service to and from Crossgates Mall in Guilderland, whether you're headed out for a shopping trip or need a ride home afterward.",
  },
  {
    slug: "empire-state-plaza",
    name: "Empire State Plaza",
    category: "Government / Events",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Taxi and car service to and from the Empire State Plaza for state government business, events, or visits to The Egg and the New York State Museum.",
  },
  {
    slug: "times-union-center",
    name: "Times Union Center",
    category: "Arena / Events",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Skip the parking hassle — book a ride to and from the Times Union Center for concerts, games, and events in downtown Albany.",
  },
  {
    slug: "rensselaer-amtrak-station",
    name: "Albany-Rensselaer Amtrak Station",
    category: "Transit",
    locality: "Rensselaer, NY",
    county: "Rensselaer County",
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
    county: "Columbia County",
    description:
      "Skip the drive after a tasting — door-to-door car service to and from Hudson-Chatham Winery in Ghent, a longtime Best Local Winery pick in the Capital Region. Great for group wine-tasting trips.",
  },
  {
    slug: "clermont-vineyards-winery",
    name: "Clermont Vineyards & Winery",
    category: "Winery",
    locality: "Germantown, NY",
    county: "Columbia County",
    description:
      "Reliable car service to and from Clermont Vineyards & Winery in Germantown, set on a former dairy farm with Catskill views. Book a ride so the whole group can enjoy the tasting.",
  },
  {
    slug: "home-range-winery",
    name: "Home Range Winery",
    category: "Winery",
    locality: "Canaan, NY",
    county: "Columbia County",
    description:
      "Door-to-door taxi and car service to Home Range Winery in Canaan, a small-batch, dog-friendly winery known for weekend events. We'll get your group there and home safely.",
  },
  {
    slug: "saratoga-winery",
    name: "Saratoga Winery",
    category: "Winery",
    locality: "Saratoga Springs, NY",
    county: "Saratoga County",
    description:
      "Car service to and from Saratoga Winery, just outside downtown Saratoga Springs and a popular stop for wood-fired pizza, brunch, and tastings. No need for a designated driver.",
  },
  {
    slug: "fossil-stone-farms",
    name: "Fossil Stone Farms",
    category: "Farm & Winery",
    locality: "Greenfield Center, NY",
    county: "Saratoga County",
    description:
      "Taxi and car service to Fossil Stone Farms, an estate winery in the Adirondack foothills crafting wine from its own grapes. Ideal for tasting-room groups and day trips.",
  },
  {
    slug: "dancing-grain-farm-brewery",
    name: "Dancing Grain Farm Brewery",
    category: "Farm Brewery",
    locality: "Moreau, NY",
    county: "Saratoga County",
    description:
      "Reliable car service to Dancing Grain Farm Brewery, a 300-acre working farm brewery growing most of its own ingredients. Book a ride for your group and skip the drive home.",
  },
  {
    slug: "ledge-rock-hill-winery",
    name: "Ledge Rock Hill Winery",
    category: "Winery",
    locality: "Corinth, NY",
    county: "Saratoga County",
    description:
      "Door-to-door car service to Ledge Rock Hill Winery in Corinth, in the Adirondack foothills between Saratoga Springs and Lake George.",
  },
  // More real farms, orchards, and wineries — Warren, Dutchess, Ulster,
  // Rensselaer, and Washington counties. Picked from well-documented,
  // currently-operating listings, not an exhaustive directory.
  {
    slug: "up-yonda-farm",
    name: "Up Yonda Farm",
    category: "Farm",
    locality: "Bolton Landing, NY",
    county: "Warren County",
    description:
      "Car service to Up Yonda Farm, a 73-acre nature preserve and environmental education center overlooking Lake George in Warren County.",
  },
  {
    slug: "nettle-meadow-farm",
    name: "Nettle Meadow Farm",
    category: "Farm",
    locality: "Warrensburg, NY",
    county: "Warren County",
    description:
      "Door-to-door car service to Nettle Meadow, a goat sanctuary farm and cheese company in Warren County — a popular day-trip stop near Lake George.",
  },
  {
    slug: "millbrook-vineyards-winery",
    name: "Millbrook Vineyards & Winery",
    category: "Winery",
    locality: "Millbrook, NY",
    county: "Dutchess County",
    description:
      "Skip the drive after a tasting — car service to Millbrook Vineyards & Winery, the flagship stop on the Dutchess County Wine Trail, with daily tastings and vineyard walking trails.",
  },
  {
    slug: "fishkill-farms",
    name: "Fishkill Farms",
    category: "Farm & Cidery",
    locality: "Hopewell Junction, NY",
    county: "Dutchess County",
    description:
      "Car service to Fishkill Farms in Dutchess County, home to Treasury Cider and expansive orchards — great for apple-picking trips and tasting-room groups alike.",
  },
  {
    slug: "benmarl-winery",
    name: "Benmarl Winery",
    category: "Winery",
    locality: "Marlboro, NY",
    county: "Ulster County",
    description:
      "Reliable car service to Benmarl Winery in Marlboro, a 37-acre Hudson Valley estate on the site of America's oldest vineyard. Ideal for tasting groups who'd rather not drive.",
  },
  {
    slug: "dubois-farms",
    name: "DuBois Farms",
    category: "Orchard",
    locality: "Highland, NY",
    county: "Ulster County",
    description:
      "Door-to-door car service to DuBois Farms in Ulster County, a pick-your-own orchard and farm market — a popular fall apple-picking destination.",
  },
  {
    slug: "windy-hill-orchard",
    name: "Windy Hill Orchard & Cider Mill",
    category: "Farm & Cidery",
    locality: "Castleton, NY",
    county: "Rensselaer County",
    description:
      "Car service to Windy Hill Orchard in Rensselaer County, a working cidery with a hard cider tasting room — a good fit for group outings that don't want a designated driver.",
  },
  {
    slug: "s-and-s-farm-brewery",
    name: "S & S Farm Brewery",
    category: "Farm Brewery",
    locality: "Nassau, NY",
    county: "Rensselaer County",
    description:
      "Reliable car service to S & S Farm Brewery in Rensselaer County, a small rural farm brewery — book a ride for your group and skip the drive home.",
  },
  {
    slug: "bordens-apple-orchard",
    name: "Borden's Apple Orchard",
    category: "Orchard",
    locality: "Schaghticoke, NY",
    county: "Washington County",
    description:
      "Car service to Borden's Apple Orchard in Washington County, a multi-generation family orchard carrying more than 25 apple varieties year-round.",
  },
  {
    slug: "victory-view-vineyard",
    name: "Victory View Vineyard",
    category: "Winery",
    locality: "Schaghticoke, NY",
    county: "Washington County",
    description:
      "Door-to-door car service to Victory View Vineyard in Washington County, a family-owned farm winery growing its own grapes with a small tasting room.",
  },
  // Albany, Greene, Schenectady, Otsego counties, and Berkshire County, MA —
  // same real, verified, non-exhaustive approach as above.
  {
    slug: "indian-ladder-farms",
    name: "Indian Ladder Farms",
    category: "Farm & Cidery",
    locality: "Altamont, NY",
    county: "Albany County",
    description:
      "Car service to Indian Ladder Farms in Albany County, a year-round cidery and brewery with apple and pumpkin picking, a bakery, and a farm market.",
  },
  {
    slug: "nine-pin-cider",
    name: "Nine Pin Cider",
    category: "Cidery",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to Nine Pin Cider in Albany's Warehouse District, New York's first farm cidery — a great pick for group tastings that don't need a designated driver.",
  },
  {
    slug: "west-kill-brewery",
    name: "West Kill Brewery",
    category: "Farm Brewery",
    locality: "West Kill, NY",
    county: "Greene County",
    description:
      "Car service to West Kill Brewery, a farm brewery on a former dairy farm in the Catskills of Greene County.",
  },
  {
    slug: "brewery-lahoff",
    name: "Brewery LaHoff",
    category: "Brewery",
    locality: "Catskill, NY",
    county: "Greene County",
    description:
      "Reliable car service to Brewery LaHoff in Greene County, housed in a historic former fruit-packing barn along the Catskills Beverage Trail.",
  },
  {
    slug: "great-flats-brewing",
    name: "Great Flats Brewing Company",
    category: "Brewery",
    locality: "Schenectady, NY",
    county: "Schenectady County",
    description:
      "Door-to-door car service to Great Flats Brewing Company, a farm-to-table craft brewery in downtown Schenectady.",
  },
  {
    slug: "brewery-ommegang",
    name: "Brewery Ommegang",
    category: "Farm Brewery",
    locality: "Cooperstown, NY",
    county: "Otsego County",
    description:
      "Car service to Brewery Ommegang in Otsego County, a well-known brewery on a 136-acre farmstead with daily tours — a popular group destination near Cooperstown.",
  },
  {
    slug: "fly-creek-cider-mill",
    name: "Fly Creek Cider Mill & Orchard",
    category: "Cidery & Orchard",
    locality: "Fly Creek, NY",
    county: "Otsego County",
    description:
      "Reliable car service to Fly Creek Cider Mill & Orchard near Cooperstown, known for its hard cider and family-friendly orchard visits.",
  },
  {
    slug: "hilltop-orchards-furnace-brook-winery",
    name: "Hilltop Orchards & Furnace Brook Winery",
    category: "Orchard & Winery",
    locality: "Richmond, MA",
    county: "Berkshire County",
    description:
      "Car service to Hilltop Orchards & Furnace Brook Winery in the Berkshires, a 200-acre pick-your-own apple orchard and winery with wine tastings and hiking trails.",
  },
  {
    slug: "les-trois-emme-vineyard",
    name: "Les Trois Emme Vineyard & Winery",
    category: "Winery",
    locality: "New Marlborough, MA",
    county: "Berkshire County",
    description:
      "Door-to-door car service to Les Trois Emme Vineyard & Winery in Berkshire County, with indoor and outdoor tastings overlooking the vineyard.",
  },
  // Delaware, Schoharie, Montgomery, Herkimer, Fulton, Essex, Hamilton,
  // Bennington (VT), and Rutland (VT) counties — rounding out coverage with
  // real, verified venues. Clinton and Franklin counties didn't turn up a
  // confident, well-documented pick (they're still covered via their real
  // colleges above), so nothing was added there rather than guessing.
  {
    slug: "union-grove-distillery",
    name: "Union Grove Distillery",
    category: "Distillery",
    locality: "Arkville, NY",
    county: "Delaware County",
    description:
      "Car service to Union Grove Distillery in Delaware County, part of the local craft beverage trail in the western Catskills.",
  },
  {
    slug: "terrace-mountain-orchard",
    name: "Terrace Mountain Orchard",
    category: "Orchard",
    locality: "Schoharie, NY",
    county: "Schoharie County",
    description:
      "Door-to-door car service to Terrace Mountain Orchard in Schoharie County, a popular apple-picking and fall-foliage stop overlooking the Schoharie valley.",
  },
  {
    slug: "schoharie-valley-farms",
    name: "Schoharie Valley Farms",
    category: "Farm",
    locality: "Schoharie, NY",
    county: "Schoharie County",
    description:
      "Reliable car service to Schoharie Valley Farms, a working farm with a farm market and greenhouses in Schoharie County.",
  },
  {
    slug: "bellingers-apple-orchard",
    name: "Bellinger's Apple Orchard",
    category: "Orchard",
    locality: "Fultonville, NY",
    county: "Montgomery County",
    description:
      "Car service to Bellinger's Apple Orchard in Montgomery County, a pick-your-own stop for apples and pumpkins.",
  },
  {
    slug: "clear-view-farm",
    name: "Clear View Farm",
    category: "Farm",
    locality: "Fonda, NY",
    county: "Montgomery County",
    description:
      "Door-to-door car service to Clear View Farm in Montgomery County, known for its alpacas and a popular family day-trip stop.",
  },
  {
    slug: "parkers-cider-mill",
    name: "Parker's Cider Mill",
    category: "Cidery",
    locality: "Ilion, NY",
    county: "Herkimer County",
    description:
      "Car service to Parker's Cider Mill in Herkimer County, a local cider mill along the Mohawk Valley.",
  },
  {
    slug: "rogers-family-orchards",
    name: "Rogers Family Orchards",
    category: "Orchard",
    locality: "Johnstown, NY",
    county: "Fulton County",
    description:
      "Reliable car service to Rogers Family Orchards in Fulton County, a pick-your-own orchard offering apples, pumpkins, cider, and wagon rides.",
  },
  {
    slug: "john-brown-farm",
    name: "John Brown Farm State Historic Site",
    category: "Historic Farm",
    locality: "North Elba, NY",
    county: "Essex County",
    description:
      "Car service to the John Brown Farm State Historic Site near Lake Placid in Essex County, a National Historic Landmark.",
  },
  {
    slug: "ausable-chasm",
    name: "Ausable Chasm",
    category: "Natural Attraction",
    locality: "Ausable Chasm, NY",
    county: "Essex County",
    description:
      "Door-to-door car service to Ausable Chasm in Essex County, one of the oldest natural tourist attractions in the United States.",
  },
  {
    slug: "adirondack-experience-museum",
    name: "Adirondack Experience, The Museum on Blue Mountain Lake",
    category: "Museum",
    locality: "Blue Mountain Lake, NY",
    county: "Hamilton County",
    description:
      "Reliable car service to the Adirondack Experience museum in Hamilton County, covering the history and culture of the Adirondacks.",
  },
  {
    slug: "apple-barn-country-bake-shop",
    name: "The Apple Barn & Country Bake Shop",
    category: "Orchard",
    locality: "Bennington, VT",
    county: "Bennington County",
    description:
      "Car service to The Apple Barn & Country Bake Shop in Bennington County, Vermont, a farm stand known for its apples and baked goods.",
  },
  {
    slug: "neshobe-river-winery",
    name: "Neshobe River Winery",
    category: "Winery",
    locality: "Brandon, VT",
    county: "Rutland County",
    description:
      "Door-to-door car service to Neshobe River Winery in Rutland County, Vermont, known for its wood-fired pizza and wine tastings.",
  },
  // Hotels, motels & resorts — real, named, verified properties covering
  // most of the service area. Picked for being well-documented and
  // currently operating, not an exhaustive directory. Delaware and
  // Herkimer counties didn't turn up a confident pick, so nothing was
  // added there.
  {
    slug: "hilton-garden-inn-albany-airport",
    name: "Hilton Garden Inn Albany Airport",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to and from the Hilton Garden Inn Albany Airport, a short ride from ALB — handy for early flights or when the hotel shuttle isn't running.",
  },
  {
    slug: "tru-by-hilton-albany-airport",
    name: "Tru by Hilton Albany Airport",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to and from Tru by Hilton Albany Airport, about a 2-minute drive from ALB.",
  },
  {
    slug: "hilton-garden-inn-albany-medical-center",
    name: "Hilton Garden Inn Albany Medical Center",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Reliable car service to the Hilton Garden Inn near Albany Medical Center, convenient for patients' families and hospital visitors.",
  },
  {
    slug: "the-desmond-hotel-albany",
    name: "Crowne Plaza Albany - The Desmond Hotel",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to The Desmond Hotel in Albany, a distinctive full-service hotel near the airport.",
  },
  {
    slug: "hotel-trilogy-albany-airport",
    name: "Hotel Trilogy Albany Airport",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to and from Hotel Trilogy Albany Airport, a modern hotel just outside Albany International.",
  },
  {
    slug: "courtyard-albany-airport",
    name: "Courtyard by Marriott Albany Airport",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Reliable car service to the Courtyard by Marriott near Albany International Airport.",
  },
  {
    slug: "homewood-suites-albany",
    name: "Homewood Suites by Hilton Albany",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to Homewood Suites by Hilton Albany, a good fit for extended-stay guests near the airport.",
  },
  {
    slug: "towneplace-suites-latham-albany-airport",
    name: "TownePlace Suites by Marriott Latham Albany Airport",
    category: "Hotel",
    locality: "Latham, NY",
    county: "Albany County",
    description:
      "Car service to and from TownePlace Suites in Latham, near Albany International Airport.",
  },
  {
    slug: "red-lion-hotel-albany",
    name: "Red Lion Hotel Albany",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Reliable car service to the Red Lion Hotel in Albany, convenient to major highways and the airport.",
  },
  {
    slug: "staybridge-suites-albany-wolf-rd",
    name: "Staybridge Suites Albany Wolf Rd-Colonie Center",
    category: "Hotel",
    locality: "Colonie, NY",
    county: "Albany County",
    description:
      "Car service to Staybridge Suites on Wolf Road in Colonie, about 1.5 miles from Albany International Airport.",
  },
  {
    slug: "home2-suites-albany-wolf-rd",
    name: "Home2 Suites by Hilton Albany Wolf Rd",
    category: "Hotel",
    locality: "Colonie, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to Home2 Suites by Hilton on Wolf Road, close to Albany International Airport.",
  },
  {
    slug: "hampton-inn-albany-wolf-road",
    name: "Hampton Inn Albany-Wolf Road (Airport)",
    category: "Hotel",
    locality: "Colonie, NY",
    county: "Albany County",
    description:
      "Reliable car service to the Hampton Inn on Wolf Road in Colonie, near Albany International Airport.",
  },
  {
    slug: "holiday-inn-express-albany-airport-wolf-road",
    name: "Holiday Inn Express & Suites Albany Airport - Wolf Road",
    category: "Hotel",
    locality: "Colonie, NY",
    county: "Albany County",
    description:
      "Car service to and from the Holiday Inn Express on Wolf Road, near Albany International Airport.",
  },
  {
    slug: "springhill-suites-albany-colonie",
    name: "SpringHill Suites by Marriott Albany-Colonie",
    category: "Hotel",
    locality: "Colonie, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to SpringHill Suites by Marriott in Colonie, near Albany International Airport.",
  },
  {
    slug: "renaissance-albany-hotel",
    name: "Renaissance Albany Hotel",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to and from the Renaissance Albany Hotel in downtown Albany, convenient to the Empire State Plaza and Times Union Center.",
  },
  {
    slug: "hilton-albany",
    name: "Hilton Albany",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Reliable car service to Hilton Albany in downtown Albany, a short ride from the Empire State Plaza and state government offices.",
  },
  {
    slug: "hyatt-place-albany-downtown",
    name: "Hyatt Place Albany/Downtown",
    category: "Hotel",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to and from Hyatt Place in downtown Albany.",
  },
  {
    slug: "the-morgan-state-house-inn",
    name: "The Morgan State House Inn",
    category: "Inn",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Door-to-door car service to The Morgan State House Inn, a boutique inn in downtown Albany.",
  },
  {
    slug: "the-hotel-saratoga",
    name: "The Hotel Saratoga",
    category: "Hotel",
    locality: "Saratoga Springs, NY",
    county: "Saratoga County",
    description:
      "Door-to-door car service to The Hotel Saratoga in downtown Saratoga Springs, convenient to the track, Broadway, and Saratoga Winery.",
  },
  {
    slug: "fort-william-henry-hotel",
    name: "Fort William Henry Hotel and Conference Center",
    category: "Hotel",
    locality: "Lake George, NY",
    county: "Warren County",
    description:
      "Reliable car service to the Fort William Henry Hotel in Lake George, steps from the lake and the historic fort.",
  },
  {
    slug: "hampton-inn-suites-poughkeepsie",
    name: "Hampton Inn & Suites Poughkeepsie",
    category: "Hotel",
    locality: "Poughkeepsie, NY",
    county: "Dutchess County",
    description:
      "Car service to and from the Hampton Inn & Suites Poughkeepsie, convenient to Vassar and Marist University in Dutchess County.",
  },
  {
    slug: "mohonk-mountain-house",
    name: "Mohonk Mountain House",
    category: "Resort",
    locality: "New Paltz, NY",
    county: "Ulster County",
    description:
      "Door-to-door car service to Mohonk Mountain House, the historic National Historic Landmark resort in the Shawangunk Mountains of Ulster County.",
  },
  {
    slug: "the-wick-hudson",
    name: "The Wick, Hudson",
    category: "Hotel",
    locality: "Hudson, NY",
    county: "Columbia County",
    description:
      "Car service to and from The Wick in downtown Hudson, a short ride from Hudson-Chatham Winery and the rest of Columbia County's wine trail.",
  },
  {
    slug: "eastwind-hotel",
    name: "Eastwind Hotel & Bar",
    category: "Hotel",
    locality: "Windham, NY",
    county: "Greene County",
    description:
      "Reliable car service to the Eastwind Hotel in Windham, close to the Hunter Mountain ski area in Greene County.",
  },
  {
    slug: "hilton-garden-inn-troy",
    name: "Hilton Garden Inn Troy",
    category: "Hotel",
    locality: "Troy, NY",
    county: "Rensselaer County",
    description:
      "Car service to and from the Hilton Garden Inn Troy, about a third of a mile from RPI in Rensselaer County.",
  },
  {
    slug: "doubletree-schenectady-downtown",
    name: "DoubleTree by Hilton Schenectady Downtown",
    category: "Hotel",
    locality: "Schenectady, NY",
    county: "Schenectady County",
    description:
      "Door-to-door car service to the DoubleTree by Hilton in downtown Schenectady, near Union College and the Stockade district.",
  },
  {
    slug: "the-otesaga-resort-hotel",
    name: "The Otesaga Resort Hotel",
    category: "Resort",
    locality: "Cooperstown, NY",
    county: "Otsego County",
    description:
      "Car service to and from The Otesaga, the landmark resort hotel on Otsego Lake in Cooperstown — a frequent stop for Hall of Fame weekends and golf trips.",
  },
  {
    slug: "sara-glen-motel",
    name: "Sara Glen Motel",
    category: "Motel",
    locality: "Fort Edward, NY",
    county: "Washington County",
    description:
      "Reliable car service to the Sara Glen Motel in Fort Edward, Washington County, centrally located between Saratoga, Lake George, and Glens Falls.",
  },
  {
    slug: "point-au-roche-lodge",
    name: "Point au Roche Lodge",
    category: "Lodge",
    locality: "Plattsburgh, NY",
    county: "Clinton County",
    description:
      "Car service to and from Point au Roche Lodge on Lake Champlain in Clinton County, near SUNY Plattsburgh.",
  },
  {
    slug: "the-whiteface-lodge",
    name: "The Whiteface Lodge",
    category: "Lodge",
    locality: "Lake Placid, NY",
    county: "Essex County",
    description:
      "Door-to-door car service to The Whiteface Lodge in Lake Placid, Essex County, a full-service resort near Whiteface Mountain.",
  },
  {
    slug: "holiday-inn-johnstown-gloversville",
    name: "Holiday Inn Johnstown-Gloversville",
    category: "Hotel",
    locality: "Johnstown, NY",
    county: "Fulton County",
    description:
      "Car service to and from the Holiday Inn Johnstown-Gloversville, Fulton County's only full-service hotel.",
  },
  {
    slug: "amsterdam-castle",
    name: "Amsterdam Castle",
    category: "Hotel",
    locality: "Amsterdam, NY",
    county: "Montgomery County",
    description:
      "Reliable car service to Amsterdam Castle in Montgomery County, a distinctive, highly-rated local hotel.",
  },
  {
    slug: "american-hotel-sharon-springs",
    name: "American Hotel",
    category: "Hotel",
    locality: "Sharon Springs, NY",
    county: "Schoharie County",
    description:
      "Car service to the American Hotel in Sharon Springs, a historic Schoharie County spa village, near Howe Caverns.",
  },
  {
    slug: "hampton-inn-bennington",
    name: "Hampton Inn Bennington",
    category: "Hotel",
    locality: "Bennington, VT",
    county: "Bennington County",
    description:
      "Door-to-door car service to the Hampton Inn in Bennington, Vermont, close to Bennington College and downtown.",
  },
  {
    slug: "hampton-inn-rutland",
    name: "Hampton Inn Rutland",
    category: "Hotel",
    locality: "Rutland, VT",
    county: "Rutland County",
    description:
      "Car service to and from the Hampton Inn Rutland in Vermont, convenient to Castleton University and the Vermont Marble Museum.",
  },
  {
    slug: "hampton-inn-suites-berkshires-lenox",
    name: "Hampton Inn & Suites Berkshires-Lenox",
    category: "Hotel",
    locality: "Lenox, MA",
    county: "Berkshire County",
    description:
      "Reliable car service to the Hampton Inn & Suites in Lenox, Massachusetts, minutes from Tanglewood in Berkshire County.",
  },
  // Delaware, Herkimer, Clinton, and Franklin counties — the four that
  // didn't turn up a confident pick in earlier passes. Found on a second,
  // more targeted search.
  {
    slug: "meadowood-inn",
    name: "Meadowood Inn",
    category: "Inn",
    locality: "Arkville, NY",
    county: "Delaware County",
    description:
      "Car service to and from the Meadowood Inn in Arkville, a highly-rated Delaware County bed and breakfast in the western Catskills.",
  },
  {
    slug: "red-roof-inn-suites-herkimer",
    name: "Red Roof Inn & Suites Herkimer",
    category: "Hotel",
    locality: "Herkimer, NY",
    county: "Herkimer County",
    description:
      "Reliable car service to the Red Roof Inn & Suites in Herkimer, along the Mohawk Valley.",
  },
  {
    slug: "elfs-farm-winery-ciderhouse",
    name: "Elfs Farm Winery & Ciderhouse",
    category: "Farm & Winery",
    locality: "Plattsburgh, NY",
    county: "Clinton County",
    description:
      "Car service to Elfs Farm Winery & Ciderhouse in Plattsburgh, home to Adirondack Cider Company, with cold-climate wines and self-guided vineyard tours on Lake Champlain's Adirondack Coast Wine Trail.",
  },
  {
    slug: "mark-twain-mapleworks",
    name: "Mark Twain Mapleworks",
    category: "Farm",
    locality: "Saranac Lake, NY",
    county: "Franklin County",
    description:
      "Door-to-door car service to Mark Twain Mapleworks in Saranac Lake, a certified New York Grown maple producer in Franklin County.",
  },
  // Museums — real, well-known institutions across the service area.
  {
    slug: "national-baseball-hall-of-fame",
    name: "National Baseball Hall of Fame and Museum",
    category: "Museum",
    locality: "Cooperstown, NY",
    county: "Otsego County",
    description:
      "Car service to the National Baseball Hall of Fame and Museum in Cooperstown — a major draw for induction weekend and family trips alike.",
  },
  {
    slug: "fenimore-art-museum",
    name: "Fenimore Art Museum",
    category: "Museum",
    locality: "Cooperstown, NY",
    county: "Otsego County",
    description:
      "Door-to-door car service to the Fenimore Art Museum in Cooperstown, just across from The Farmers' Museum in Otsego County.",
  },
  {
    slug: "new-york-state-museum",
    name: "New York State Museum",
    category: "Museum",
    locality: "Albany, NY",
    county: "Albany County",
    description:
      "Car service to the New York State Museum at the Empire State Plaza in Albany, one of the largest natural history museums in the country.",
  },
  {
    slug: "mass-moca",
    name: "MASS MoCA",
    category: "Museum",
    locality: "North Adams, MA",
    county: "Berkshire County",
    description:
      "Reliable car service to MASS MoCA in North Adams, one of the largest contemporary art museums in the United States, in Berkshire County.",
  },
  {
    slug: "norman-rockwell-museum",
    name: "Norman Rockwell Museum",
    category: "Museum",
    locality: "Stockbridge, MA",
    county: "Berkshire County",
    description:
      "Car service to the Norman Rockwell Museum in Stockbridge, Berkshire County, home to the world's largest collection of Rockwell's work.",
  },
  {
    slug: "bennington-museum",
    name: "Bennington Museum",
    category: "Museum",
    locality: "Bennington, VT",
    county: "Bennington County",
    description:
      "Door-to-door car service to the Bennington Museum in Vermont, covering state history with a notable Grandma Moses collection.",
  },
  {
    slug: "vermont-marble-museum",
    name: "Vermont Marble Museum",
    category: "Museum",
    locality: "Proctor, VT",
    county: "Rutland County",
    description:
      "Car service to the Vermont Marble Museum in Proctor, near Rutland, covering the state's marble industry.",
  },
  {
    slug: "new-england-maple-museum",
    name: "New England Maple Museum",
    category: "Museum",
    locality: "Pittsford, VT",
    county: "Rutland County",
    description:
      "Reliable car service to the New England Maple Museum near Rutland, Vermont, with tours and samples of real maple sugaring.",
  },
  {
    slug: "adirondack-history-center-museum",
    name: "Adirondack History Center Museum",
    category: "Museum",
    locality: "Elizabethtown, NY",
    county: "Essex County",
    description:
      "Car service to the Adirondack History Center Museum in Elizabethtown, Essex County.",
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
    county: "Albany County",
    description:
      "Airport car service for UAlbany students and families — breaks, move-in/move-out weekends, and parent visits. Door-to-door between campus and ALB, JFK, LaGuardia, or Newark.",
  },
  {
    slug: "siena-college",
    name: "Siena College",
    category: "College",
    locality: "Loudonville, NY",
    county: "Albany County",
    description:
      "Reliable airport transportation for Siena College students and visiting families, with service to Albany International and the NYC-area airports.",
  },
  {
    slug: "rpi",
    name: "Rensselaer Polytechnic Institute (RPI)",
    category: "College",
    locality: "Troy, NY",
    county: "Rensselaer County",
    description:
      "Door-to-door car service between RPI and the airport for students, faculty, and visiting families — a regular need at the start and end of every semester.",
  },
  {
    slug: "union-college",
    name: "Union College",
    category: "College",
    locality: "Schenectady, NY",
    county: "Schenectady County",
    description:
      "Airport taxi and car service for Union College students and parents, covering ALB and NYC-area airport runs around breaks and family weekends.",
  },
  {
    slug: "skidmore-college",
    name: "Skidmore College",
    category: "College",
    locality: "Saratoga Springs, NY",
    county: "Saratoga County",
    description:
      "Reliable car service between Skidmore College and the airport for students heading home and families visiting Saratoga Springs.",
  },
  {
    slug: "vassar-college",
    name: "Vassar College",
    category: "College",
    locality: "Poughkeepsie, NY",
    county: "Dutchess County",
    description:
      "Door-to-door airport transportation for Vassar College students and families in the Hudson Valley, serving Albany, JFK, LaGuardia, and Newark.",
  },
  {
    slug: "marist-university",
    name: "Marist University",
    category: "College",
    locality: "Poughkeepsie, NY",
    county: "Dutchess County",
    description:
      "Car service between Marist University and the airport — a regular trip for students and parents throughout the Hudson Valley.",
  },
  {
    slug: "suny-new-paltz",
    name: "SUNY New Paltz",
    category: "College",
    locality: "New Paltz, NY",
    county: "Ulster County",
    description:
      "Airport car service for SUNY New Paltz students and visiting families, covering both Albany and the NYC-area airports.",
  },
  {
    slug: "suny-oneonta",
    name: "SUNY Oneonta",
    category: "College",
    locality: "Oneonta, NY",
    county: "Otsego County",
    description:
      "Reliable car service between SUNY Oneonta and the airport for students and families in Otsego County.",
  },
  {
    slug: "hartwick-college",
    name: "Hartwick College",
    category: "College",
    locality: "Oneonta, NY",
    county: "Otsego County",
    description:
      "Door-to-door airport transportation for Hartwick College students and visiting parents in Oneonta.",
  },
  {
    slug: "suny-cobleskill",
    name: "SUNY Cobleskill",
    category: "College",
    locality: "Cobleskill, NY",
    county: "Schoharie County",
    description:
      "Car service between SUNY Cobleskill and the airport for students and families in Schoharie County.",
  },
  {
    slug: "suny-delhi",
    name: "SUNY Delhi",
    category: "College",
    locality: "Delhi, NY",
    county: "Delaware County",
    description:
      "Airport car service for SUNY Delhi students and visiting families throughout Delaware County.",
  },
  {
    slug: "paul-smiths-college",
    name: "Paul Smith's College",
    category: "College",
    locality: "Paul Smiths, NY",
    county: "Franklin County",
    description:
      "Reliable car service between Paul Smith's College and the airport for students and families in the Adirondacks of Franklin County.",
  },
  {
    slug: "suny-plattsburgh",
    name: "SUNY Plattsburgh",
    category: "College",
    locality: "Plattsburgh, NY",
    county: "Clinton County",
    description:
      "Door-to-door airport transportation for SUNY Plattsburgh students and families in Clinton County.",
  },
  {
    slug: "suny-adirondack",
    name: "SUNY Adirondack",
    category: "College",
    locality: "Queensbury, NY",
    county: "Warren County",
    description:
      "Car service between SUNY Adirondack and the airport for students and visiting families in Warren County.",
  },
  {
    slug: "fulton-montgomery-community-college",
    name: "Fulton-Montgomery Community College",
    category: "College",
    locality: "Johnstown, NY",
    county: "Fulton County",
    description:
      "Reliable airport car service for FM Community College students and families across Fulton and Montgomery counties.",
  },
  {
    slug: "herkimer-college",
    name: "Herkimer College",
    category: "College",
    locality: "Herkimer, NY",
    county: "Herkimer County",
    description:
      "Door-to-door car service between Herkimer College and the airport for students and visiting families.",
  },
  {
    slug: "columbia-greene-community-college",
    name: "Columbia-Greene Community College",
    category: "College",
    locality: "Hudson, NY",
    county: "Columbia County",
    description:
      "Airport car service for Columbia-Greene Community College students and families, serving the Hudson Valley.",
  },
  {
    slug: "bennington-college",
    name: "Bennington College",
    category: "College",
    locality: "Bennington, VT",
    county: "Bennington County",
    description:
      "Car service between Bennington College and the airport for students and visiting families in southern Vermont.",
  },
  {
    slug: "castleton-university",
    name: "Castleton University",
    category: "College",
    locality: "Castleton, VT",
    county: "Rutland County",
    description:
      "Reliable airport transportation for Castleton University students and families in Rutland County, Vermont.",
  },
  {
    slug: "williams-college",
    name: "Williams College",
    category: "College",
    locality: "Williamstown, MA",
    county: "Berkshire County",
    description:
      "Door-to-door car service between Williams College and the airport for students and visiting families in the Berkshires.",
  },
  {
    slug: "mcla",
    name: "Massachusetts College of Liberal Arts (MCLA)",
    category: "College",
    locality: "North Adams, MA",
    county: "Berkshire County",
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

// Broad display groups for the venues index — the 25 raw `category` values
// (Winery, Farm & Cidery, Orchard & Winery, ...) are too granular to browse
// by directly once there are 100+ venues, so this collapses them into a
// handful of sections for the index page only. `category` itself stays the
// specific, real label shown on each venue's own page.
const GROUPS: { label: string; categories: string[] }[] = [
  {
    label: "Hotels & Lodging",
    categories: ["Hotel", "Inn", "Resort", "Lodge", "Motel"],
  },
  {
    label: "Colleges & Universities",
    categories: ["College"],
  },
  {
    label: "Farms, Wineries & Breweries",
    categories: [
      "Winery",
      "Orchard",
      "Farm",
      "Farm Brewery",
      "Farm & Cidery",
      "Farm & Winery",
      "Cidery",
      "Brewery",
      "Cidery & Orchard",
      "Orchard & Winery",
      "Distillery",
      "Historic Farm",
    ],
  },
  {
    label: "Museums & Attractions",
    categories: ["Museum", "Natural Attraction"],
  },
  {
    label: "Local Landmarks & Transit",
    categories: ["Hospital", "Shopping", "Government / Events", "Arena / Events", "Transit"],
  },
];

export function getVenueGroups(): { label: string; slug: string; venues: Venue[] }[] {
  const venues = getVenues();
  return GROUPS.map(({ label, categories }) => ({
    label,
    slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    venues: venues.filter((v) => categories.includes(v.category)),
  })).filter((group) => group.venues.length > 0);
}
