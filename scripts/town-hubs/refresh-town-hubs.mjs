// Main town-hub data refresh. For every town in content/cities.json that
// has a Wikidata-matched coordinate (content/town-hub-wikidata.json), pulls:
//   - drive time/distance to ALB, JFK, LGA, EWR, Logan, Bradley, and the
//     nearest Amtrak station (one combined OSRM /table/ call per town)
//   - nearby places from OpenStreetMap, grouped into "dinner and nights
//     out", "getting around", and "appointments", nearest-first by real
//     drive time. Candidates come from content/town-hub-local-places.json
//     (pre-filtered locally from Geofabrik .osm.pbf extracts via
//     scripts/town-hubs/extract_local_places.py) when that file exists —
//     the live Overpass API this used originally rate-limited this
//     project's IP mid-build. Falls back to a live Overpass call per town
//     if the local file isn't present (e.g. before the extracts have been
//     downloaded/processed).
// Writes content/town-hubs/{slug}.json. Resumable: skips towns with an
// existing, fresh-enough file unless --force. Respects public-API rate
// limits via a fixed delay between towns (only relevant for the OSRM call
// and the Overpass fallback — the local-places path makes no network call).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  fetchWithRetry,
  sleep,
  haversineMiles,
  fmtDriveTime,
  fmtMiles,
  OVERPASS_API,
  OSRM_TABLE,
} from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT_DIR = path.join(ROOT, "content", "town-hubs");
fs.mkdirSync(OUT_DIR, { recursive: true });

const force = process.argv.includes("--force");
const maxArg = process.argv.find((a) => a.startsWith("--max="));
const MAX_TOWNS = maxArg ? parseInt(maxArg.split("=")[1], 10) : Infinity;
const FRESH_DAYS = 120; // "every few months" per the project's refresh cadence

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const cities = loadJson(path.join(ROOT, "content", "cities.json"));
const counties = loadJson(path.join(ROOT, "content", "counties.json"));
const states = loadJson(path.join(ROOT, "content", "states.json"));
const wikidata = loadJson(path.join(ROOT, "content", "town-hub-wikidata.json"));
const OSM_CENTERS_FILE = path.join(ROOT, "content", "town-hub-osm-centers.json");
const osmCenters = fs.existsSync(OSM_CENTERS_FILE) ? loadJson(OSM_CENTERS_FILE) : {};
// Towns with no Wikidata match (see scripts/town-hubs/extract_local_places.py,
// which matches them to an OSM place node instead) — merged in as a
// lower-priority source so a later Wikidata match always wins.
const coordsBySlug = { ...osmCenters, ...wikidata };
if (Object.keys(osmCenters).length > 0) {
  console.log(`Using OSM-place-node coordinates for ${Object.keys(osmCenters).length} towns with no Wikidata match.`);
}
const amtrakStations = loadJson(path.join(ROOT, "content", "amtrak-stations.json"));
const LOCAL_PLACES_FILE = path.join(ROOT, "content", "town-hub-local-places.json");
const localPlaces = fs.existsSync(LOCAL_PLACES_FILE) ? loadJson(LOCAL_PLACES_FILE) : null;
if (localPlaces) {
  console.log(`Using local OSM extract data (content/town-hub-local-places.json, ${Object.keys(localPlaces).length} towns) — no Overpass calls this run.`);
} else {
  console.log("No local-places file found — falling back to live Overpass calls per town.");
}

const countyById = Object.fromEntries(counties.map((c) => [c.id, c]));
const stateById = Object.fromEntries(states.map((s) => [s.id, s]));

// Real, standard published coordinates for the 6 airports this project
// quotes drive times to/from elsewhere (lib/airport-distances.ts).
const AIRPORTS = [
  { slug: "alb", name: "Albany International Airport", lat: 42.7483, lon: -73.8017 },
  { slug: "jfk", name: "JFK International Airport", lat: 40.6413, lon: -73.7781 },
  { slug: "lga", name: "LaGuardia Airport", lat: 40.7769, lon: -73.874 },
  { slug: "ewr", name: "Newark Liberty International Airport", lat: 40.6895, lon: -74.1745 },
  { slug: "logan", name: "Boston Logan International Airport", lat: 42.3656, lon: -71.0096 },
  { slug: "bradley", name: "Bradley International Airport", lat: 41.9389, lon: -72.6832 },
];

const PLACE_GROUPS = {
  "dinner-and-nights-out": {
    label: "Dinner and nights out",
    tags: ['"amenity"~"^(restaurant|bar|pub)$"'],
  },
  "getting-around": {
    label: "Getting around",
    tags: [
      '"leisure"="park"',
      '"tourism"="guest_house"',
      '"sport"~"skiing"',
      '"tourism"="trailhead"',
    ],
  },
  appointments: {
    label: "Appointments",
    tags: ['"amenity"~"^(hospital|clinic|doctors|townhall)$"'],
  },
};
const ALL_TAGS = Object.values(PLACE_GROUPS).flatMap((g) => g.tags);

function overpassQuery(lat, lon, radiusM) {
  const clauses = ALL_TAGS.map(
    (tag) => `  node[${tag}](around:${radiusM},${lat},${lon});\n  way[${tag}](around:${radiusM},${lat},${lon});`
  ).join("\n");
  return `[out:json][timeout:25];\n(\n${clauses}\n);\nout center tags;`;
}

function categorize(tags) {
  // Aerialway (lifts/gondolas) and piste (ski trail) features are lift/trail
  // furniture, not a place — exclude them, but keep the resort itself.
  if (tags.aerialway || tags["piste:type"]) return null;
  const amenity = tags.amenity;
  const leisure = tags.leisure;
  const tourism = tags.tourism;
  const sport = tags.sport;
  if (["restaurant", "bar", "pub"].includes(amenity)) return "dinner-and-nights-out";
  if (leisure === "park") {
    if (/\bquad(rangle)?\b/i.test(tags.name || "")) return null; // campus quads
    return "getting-around";
  }
  if (tourism === "guest_house" || tourism === "trailhead" || /ski/i.test(sport || "")) return "getting-around";
  if (["hospital", "clinic", "doctors", "townhall"].includes(amenity)) return "appointments";
  return null;
}

async function fetchOverpassPlaces(lat, lon) {
  const res = await fetchWithRetry(
    OVERPASS_API,
    {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: overpassQuery(lat, lon, 25000),
    },
    2 // fail fast on a town that's hitting the rate limit — pick it up next run
  );
  const data = await res.json();
  const byGroup = { "dinner-and-nights-out": [], "getting-around": [], appointments: [] };
  for (const el of data.elements || []) {
    const name = el.tags?.name;
    if (!name) continue;
    const group = categorize(el.tags);
    if (!group) continue;
    const plat = el.lat ?? el.center?.lat;
    const plon = el.lon ?? el.center?.lon;
    if (plat == null || plon == null) continue;
    const website = el.tags?.website || el.tags?.["contact:website"];
    byGroup[group].push({
      name,
      lat: plat,
      lon: plon,
      straightMiles: haversineMiles(lat, lon, plat, plon),
      ...(website ? { website } : {}),
    });
  }
  // Cap each group to the nearest 15 by straight-line before the OSRM call,
  // so the table request (and Overpass load) stays bounded even near dense
  // towns with dozens of matches.
  for (const key of Object.keys(byGroup)) {
    byGroup[key].sort((a, b) => a.straightMiles - b.straightMiles);
    byGroup[key] = byGroup[key].slice(0, 15);
  }
  return byGroup;
}

// Candidates are already capped to the nearest 15 per group by straight-
// line distance (see extract_local_places.py) — just attach that distance
// here so the shape matches what fetchOverpassPlaces used to return.
function getLocalPlaces(slug, lat, lon) {
  const town = localPlaces[slug];
  const byGroup = { "dinner-and-nights-out": [], "getting-around": [], appointments: [] };
  if (!town) return byGroup;
  for (const group of Object.keys(byGroup)) {
    // OSM sometimes tags the same business as both a node and a building
    // way — dedupe by name, keeping the nearest occurrence.
    const seen = new Map();
    for (const p of town[group] || []) {
      const withDist = { ...p, straightMiles: haversineMiles(lat, lon, p.lat, p.lon) };
      const existing = seen.get(p.name);
      if (!existing || withDist.straightMiles < existing.straightMiles) seen.set(p.name, withDist);
    }
    byGroup[group] = [...seen.values()];
  }
  return byGroup;
}

function nearestAmtrak(lat, lon) {
  let best = null;
  let bestDist = Infinity;
  for (const s of amtrakStations) {
    const d = haversineMiles(lat, lon, s.lat, s.lon);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best;
}

async function osrmTable(originLat, originLon, destinations) {
  const coords = [`${originLon},${originLat}`, ...destinations.map((d) => `${d.lon},${d.lat}`)].join(";");
  const url = `${OSRM_TABLE}/${coords}?sources=0&annotations=duration,distance`;
  const res = await fetchWithRetry(url);
  const data = await res.json();
  if (!data.durations || !data.durations[0]) throw new Error("No OSRM table result");
  const durations = data.durations[0]; // seconds, index 0 is origin->origin
  const distances = data.distances[0]; // meters
  return destinations.map((d, i) => ({
    ...d,
    minutes: durations[i + 1] != null ? durations[i + 1] / 60 : null,
    miles: distances[i + 1] != null ? distances[i + 1] / 1609.34 : null,
  }));
}

function isFresh(file) {
  if (!fs.existsSync(file)) return false;
  const stat = fs.statSync(file);
  const ageDays = (Date.now() - stat.mtimeMs) / 86400000;
  return ageDays < FRESH_DAYS;
}

let processed = 0;
let qualified = 0;
const results = [];

async function processCity(city) {
  const wd = coordsBySlug[city.slug];
  const outFile = path.join(OUT_DIR, `${city.slug}.json`);
  if (!wd) {
    results.push({ slug: city.slug, name: city.name, status: "no-coords" });
    return;
  }
  if (isFresh(outFile) && !force) {
    const existing = loadJson(outFile);
    results.push({ slug: city.slug, name: city.name, status: existing.qualifies ? "cached-qualified" : "cached-noindex" });
    return;
  }

  const county = countyById[city.countyId];
  const state = stateById[city.stateId];

  try {
    // 1) Nearby places — from the local OSM extract when available,
    // otherwise one live Overpass call (and the polite delay that implies).
    let places;
    if (localPlaces) {
      places = getLocalPlaces(city.slug, wd.lat, wd.lon);
    } else {
      places = await fetchOverpassPlaces(wd.lat, wd.lon);
      await sleep(1800);
    }

    // 2) One OSRM table call: 6 airports + nearest Amtrak + every POI found.
    const amtrak = nearestAmtrak(wd.lat, wd.lon);
    const poiFlat = [];
    for (const [group, items] of Object.entries(places)) {
      for (const item of items) poiFlat.push({ group, ...item });
    }
    const destinations = [
      ...AIRPORTS.map((a) => ({ kind: "airport", ...a })),
      ...(amtrak ? [{ kind: "amtrak", ...amtrak }] : []),
      ...poiFlat.map((p) => ({ kind: "poi", ...p })),
    ];
    const withDrive = await osrmTable(wd.lat, wd.lon, destinations);
    await sleep(1200);

    const airportDistances = {};
    for (const a of AIRPORTS) {
      const r = withDrive.find((d) => d.kind === "airport" && d.slug === a.slug);
      if (r && r.minutes != null) {
        airportDistances[a.slug] = { miles: fmtMiles(r.miles), driveTime: fmtDriveTime(r.minutes) };
      }
    }
    const amtrakResult = withDrive.find((d) => d.kind === "amtrak");
    const nearestAmtrakOut =
      amtrakResult && amtrakResult.minutes != null
        ? { name: amtrakResult.name, miles: fmtMiles(amtrakResult.miles), driveTime: fmtDriveTime(amtrakResult.minutes) }
        : null;

    const placesOut = {};
    for (const [group, meta] of Object.entries(PLACE_GROUPS)) {
      const items = withDrive
        .filter((d) => d.kind === "poi" && d.group === group && d.minutes != null)
        .sort((a, b) => a.minutes - b.minutes)
        .slice(0, 8)
        .map((p) => ({ name: p.name, driveTime: fmtDriveTime(p.minutes), ...(p.website ? { website: p.website } : {}) }));
      if (items.length > 0) placesOut[group] = { label: meta.label, items };
    }

    const hasAirportDistances = Object.keys(airportDistances).length >= 4; // allow a couple of OSRM misses
    const groupsWithResults = Object.keys(placesOut).length;
    const qualifies = hasAirportDistances && groupsWithResults >= 2;

    const out = {
      slug: city.slug,
      name: city.name,
      county: county?.name ?? null,
      state: state?.name ?? null,
      lat: wd.lat,
      lon: wd.lon,
      wikidataQid: wd.qid,
      population: wd.population,
      airportDistances,
      nearestAmtrak: nearestAmtrakOut,
      places: placesOut,
      qualifies,
      fetchedAt: new Date().toISOString(),
    };
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
    if (qualifies) qualified++;
    results.push({ slug: city.slug, name: city.name, status: qualifies ? "qualified" : "noindex" });
    console.log(`${city.name}: ${qualifies ? "QUALIFIED" : "noindex"} (${groupsWithResults} place groups, ${Object.keys(airportDistances).length} airport distances)`);
  } catch (e) {
    results.push({ slug: city.slug, name: city.name, status: "error", error: e.message });
    console.error(`FAILED ${city.name}:`, e.message);
  }
  processed++;
  await sleep(1000);
}

// A 6-way concurrency test against the public Overpass instance drew HTTP
// 429s and then a full IP-level block. With the local-places path that
// endpoint is no longer called per town, so the only remaining network
// call is the OSRM table request, which held up fine under modest
// concurrency earlier — a small pool here, not the full 6. Still strictly
// serial (1) when falling back to live Overpass, for the same reason as
// before.
const CONCURRENCY = localPlaces ? 3 : 1;
const queue = cities.slice(0, MAX_TOWNS === Infinity ? cities.length : MAX_TOWNS);

async function runOnePass() {
  processed = 0;
  qualified = 0;
  results.length = 0;
  let cursor = 0;
  async function worker() {
    while (cursor < queue.length) {
      const city = queue[cursor++];
      await processCity(city);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const summaryFile = path.join(__dirname, "last-run-summary.json");
  fs.writeFileSync(summaryFile, JSON.stringify(results, null, 2));
  const stillMissing = results.filter((r) => r.status === "error" || r.status === "no-coords").length;
  console.log(`\nProcessed ${processed} towns this pass. ${qualified} newly qualified. ${stillMissing} still missing/errored.`);
  return stillMissing;
}

const loop = process.argv.includes("--loop");
if (!loop) {
  await runOnePass();
} else {
  // Keep retrying indefinitely — this pipeline exists specifically because
  // the free Overpass/OSM endpoint this session hit is unreliable; each
  // already-written town-hub file is skipped (isFresh), so a pass only
  // spends time on towns that are still missing or previously errored.
  console.log("Loop mode: will keep re-attempting remaining towns every 3 minutes until none are left.");
  for (;;) {
    const stillMissing = await runOnePass();
    if (stillMissing === 0) {
      console.log("All towns processed. Exiting loop.");
      break;
    }
    await sleep(3 * 60 * 1000);
  }
}
