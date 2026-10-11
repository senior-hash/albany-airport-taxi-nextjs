import { SERVICE_AREA_MAP } from "@/lib/service-area-map-data";

// Real US Census county boundary data (see scripts/generate-service-area-map.ts)
// — not a stylized/fabricated shape. Pure static SVG, no JS or map API needed,
// so it's safe to drop into an iframe on another site.
export function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={SERVICE_AREA_MAP.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Map of the 23-county service area across New York, Vermont, and Massachusetts"
    >
      {SERVICE_AREA_MAP.contextStates.map((s) => (
        <path key={s.name} d={s.d} fill="#f3f2ee" stroke="#d8d5cc" strokeWidth={1.5} />
      ))}
      <path
        d={SERVICE_AREA_MAP.countyMesh}
        fill="none"
        stroke="#d8d5cc"
        strokeWidth={0.75}
        strokeLinejoin="round"
      />
      {SERVICE_AREA_MAP.counties.map((c) => (
        <path
          key={c.name}
          d={c.d}
          fill="#0f2d57"
          fillOpacity={0.82}
          stroke="#fafaf8"
          strokeWidth={1.25}
          strokeLinejoin="round"
        />
      ))}
      <circle
        cx={SERVICE_AREA_MAP.albanyAirport.x}
        cy={SERVICE_AREA_MAP.albanyAirport.y}
        r={7}
        fill="#ffc72c"
        stroke="#0f2d57"
        strokeWidth={2}
      />
    </svg>
  );
}
