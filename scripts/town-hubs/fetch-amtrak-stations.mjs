// Real Amtrak station locations from Wikidata (railway/train stations
// operated by Amtrak, located in NY/VT/MA) — used to find each town's
// nearest station without hardcoding a station list from memory.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sparql, parsePoint } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT_FILE = path.join(ROOT, "content", "amtrak-stations.json");

// Q30 = USA, we scope by state to keep the result set small and relevant:
// New York (Q1384), Vermont (Q16551), Massachusetts (Q771).
const STATES = ["wd:Q1384", "wd:Q16551", "wd:Q771"];

// Q23239 = Amtrak. A station "has Amtrak service" if one of its connecting
// services (P1192, e.g. "Adirondack", "Ethan Allen Express") is operated by
// Amtrak (P137) — the station's own P137/P127 is usually the building's
// owner/operator (a transit authority), not the rail operator, so that
// property doesn't work as a filter.
const query = `
  SELECT DISTINCT ?item ?itemLabel ?coord WHERE {
    VALUES ?state { ${STATES.join(" ")} }
    ?item wdt:P131* ?state.
    ?item wdt:P31/wdt:P279* wd:Q55488.
    ?item wdt:P1192 ?service.
    ?service wdt:P137 wd:Q23239.
    ?item wdt:P625 ?coord.
    ?item rdfs:label ?itemLabel. FILTER(LANG(?itemLabel) = "en")
  }`;

const rows = await sparql(query);
const stations = [];
const seen = new Set();
for (const r of rows) {
  const point = parsePoint(r.coord.value);
  if (!point) continue;
  const name = r.itemLabel.value.replace(/\s*\(Amtrak station\)$/i, "");
  const key = `${name}|${point.lat.toFixed(3)}|${point.lon.toFixed(3)}`;
  if (seen.has(key)) continue;
  seen.add(key);
  stations.push({ name, lat: point.lat, lon: point.lon });
}

fs.writeFileSync(OUT_FILE, JSON.stringify(stations, null, 2));
console.log(`Wrote ${stations.length} Amtrak stations to ${OUT_FILE}`);
