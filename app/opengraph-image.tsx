import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background: "#10233f",
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "10px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "5px solid #c8912f",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 88, fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>AT</span>
            <span style={{ fontSize: 20, letterSpacing: 3, color: "#c8912f", marginTop: 12 }}>
              ALBANY · NY
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 64, fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
            Albany Airport Taxi
          </span>
          <span style={{ fontSize: 64, fontWeight: 400, color: "#c8912f", lineHeight: 1.15 }}>
            &amp; Limo Service
          </span>
          <span style={{ fontSize: 26, color: "#ffffff", marginTop: 28, opacity: 0.85 }}>
            24/7 to ALB · JFK · LGA · EWR · Boston Logan · NYC
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
