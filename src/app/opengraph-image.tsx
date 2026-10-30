import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "Max Digital Studio — Identidade Visual & Landing Pages";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Lido em tempo de build (a imagem OG é pré-renderizada no build).
const markSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "src/app/og-mark.png"),
).toString("base64")}`;

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
          padding: "72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -120,
            width: 680,
            height: 680,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.45), rgba(9,10,15,0) 70%)",
            display: "flex",
          }}
        />
        {/* Símbolo "M" */}
        <img src={markSrc} width={118} height={92} alt="" />
        <div
          style={{
            color: "#38BDF8",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginTop: 40,
          }}
        >
          Estratégia + Design + Engenharia
        </div>
        <div
          style={{
            color: "#F8FAFC",
            fontSize: 68,
            fontWeight: 800,
            marginTop: 16,
            lineHeight: 1.05,
            maxWidth: 960,
          }}
        >
          Sites que conectam ideias a resultados reais.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 40 }}>
          <div
            style={{
              width: 64,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg,#2563EB,#38BDF8)",
              display: "flex",
            }}
          />
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>
            MAX DIGITAL STUDIO
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
