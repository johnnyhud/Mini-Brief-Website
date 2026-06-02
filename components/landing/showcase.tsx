"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { useStreamingText } from "@/components/effects/use-streaming-text";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

const TONES_ORDER: Array<keyof typeof TONES> = ["quick", "friendly", "professional"];
const TONES: Record<string, string> = {
  quick: "Friday at 9am works — see you then!",
  friendly: "Hey Sarah, Friday at 9 sounds great. Looking forward to it — let me know if anything shifts on your end!",
  professional:
    "Hi Sarah — Friday at 9:00 AM works on my calendar. I've blocked the slot and added the call link. Speak then.",
};

const SUMMARY_PROSE =
  "Team is debating Q4 priorities ahead of Friday's board meeting. API shipping is the leading candidate (James, Priya). Pricing page is still open — needs resolution before the deck is finalized. ";
const SUMMARY_ACTION = "Action needed from you.";
const SUMMARY_TOTAL = SUMMARY_PROSE + SUMMARY_ACTION;

type DemoProps = { isActive: boolean };

type DemoConfig = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  Demo: React.ComponentType<DemoProps>;
  demoTitle: string;
};

const DEMOS: DemoConfig[] = [
  {
    id: "summary",
    tag: "Triage",
    title: "We read every thread for you.",
    desc: "Mini Brief scans the full thread the moment you open it. However long the back-and-forth, you get the key points, who needs what, and the next action.",
    bullets: [
      "TLDR, action items, and sentiment for any thread length",
      "Reads up to 4,000 characters per email for accuracy",
      "Cached per email — second open is instant, zero token cost",
    ],
    Demo: SummaryDemo,
    demoTitle: "Thread: Q4 planning — next steps",
  },
  {
    id: "drafts",
    tag: "Voice",
    title: "We draft replies in your voice.",
    desc: "Mini Brief studies your sent folder to learn your voice, including greetings, sign-offs, and formality, then generates replies that read like you wrote them.",
    bullets: [
      "Learns from up to 100 of your real sent emails",
      "Three intent presets: Concise, Standard, Detailed",
      "Tone check before you send — flags aggressive or unclear lines",
    ],
    Demo: DraftsDemo,
    demoTitle: "Smart Reply — Sarah Chen",
  },
  {
    id: "unsubscribe",
    tag: "Unsubscribe",
    title: "We make unsubscribe permanent.",
    desc: "One click does two things. It fires the RFC 8058 unsubscribe and writes a permanent filter, so if the sender rotates subdomains the next email is still trashed automatically.",
    bullets: [
      "RFC 8058 one-click + mailto fallback",
      "Persistent Gmail server-side filter (not a label rule)",
      "Survives newsletter subdomain rotation",
    ],
    Demo: UnsubscribeDemo,
    demoTitle: "Marketing Daily — 5 new offers",
  },
];

export function Showcase() {
  return (
    <section className="relative z-[1] px-6 sm:px-12 py-14 sm:py-20 border-t border-white/[0.05]">
      <div className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/70 text-center mb-3">
        What it does
      </div>
      <h2 className="font-display font-bold tracking-[-0.02em] text-white text-center mb-2 leading-[1.15] text-[clamp(26px,3.8vw,40px)]">
        Three things it does, <span className="text-grad">every day</span>.
      </h2>
      <p className="font-body text-[15px] text-fg-2 text-center mb-14 sm:mb-20 max-w-[520px] mx-auto leading-relaxed">
        Not a list of features — the work Mini Brief takes off your plate the
        moment you open your inbox.
      </p>

      <div className="flex flex-col gap-20 sm:gap-28 max-w-[1080px] mx-auto">
        {DEMOS.map((d, i) => (
          <ShowcaseRow key={d.id} demo={d} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ShowcaseRow({ demo, flip }: { demo: DemoConfig; flip: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const Demo = demo.Demo;

  return (
    <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
      <div className={flip ? "md:order-2" : ""}>
        <span className="font-body text-[12px] font-semibold tracking-[0.08em] uppercase text-accent-b/80 inline-block mb-4">
          {demo.tag}
        </span>
        <h3 className="font-display font-extrabold tracking-[-0.025em] text-white mb-4 leading-[1.08] text-[clamp(26px,3.4vw,40px)]">
          {demo.title}
        </h3>
        <p className="font-body text-[15px] text-fg-2 leading-[1.7] mb-6 max-w-[460px]">
          {demo.desc}
        </p>
        <ul className="flex flex-col gap-3">
          {demo.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 font-body text-[14px] text-fg-2 leading-relaxed"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(74,98,245,0.12)] border border-[rgba(74,98,245,0.30)]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5b72ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div ref={ref} className={flip ? "md:order-1" : ""}>
        <div className="showcase-demo">
          <DemoBar title={demo.demoTitle} />
          <div className="p-3.5">
            <Demo isActive={inView} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function SummaryDemo({ isActive }: DemoProps) {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setRunning(false);
      return;
    }
    const t = window.setTimeout(() => setRunning(true), 600);
    return () => window.clearTimeout(t);
  }, [isActive]);

  const { text, done } = useStreamingText(SUMMARY_TOTAL, running, { msPerTick: 18, charsPerTick: 2 });
  const prose = text.slice(0, Math.min(text.length, SUMMARY_PROSE.length));
  const action = text.length > SUMMARY_PROSE.length ? text.slice(SUMMARY_PROSE.length) : "";

  return (
    <>
      <ThreadItem from="Maya → Team" when="3 days ago" body="Hi all — can we align on Q4 priorities? I'm thinking we should focus on growth, but want everyone's input before the board meeting on Friday..." />
      <ThreadItem from="James → Maya" when="2 days ago" body="Agree on growth but we need to ship the API first. Without that, enterprise deals fall through. Can we make that the top priority?" />
      <ThreadItem from="Priya → All" when="Yesterday" body="+1 on the API. Also — we still haven't resolved the pricing page issue from last sprint. Should block the board deck until we agree..." />

      <div className="mt-3">
        {!running ? (
          <button
            type="button"
            onClick={() => setRunning(true)}
            className="w-full rounded-[10px] border border-dashed border-accent-border bg-[rgba(74,98,245,0.04)] hover:bg-[rgba(74,98,245,0.10)] px-3.5 py-3 transition-colors text-left"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SparkIcon />
                <span className="font-display text-[13px] font-semibold text-white">Summarize this thread</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-accent-b opacity-70">click →</span>
            </div>
          </button>
        ) : (
          <div className="rounded-[10px] border border-accent-border bg-[rgba(74,98,245,0.08)] p-3.5 animate-in fade-in slide-in-from-bottom-1 duration-300">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase text-accent-b">
                <span className="w-[5px] h-[5px] rounded-full bg-accent-b shadow-[0_0_5px_var(--accent-b)] animate-pulse" />
                AI Summary
                {!done && <span className="text-fg-3 normal-case tracking-normal ml-1.5 text-[10px]">generating…</span>}
              </div>
            </div>
            <p className="font-body text-[12px] text-[#aab0cc] leading-[1.55] min-h-[64px]">
              {prose}
              {action && <strong className="text-accent-b">{action}</strong>}
              {!done && (
                <span className="inline-block w-[6px] h-[12px] bg-accent-b ml-0.5 align-text-bottom animate-pulse" aria-hidden="true" />
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function DraftsDemo({ isActive }: DemoProps) {
  const [tone, setTone] = useState<keyof typeof TONES>("quick");
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!isActive || !autoCycle) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTone((curr) => {
        const i = TONES_ORDER.indexOf(curr);
        return TONES_ORDER[(i + 1) % TONES_ORDER.length];
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [isActive, autoCycle]);

  const onPick = (k: keyof typeof TONES) => {
    setAutoCycle(false);
    setTone(k);
  };

  return (
    <>
      <div className="font-body text-[11px] text-fg-3 mb-2">Re: Q2 roadmap — can we push to Friday?</div>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {TONES_ORDER.map((k) => (
          <button
            key={k}
            onClick={() => onPick(k)}
            className={`px-3.5 py-2 min-h-[32px] rounded-full font-mono text-[10px] tracking-[0.1em] uppercase transition-colors border ${
              tone === k
                ? "bg-[rgba(74,98,245,0.30)] border-[rgba(74,98,245,0.6)] text-white"
                : "bg-accent-dim border-accent-border text-accent-b hover:bg-[rgba(74,98,245,0.30)] hover:border-[rgba(74,98,245,0.6)] hover:text-white"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div
        key={tone}
        className="rounded-lg border border-accent-border bg-[rgba(74,98,245,0.07)] px-3.5 py-3 font-body text-[12px] text-[#aab0cc] leading-relaxed min-h-[80px] animate-in fade-in slide-in-from-bottom-1 duration-300"
      >
        {TONES[tone]}
      </div>
    </>
  );
}

type UnsubStage = "idle" | "filtering" | "done";

function UnsubscribeDemo({ isActive }: DemoProps) {
  const [stage, setStage] = useState<UnsubStage>("idle");

  useEffect(() => {
    if (!isActive) {
      setStage("idle");
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("done");
      return;
    }
    const t1 = window.setTimeout(() => setStage("filtering"), 1800);
    const t2 = window.setTimeout(() => setStage("done"), 3500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isActive]);

  return (
    <>
      <div className="px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg,#7a4a99,#aa70cc)" }}>
          M
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[12px] font-semibold text-white">Marketing Daily</div>
          <div className="font-body text-[11px] text-fg-3 truncate">Your weekly digest — 5 hand-picked offers inside</div>
        </div>
        <span className="font-mono text-[9px] text-fg-3 shrink-0">Mon</span>
      </div>

      <div className="rounded-[10px] border border-accent-border bg-[rgba(74,98,245,0.06)] p-3.5 min-h-[124px] transition-all">
        {stage === "idle" && (
          <div className="animate-in fade-in duration-300">
            <button
              type="button"
              onClick={() => setStage("filtering")}
              className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 bg-[rgba(74,98,245,0.18)] border border-accent-border hover:bg-[rgba(74,98,245,0.28)] transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <UnsubIcon />
                <span className="font-display text-[13px] font-semibold text-white">Unsubscribe &amp; auto-trash</span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-accent-b">click →</span>
            </button>
            <p className="font-body text-[11px] text-fg-3 mt-2 leading-relaxed">
              Fires the sender's RFC 8058 unsubscribe AND writes a Gmail filter so future emails skip the inbox.
            </p>
          </div>
        )}

        {stage === "filtering" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-[10px] h-[10px] rounded-full border-2 border-accent-b border-t-transparent animate-spin" />
              <span className="font-display text-[13px] font-semibold text-white">Creating Gmail filter…</span>
            </div>
            <div className="font-mono text-[10px] text-fg-3 leading-relaxed pl-4">
              ▸ POSTing unsubscribe to sender<br />
              ▸ Writing filter: from:(*marketingdaily.com) → trash
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-live/20 border border-live/50">
                <CheckIcon />
              </span>
              <span className="font-display text-[13px] font-semibold text-white">Filter created — permanent.</span>
            </div>
            <p className="font-body text-[12px] text-[#aab0cc] leading-[1.55]">
              Future emails from <span className="text-accent-b">marketingdaily.com</span> (and any subdomain) auto-trash via Gmail's server-side filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-b" aria-hidden="true">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}

function UnsubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-b" aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="14" y2="15" />
      <line x1="14" y1="11" x2="10" y2="15" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22d3a0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DemoBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/[0.07]">
      <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
      <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
      <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
      <span className="ml-1 font-display text-[11px] font-semibold text-fg-2 truncate">{title}</span>
    </div>
  );
}

function ThreadItem({ from, when, body }: { from: string; when: string; body: string }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-1.5">
      <div className="font-display text-[11px] font-semibold text-white mb-0.5">
        {from} <span className="text-fg-3 font-normal">· {when}</span>
      </div>
      <div className="font-body text-[11px] text-fg-3 leading-[1.45]">{body}</div>
    </div>
  );
}
