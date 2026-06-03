"use client";

import { Reveal } from "@/components/effects/reveal-on-scroll";
import { useVideo } from "./video-dialog";

export function DemoVideo() {
  const { open } = useVideo();

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <Reveal as="section" className="relative z-[1] overflow-hidden px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="demo-orb demo-orb-a" aria-hidden="true" />
      <div className="demo-orb demo-orb-b" aria-hidden="true" />
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        30-second demo
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        Watch your inbox <span className="text-grad">manage itself</span>.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-10 max-w-[520px] mx-auto leading-relaxed">
        See triage, voice-matched drafts, and one-click unsubscribe work end to
        end — no narration of features, just the product.
      </p>

      <div className="relative z-[1] max-w-[860px] mx-auto">
        <button
          type="button"
          onClick={() => open("demo-section")}
          onMouseMove={onMove}
          aria-label="Play the Mini Brief demo"
          className="demo-card group relative block w-full overflow-hidden rounded-2xl border border-white/[0.10] bg-[rgba(13,21,40,0.6)] shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_50px_rgba(74,98,245,0.10)] outline-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent-b focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[10px] tracking-[0.12em] uppercase text-fg-3">
              Mini Brief — live demo
            </span>
          </div>

          <div className="relative aspect-video w-full">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(74,98,245,0.22), transparent 70%)",
              }}
            />
            <div className="demo-scan" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="relative h-16 w-16 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                <span className="demo-ring" aria-hidden="true" />
                <span className="demo-ring delay" aria-hidden="true" />
                <span className="demo-play flex h-16 w-16 items-center justify-center rounded-full bg-accent-b shadow-[0_10px_34px_rgba(74,98,245,0.5)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="font-display text-[15px] font-semibold text-white">
                Watch the 30-second demo
              </span>
            </div>
          </div>

          <div className="demo-spotlight" aria-hidden="true" />
        </button>
      </div>
    </Reveal>
  );
}
