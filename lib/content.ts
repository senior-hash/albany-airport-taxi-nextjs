import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Airport, County, State, City, Car, Page, BlogPost } from "@/scripts/lib/schemas";

export type CountyAirportDistance = { distanceMiles: string; driveTime: string };

const CONTENT_DIR = path.join(process.cwd(), "content");

function loadJson<T>(filename: string): T {
  const file = path.join(CONTENT_DIR, filename);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

const cache: {
  airports?: Airport[];
  counties?: County[];
  states?: State[];
  cities?: City[];
  cars?: Car[];
  pages?: Page[];
  blogPosts?: BlogPost[];
  countyAirportDistances?: Record<string, Record<string, CountyAirportDistance>>;
} = {};

export function getAirports(): Airport[] {
  return (cache.airports ??= loadJson<Airport[]>("airports.json"));
}
export function getAirportBySlug(slug: string): Airport | undefined {
  return getAirports().find((a) => a.slug === slug);
}

export function getStates(): State[] {
  return (cache.states ??= loadJson<State[]>("states.json"));
}
export function getStateById(id: number): State | undefined {
  return getStates().find((s) => s.id === id);
}

export function getCounties(): County[] {
  return (cache.counties ??= loadJson<County[]>("counties.json").sort((a, b) =>
    a.name.localeCompare(b.name)
  ));
}
export function getCountyBySlug(slug: string): County | undefined {
  return getCounties().find((c) => c.slug === slug);
}
export function getCountyById(id: number): County | undefined {
  return getCounties().find((c) => c.id === id);
}

// Real driving distance/time from each of the 5 physical airports we serve
// (not the "nyc" comparison-hub entry — see getAirportDistance's own doc)
// to a real, verified landmark in each county (same landmark as
// lib/county-area.ts's AboutArea section) — computed via OSRM's public
// routing API against the landmark's geocoded coordinates, Oct 2026. Not an
// estimate or guess: a real routed driving distance, rounded to avoid false
// precision.
type CountyAirportDistances = Record<string, Record<string, CountyAirportDistance>>;
function loadCountyAirportDistances(): CountyAirportDistances {
  return (cache.countyAirportDistances ??= loadJson<CountyAirportDistances>(
    "county-airport-distances.json"
  ));
}
export function getCountyAirportDistance(
  countySlug: string,
  airportSlug: string
): CountyAirportDistance | undefined {
  return loadCountyAirportDistances()[countySlug]?.[airportSlug];
}

export function getCities(): City[] {
  return (cache.cities ??= loadJson<City[]>("cities.json"));
}
export function getCityBySlug(slug: string): City | undefined {
  return getCities().find((c) => c.slug === slug);
}
export function getCitiesByCounty(countyId: number): City[] {
  return getCities().filter((c) => c.countyId === countyId);
}

export function getCars(): Car[] {
  return (cache.cars ??= loadJson<Car[]>("cars.json"));
}
export function getCarBySlug(slug: string): Car | undefined {
  return getCars().find((c) => c.slug === slug);
}

export function getPages(): Page[] {
  return (cache.pages ??= loadJson<Page[]>("pages.json"));
}
export function getPageBySlug(slug: string): Page | undefined {
  return getPages().find((p) => p.slug === slug);
}

export function getLegacyBlogPosts(): BlogPost[] {
  if (cache.blogPosts) return cache.blogPosts;
  const dir = path.join(CONTENT_DIR, "blog", "legacy");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const posts = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as BlogPost);
  return (cache.blogPosts = posts);
}
function loadBlogDir(dirName: string): BlogPost[] {
  const dir = path.join(CONTENT_DIR, "blog", dirName);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as BlogPost);
}

export function getAllBlogPosts(): BlogPost[] {
  // Soro-published posts will land in content/blog/soro/*.json following the
  // same shape; merge them in here once that directory has content.
  // content/blog/original/*.json holds hand-authored original-research
  // pieces (source: "original") — real, independently sourced/analyzed
  // content meant to be citable, not scraped legacy copy or AI-generated.
  return [...getLegacyBlogPosts(), ...loadBlogDir("soro"), ...loadBlogDir("original")];
}
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

export { BUSINESS } from "./business";
