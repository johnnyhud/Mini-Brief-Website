import { Reveal } from "@/components/effects/reveal-on-scroll";

const PILLARS = [
  {
    title: "Your email never reaches our servers",
    desc: "Messages are read in your browser and sent only to the AI provider that generates your results. Our servers never receive your email content, so there is nothing on our side to leak, sell, or hand over.",
  },
  {
    title: "Zero tracking, zero telemetry",
    desc: "No analytics SDKs, no pixels, and no behavioral logging. Mini Brief does not phone home, so we cannot see what you read, who you email, or how you use it.",
  },
  {
    title: "Your account holds settings, not mail",
    desc: "A Mini Brief account is required, and it syncs your preferences and VIPs across devices. It never stores the contents of your emails — only you and the AI ever see those.",
  },
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3a0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Privacy() {
  return (
    <Reveal as="section" variant="right" id="privacy" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="relative max-w-[920px] mx-auto rounded-3xl border border-accent-border bg-[rgba(13,21,40,0.55)] backdrop-blur-md overflow-hidden">
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 w-[460px] h-[200px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(74,98,245,0.22), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-b to-transparent"
          aria-hidden="true"
        />

        <div className="relative px-7 sm:px-12 py-10 sm:py-12">
          <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 mb-4">
            Privacy
          </div>
          <h2 className="font-display font-bold tracking-[-0.02em] text-white leading-[1.15] text-[clamp(26px,3.8vw,40px)] max-w-[600px]">
            Your email stays in your browser.
          </h2>
          <p className="font-body text-[15px] text-fg-2 leading-relaxed mt-3 max-w-[560px]">
            Mini Brief needs an account, but your email content never does. Messages are processed in your browser and sent only to the AI that generates your results — never to our servers, and never stored.
          </p>

          <div className="mt-8 flex flex-col divide-y divide-white/[0.06] border-t border-white/[0.06]">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(34,211,160,0.12)] border border-[rgba(34,211,160,0.4)] shrink-0">
                  <CheckIcon />
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-bold text-white mb-1 tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="font-body text-[13px] text-fg-2 leading-[1.6] max-w-[640px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3 mt-8">
            Email never stored · Processed in your browser · No tracking
          </p>
        </div>
      </div>
    </Reveal>
  );
}
