import type { Config } from "tailwindcss";
import { brandColors } from "./lib/brand";

// Inter, vendored; app/layout.tsx sets --font-inter on <html>.
const inter = ["var(--font-inter)", "Inter", "system-ui", "sans-serif"];

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070c18",
        surface: "#0d1528",
        elevated: "#131c38",
        accent: {
          DEFAULT: "#4a62f5",
          b: "#5b72ff",
          dim: "rgba(74,98,245,0.18)",
          glow: "rgba(74,98,245,0.30)",
          border: "rgba(74,98,245,0.30)",
        },
        fg: {
          DEFAULT: "#ffffff",
          2: "#8892b0",
          3: "#7a84ab",
        },
        mini: "#6b7299",
        live: "#22d3a0",
        border: "rgba(255,255,255,0.08)",
        paper: {
          DEFAULT: "#faf9f5",
          2: "#f1efe9",
        },
        ink: {
          DEFAULT: "#202433",
          2: "#6a7080",
        },
        // The light set the home page is built on (lib/brand.ts). Prefixed
        // because `ink` above is already taken by the dark set.
        brand: {
          ink: brandColors.ink,
          blue: brandColors.blue,
          "blue-hover": brandColors.blueHover,
          page: brandColors.page,
          muted: brandColors.muted,
          "muted-text": brandColors.mutedText,
        },
      },
      boxShadow: {
        // Two soft layers: a hairline and a long, faint drop. Ink-tinted so it
        // reads as depth, not dirt.
        card: "0 1px 2px rgba(7,9,26,0.04), 0 12px 32px -16px rgba(7,9,26,0.16)",
        frame: "0 1px 1px rgba(7,9,26,0.05), 0 2px 6px rgba(7,9,26,0.05), 0 40px 80px -32px rgba(7,9,26,0.28)",
      },
      fontFamily: {
        sans: inter,
        display: inter,
        body: inter,
        mono: inter,
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(74,98,245,0.3)" },
          "50%": { boxShadow: "0 0 44px rgba(74,98,245,0.55)" },
        },
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        "orbit-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "live-pulse": "live-pulse 2s ease-in-out infinite",
        "orbit-spin": "orbit-spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
