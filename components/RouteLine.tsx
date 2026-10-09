// Decorative route-line graphic used on dark bands (hero, PageHeading).
// A single winding line from a pickup dot to a plane — abstract road +
// flight path, echoing the "airport transfer" positioning without relying
// on photography. Flat, no gradients, low-opacity so it reads as texture
// rather than competing with the heading text.

export function RouteLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 360"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice"
    >
      <path
        d="M-20 300 C 90 300 110 230 190 220 C 290 207 300 120 400 95 C 450 82 470 60 505 35"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 14"
        opacity="0.85"
      />
      <circle cx="-20" cy="300" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="190" cy="220" r="3" fill="currentColor" opacity="0.8" />
      <g transform="translate(470 42) rotate(-28)" opacity="1">
        <path
          d="M0 10 17 3c1-.5 2 .2 1.6 1.4L15 9l-2.5.8-1.7-3.3-2.5 1.6-.8 2.5-1.7.4.8-3.3L2 5.8Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
