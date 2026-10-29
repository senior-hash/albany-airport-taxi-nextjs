// For each of our 23 counties, pull every Wikidata settlement located within
// it (coords + population), then match against content/cities.json by name
// to build content/town-hub-wikidata.json — the one external-data source for
// each town's coordinates and population. Resumable: re-run skips counties
// already cached in the raw dir unless --force; final matching always
// re-runs against current cities.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sparql, sleep, parsePoint } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const RAW_DIR = path.join(__dirname, "wikidata-raw");
const OUT_FILE = path.join(ROOT, "content", "town-hub-wikidata.json");

fs.mkdirSync(RAW_DIR, { recursive: true });

const counties = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "counties.json"), "utf8"));
const cities = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "cities.json"), "utf8"));
const countyQids = JSON.parse(fs.readFileSync(path.join(__dirname, "county-qids.json"), "utf8"));

const force = process.argv.includes("--force");

// Settlement class + subclasses (city, town, village, hamlet, CDP, etc.).
// Constrained with a VALUES list of our own town names up front (rather
// than pulling every settlement in the county and matching locally) — a
// handful of counties have thousands of small Wikidata-mapped localities
// (neighborhoods, hamlets, subdivisions) and an unconstrained query against
// them was timing out / returning truncated multi-megabyte responses.
function buildQuery(countyQid, names) {
  const values = names.map((n) => `"${n.replace(/"/g, '\\"')}"@en`).join(" ");
  return `
  SELECT ?item ?itemLabel ?coord ?population WHERE {
    VALUES ?itemLabel { ${values} }
    ?item rdfs:label ?itemLabel.
    ?item wdt:P131* wd:${countyQid}.
    ?item wdt:P31/wdt:P279* wd:Q486972.
    OPTIONAL { ?item wdt:P625 ?coord. }
    OPTIONAL { ?item wdt:P1082 ?population. }
  }`;
}

const namesByCounty = {};
for (const city of cities) {
  const county = counties.find((c) => c.id === city.countyId);
  if (!county) continue;
  (namesByCounty[county.slug] ??= new Set()).add(city.name);
}

for (const county of counties) {
  const qid = countyQids[county.slug];
  if (!qid) {
    console.error(`No QID cached for ${county.slug}, run fetch-county-qids.mjs first`);
    continue;
  }
  const rawFile = path.join(RAW_DIR, `${county.slug}.json`);
  if (fs.existsSync(rawFile) && !force) continue;
  const names = [...(namesByCounty[county.slug] ?? [])];
  if (names.length === 0) continue;
  try {
    const rows = await sparql(buildQuery(qid, names));
    fs.writeFileSync(rawFile, JSON.stringify(rows, null, 2));
    console.log(`${county.name}: ${rows.length} settlement rows (of ${names.length} town names)`);
  } catch (e) {
    console.error(`FAILED ${county.name}:`, e.message);
  }
  await sleep(1500);
}

// --- Matching pass: build content/town-hub-wikidata.json from raw dumps ---
function normalize(name) {
  return name
    .toLowerCase()
    .replace(/^(village of|town of|city of|hamlet of)\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const countyById = Object.fromEntries(counties.map((c) => [c.id, c]));

const matched = {};
let matchCount = 0;
for (const city of cities) {
  const county = countyById[city.countyId];
  if (!county) continue;
  const rawFile = path.join(RAW_DIR, `${county.slug}.json`);
  if (!fs.existsSync(rawFile)) continue;
  const rows = JSON.parse(fs.readFileSync(rawFile, "utf8"));
  const target = normalize(city.name);
  // Prefer an exact normalized-name match; among ties, prefer rows with coords.
  const candidates = rows.filter((r) => normalize(r.itemLabel.value) === target);
  if (candidates.length === 0) continue;
  const withCoord = candidates.find((r) => r.coord) || candidates[0];
  const point = withCoord.coord ? parsePoint(withCoord.coord.value) : null;
  if (!point) continue;
  const population = withCoord.population ? parseInt(withCoord.population.value, 10) : null;
  matched[city.slug] = {
    qid: withCoord.item.value.split("/").pop(),
    lat: point.lat,
    lon: point.lon,
    population,
  };
  matchCount++;
}

fs.writeFileSync(OUT_FILE, JSON.stringify(matched, null, 2));
console.log(`Matched ${matchCount}/${cities.length} towns to Wikidata coordinates.`);
