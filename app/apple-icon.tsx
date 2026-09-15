import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: 166,
            height: 166,
            borderRadius: "50%",
            border: "8px solid #10233f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "4px solid #c8912f",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 56, fontWeight: 700, color: "#10233f", lineHeight: 1 }}>AT</span>
            <span
              style={{
                fontSize: 13,
                letterSpacing: 2,
                color: "#c8912f",
                marginTop: 8,
              }}
            >
              ALBANY · NY
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
