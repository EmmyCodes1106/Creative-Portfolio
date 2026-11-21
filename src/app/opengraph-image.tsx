import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "EmmyCodes — Fadayomi Emmanuel, Software Developer & Creative Technologist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmark = `data:image/png;base64,${readFileSync(
  path.join(process.cwd(), "public/brand/wordmark-on-dark.png"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101114",
          color: "#F3F1EB",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 17,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A0A2AA",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wordmark} alt="" width={236} height={39} />
          </div>
          <span>Portfolio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              lineHeight: 0.98,
              letterSpacing: -3.5,
              fontWeight: 600,
              maxWidth: 1000,
            }}
          >
            Turning ideas into functional and{" "}
            <span style={{ color: "#7FB0F7" }}>creative solutions.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#A0A2AA" }}>
            Fadayomi Emmanuel — Software Developer &amp; Creative Technologist
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2B2D34",
            paddingTop: 24,
            fontSize: 15,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#A0A2AA",
          }}
        >
          <span>Software developer &amp; creative technologist</span>
          <span style={{ color: "#7FB0F7" }}>EmmyCodes</span>
        </div>
      </div>
    ),
    size,
  );
}
