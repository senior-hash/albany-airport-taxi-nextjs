// Small hand-authored line-icon set — no icon library dependency. Consistent
// 1.75px stroke, 24x24 viewBox, inherits color via currentColor so each use
// site controls color/size with normal Tailwind classes.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PlaneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 13.5 20 7c1-.4 2 .2 1.6 1.4L19 14l-3 1-2-4-3 2-1 3-2 .5 1-4-5.5-1.5Z" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function CarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 16V11l2-5h12l2 5v5" />
      <path d="M2 16h20v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3Z" />
      <circle cx="7" cy="16" r="1.5" />
      <circle cx="17" cy="16" r="1.5" />
    </svg>
  );
}

export function HeartPulseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 20s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-.6 1.1-1.3 2.1-2 3" />
      <path d="M3 13h3l2-3 2 5 2-7 1.5 5H16" />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16" />
      <path d="M14 10h4a1 1 0 0 1 1 1v10M3 21h18" />
      <path d="M8 8h1M8 12h1M8 16h1M17 14h1M17 17h1" />
    </svg>
  );
}

export function RouteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="5" r="2" />
      <path d="M7 19h7a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4H10a4 4 0 0 1-4-4V5" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 5c0-1 1-2 2-2h2l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 13l5 2v2c0 1-1 2-2 2C10.5 19 4 12.5 4 5Z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
