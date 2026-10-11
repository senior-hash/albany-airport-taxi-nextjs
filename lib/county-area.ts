export type CountyArea = {
  /** Real, verified local landmark or park — not a venue already listed in lib/venues.ts. */
  landmarkName: string;
  landmarkUrl: string;
  landmarkBlurb: string;
  /** Real government website for the area — the county itself, or (where VT/MA counties
   * have no functioning county government) the county seat's town/city government. */
  govName: string;
  govUrl: string;
};

// Real, independently-verified local links for each of the 23 counties we serve —
// one authoritative government site and one real, well-documented park or landmark
// per county, matching the "About Area" pattern used on our sister site
// (fabius-ny-taxi-service.uslimoandtaxi.com). Picked to avoid duplicating venues
// already listed in lib/venues.ts. Every URL below was opened and confirmed live
// before being added (Oct 2026) — see conversation history for the verification pass.
//
// Vermont counties have no general-purpose county government (only a sheriff's
// office), and Berkshire County, MA abolished its county government in 2000 — for
// those three, govName/govUrl point to the county seat's own town or city government
// instead of a nonexistent county site.
export const COUNTY_AREAS: Record<string, CountyArea> = {
  "Albany County": {
    landmarkName: "John Boyd Thacher State Park",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/thacher-state-park",
    landmarkBlurb:
      "known for its mile-long limestone escarpment, the Indian Ladder Trail, and sweeping views over the Hudson-Mohawk Valley",
    govName: "Albany County",
    govUrl: "https://www.albanycountyny.gov",
  },
  "Greene County": {
    landmarkName: "Kaaterskill Falls",
    landmarkUrl: "https://dec.ny.gov/places/kaaterskill-wild-forest",
    landmarkBlurb: "New York's tallest two-tiered waterfall and one of the most photographed spots in the Catskills",
    govName: "Greene County",
    govUrl: "https://www.greenecountyny.gov",
  },
  "Columbia County": {
    landmarkName: "Olana State Historic Site",
    landmarkUrl: "https://www.olana.org",
    landmarkBlurb:
      "Hudson River School painter Frederic Church's historic home and landscaped grounds overlooking the Hudson River",
    govName: "Columbia County",
    govUrl: "https://www.columbiacountyny.gov",
  },
  "Dutchess County": {
    landmarkName: "Walkway Over the Hudson",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/walkway-over-hudson-state-historic-park",
    landmarkBlurb: "the world's longest elevated pedestrian bridge, a repurposed rail bridge spanning the Hudson River",
    govName: "Dutchess County",
    govUrl: "https://www.dutchessny.gov",
  },
  "Ulster County": {
    landmarkName: "Minnewaska State Park Preserve",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/minnewaska-state-park-preserve",
    landmarkBlurb: "dramatic cliffside views, sky lakes, and miles of trails along the Shawangunk Ridge",
    govName: "Ulster County",
    govUrl: "https://www.ulstercountyny.gov",
  },
  "Delaware County": {
    landmarkName: "Pepacton Reservoir",
    landmarkUrl: "https://www.nyc.gov/site/dep/water/pepacton-reservoir.page",
    landmarkBlurb: "the largest reservoir in the NYC water supply system, and a popular spot for trout fishing",
    govName: "Delaware County",
    govUrl: "https://www.delcony.gov",
  },
  "Otsego County": {
    landmarkName: "Glimmerglass State Park",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/glimmerglass-state-park",
    landmarkBlurb:
      "swimming and hiking on Otsego Lake, the real-life setting that inspired James Fenimore Cooper's novels",
    govName: "Otsego County",
    govUrl: "https://www.otsegocountyny.gov",
  },
  "Schoharie County": {
    landmarkName: "Mine Kill State Park",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/mine-kill-state-park",
    landmarkBlurb: "an 80-foot waterfall, hiking trails, and swimming pools overlooking the Schoharie Valley",
    govName: "Schoharie County",
    govUrl: "https://www4.schohariecounty-ny.gov",
  },
  "Montgomery County": {
    landmarkName: "Schoharie Crossing State Historic Site",
    landmarkUrl: "https://parks.ny.gov/visit/historic-sites/schoharie-crossing-state-historic-site",
    landmarkBlurb: "the historic Erie Canal aqueduct and towpath in Fort Hunter",
    govName: "Montgomery County",
    govUrl: "https://www.montgomerycountyny.gov",
  },
  "Rensselaer County": {
    landmarkName: "Grafton Lakes State Park",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/grafton-lakes-state-park",
    landmarkBlurb: "nearly 2,500 acres with six ponds and 25 miles of hiking and biking trails",
    govName: "Rensselaer County",
    govUrl: "https://rensco.com",
  },
  "Saratoga County": {
    landmarkName: "Saratoga Spa State Park",
    landmarkUrl: "https://parks.ny.gov/visit/state-parks/saratoga-spa-state-park",
    landmarkBlurb: "natural mineral springs, historic bathhouses, and the Saratoga Performing Arts Center",
    govName: "Saratoga County",
    govUrl: "https://www.saratogacountyny.gov",
  },
  "Schenectady County": {
    landmarkName: "Plotter Kill Preserve",
    landmarkUrl: "https://www.schenectadycountyny.gov/nature",
    landmarkBlurb: "a 650-acre county nature preserve with three waterfalls and seven miles of hiking trails",
    govName: "Schenectady County",
    govUrl: "https://www.schenectadycountyny.gov",
  },
  "Washington County": {
    landmarkName: "Rogers Island Visitors Center",
    landmarkUrl: "https://rogersisland.org",
    landmarkBlurb: "the birthplace of the U.S. Army Rangers and a center for French and Indian War history in Fort Edward",
    govName: "Washington County",
    govUrl: "https://www.washingtoncountyny.gov",
  },
  "Warren County": {
    landmarkName: "Prospect Mountain",
    landmarkUrl: "https://dec.ny.gov/places/prospect-mountain-veterans-memorial-highway-day-use-area",
    landmarkBlurb: "a scenic drive to a 2,030-foot summit with 100-mile views over Lake George",
    govName: "Warren County",
    govUrl: "https://www.warrencountyny.gov",
  },
  "Hamilton County": {
    landmarkName: "Lewey Lake Campground",
    landmarkUrl: "https://dec.ny.gov/places/lewey-lake-campground-and-day-use-area",
    landmarkBlurb: "a secluded, wooded DEC campground on a 90-acre lake in the heart of the Adirondacks",
    govName: "Hamilton County",
    govUrl: "https://www.hamiltoncountyny.gov",
  },
  "Essex County": {
    landmarkName: "Whiteface Mountain Veterans Memorial Highway",
    landmarkUrl: "https://whiteface.com/lift/veterans-memorial-highway/",
    landmarkBlurb: "a scenic drive to the summit of Whiteface Mountain, site of the 1980 Winter Olympics downhill events",
    govName: "Essex County",
    govUrl: "https://essexcountyny.gov",
  },
  "Franklin County": {
    landmarkName: "St. Regis Canoe Area",
    landmarkUrl: "https://dec.ny.gov/places/saint-regis-canoe-area",
    landmarkBlurb: "New York's only designated canoe area, with 18,400 acres of interconnected ponds and lakes",
    govName: "Franklin County",
    govUrl: "https://www.franklincountyny.gov",
  },
  "Clinton County": {
    landmarkName: "Ausable Point Campground",
    landmarkUrl: "https://dec.ny.gov/places/ausable-point-campground-and-day-use-area",
    landmarkBlurb: "a sandy swimming beach and campground on Lake Champlain",
    govName: "Clinton County",
    govUrl: "https://www.clintoncountyny.gov",
  },
  "Herkimer County": {
    landmarkName: "Herkimer Diamond Mines",
    landmarkUrl: "https://www.herkimerdiamond.com",
    landmarkBlurb: "where visitors can dig for their own double-terminated quartz crystals",
    govName: "Herkimer County",
    govUrl: "https://www.herkimercountyny.gov",
  },
  "Fulton County": {
    landmarkName: "Johnson Hall State Historic Site",
    landmarkUrl: "https://parks.ny.gov/visit/historic-sites/johnson-hall-state-historic-site",
    landmarkBlurb: "Sir William Johnson's 1763 colonial Mohawk Valley estate, a National Historic Landmark",
    govName: "Fulton County",
    govUrl: "https://www.fultoncountyny.gov",
  },
  "Berkshire County": {
    landmarkName: "Mount Greylock State Reservation",
    landmarkUrl: "https://www.mass.gov/locations/mount-greylock-state-reservation",
    landmarkBlurb: "the highest point in Massachusetts, with a scenic summit road and the War Memorial Tower",
    govName: "the City of Pittsfield",
    govUrl: "https://www.pittsfieldma.gov",
  },
  "Bennington County": {
    landmarkName: "Bennington Battle Monument",
    landmarkUrl: "https://historicsites.vermont.gov/bennington-monument",
    landmarkBlurb: "a 306-foot stone obelisk commemorating the 1777 Revolutionary War battle",
    govName: "the Town of Bennington",
    govUrl: "https://www.benningtonvt.org",
  },
  "Rutland County": {
    landmarkName: "Gifford Woods State Park",
    landmarkUrl: "https://vtstateparks.com/gifford.html",
    landmarkBlurb: "an old-growth forest stand that's also a National Natural Landmark, near the Long Trail",
    govName: "the City of Rutland",
    govUrl: "https://www.rutlandcity.org",
  },
};

export function getCountyArea(countyName: string): CountyArea | undefined {
  return COUNTY_AREAS[countyName];
}
