"""
Replaces the live Overpass API calls in refresh-town-hubs.mjs with a local
pass over Geofabrik .osm.pbf extracts (New York, Massachusetts, Vermont),
filtered with pyosmium. Same tag categories as the Overpass version, same
ODbL data (OpenStreetMap contributors) — just read locally instead of
queried live, since the public Overpass endpoint rate-limited this
project's IP mid-session.

Usage: python scripts/town-hubs/extract_local_places.py
Reads:  scratch/osm-extracts/{new-york,massachusetts,vermont}-latest.osm.pbf
        content/town-hub-wikidata.json   (town coordinates)
Writes: content/town-hub-local-places.json
        { "<town-slug>": { "<group>": [ {"name":..., "lat":..., "lon":...}, ... ] } }
Each group capped to the nearest 15 by straight-line distance — the same
cap refresh-town-hubs.mjs applied before handing candidates to the OSRM
table call, kept here so that step doesn't change.
"""
import json
import math
import os
import sys
import time
import osmium

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
EXTRACTS_DIR = os.path.join(ROOT, "scratch", "osm-extracts")
WIKIDATA_FILE = os.path.join(ROOT, "content", "town-hub-wikidata.json")
OUT_FILE = os.path.join(ROOT, "content", "town-hub-local-places.json")

EXTRACTS = ["new-york-latest.osm.pbf", "massachusetts-latest.osm.pbf", "vermont-latest.osm.pbf"]

RADIUS_MILES = 15.53  # 25km, matches the Overpass version's around:25000
CAP_PER_GROUP = 15

def categorize(tags):
    amenity = tags.get("amenity")
    leisure = tags.get("leisure")
    tourism = tags.get("tourism")
    sport = tags.get("sport", "")
    if amenity in ("restaurant", "bar", "pub"):
        return "dinner-and-nights-out"
    if leisure == "park" or tourism == "guest_house" or tourism == "trailhead" or "ski" in sport.lower():
        return "getting-around"
    if amenity in ("hospital", "clinic", "doctors", "townhall"):
        return "appointments"
    return None


class PlaceHandler(osmium.SimpleHandler):
    def __init__(self):
        super().__init__()
        self.places = []  # list of (name, lat, lon, group)

    def node(self, n):
        name = n.tags.get("name")
        if not name:
            return
        group = categorize(n.tags)
        if not group:
            return
        self.places.append((name, n.location.lat, n.location.lon, group))

    def way(self, w):
        name = w.tags.get("name")
        if not name:
            return
        group = categorize(w.tags)
        if not group:
            return
        lats, lons = [], []
        for nref in w.nodes:
            if nref.location.valid():
                lats.append(nref.location.lat)
                lons.append(nref.location.lon)
        if not lats:
            return
        self.places.append((name, sum(lats) / len(lats), sum(lons) / len(lons), group))


def haversine_miles(lat1, lon1, lat2, lon2):
    R = 3958.8
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlambda / 2) ** 2
    return R * 2 * math.asin(math.sqrt(a))


def main():
    t0 = time.time()
    all_places = []  # (name, lat, lon, group)
    for filename in EXTRACTS:
        path = os.path.join(EXTRACTS_DIR, filename)
        if not os.path.exists(path):
            print(f"MISSING: {path} — run scratch/download-osm-extracts.mjs first", file=sys.stderr)
            sys.exit(1)
        print(f"Parsing {filename} ...")
        h = PlaceHandler()
        h.apply_file(path, locations=True)
        print(f"  {len(h.places)} tagged places found")
        all_places.extend(h.places)
    print(f"Total places across all 3 states: {len(all_places)} (took {time.time()-t0:.0f}s)")

    # Grid-bucket spatial index: ~0.25-degree cells (~15-17 miles at this
    # latitude) so each town only has to scan its own cell + 8 neighbors
    # instead of comparing against every place in 3 states.
    CELL = 0.25
    grid = {}
    for place in all_places:
        _, lat, lon, _ = place
        key = (math.floor(lat / CELL), math.floor(lon / CELL))
        grid.setdefault(key, []).append(place)

    with open(WIKIDATA_FILE, "r", encoding="utf-8") as f:
        wikidata = json.load(f)

    out = {}
    t1 = time.time()
    for slug, coord in wikidata.items():
        lat, lon = coord["lat"], coord["lon"]
        cell_lat, cell_lon = math.floor(lat / CELL), math.floor(lon / CELL)
        candidates = []
        for dlat in (-1, 0, 1):
            for dlon in (-1, 0, 1):
                candidates.extend(grid.get((cell_lat + dlat, cell_lon + dlon), []))

        by_group = {"dinner-and-nights-out": [], "getting-around": [], "appointments": []}
        for name, plat, plon, group in candidates:
            dist = haversine_miles(lat, lon, plat, plon)
            if dist <= RADIUS_MILES:
                by_group[group].append((dist, name, plat, plon))

        town_out = {}
        for group, items in by_group.items():
            items.sort(key=lambda x: x[0])
            town_out[group] = [
                {"name": name, "lat": plat, "lon": plon} for _, name, plat, plon in items[:CAP_PER_GROUP]
            ]
        out[slug] = town_out

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
    print(f"Wrote {OUT_FILE} for {len(out)} towns (took {time.time()-t1:.0f}s)")


if __name__ == "__main__":
    main()
