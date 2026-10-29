"""
Replaces the live Overpass API calls in refresh-town-hubs.mjs with a local
pass over Geofabrik .osm.pbf extracts (New York, Massachusetts, Vermont),
filtered with pyosmium. Same tag categories as the Overpass version, same
ODbL data (OpenStreetMap contributors) — just read locally instead of
queried live, since the public Overpass endpoint rate-limited this
project's IP mid-session.

Also matches towns with no Wikidata coordinate (content/town-hub-wikidata.json)
to an OSM place node (place=town/village/hamlet/...) with the same name in
the same state, so they can still get a center coordinate, airport drive
times, and a nearby-places list.

Usage: python scripts/town-hubs/extract_local_places.py
Reads:  scratch/osm-extracts/{new-york,massachusetts,vermont}-latest.osm.pbf
        content/town-hub-wikidata.json   (town coordinates)
        content/cities.json, content/states.json
Writes: content/town-hub-osm-centers.json
        { "<town-slug>": {"lat":..., "lon":..., "source":"osm", "population":...?} }
        content/town-hub-local-places.json
        { "<town-slug>": { "<group>": [ {"name":..., "lat":..., "lon":..., "website":...?}, ... ] } }
Each group capped to the nearest 15 by straight-line distance — the same
cap refresh-town-hubs.mjs applied before handing candidates to the OSRM
table call, kept here so that step doesn't change.
"""
import json
import math
import os
import re
import sys
import time
import osmium

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
EXTRACTS_DIR = os.path.join(ROOT, "scratch", "osm-extracts")
WIKIDATA_FILE = os.path.join(ROOT, "content", "town-hub-wikidata.json")
CITIES_FILE = os.path.join(ROOT, "content", "cities.json")
STATES_FILE = os.path.join(ROOT, "content", "states.json")
OSM_CENTERS_OUT_FILE = os.path.join(ROOT, "content", "town-hub-osm-centers.json")
OUT_FILE = os.path.join(ROOT, "content", "town-hub-local-places.json")

EXTRACTS = [
    ("new-york-latest.osm.pbf", "New York"),
    ("massachusetts-latest.osm.pbf", "Massachusetts"),
    ("vermont-latest.osm.pbf", "Vermont"),
]

RADIUS_MILES = 15.53  # 25km, matches the Overpass version's around:25000
CAP_PER_GROUP = 15

QUAD_RE = re.compile(r"\bquad(rangle)?\b", re.IGNORECASE)
PLACE_VALUES = {"city", "town", "village", "hamlet", "isolated_dwelling", "locality"}
PLACE_PRIORITY = {"town": 0, "village": 1, "hamlet": 2, "city": 3, "locality": 4, "isolated_dwelling": 5}


def normalize_name(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def get_website(tags):
    return tags.get("website") or tags.get("contact:website")


def categorize(tags):
    # Aerialway infrastructure (chair lifts, gondolas, cable cars, drag
    # lifts) and piste segments (ski trails) are lift/trail furniture, not
    # a place — exclude them, but keep the resort itself (e.g. "Windham
    # Mountain Club"), which is tagged as the sports_centre/area feature
    # without an aerialway or piste:type tag.
    if "aerialway" in tags or "piste:type" in tags:
        return None
    amenity = tags.get("amenity")
    leisure = tags.get("leisure")
    tourism = tags.get("tourism")
    sport = tags.get("sport", "")
    name = tags.get("name", "")
    if amenity in ("restaurant", "bar", "pub"):
        return "dinner-and-nights-out"
    if leisure == "park":
        # College campus quads are frequently tagged leisure=park but
        # aren't a useful "getting around" destination for this list.
        if QUAD_RE.search(name):
            return None
        return "getting-around"
    if tourism == "guest_house" or tourism == "trailhead":
        return "getting-around"
    if "ski" in sport.lower():
        return "getting-around"
    if amenity in ("hospital", "clinic", "doctors", "townhall"):
        return "appointments"
    return None


class PlaceHandler(osmium.SimpleHandler):
    def __init__(self, state_name):
        super().__init__()
        self.state_name = state_name
        self.places = []  # (name, lat, lon, group, website)
        self.town_nodes = []  # (name, lat, lon, place_value, population)

    def node(self, n):
        name = n.tags.get("name")
        if not name:
            return
        place_val = n.tags.get("place")
        if place_val in PLACE_VALUES:
            pop_raw = n.tags.get("population")
            population = None
            if pop_raw:
                digits = re.sub(r"[^\d]", "", pop_raw)
                if digits:
                    population = int(digits)
            self.town_nodes.append((name, n.location.lat, n.location.lon, place_val, population))
        group = categorize(n.tags)
        if not group:
            return
        self.places.append((name, n.location.lat, n.location.lon, group, get_website(n.tags)))

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
        self.places.append((name, sum(lats) / len(lats), sum(lons) / len(lons), group, get_website(w.tags)))


def haversine_miles(lat1, lon1, lat2, lon2):
    R = 3958.8
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlambda / 2) ** 2
    return R * 2 * math.asin(math.sqrt(a))


def main():
    t0 = time.time()
    all_places = []  # (name, lat, lon, group, website)
    town_nodes_by_state = {}  # state_name -> [(name, lat, lon, place_value, population), ...]
    for filename, state_name in EXTRACTS:
        p = os.path.join(EXTRACTS_DIR, filename)
        if not os.path.exists(p):
            print(f"MISSING: {p} — run scratch/download-osm-extracts.mjs first", file=sys.stderr)
            sys.exit(1)
        print(f"Parsing {filename} ...")
        h = PlaceHandler(state_name)
        h.apply_file(p, locations=True)
        print(f"  {len(h.places)} tagged places, {len(h.town_nodes)} named place-nodes found")
        all_places.extend(h.places)
        town_nodes_by_state[state_name] = h.town_nodes
    print(f"Total places across all 3 states: {len(all_places)} (took {time.time()-t0:.0f}s)")

    # --- Match towns with no Wikidata coordinate to an OSM place node ---
    with open(WIKIDATA_FILE, "r", encoding="utf-8") as f:
        wikidata = json.load(f)
    with open(CITIES_FILE, "r", encoding="utf-8") as f:
        cities = json.load(f)
    with open(STATES_FILE, "r", encoding="utf-8") as f:
        states = json.load(f)
    state_name_by_id = {s["id"]: s["name"] for s in states}

    missing = [c for c in cities if c["slug"] not in wikidata]
    node_index = {}
    for state_name, nodes in town_nodes_by_state.items():
        for name, lat, lon, place_val, population in nodes:
            key = (state_name, normalize_name(name))
            node_index.setdefault(key, []).append((lat, lon, population, place_val))

    osm_centers = {}
    unmatched = []
    for c in missing:
        state_name = state_name_by_id.get(c["stateId"])
        candidates = node_index.get((state_name, normalize_name(c["name"])))
        if not candidates:
            unmatched.append(c["slug"])
            continue
        candidates = sorted(candidates, key=lambda x: PLACE_PRIORITY.get(x[3], 9))
        lat, lon, population, _ = candidates[0]
        entry = {"lat": lat, "lon": lon, "source": "osm"}
        if population:
            entry["population"] = population
        osm_centers[c["slug"]] = entry

    with open(OSM_CENTERS_OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(osm_centers, f, indent=2)
    print(f"Matched {len(osm_centers)} of {len(missing)} missing towns to an OSM place node.")
    if unmatched:
        print(f"Still unmatched ({len(unmatched)}): {', '.join(unmatched)}")

    # --- Nearby-places lookup, for every town with any coordinate ---
    coords_by_slug = dict(wikidata)
    for slug, c in osm_centers.items():
        coords_by_slug.setdefault(slug, c)

    CELL = 0.25  # ~0.25-degree grid-bucket spatial index (~15-17mi at this latitude)
    grid = {}
    for place in all_places:
        _, lat, lon, _, _ = place
        key = (math.floor(lat / CELL), math.floor(lon / CELL))
        grid.setdefault(key, []).append(place)

    out = {}
    t1 = time.time()
    for slug, coord in coords_by_slug.items():
        lat, lon = coord["lat"], coord["lon"]
        cell_lat, cell_lon = math.floor(lat / CELL), math.floor(lon / CELL)
        candidates = []
        for dlat in (-1, 0, 1):
            for dlon in (-1, 0, 1):
                candidates.extend(grid.get((cell_lat + dlat, cell_lon + dlon), []))

        by_group = {"dinner-and-nights-out": [], "getting-around": [], "appointments": []}
        for name, plat, plon, group, website in candidates:
            dist = haversine_miles(lat, lon, plat, plon)
            if dist <= RADIUS_MILES:
                by_group[group].append((dist, name, plat, plon, website))

        town_out = {}
        for group, items in by_group.items():
            items.sort(key=lambda x: x[0])
            town_out[group] = [
                ({"name": name, "lat": plat, "lon": plon, "website": website} if website else {"name": name, "lat": plat, "lon": plon})
                for _, name, plat, plon, website in items[:CAP_PER_GROUP]
            ]
        out[slug] = town_out

    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
    print(f"Wrote {OUT_FILE} for {len(out)} towns (took {time.time()-t1:.0f}s)")


if __name__ == "__main__":
    main()
