import { Reveal } from "@/components/effects/reveal-on-scroll";

const SHIFTS = [
  { before: "187 emails a day", after: "one ranked brief" },
  { before: "20-message threads", after: "the answer, pulled out" },
  { before: "Every reply", after: "drafted in your voice" },
];

export function OutcomeBand() {
  return (
    <Reveal as="section" variant="fade" className="relative z-[1] px-6 sm:px-12 py-12 sm:py-16">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        What changes
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-10 leading-[1.15] text-[clamp(26px,3.8vw,40px)] max-w-[680px] mx-auto">
        What used to eat your morning now takes{" "}
        <span className="text-grad">minutes</span>.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[920px] mx-auto">
        {SHIFTS.map((s) => (
          <div
            key={s.after}
            className="flex flex-col items-center text-center gap-2 rounded-xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)] px-5 py-7"
          >
            <span className="font-display text-[15px] font-medium text-fg-3 line-through decoration-fg-3/40">
              {s.before}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5b72ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="rotate-90"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
            <span className="font-display text-[18px] font-bold text-white tracking-[-0.01em]">
              {s.after}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
