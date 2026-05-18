import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Frazs — Premium Websites & AI Assistants for UK Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient blobs */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,111,245,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: 28, fontWeight: 800 }}>F</span>
          </div>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}>
            Frazs
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#0f172a",
          textAlign: "center", lineHeight: 1.15, marginBottom: 20,
          maxWidth: 900, letterSpacing: "-1.5px",
        }}>
          Premium Websites &amp;{" "}
          <span style={{
            background: "linear-gradient(135deg, #3b6ff5, #7c3aed)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
            AI Assistants
          </span>
        </div>

        {/* Subline */}
        <div style={{
          fontSize: 24, color: "#64748b", textAlign: "center",
          maxWidth: 700, lineHeight: 1.5,
        }}>
          Built for UK businesses. No setup fee. Results guaranteed.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          {["£0 Setup Fee", "24/7 AI Support", "UK Based"].map((tag) => (
            <div key={tag} style={{
              padding: "10px 22px", borderRadius: 50,
              background: "rgba(59,111,245,0.07)",
              border: "1px solid rgba(59,111,245,0.2)",
              color: "#3b6ff5", fontSize: 18, fontWeight: 600,
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute", bottom: 32,
          fontSize: 18, color: "#94a3b8", fontWeight: 500,
        }}>
          frazs.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
