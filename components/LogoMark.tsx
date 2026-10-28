// Brand mark: a bold "A" (for Albany) with coral motion lines sweeping past
// on the left and a horn/signal shape flaring out through the gap — reads as
// "fast, always on call," not a literal taxi-cab icon. The "A" strokes use
// currentColor so it adapts to dark or light backgrounds via the wrapping
// element's text color; the motion lines and horn stay a fixed coral, which
// is constant across both placements.

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 8 8 56M32 8 56 56"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points="30,34 58,24 58,44 30,40" fill="#FF5A36" />
      <g stroke="#FF5A36" strokeWidth="4" strokeLinecap="round">
        <line x1="0" y1="24" x2="16" y2="24" />
        <line x1="0" y1="33" x2="20" y2="33" />
        <line x1="0" y1="42" x2="10" y2="42" />
      </g>
    </svg>
  );
}
