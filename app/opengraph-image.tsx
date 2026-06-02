import { ImageResponse } from "next/og";

export const alt = "MiniBrief — Email intelligence for Gmail and Outlook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#070c18",
          backgroundImage:
            "radial-gradient(ellipse 90% 50% at 50% -10%, rgba(74,98,245,0.16), transparent 70%)",
          padding: 80,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#0d1528",
              borderRadius: 13,
              border: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="23" viewBox="0 0 38 30" fill="none">
              <rect x="1" y="1" width="36" height="28" rx="4" stroke="#5b72ff" strokeWidth="2.5" />
              <path d="M1 7l18 12L37 7" stroke="#5b72ff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", display: "flex" }}>
            <span style={{ color: "#6b7299" }}>Mini</span>
            <span>Brief</span>
            <span style={{ color: "#5b72ff" }}>.ai</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", gap: 22 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Email intelligence for executives who can&apos;t afford to miss things.
          </div>
          <div style={{ fontSize: 26, color: "#8892b0", maxWidth: 900, display: "flex" }}>
            Works in Gmail and Outlook. Your email content is processed in your browser, never stored on our servers.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#4a5278",
          }}
        >
          <div style={{ display: "flex" }}>minibrief.ai</div>
          <div style={{ display: "flex" }}>Launching soon · Chrome &amp; Firefox</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
