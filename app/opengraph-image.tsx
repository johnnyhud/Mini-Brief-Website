import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, metadata } from "@/content/home";
import { WORDMARK } from "@/lib/brand";

export const alt = metadata.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time from local files; nothing is fetched.
export default async function OpengraphImage() {
  const [icon, shot, interRegular, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/executive-on-light.png")),
    readFile(join(process.cwd(), "public/shots/hero.png")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-SemiBold.ttf")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  const shotSrc = `data:image/png;base64,${shot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F5F5F7",
          color: "#07091A",
          padding: "48px 64px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 650,
            display: "flex",
            background:
              "radial-gradient(ellipse at 100% 45%, rgba(58,95,220,0.08), rgba(245,245,247,0) 75%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={iconSrc}
              width={80}
              height={46}
              alt=""
            />
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: "-0.035em",
                display: "flex",
              }}
            >
              {WORDMARK}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#475569" }}>
            minibrief.app
          </div>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#3A5FDC",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 28,
              height: 1,
              background: "#3A5FDC",
            }}
          />
          Gmail + Outlook. One clear brief.
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.055em",
            display: "flex",
            flexDirection: "column",
            width: 620,
          }}
        >
          <div style={{ display: "flex" }}>{hero.h1}</div>
          <div style={{ display: "flex", color: "#3A5FDC" }}>
            {hero.accent}
          </div>
        </div>

        <div
          style={{
            marginTop: 25,
            fontSize: 21,
            lineHeight: 1.5,
            color: "#475569",
            width: 510,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Replies in your voice.</div>
          <div style={{ display: "flex" }}>Every promise in view.</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 57,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "16px 22px",
              borderRadius: 10,
              background: "#3A5FDC",
              color: "#ffffff",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {hero.primary.label}
            <span style={{ fontSize: 21 }}>↗</span>
          </div>
          <div style={{ display: "flex", fontSize: 15, color: "#475569" }}>
            Now in beta
          </div>
        </div>

        {/* Crop the existing product shot to its brief pane, preserving its proportions. */}
        <div
          style={{
            position: "absolute",
            left: 720,
            top: 167,
            width: 596,
            height: 540,
            display: "flex",
            flexDirection: "column",
            borderRadius: 17,
            border: "1px solid rgba(7,9,26,0.12)",
            background: "#ffffff",
            boxShadow: "0 28px 90px rgba(7,9,26,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 42,
              padding: "0 20px",
              background: "#F5F5F7",
              borderBottom: "1px solid rgba(7,9,26,0.08)",
              color: "#07091A",
              fontSize: 12,
            }}
          >
            <span>Your morning brief</span>
            <span style={{ color: "#475569" }}>MiniBrief</span>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              height: 498,
              overflow: "hidden",
              background: "#f3f4f6",
            }}
          >
            <img
              src={shotSrc}
              width={1040}
              height={650}
              alt=""
              style={{ position: "absolute", left: -424, top: -30 }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
