import { Reveal } from "@/components/effects/reveal-on-scroll";

type Row = { label: string; them: string; us: string; highlight?: boolean };

const ROWS: Row[] = [
  {
    label: "Where your email lives",
    them: "Uploaded to their servers",
    us: "Stays in your browser — never stored",
    highlight: true,
  },
  { label: "Where it runs", them: "A separate app to live in", us: "Inside Gmail and Outlook" },
  { label: "Drafts in your voice", them: "Generic AI tone", us: "Learned from your sent mail" },
  { label: "Knows your clients", them: "No relationship layer", us: "Profiles, cadence, and health alerts" },
  { label: "Tracking and telemetry", them: "Usually on", us: "None" },
  { label: "Your own AI key", them: "Rarely an option", us: "Optional, never required" },
];

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-fg-3/60">
      <path d="M5 12h14" />
    </svg>
  );
}

export function Comparison() {
  return (
    <Reveal as="section" variant="left" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        Side by side
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        Mini Brief vs. the usual approach.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-10 max-w-[520px] mx-auto leading-relaxed">
        Same inbox help. A fundamentally different deal with your data.
      </p>

      <div className="max-w-[860px] mx-auto overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)]">
        {/* Header */}
        <div className="grid grid-cols-[1.1fr_1fr_1fr] sm:grid-cols-[1.3fr_1fr_1fr]">
          <div className="px-4 sm:px-6 py-4" />
          <div className="px-4 sm:px-6 py-4 text-center font-body text-[12px] sm:text-[13px] font-semibold text-fg-3 border-l border-white/[0.06]">
            Typical AI inbox tools
          </div>
          <div className="px-4 sm:px-6 py-4 text-center font-display text-[13px] sm:text-[14px] font-bold text-white bg-[rgba(74,98,245,0.10)] border-l border-accent-border">
            Mini Brief
          </div>
        </div>

        {ROWS.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-[1.1fr_1fr_1fr] sm:grid-cols-[1.3fr_1fr_1fr] border-t border-white/[0.06]"
          >
            <div className={`px-4 sm:px-6 py-4 font-body text-[13px] sm:text-[14px] font-medium ${r.highlight ? "text-white" : "text-fg-2"}`}>
              {r.label}
            </div>
            <div className="px-4 sm:px-6 py-4 font-body text-[12px] sm:text-[13px] text-fg-3 border-l border-white/[0.06] flex items-start gap-2">
              <Dash />
              <span>{r.them}</span>
            </div>
            <div className={`px-4 sm:px-6 py-4 font-body text-[12px] sm:text-[13px] leading-snug border-l border-accent-border flex items-start gap-2 ${r.highlight ? "bg-[rgba(74,98,245,0.10)] text-white" : "bg-[rgba(74,98,245,0.05)] text-fg-2"}`}>
              <Check />
              <span>{r.us}</span>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
