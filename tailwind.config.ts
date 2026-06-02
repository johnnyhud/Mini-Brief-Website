import type { Config } from "tailwindcss";

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
          3: "#4a5278",
        },
        mini: "#6b7299",
        live: "#22d3a0",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
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
  plugins: [require("tailwindcss-animate")],
};

export default config;
