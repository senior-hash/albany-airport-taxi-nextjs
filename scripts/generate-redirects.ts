import fs from "node:fs";
import path from "node:path";

const LEGACY_SITEMAP = "C:\\Users\\Senior\\Documents\\albany-airport-taxi-site\\sitemap.xml";
const CONTENT_DIR = path.join(__dirname, "..", "content");
const OUT_DIR = path.join(__dirname, "..", "deploy");

type Redirect = { from: string; to: string };

// Legacy kc_city ids whose record was removed from content/cities.json as bad
// data — map their old URLs to the correct replacement city instead of
// letting them fall through to "no mapping found". cityid 25 was a duplicate
// "Troy" wrongly filed under Albany County (Troy, NY is entirely within
// Rensselaer County, cityid 308, the real entry).
const LEGACY_CITY_ID_ALIASES: Record<number, number> = { 25: 308 };

function loadJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")) as T;
}

function main() {
  const airports = loadJson<{ id: number; slug: string }[]>("airports.json");
  const counties = loadJson<{ id: number; slug: string }[]>("counties.json");
  const cities = loadJson<{ id: number; slug: string }[]>("cities.json");
  const cars = loadJson<{ id: number; slug: string }[]>("cars.json");
  const legacyBlogDir = path.join(CONTENT_DIR, "blog", "legacy");
  const blogPosts = fs
    .readdirSync(legacyBlogDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(legacyBlogDir, f), "utf8")) as { id: number; slug: string });

  const airportById = new Map(airports.map((a) => [a.id, a]));
  const countyById = new Map(counties.map((c) => [c.id, c]));
  const cityById = new Map(cities.map((c) => [c.id, c]));
  const carById = new Map(cars.map((c) => [c.id, c]));
  const blogById = new Map(blogPosts.map((b) => [b.id, b]));

  const STATIC_PAGE_SLUGS: Record<number, string> = { 336: "about", 320: "privacy" };

  const sitemapXml = fs.readFileSync(LEGACY_SITEMAP, "utf8");
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/&amp;/g, "&")
  );

  const redirects: Redirect[] = [];
  const skipped: string[] = [];
  const seenFrom = new Set<string>();

  for (const loc of locs) {
    let url: URL;
    try {
      url = new URL(loc);
    } catch {
      skipped.push(`unparseable URL: ${loc}`);
      continue;
    }
    if (url.protocol.startsWith("tel")) {
      skipped.push(`non-http entry (legacy sitemap bug): ${loc}`);
      continue;
    }

    const pathname = url.pathname.replace(/^\/+/, "");
    const params = url.searchParams;
    const from = pathname + (url.search ? url.search : "");

    if (seenFrom.has(from)) continue; // legacy sitemap had http/https/www duplicates
    seenFrom.add(from);

    let to: string | null = null;

    if (pathname === "" || pathname === "index.php") {
      to = "/";
    } else if (pathname === "services.php") {
      to = "/airport-taxi";
    } else if (pathname === "cars.php") {
      to = "/cars";
    } else if (pathname === "blogs.php") {
      to = "/blog";
    } else if (pathname === "contact.php") {
      to = "/contact";
    } else if (pathname === "service-detail.php") {
      const airport = airportById.get(Number(params.get("id")));
      to = airport ? `/airport-taxi/${airport.slug}` : null;
    } else if (pathname === "service-county-detail.php") {
      const airport = airportById.get(Number(params.get("id")));
      const county = countyById.get(Number(params.get("cid")));
      to = airport && county ? `/airport-taxi/${airport.slug}/${county.slug}` : null;
    } else if (pathname === "service-city-detail.php") {
      const airport = airportById.get(Number(params.get("id")));
      const coid = Number(params.get("coid"));
      const city = cityById.get(LEGACY_CITY_ID_ALIASES[coid] ?? coid);
      to = airport && city ? `/airport-taxi/${airport.slug}/${city.slug}` : null;
    } else if (pathname === "car-detail.php") {
      const car = carById.get(Number(params.get("id")));
      // Fall back to the fleet listing for car ids removed from the live DB
      // before the export (confirmed: id 156 no longer exists) rather than
      // leaving a dead link.
      to = car ? `/cars/${car.slug}` : "/cars";
    } else if (pathname === "blog-detail.php") {
      const post = blogById.get(Number(params.get("id")));
      to = post ? `/blog/${post.slug}` : null;
    } else if (pathname === "content.php") {
      const slug = STATIC_PAGE_SLUGS[Number(params.get("id"))];
      to = slug ? `/${slug}` : null;
    }

    if (to) {
      redirects.push({ from: "/" + from, to });
    } else {
      skipped.push(`no mapping found: ${loc}`);
    }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "redirects.json"), JSON.stringify(redirects, null, 2));

  console.log(`Mapped ${redirects.length} legacy URLs to new slugs.`);
  if (skipped.length) {
    console.warn(`\n⚠ ${skipped.length} URLs could not be mapped:`);
    skipped.slice(0, 30).forEach((s) => console.warn("  " + s));
    if (skipped.length > 30) console.warn(`  ...and ${skipped.length - 30} more`);
    fs.writeFileSync(path.join(OUT_DIR, "_unmapped-redirects.txt"), skipped.join("\n"));
  }
}

main();
