import { Reveal } from "@/components/effects/reveal-on-scroll";

const FEATURES = [
  {
    title: "Catch-up reports",
    desc: "Back after time away? One ranked digest of what actually happened, instead of a wall of unread rows.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    title: "VIP alerts and escalation",
    desc: "Flag the people who matter. If a VIP thread goes quiet past the window you set, Mini Brief raises it to critical.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Smart classification",
    desc: "Every email is sorted by importance and type the moment it lands, so noise stays out of the way of what needs you.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <rect width="7" height="5" x="7" y="7" rx="1" />
        <path d="M10 14h4" />
      </svg>
    ),
  },
  {
    title: "Meeting prep",
    desc: "Before a call, Mini Brief pulls the thread history into a tight brief so you walk in already up to speed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Snooze with reliable wake",
    desc: "Archive a thread now and return it to the inbox in minutes or hours. Wake timers survive browser restarts, so nothing is lost.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22a10 10 0 1 1 8.94-14.55" />
        <path d="M12 7v5l3 2" />
        <path d="M16 16h6" />
        <path d="M19 13v6" />
      </svg>
    ),
  },
  {
    title: "Tone check before send",
    desc: "Scores a draft for professionalism and flags aggressive, passive-aggressive, or unclear lines before you send it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <Reveal as="section" className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        More in the toolkit
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        And it keeps earning its keep.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-12 max-w-[520px] mx-auto leading-relaxed">
        Beyond triage, drafting, and unsubscribe, Mini Brief quietly handles the
        rest of the inbox grind.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1040px] mx-auto">
        {FEATURES.map((f) => (
          <div key={f.title} className="feat-inner h-full !p-5 sm:!p-6">
            <div className="feat-icon w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(74,98,245,0.10)] border border-[rgba(74,98,245,0.20)] mb-3.5">
              {f.icon}
            </div>
            <h3 className="font-display text-[17px] font-semibold text-white mb-1.5 tracking-[-0.01em]">{f.title}</h3>
            <p className="font-body text-[13px] text-fg-2 leading-[1.6]">{f.desc}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
