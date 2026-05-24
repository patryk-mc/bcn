import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1c3b6f 0%, #365388 60%, #1c3b6f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "72px 80px",
        }}
      >
        {/* Top: logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 64 64">
              <path d="M32 12 L54 32 L10 32 Z" fill="#ffffff" opacity="0.95" />
              <rect x="16" y="32" width="32" height="22" rx="2" fill="none" stroke="#ffffff" strokeWidth="2.4" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: "0.04em" }}>
              BCN
            </div>
            <div style={{ display: "flex", fontSize: 14, letterSpacing: "0.24em", opacity: 0.85 }}>
              IDEAL SERVICES
            </div>
          </div>
        </div>

        {/* Bottom block */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.18em",
              color: "#E6C98A",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Reliable services · Barcelona
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: "-0.022em",
              marginBottom: 24,
            }}
          >
            Your stop for reliable, expert and friendly home services.
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.8 }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size
  );
}
