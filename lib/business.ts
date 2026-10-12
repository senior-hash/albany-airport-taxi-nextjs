// Plain data, safe to import from both server and client code (no file I/O,
// no "server-only"). Split out from lib/content.ts so that CallButton — now
// rendered inside the client-side Header — doesn't drag lib/content's
// node:fs-based content loader into the browser bundle.
export const BUSINESS = {
  name: "Albany Airport Taxi and Limo Service",
  // Per NY Dept. of State Certificate of Assumed Name (filed 5/15/2023,
  // assumed name ID 6833719): the real legal entity is Albany Airport Taxi
  // LLC — "US Limo and Taxi" is the assumed name (DBA) filed on top of it,
  // not the other way around. The site's consumer-facing brand already
  // matches the real legal name, so no rebrand is needed — this is only
  // used where a legal/registered name is actually called for (schema.org
  // legalName, footer fine print, etc.), not in everyday marketing copy.
  legalName: "Albany Airport Taxi LLC",
  dba: "US Limo and Taxi",
  phone: "+1-518-327-0700",
  phoneDisplay: "(518) 327-0700",
  email: "info@albanyairport.taxi",
  streetAddress: "1410 Curry Road",
  addressLocality: "Rotterdam",
  addressRegion: "NY",
  postalCode: "12306",
} as const;

// Real, verified profile URLs — checked live against the site's own NAP
// details (Oct 2026). Yelp (1.0, 2 reviews) is deliberately not included
// here: too thin a sample and currently negative, not worth surfacing.
export const SOCIAL = {
  facebook: "https://www.facebook.com/AlbanyAirportTaxiNY",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g29786-d27933560-Reviews-Albany_Airport_Taxi_Limo_Service_Airport_Transfer-Albany_New_York.html",
  tripadvisorRating: 4.7,
  tripadvisorReviewCount: 12,
  yelp: "https://www.yelp.com/biz/albany-airport-taxi-service-albany-2",
} as const;
