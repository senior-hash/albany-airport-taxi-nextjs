import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple's own mask rounds the corners of whatever square we give it, so
// (unlike icon.svg's circle-on-transparent) this needs a full-bleed square
// background or the corners show through as transparent/white. Same car
// glyph as icon.svg for visual consistency.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f2d57",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 16V11l2-5h12l2 5v5"
            stroke="#ffc72c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 16h20v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3Z"
            stroke="#ffc72c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="16" r="1.6" fill="#ffc72c" />
          <circle cx="17" cy="16" r="1.6" fill="#ffc72c" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
