import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple's own mask rounds the corners of whatever square we give it, so
// (unlike icon.svg's circle-on-transparent) this needs a full-bleed square
// background or the corners show through as transparent/white. Same "A"
// monogram as icon.svg for visual consistency with the wordmark logo.
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
          background: "#0B0F1A",
        }}
      >
        <span style={{ fontSize: 100, fontWeight: 700, color: "#FFD60A" }}>A</span>
      </div>
    ),
    { ...size }
  );
}
