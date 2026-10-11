import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Airport, County, State, City, Car, Page, BlogPost } from "@/scripts/lib/schemas";

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
  return (cache.counties ??= loadJson<County[]>("counties.json"));
}
export function getCountyBySlug(slug: string): County | undefined {
  return getCounties().find((c) => c.slug === slug);
}
export function getCountyById(id: number): County | undefined {
  return getCounties().find((c) => c.id === id);
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
export function getAllBlogPosts(): BlogPost[] {
  // Soro-published posts will land in content/blog/soro/*.json following the
  // same shape; merge them in here once that directory has content.
  const soroDir = path.join(CONTENT_DIR, "blog", "soro");
  const soroPosts = fs.existsSync(soroDir)
    ? fs
        .readdirSync(soroDir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(fs.readFileSync(path.join(soroDir, f), "utf8")) as BlogPost)
    : [];
  return [...getLegacyBlogPosts(), ...soroPosts];
}
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

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
