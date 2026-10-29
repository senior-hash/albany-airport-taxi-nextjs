"use client";

import { useEffect, useRef, useState } from "react";

// Photon (photon.komoot.io) — a free, no-API-key geocoder built on
// OpenStreetMap data, run by komoot. Chosen over Google Places Autocomplete
// specifically to avoid adding a paid, billing-account-gated dependency for
// a small local site. Results are biased (not restricted) toward the
// service area via lat/lon, so an address anywhere still works — this just
// ranks nearby matches first.
const PHOTON_ENDPOINT = "https://photon.komoot.io/api/";
// Albany, NY — center of the service area, used only to bias ranking.
const BIAS_LAT = 42.6526;
const BIAS_LON = -73.7562;
const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 3;

type PhotonProperties = {
  name?: string;
  housenumber?: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
};

type Suggestion = { id: string; label: string };

function formatSuggestion(props: PhotonProperties): string {
  const parts: string[] = [];
  const line1 = [props.housenumber, props.street].filter(Boolean).join(" ");
  parts.push(line1 || props.name || "");
  const line2 = [props.city, props.state].filter(Boolean).join(", ");
  if (line2) parts.push(line2);
  if (props.postcode) parts.push(props.postcode);
  return parts.filter(Boolean).join(", ");
}

export function AddressAutocomplete({
  id,
  name,
  label,
  required,
  className = "",
  seed,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  /** External value to adopt once (e.g. "Get a ride to [place]" links) —
   * seeds the field without making it a fully controlled input. */
  seed?: string;
}) {
  const [value, setValue] = useState(seed ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Adopt a new seed value during render (not in an effect, per React's
  // "you might not need an effect" guidance) by tracking the last seed seen.
  const [lastSeed, setLastSeed] = useState(seed);
  if (seed !== lastSeed) {
    setLastSeed(seed);
    if (seed) {
      setValue(seed);
      setOpen(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(newValue: string) {
    setValue(newValue);
    setHighlighted(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (newValue.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const thisRequestId = ++requestIdRef.current;
      try {
        const url = `${PHOTON_ENDPOINT}?q=${encodeURIComponent(newValue)}&limit=5&lat=${BIAS_LAT}&lon=${BIAS_LON}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const json = await res.json();
        if (thisRequestId !== requestIdRef.current) return; // a newer request superseded this one
        const results: Suggestion[] = (json.features ?? [])
          .map((f: { properties: PhotonProperties }, i: number) => ({
            id: String(i),
            label: formatSuggestion(f.properties),
          }))
          .filter((s: Suggestion) => s.label);
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch {
        // Geocoder unreachable — the field still works as plain free text.
      }
    }, DEBOUNCE_MS);
  }

  function selectSuggestion(s: Suggestion) {
    setValue(s.label);
    setSuggestions([]);
    setOpen(false);
    setHighlighted(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
    } else if (e.key === "Enter") {
      if (highlighted >= 0) {
        e.preventDefault();
        selectSuggestion(suggestions[highlighted]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <label htmlFor={id} className="block text-xs font-medium text-ink">{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
      />
      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-surface shadow-lg"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              role="option"
              aria-selected={i === highlighted}
              onMouseDown={(e) => {
                e.preventDefault(); // keep focus on input, skip blur-before-click
                selectSuggestion(s);
              }}
              onMouseEnter={() => setHighlighted(i)}
              className={`cursor-pointer px-3 py-2 text-sm ${i === highlighted ? "bg-background text-ink" : "text-ink-muted"}`}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
