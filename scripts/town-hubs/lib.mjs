// Shared helpers for the town-hub data pipeline (fetch-county-qids.mjs,
// fetch-amtrak-stations.mjs, refresh-town-hubs.mjs). All real data pulled
// from Wikidata (SPARQL), Overpass (OpenStreetMap), and OSRM (routing) — no
// Google Maps/Yelp/TripAdvisor scraping, per the project rule.

export const WIKIDATA_SPARQL = "https://query.wikidata.org/sparql";
// The standard public Overpass endpoint. During this session's run, this
// host (and the kumi.systems / private.coffee mirrors) became unreachable
// from this environment's egress after an earlier concurrency test —
// likely shared-IP throttling on a heavily-used free API. Re-run this
// pipeline later (`npm run refresh-town-hubs`, no flags — it resumes and
// skips towns already done) once that clears.
export const OVERPASS_API = "https://overpass-api.de/api/interpreter";
export const OSRM_TABLE = "https://router.project-osrm.org/table/v1/driving";

const UA = "albanyairport.taxi-town-hubs/1.0 (contact: rosedaletaxi@gmail.com)";

export async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchWithRetry(url, options = {}, retries = 4, backoffMs = 3000) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: { "User-Agent": UA, ...(options.headers || {}) },
        signal: AbortSignal.timeout(60000),
      });
      if (res.status === 429) {
        // Public instance's own rate limit. Honor Retry-After but cap it —
        // a stuck town that keeps re-hitting the limit should fail fast and
        // get picked up on a later run, not burn minutes of this one.
        const retryAfter = parseInt(res.headers.get("retry-after") || "", 10);
        const waitS = Math.min(Number.isFinite(retryAfter) ? retryAfter : 15, 20);
        await sleep(waitS * 1000);
        throw new Error(`HTTP 429 for ${url.slice(0, 120)}`);
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.slice(0, 120)}`);
      return res;
    } catch (e) {
      lastErr = e;
      if (!/HTTP 429/.test(e.message)) await sleep(backoffMs * (i + 1));
    }
  }
  throw lastErr;
}

export async function sparql(query) {
  const url = `${WIKIDATA_SPARQL}?query=${encodeURIComponent(query)}&format=json`;
  const res = await fetchWithRetry(url, { headers: { Accept: "application/sparql-results+json" } });
  const data = await res.json();
  return data.results.bindings;
}

export function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

export function round5(n) {
  return Math.round(n / 5) * 5;
}
export function round15(n) {
  return Math.round(n / 15) * 15;
}
export function fmtDriveTime(minutes) {
  const rounded = Math.max(5, round15(minutes));
  const hr = Math.floor(rounded / 60);
  const min = rounded % 60;
  if (hr === 0) return `about ${min} min`;
  if (min === 0) return `about ${hr} hr`;
  return `about ${hr} hr ${min} min`;
}
export function fmtMiles(miles) {
  const r = Math.max(1, round5(miles));
  return r === 1 ? "~1 mile" : `~${r} miles`;
}

// Parses a Wikidata "Point(lon lat)" literal into { lat, lon }.
export function parsePoint(wkt) {
  const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(wkt || "");
  if (!m) return null;
  return { lon: parseFloat(m[1]), lat: parseFloat(m[2]) };
}
