import { ImageResponse } from "next/og";

export const alt = "FYXTEZ — Systems and automation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const gold = "#f5a623";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#f4f1ea",
        color: "#111111",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "72px",
      }}
    >
      {/* Leva grafika */}
      <div
        style={{
          width: "38%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              width: 90,
              height: 90,
              border: `5px solid ${gold}`,
              borderRadius: 18,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 110,
              left: 135,
              width: 105,
              height: 105,
              border: `5px solid ${gold}`,
              borderRadius: 18,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 66,
              left: 88,
              width: 115,
              height: 5,
              background: gold,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 62,
              left: 140,
              width: 14,
              height: 14,
              borderRadius: 999,
              background: gold,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 70,
              left: 185,
              width: 5,
              height: 82,
              background: gold,
              display: "flex",
            }}
          />
        </div>
      </div>

      {/* Desni sadržaj */}
      <div
        style={{
          width: "62%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 8,
            color: gold,
          }}
        >
          FYXTEZ
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 34,
            fontSize: 72,
            lineHeight: 1.02,
            fontWeight: 900,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>BUILDING SYSTEMS.</div>

          <div style={{ display: "flex" }}>
            SOLVING&nbsp;
            <span style={{ color: gold }}>REAL PROBLEMS.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 38,
            fontSize: 24,
            color: "#555555",
          }}
        >
          Build · Automate · Integrate · Deliver
        </div>
      </div>
    </div>,
    size,
  );
}