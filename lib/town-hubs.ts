import "server-only";
import fs from "node:fs";
import path from "node:path";

export type TownHubAirportDistance = { miles: string; driveTime: string };
export type TownHubPlaceItem = { name: string; driveTime: string };
export type TownHubPlaceGroup = { label: string; items: TownHubPlaceItem[] };

// Written by scripts/town-hubs/refresh-town-hubs.mjs — real data from
// Wikidata (coordinates, population), OSRM (drive times), and OpenStreetMap
// via Overpass (nearby places). See that script for the full pipeline.
export type TownHubData = {
  slug: string;
  name: string;
  county: string | null;
  state: string | null;
  lat: number;
  lon: number;
  wikidataQid: string;
  population: number | null;
  airportDistances: Record<string, TownHubAirportDistance>;
  nearestAmtrak: { name: string; miles: string; driveTime: string } | null;
  places: Record<string, TownHubPlaceGroup>;
  qualifies: boolean;
  fetchedAt: string;
};

const DIR = path.join(process.cwd(), "content", "town-hubs");
const NOTES_FILE = path.join(process.cwd(), "content", "town-hub-notes.json");

const cache: { data?: Map<string, TownHubData>; notes?: Record<string, string> } = {};

function loadAll(): Map<string, TownHubData> {
  if (cache.data) return cache.data;
  const map = new Map<string, TownHubData>();
  if (fs.existsSync(DIR)) {
    for (const file of fs.readdirSync(DIR)) {
      if (!file.endsWith(".json")) continue;
      const data = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8")) as TownHubData;
      map.set(data.slug, data);
    }
  }
  cache.data = map;
  return map;
}

export function getTownHub(slug: string): TownHubData | null {
  return loadAll().get(slug) ?? null;
}

export function getAllTownHubs(): TownHubData[] {
  return [...loadAll().values()];
}

// User-editable per-town notes, filled in over time — not part of the
// refresh pipeline's output, so it survives re-runs of that script.
export function getTownHubNote(slug: string): string | null {
  if (!cache.notes) {
    cache.notes = fs.existsSync(NOTES_FILE)
      ? (JSON.parse(fs.readFileSync(NOTES_FILE, "utf8")) as Record<string, string>)
      : {};
  }
  return cache.notes[slug] ?? null;
}
