// One-off generator: produces lib/service-area-map-data.ts from real US Census
// county boundary data (via the `us-atlas` package, derived from Census TIGER
// files — public domain). Run with `npm run generate-service-area-map`
// whenever the service-area county list changes. Not part of the regular
// build — its output is a committed, static data file.
import { feature, mesh } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import counties10m from "us-atlas/counties-10m.json" with { type: "json" };
import states10m from "us-atlas/states-10m.json" with { type: "json" };
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Minimal shape for what we actually read off the us-atlas TopoJSON — avoids
// depending on the (unpublished-on-npm) `topojson-specification` type package.
type Topology = {
  type: "Topology";
  objects: Record<string, unknown>;
  arcs: unknown;
  transform?: unknown;
};

// Real county names in our 23-county service area, keyed by state FIPS.
// Matched by name against the topology (not hardcoded FIPS) so a typo here
// fails loudly (missing county) rather than silently rendering the wrong one.
const SERVICE_AREA: Record<string, string[]> = {
  "36": [
    // New York
    "Albany",
    "Columbia",
    "Delaware",
    "Dutchess",
    "Essex",
    "Franklin",
    "Fulton",
    "Greene",
    "Hamilton",
    "Herkimer",
    "Montgomery",
    "Otsego",
    "Rensselaer",
    "Saratoga",
    "Schenectady",
    "Schoharie",
    "Ulster",
    "Warren",
    "Washington",
    "Clinton",
  ],
  "50": ["Bennington", "Rutland"], // Vermont
  "25": ["Berkshire"], // Massachusetts
};

const CONTEXT_STATES = ["36", "50", "25", "09", "33", "42", "34"]; // NY, VT, MA, CT, NH, PA, NJ — for a recognizable backdrop

type CountyProps = { name: string };

function main() {
  const topology = counties10m as unknown as Topology;
  const stateTopology = states10m as unknown as Topology;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allCounties = feature(topology as any, topology.objects.counties as any) as unknown as FeatureCollection<
    Geometry,
    CountyProps
  >;

  const matched: Feature<Geometry, CountyProps>[] = [];
  const missing: string[] = [];

  for (const [stateFips, names] of Object.entries(SERVICE_AREA)) {
    for (const name of names) {
      const found = allCounties.features.find(
        (f) => f.id?.toString().slice(0, 2) === stateFips && f.properties.name === name
      );
      if (found) {
        matched.push(found);
      } else {
        missing.push(`${name} (state ${stateFips})`);
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(`Could not match these counties by name: ${missing.join(", ")}`);
  }

  const serviceAreaFC: FeatureCollection<Geometry, CountyProps> = {
    type: "FeatureCollection",
    features: matched,
  };

  // Context backdrop: faint outlines of the surrounding states, and an
  // internal mesh of all county borders within the service-area states (so
  // non-served counties within NY/VT/MA show as thin lines for geographic
  // orientation, not as filled/highlighted shapes).
  const allStates = feature(
    stateTopology as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    stateTopology.objects.states as any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) as unknown as FeatureCollection<Geometry, { name: string }>;
  const contextStates: FeatureCollection<Geometry, { name: string }> = {
    type: "FeatureCollection",
    features: allStates.features.filter((f) => CONTEXT_STATES.includes(String(f.id))),
  };

  const serviceAreaStateIds = new Set(["36", "50", "25"]);
  const countyMesh = mesh(
    topology as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    topology.objects.counties as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    (a: any, b: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
      a !== b &&
      serviceAreaStateIds.has(String(a.id).slice(0, 2)) &&
      serviceAreaStateIds.has(String(b.id).slice(0, 2))
  );

  // Project. Centered roughly on the service area (Capital Region NY out to
  // the Berkshires/southern VT), Mercator is fine at this small a regional
  // scale (no meaningful distortion over ~150mi).
  const WIDTH = 760;
  const HEIGHT = 760;
  const projection = geoMercator().fitExtent(
    [
      [24, 24],
      [WIDTH - 24, HEIGHT - 24],
    ],
    serviceAreaFC
  );
  const path = geoPath(projection);

  const countyPaths = matched.map((f) => ({
    name: f.properties.name,
    d: path(f) ?? "",
  }));

  // Albany International Airport (ALB) — our home base / dispatch point.
  // Real published coordinates, projected through the same transform as
  // everything else so it lands in the right spot on the generated map.
  const ALB_COORDS: [number, number] = [-73.8017, 42.7483];
  const albPoint = projection(ALB_COORDS);
  if (!albPoint) throw new Error("Albany airport coordinates projected outside the map");
  const contextStatePaths = contextStates.features.map((f) => ({
    name: f.properties.name,
    d: path(f) ?? "",
  }));
  const countyMeshPath = path(countyMesh) ?? "";

  const out = `// GENERATED FILE — do not hand-edit.
// Produced by scripts/generate-service-area-map.ts from US Census county
// boundary data (via the `+"`us-atlas`"+` package). Regenerate with:
//   npm run generate-service-area-map

export const SERVICE_AREA_MAP = {
  viewBox: "0 0 ${WIDTH} ${HEIGHT}",
  counties: ${JSON.stringify(countyPaths, null, 2)},
  contextStates: ${JSON.stringify(contextStatePaths, null, 2)},
  countyMesh: ${JSON.stringify(countyMeshPath)},
  albanyAirport: { x: ${albPoint[0]}, y: ${albPoint[1]} },
} as const;
`;

  const outPath = join(process.cwd(), "lib", "service-area-map-data.ts");
  writeFileSync(outPath, out);
  console.log(`Wrote ${matched.length} counties to ${outPath}`);

  writeEmbedHtml({
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    counties: countyPaths,
    contextStates: contextStatePaths,
    countyMesh: countyMeshPath,
    albanyAirport: { x: albPoint[0], y: albPoint[1] },
  });
}

function writeEmbedHtml(data: {
  viewBox: string;
  counties: { name: string; d: string }[];
  contextStates: { name: string; d: string }[];
  countyMesh: string;
  albanyAirport: { x: number; y: number };
}) {
  const svgParts: string[] = [];
  svgParts.push(
    `<svg viewBox="${data.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of the 23-county service area across New York, Vermont, and Massachusetts">`
  );
  for (const s of data.contextStates) {
    svgParts.push(`<path d="${s.d}" fill="#f3f2ee" stroke="#d8d5cc" stroke-width="1.5"/>`);
  }
  svgParts.push(
    `<path d="${data.countyMesh}" fill="none" stroke="#d8d5cc" stroke-width="0.75" stroke-linejoin="round"/>`
  );
  for (const c of data.counties) {
    svgParts.push(
      `<path d="${c.d}" fill="#0f2d57" fill-opacity="0.82" stroke="#fafaf8" stroke-width="1.25" stroke-linejoin="round"/>`
    );
  }
  svgParts.push(
    `<circle cx="${data.albanyAirport.x}" cy="${data.albanyAirport.y}" r="7" fill="#ffc72c" stroke="#0f2d57" stroke-width="2"/>`
  );
  svgParts.push(`</svg>`);
  const svgMarkup = svgParts.join("\n      ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Albany Airport Taxi &amp; Limo &mdash; Service Area Map</title>
<meta name="robots" content="noindex" />
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #fafaf8;
    color: #14171f;
    padding: 12px;
  }
  .wrap { max-width: 640px; margin: 0 auto; }
  svg { width: 100%; height: auto; display: block; }
  .footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
    flex-wrap: wrap;
  }
  .footer a {
    color: #0f2d57;
    font-weight: 600;
    text-decoration: none;
  }
  .footer a:hover { text-decoration: underline; }
  .muted { color: #4b5262; }
</style>
</head>
<body>
  <div class="wrap">
    ${svgMarkup}
    <div class="footer">
      <span class="muted">23-county service area &mdash; NY, VT &amp; MA</span>
      <a href="https://albanyairport.taxi/service-area" target="_blank" rel="noopener">
        Albany Airport Taxi &amp; Limo &rarr;
      </a>
    </div>
  </div>
</body>
</html>
`;

  const outDir = join(process.cwd(), "public", "embed");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "service-area-map.html");
  writeFileSync(outPath, html);
  console.log(`Wrote embeddable map to ${outPath}`);
}

main();
