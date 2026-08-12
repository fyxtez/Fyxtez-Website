import { ImageResponse } from "next/og";

export const alt =
  "Fyxtez — Rust engineer building real-time systems and software products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        overflow: "hidden",
        background: "#090909",
        color: "#f3f3f1",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5a623",
            color: "#111",
            fontSize: 34,
            fontWeight: 800,
            fontStyle: "italic",
          }}
        >
          F
        </div>
        <div style={{ display: "flex", fontSize: 25, fontWeight: 700, letterSpacing: 4 }}>
          FYXTEZ
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div
          style={{
            display: "flex",
            color: "#f5a623",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Rust Engineer · Real-Time Systems · Product Engineering
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 25,
            fontSize: 68,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          Engineering systems that solve real problems.
        </div>
      </div>
      <div style={{ display: "flex", color: "#a0a09a", fontSize: 20 }}>
        Rust · React · Automation · Web · Desktop · Mobile
      </div>
    </div>,
    size,
  );
}
