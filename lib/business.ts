// Plain data, safe to import from both server and client code (no file I/O,
// no "server-only"). Split out from lib/content.ts so that CallButton — now
// rendered inside the client-side Header — doesn't drag lib/content's
// node:fs-based content loader into the browser bundle.
export const BUSINESS = {
  name: "Albany Airport Taxi and Limo Service",
  phone: "+1-518-327-0700",
  phoneDisplay: "(518) 327-0700",
  email: "info@albanyairport.taxi",
  streetAddress: "1410 Curry Road",
  addressLocality: "Rotterdam",
  addressRegion: "NY",
  postalCode: "12306",
} as const;
