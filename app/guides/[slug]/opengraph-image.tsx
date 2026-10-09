import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { WORDMARK } from "@/lib/brand";
import { getSiteGuide, siteGuides } from "@/lib/site-guides";

export const alt = "MiniBrief guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return siteGuides.map((guide) => ({ slug: guide.slug }));
}

// Rendered at build time from local files, in the style of app/opengraph-image.tsx.
export default async function GuideOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getSiteGuide((await params).slug);
  const title = guide?.title ?? WORDMARK;
  const [icon, interRegular, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), "public/photos/MiniBrief-Icon-Mono-Ink.png")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-Regular.ttf")),
    readFile(join(process.cwd(), "app/fonts/og/Inter-SemiBold.ttf")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

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
            background: "radial-gradient(ellipse at 100% 45%, rgba(58,95,220,0.08), rgba(245,245,247,0) 75%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={iconSrc} width={46} height={46} style={{ borderRadius: 12 }} alt="" />
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.035em", display: "flex" }}>{WORDMARK}</div>
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#475569" }}>minibrief.app</div>
        </div>
        <div
          style={{
            marginTop: 96,
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
          <div style={{ display: "flex", width: 28, height: 1, background: "#3A5FDC" }} />
          Guides
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.055em",
            display: "flex",
            width: 1000,
          }}
        >
          {title}
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
