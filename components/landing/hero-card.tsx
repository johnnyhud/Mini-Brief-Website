"use client";

import { useState, type KeyboardEvent } from "react";

type Cat = "respond" | "fyi" | "mute";

type DemoEmail = {
  id: string;
  initial: string;
  gradient: string;
  from: string;
  preview: string;
  time: string;
  category: string;
  cat: Cat;
  summary: string;
  action: string;
  vip?: boolean;
};

const EMAILS: DemoEmail[] = [
  {
    id: "sarah",
    initial: "S",
    gradient: "linear-gradient(135deg,#3a52e0,#6b82ff)",
    from: "Sarah Chen",
    preview: "Re: Q2 roadmap — can we push to Friday?",
    time: "9:42am",
    category: "To respond",
    cat: "respond",
    summary:
      "Sarah wants to push the Q2 roadmap review from Wed to Friday — engineering review is bleeding into Wed afternoon. She's offering 9am or 2pm Friday.",
    action: "Reply with Friday availability",
    vip: true,
  },
  {
    id: "marcus",
    initial: "M",
    gradient: "linear-gradient(135deg,#2d4a9a,#5570cc)",
    from: "Marcus Liu",
    preview: "Design file updated — check the new hero section",
    time: "8:17am",
    category: "FYI",
    cat: "fyi",
    summary:
      "Marcus pushed v3 of the homepage Figma. Only material change is the hero section — copy unchanged, layout tightened. No decision required.",
    action: "Skim Figma when free — no blocker",
  },
  {
    id: "aisha",
    initial: "A",
    gradient: "linear-gradient(135deg,#2d7a4a,#44cc7a)",
    from: "Aisha Osei",
    preview: "Contract signed! Next steps for onboarding...",
    time: "Tue",
    category: "To respond",
    cat: "respond",
    summary:
      "Aisha countersigned the Pilot SOW. She's asking who the technical contact is for kickoff and proposing two onboarding slots this week.",
    action: "Send kickoff invite + name tech lead",
  },
  {
    id: "kira",
    initial: "K",
    gradient: "linear-gradient(135deg,#7a4a99,#aa70cc)",
    from: "Kira (Ops)",
    preview: "FYI: Q1 invoice approved — no action needed",
    time: "Mon",
    category: "No reply",
    cat: "mute",
    summary:
      "Routine FYI: the Q1 vendor invoice cleared finance. Auto-tagged 'No reply needed' — quiet by default unless you ask to see it.",
    action: "Auto-archive on close",
  },
];

const INITIAL_UNREAD = new Set(["sarah", "aisha"]);

const CAT_STYLES: Record<Cat, string> = {
  respond: "text-accent-b bg-[rgba(74,98,245,0.12)] border-[rgba(74,98,245,0.30)]",
  fyi: "text-fg-2 bg-white/[0.05] border-white/[0.12]",
  mute: "text-fg-3 bg-white/[0.03] border-white/[0.08]",
};

function CalloutChip({
  className,
  delay,
  icon,
  label,
}: {
  className: string;
  delay: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={`hero-anim hidden sm:flex absolute z-[3] items-center gap-2 rounded-full border border-white/[0.12] bg-[rgba(13,21,40,0.92)] backdrop-blur-md px-3.5 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(74,98,245,0.16)] text-accent-b">
        {icon}
      </span>
      <span className="font-display text-[12px] font-semibold text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function HeroCard() {
  const [selectedId, setSelectedId] = useState<string>(EMAILS[0].id);
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(EMAILS.filter((e) => !INITIAL_UNREAD.has(e.id)).map((e) => e.id)),
  );

  const selectEmail = (id: string) => {
    setSelectedId(id);
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const selected = EMAILS.find((e) => e.id === selectedId) ?? EMAILS[0];

  return (
    <div className="hero-card-wrap hero-anim relative" style={{ animationDelay: "0.25s" }}>
      <CalloutChip
        className="-right-4 lg:-right-10 top-[20%]"
        delay="0.5s"
        label="Instant triage"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>
        }
      />
      <CalloutChip
        className="-left-4 lg:-left-10 bottom-[24%]"
        delay="0.65s"
        label="Drafts in your voice"
        icon={
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        }
      />

      <div className="hero-card">
        <div className="relative z-[2] flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <div className="inline-flex items-center gap-1.5 w-full max-w-[240px] justify-center rounded-md bg-black/30 border border-white/[0.07] px-3 py-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4a5278" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-body text-[11px] text-fg-3 truncate">mail.google.com</span>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] uppercase text-accent-b bg-accent-dim border border-accent-border px-2.5 py-[3px] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-b" />
            Mini Brief
          </span>
        </div>

        <div className="relative z-[2] py-1">
          {EMAILS.map((email) => (
            <EmailRow
              key={email.id}
              email={email}
              isSelected={email.id === selectedId}
              isUnread={!readIds.has(email.id)}
              onSelect={() => selectEmail(email.id)}
            />
          ))}
        </div>

        <div
          key={selected.id}
          className="relative z-[2] mx-2 mb-[10px] mt-1.5 px-3.5 py-3 rounded-xl border border-accent-border bg-[rgba(74,98,245,0.08)] animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] uppercase text-accent-b">
              <span className="w-[5px] h-[5px] rounded-full bg-accent-b" />
              AI Summary
            </div>
            <span className="font-mono text-[8px] tracking-[0.16em] uppercase text-fg-3">
              tap any email
            </span>
          </div>
          <p className="font-body text-[12px] leading-[1.55] text-[#aab0cc]">{selected.summary}</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(74,98,245,0.18)] border border-accent-border font-display text-[11px] font-semibold text-accent-b">
            <span className="text-[10px]">→</span>
            {selected.action}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailRow({
  email,
  isSelected,
  isUnread,
  onSelect,
}: {
  email: DemoEmail;
  isSelected: boolean;
  isUnread: boolean;
  onSelect: () => void;
}) {
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Open email from ${email.from} — categorized ${email.category}`}
      onClick={onSelect}
      onKeyDown={onKey}
      className={`relative z-[2] mx-1.5 my-[3px] px-3 py-2.5 rounded-[10px] flex items-center gap-3 cursor-pointer outline-none transition-colors active:scale-[0.995] focus-visible:ring-2 focus-visible:ring-accent-b/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1026] ${
        isSelected
          ? "bg-[rgba(74,98,245,0.13)] border border-[rgba(74,98,245,0.28)]"
          : "border border-transparent hover:bg-white/[0.04]"
      }`}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-bold text-white shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        style={{ background: email.gradient }}
      >
        {email.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display text-[13px] truncate ${
              isUnread ? "font-semibold text-white" : "font-medium text-fg-2"
            }`}
          >
            {email.from}
          </span>
          {email.vip && (
            <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-live bg-[rgba(34,211,160,0.10)] border border-[rgba(34,211,160,0.30)] px-1.5 py-px rounded-full leading-none">
              VIP
            </span>
          )}
        </div>
        <div className="font-body text-[11px] text-fg-2 truncate mt-px">{email.preview}</div>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span
          className={`font-mono text-[8px] tracking-[0.10em] uppercase border px-1.5 py-px rounded-full leading-none ${CAT_STYLES[email.cat]}`}
        >
          {email.category}
        </span>
        <span className="font-mono text-[9px] text-fg-3">{email.time}</span>
      </div>
    </div>
  );
}
