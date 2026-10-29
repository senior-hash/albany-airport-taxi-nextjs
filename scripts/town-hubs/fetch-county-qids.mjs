// One-time (re-runnable) lookup: resolve each of our 23 counties to its
// Wikidata QID, so refresh-town-hubs.mjs can query "settlements located in
// this county" directly instead of fuzzy-matching every town by name alone.
// Cached to county-qids.json; re-run with --force to refresh.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sparql, sleep } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT_FILE = path.join(__dirname, "county-qids.json");

const counties = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "counties.json"), "utf8"));
const states = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "states.json"), "utf8"));
const stateById = Object.fromEntries(states.map((s) => [s.id, s]));

const force = process.argv.includes("--force");
let cache = {};
if (fs.existsSync(OUT_FILE) && !force) {
  cache = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
}

for (const county of counties) {
  if (cache[county.slug]) continue;
  const state = stateById[county.stateId];
  const label = `${county.name}, ${state.name}`;
  const query = `
    SELECT ?item WHERE {
      ?item rdfs:label "${county.name}"@en.
      ?item wdt:P131 ?state.
      ?state rdfs:label "${state.name}"@en.
    } LIMIT 1`;
  try {
    let rows = await sparql(query);
    if (rows.length === 0) {
      // Fallback: search by county name alone, take first county-typed result.
      const fallback = `
        SELECT ?item WHERE {
          ?item rdfs:label "${county.name}"@en.
          ?item wdt:P31/wdt:P279* wd:Q47168 .
        } LIMIT 1`;
      rows = await sparql(fallback);
    }
    if (rows.length === 0) {
      console.error(`NO MATCH: ${label}`);
    } else {
      const qid = rows[0].item.value.split("/").pop();
      cache[county.slug] = qid;
      console.log(`${label} -> ${qid}`);
    }
  } catch (e) {
    console.error(`FAILED ${label}:`, e.message);
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify(cache, null, 2));
  await sleep(1200);
}

console.log(`Done. ${Object.keys(cache).length}/${counties.length} counties resolved.`);
