import { Reveal } from "@/components/effects/reveal-on-scroll";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PILLARS = [
  {
    label: "Email never stored",
    sub: "Your messages never reach our servers",
    icon: (
      <svg {...iconProps}>
        <rect width="18" height="11" x="3" y="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Runs in your browser",
    sub: "Parsing and AI prompts built locally",
    icon: (
      <svg {...iconProps}>
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    label: "Zero tracking",
    sub: "No analytics, telemetry, or pixels",
    icon: (
      <svg {...iconProps}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    label: "Account ≠ your mail",
    sub: "Your account syncs settings, never messages",
    icon: (
      <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m22 11-3 3-1.5-1.5" />
      </svg>
    ),
  },
];

export function TrustBand() {
  return (
    <Reveal as="section" variant="fade" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        Why you can trust it
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)] max-w-[720px] mx-auto">
        Most AI email tools upload your inbox to their servers.{" "}
        <span className="text-grad">Mini Brief never does.</span>
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-10 max-w-[560px] mx-auto leading-relaxed">
        Trust here is structural, not a badge we bought. It comes from how the
        product is built.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1040px] mx-auto">
        {PILLARS.map((p) => (
          <div
            key={p.label}
            className="group flex flex-col items-center text-center rounded-xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)] px-5 py-7 transition-colors duration-300 hover:border-accent-b/30"
          >
            <div className="mb-3.5 w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(74,98,245,0.10)] border border-[rgba(74,98,245,0.20)] text-accent-b transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
              {p.icon}
            </div>
            <div className="font-display text-[15px] font-semibold text-white tracking-[-0.01em]">
              {p.label}
            </div>
            <div className="font-body text-[12px] text-fg-3 mt-1 leading-snug max-w-[180px]">
              {p.sub}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
