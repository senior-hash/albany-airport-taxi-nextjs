import fs from "node:fs";
import path from "node:path";
import { extractInsertRows, type SqlRow } from "./lib/mysql-dump-parser";
import { sanitizeDetailHtml, sanitizePlainText, containsPlaceholderText } from "./lib/sanitize";
import { assignUniqueSlugs, baseSlug } from "./lib/slug";
import clientAreas from "./lib/client-supplied-areas.json";
import countyTrackingPhones from "./lib/county-tracking-phones.json";

const DUMP_PATH =
  process.argv[2] ??
  "C:\\Users\\Senior\\Downloads\\cheaphot_albanyairport.sql";
const OUT_DIR = path.join(__dirname, "..", "content");

// Known mapping of kc_content service rows (ctype='S') to airport identity.
// Hardcoded rather than parsed from the title text, since the 6 titles are
// inconsistently formatted ("ALB - ...", "LaGuardia Airport: LGA...", etc.)
// but the set of 6 real airport ids is fixed and confirmed from the DB export.
const AIRPORT_MAP: Record<number, { slug: string; name: string; code: string | null }> = {
  330: { slug: "alb", name: "Albany International Airport (ALB)", code: "ALB" },
  331: { slug: "jfk", name: "John F. Kennedy International Airport (JFK)", code: "JFK" },
  332: { slug: "lga", name: "LaGuardia Airport (LGA)", code: "LGA" },
  333: { slug: "ewr", name: "Newark Liberty International Airport (EWR)", code: "EWR" },
  334: { slug: "nyc", name: "New York City", code: null },
  335: { slug: "logan", name: "Boston Logan International Airport (BOS)", code: "BOS" },
};

// content.php static pages we're keeping (About Us=336, Privacy Policy=320).
const STATIC_PAGE_IDS: Record<number, string> = {
  336: "about",
  320: "privacy",
};

function readDump(): string {
  return fs.readFileSync(DUMP_PATH, "utf8");
}

function asString(v: SqlRow[string], fallback = ""): string {
  return v === null || v === undefined ? fallback : String(v);
}
// title/mtitle fields are meant to be plain text but weren't sanitized at
// ingestion — a <script> injection from the original security incident
// survived in one of them until this existed. Strip all markup.
function asPlainText(v: SqlRow[string], fallback = ""): string {
  return sanitizePlainText(asString(v, fallback));
}
function asNumber(v: SqlRow[string]): number {
  return Number(v);
}

function main() {
  const sql = readDump();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.join(OUT_DIR, "blog", "legacy"), { recursive: true });

  const placeholderHits: string[] = [];
  function sanitize(raw: string, context: string): string {
    const clean = sanitizeDetailHtml(raw);
    const hit = containsPlaceholderText(clean);
    if (hit) placeholderHits.push(`${context}: contains placeholder marker "${hit}"`);
    return clean;
  }

  // ---- kc_content: airports (ctype='S') + static pages (About/Privacy) ----
  const contentRows = extractInsertRows(sql, "kc_content");
  const airports = [];
  const pages = [];
  for (const row of contentRows) {
    const cid = asNumber(row.cid);
    const ctype = asString(row.ctype);
    const title = asPlainText(row.title);
    const detailHtml = sanitize(asString(row.detail), `kc_content#${cid}`);
    const mtitle = asPlainText(row.mtitle);
    const mdesc = asString(row.mdesc);
    const mkey = asString(row.mkey);

    if (ctype === "S" && AIRPORT_MAP[cid]) {
      const info = AIRPORT_MAP[cid];
      airports.push({
        id: cid,
        slug: info.slug,
        name: info.name,
        code: info.code,
        title,
        detailHtml,
        mtitle,
        mdesc,
        mkey,
      });
    } else if (STATIC_PAGE_IDS[cid]) {
      pages.push({
        id: cid,
        slug: STATIC_PAGE_IDS[cid],
        title,
        detailHtml,
        mtitle,
        mdesc,
        mkey,
      });
    }
  }
  airports.sort((a, b) => a.id - b.id);

  // ---- kc_state ----
  const stateRows = extractInsertRows(sql, "kc_state");
  const states = stateRows.map((row) => ({
    id: asNumber(row.stateid),
    name: asString(row.state),
    slug: baseSlug(asString(row.state)),
  }));
  // Add Vermont, referenced by the client-supplied Bennington/Rutland counties,
  // not present in the legacy DB.
  const nextStateId = Math.max(...states.map((s) => s.id)) + 1;
  const vermontState = { id: nextStateId, name: "Vermont", slug: "vermont" };
  states.push(vermontState);

  // ---- kc_county ----
  const trackingPhones: Record<string, string> = countyTrackingPhones;
  const countyRows = extractInsertRows(sql, "kc_county");
  const counties = countyRows.map((row) => {
    // Fix known DB typos ("Saratogo" / "Schecectady") using the client-supplied
    // correct spellings so we don't ship misspelled place names.
    const name = fixCountyName(asString(row.county));
    return {
      id: asNumber(row.countyid),
      name,
      stateId: asNumber(row.state),
      detailHtml: sanitize(asString(row.county_detail), `kc_county#${row.countyid}`),
      trackingPhone: trackingPhones[name] ?? null,
    };
  });

  // Add Bennington County VT and Rutland County VT from the client-supplied list.
  let nextCountyId = Math.max(...counties.map((c) => c.id)) + 1;
  const vtCounties = clientAreas.counties.filter((c) => c.state === "Vermont");
  const addedCounties: { name: string; id: number }[] = [];
  for (const vtCounty of vtCounties) {
    const id = nextCountyId++;
    counties.push({
      id,
      name: vtCounty.county,
      stateId: vermontState.id,
      detailHtml: `<p>${vtCounty.county}</p>`,
      trackingPhone: trackingPhones[vtCounty.county] ?? null,
    });
    addedCounties.push({ name: vtCounty.county, id });
  }

  const countySlugMap = assignUniqueSlugs(
    counties,
    (c) => c.name,
    (c) => states.find((s) => s.id === c.stateId)?.name ?? ""
  );

  // ---- kc_city ----
  // stateId is derived from the city's own county rather than trusted from the
  // row's `state` column directly: every Greene County row in the legacy DB
  // has state=2 (Massachusetts) instead of the county's actual state=1 (New
  // York) — a data-entry bug confirmed across all 36 Greene County cities,
  // none of which are actually in Massachusetts. A city can't legitimately be
  // in a different state than its own county, so the county's state wins.
  const countyById = new Map(counties.map((c) => [c.id, c]));
  const cityRows = extractInsertRows(sql, "kc_city");
  const cities = cityRows.map((row) => {
    const countyId = asNumber(row.county);
    const county = countyById.get(countyId);
    return {
      id: asNumber(row.cityid),
      name: asString(row.city),
      countyId,
      stateId: county ? county.stateId : asNumber(row.state),
      detailHtml: sanitize(asString(row.city_detail), `kc_city#${row.cityid}`),
      mtitle: asPlainText(row.mtitle),
      mdesc: asString(row.mdesc),
      mkey: asString(row.mkey),
    };
  });

  // Cross-check: which client-supplied towns per NY/MA county are missing from
  // the DB-derived city list? (Report only — this is a data-quality signal for
  // the client, not silently auto-added, since DB cities have real detail
  // content and client-list towns don't.)
  const dbCityNamesByCounty = new Map<number, Set<string>>();
  for (const city of cities) {
    const set = dbCityNamesByCounty.get(city.countyId) ?? new Set();
    set.add(city.name.toLowerCase());
    dbCityNamesByCounty.set(city.countyId, set);
  }
  const missingTownsReport: string[] = [];
  for (const clientCounty of clientAreas.counties) {
    if (clientCounty.state === "Vermont") continue; // wholly new, handled below
    const dbCounty = counties.find(
      (c) => c.name.toLowerCase() === clientCounty.county.toLowerCase()
    );
    if (!dbCounty) {
      missingTownsReport.push(`County not found in DB at all: ${clientCounty.county}`);
      continue;
    }
    const dbNames = dbCityNamesByCounty.get(dbCounty.id) ?? new Set();
    const missing = clientCounty.towns.filter((t) => !dbNames.has(t.toLowerCase()));
    if (missing.length) {
      missingTownsReport.push(
        `${clientCounty.county}: ${missing.length} client-supplied towns not in DB — ${missing.join(", ")}`
      );
    }
  }

  // Add all Bennington/Rutland VT towns as new cities (wholly new counties).
  let nextCityId = Math.max(...cities.map((c) => c.id)) + 1;
  for (const vtCounty of vtCounties) {
    const countyRecord = addedCounties.find((c) => c.name === vtCounty.county)!;
    for (const town of vtCounty.towns) {
      cities.push({
        id: nextCityId++,
        name: town,
        countyId: countyRecord.id,
        stateId: vermontState.id,
        detailHtml: "",
        mtitle: "",
        mdesc: "",
        mkey: "",
      });
    }
  }

  const citySlugMap = assignUniqueSlugs(
    cities,
    (c) => c.name,
    (c) => counties.find((co) => co.id === c.countyId)?.name ?? ""
  );

  // ---- kc_car ----
  const carRows = extractInsertRows(sql, "kc_car");
  const cars = carRows.map((row) => ({
    id: asNumber(row.carid),
    title: asPlainText(row.title),
    detailHtml: sanitize(asString(row.detail), `kc_car#${row.carid}`),
    image: asString(row.cfile),
    brand: row.brand === null ? null : asNumber(row.brand),
  }));
  const carSlugMap = assignUniqueSlugs(
    cars,
    (c) => c.title,
    (c) => String(c.id)
  );

  // ---- kc_blog ----
  const blogRows = extractInsertRows(sql, "kc_blog");
  const legacyPosts = blogRows.map((row) => ({
    id: asNumber(row.bid),
    title: asPlainText(row.title),
    detailHtml: sanitize(asString(row.detail), `kc_blog#${row.bid}`),
    mtitle: asPlainText(row.mtitle),
    mdesc: asString(row.mdesc),
    mkey: asString(row.mkey),
    publishedAt: asString(row.entrydate) || null,
    source: "legacy" as const,
  }));
  const blogSlugMap = assignUniqueSlugs(
    legacyPosts,
    (p) => p.title,
    (p) => String(p.id)
  );

  // ---- write output ----
  writeJson("airports.json", airports);
  writeJson("pages.json", pages);
  writeJson("states.json", states);
  writeJson(
    "counties.json",
    counties.map((c) => ({ ...c, slug: countySlugMap.get(c) }))
  );
  writeJson(
    "cities.json",
    cities.map((c) => ({ ...c, slug: citySlugMap.get(c) }))
  );
  writeJson(
    "cars.json",
    cars.map((c) => ({ ...c, slug: carSlugMap.get(c) }))
  );

  for (const post of legacyPosts) {
    const slug = blogSlugMap.get(post)!;
    fs.writeFileSync(
      path.join(OUT_DIR, "blog", "legacy", `${slug}.json`),
      JSON.stringify({ ...post, slug }, null, 2)
    );
  }

  console.log(`Airports: ${airports.length}`);
  console.log(`Static pages: ${pages.length}`);
  console.log(`States: ${states.length} (added: Vermont)`);
  console.log(`Counties: ${counties.length} (added: ${addedCounties.map((c) => c.name).join(", ")})`);
  console.log(`Cities: ${cities.length}`);
  console.log(`Cars: ${cars.length}`);
  console.log(`Legacy blog posts: ${legacyPosts.length}`);

  if (placeholderHits.length) {
    console.warn("\n⚠ Placeholder-text hits (should be reviewed, not necessarily fatal at ETL stage):");
    placeholderHits.forEach((h) => console.warn("  " + h));
  }

  if (missingTownsReport.length) {
    console.warn("\n⚠ Client-supplied towns missing from DB-derived city list (data-quality report, not auto-fixed):");
    missingTownsReport.forEach((r) => console.warn("  " + r));
    fs.writeFileSync(
      path.join(OUT_DIR, "_missing-towns-report.txt"),
      missingTownsReport.join("\n")
    );
  }
}

function fixCountyName(name: string): string {
  return name.replace(/^Saratogo County$/, "Saratoga County").replace(/^Schecectady County$/, "Schenectady County");
}

function writeJson(filename: string, data: unknown) {
  fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
}

main();
