import { CountUp } from "@/components/effects/count-up";
import { Reveal } from "@/components/effects/reveal-on-scroll";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function MailGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

type Stat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
};

const STATS: Stat[] = [
  {
    value: 1,
    suffix: "",
    label: "Inbox supported today — Outlook coming soon",
    icon: (
      <svg {...iconProps}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: " days",
    label: "Default before a silent VIP escalates",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    value: 1,
    suffix: "-click",
    label: "Permanent unsubscribe, written as a filter",
    icon: (
      <svg {...iconProps}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "",
    label: "Sent emails sampled to match your voice",
    icon: (
      <svg {...iconProps}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
];

export function AtAGlance() {
  return (
    <Reveal as="section" className="relative z-[1] px-6 sm:px-12 py-12 sm:py-16">
      <div className="relative max-w-[1040px] mx-auto rounded-2xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)] backdrop-blur-md shadow-[0_20px_56px_rgba(0,0,0,0.38)] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-b to-transparent"
          aria-hidden="true"
        />

        {/* Providers */}
        <div className="flex flex-col items-center text-center px-6 py-9 sm:py-11">
          <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 mb-4">
            Built for Gmail and Outlook
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: "Gmail", status: "Available now", live: true },
              { name: "Outlook", status: "Coming soon", live: false },
            ].map(({ name, status, live }) => (
              <div
                key={name}
                className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 transition-colors duration-300 ${
                  live
                    ? "border-white/[0.10] bg-white/[0.03] hover:border-accent-b/30"
                    : "border-dashed border-white/[0.08] bg-white/[0.015]"
                }`}
              >
                <span className={live ? "text-accent-b/80" : "text-fg-3"}>
                  <MailGlyph />
                </span>
                <span
                  className={`font-display text-[14px] font-semibold ${
                    live ? "text-white" : "text-fg-2"
                  }`}
                >
                  {name}
                </span>
                <span
                  className={`font-body text-[11px] font-medium ${
                    live
                      ? "text-fg-3"
                      : "rounded-full bg-accent-dim px-2 py-0.5 text-accent-b/80"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
          <p className="font-body text-[13px] text-fg-3 mt-4 max-w-[460px] leading-relaxed">
            Mini Brief works inside your existing webmail the moment you open it.
            Your email content never leaves for our servers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.07] divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center px-5 py-8 sm:py-9 transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div className="mb-3.5 w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(74,98,245,0.10)] border border-[rgba(74,98,245,0.20)] text-accent-b transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
                {s.icon}
              </div>
              <div className="flex items-end justify-center leading-none mb-2">
                <span className="text-gradient-num font-display text-[34px] sm:text-[40px] font-extrabold tracking-[-0.03em]">
                  <CountUp to={s.value} decimals={s.decimals ?? 0} />
                </span>
                {s.suffix ? (
                  <span className="ml-0.5 font-display text-[19px] sm:text-[21px] font-bold text-accent-b">
                    {s.suffix}
                  </span>
                ) : null}
              </div>
              <div className="font-body text-[12.5px] text-fg-2 leading-snug max-w-[190px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
