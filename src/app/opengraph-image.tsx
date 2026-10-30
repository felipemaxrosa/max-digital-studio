import { ImageResponse } from "next/og";

export const alt = "Max Digital Studio — Identidade Visual & Landing Pages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#090A0F",
          padding: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 280,
            width: 680,
            height: 680,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.45), rgba(9,10,15,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            color: "#38BDF8",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Estratégia + Design + Engenharia
        </div>
        <div
          style={{
            color: "#F8FAFC",
            fontSize: 74,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
            maxWidth: 940,
          }}
        >
          Sites que conectam ideias a resultados reais.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 48 }}>
          <div
            style={{
              width: 64,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg,#2563EB,#38BDF8)",
              display: "flex",
            }}
          />
          <div style={{ color: "#F8FAFC", fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
            MAX DIGITAL STUDIO
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
