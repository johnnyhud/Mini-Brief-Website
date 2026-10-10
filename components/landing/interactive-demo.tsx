"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  FileText,
  Inbox,
  ListChecks,
  Mail,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  demoPromises,
  demoThreads,
  demoTones,
  type DemoAccount,
  type DemoTone,
} from "@/content/demo";
import { cn } from "@/lib/utils";
import { ProviderLogo } from "@/components/provider-logo";

type DemoTab = "brief" | "draft" | "promises";
type AccountFilter = "All inboxes" | DemoAccount;
type Draft = { tone: DemoTone; text: string; saved: boolean };

const tabs = [
  { id: "brief" as const, label: "Your brief", mobile: "Brief", icon: Inbox },
  {
    id: "draft" as const,
    label: "Draft a reply",
    mobile: "Draft a reply",
    icon: FileText,
  },
  {
    id: "promises" as const,
    label: "Promise Ledger",
    mobile: "Promises",
    icon: ListChecks,
  },
];
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export function InteractiveDemo() {
  const instanceId = useId();
  const [activeTab, setActiveTab] = useState<DemoTab>("brief");
  const [account, setAccount] = useState<AccountFilter>("All inboxes");
  const [selectedId, setSelectedId] = useState(demoThreads[0].id);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const threads = demoThreads.filter(
    (thread) => account === "All inboxes" || thread.account === account,
  );
  const selected =
    threads.find((thread) => thread.id === selectedId) ?? threads[0];
  const promises = demoPromises.filter(
    (promise) => account === "All inboxes" || promise.account === account,
  );
  const openPromises = promises.filter(
    (promise) => !completed.includes(promise.id),
  );
  const draft = drafts[selected.id] ?? {
    tone: "Concise",
    text: selected.drafts.Concise,
    saved: false,
  };
  const totalOpen = demoPromises.length - completed.length;

  function updateDraft(update: Partial<Draft>) {
    setDrafts((current) => ({
      ...current,
      [selected.id]: { ...draft, ...update },
    }));
    setAnnouncement("");
  }

  function changeAccount(next: AccountFilter) {
    setAccount(next);
    const nextThreads = demoThreads.filter(
      (thread) => next === "All inboxes" || thread.account === next,
    );
    if (!nextThreads.some((thread) => thread.id === selectedId))
      setSelectedId(nextThreads[0].id);
  }

  function handleTabKey(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  function resetDemo() {
    setActiveTab("brief");
    setAccount("All inboxes");
    setSelectedId(demoThreads[0].id);
    setDrafts({});
    setCompleted([]);
    setAnnouncement("Demo reset. All sample messages and promises restored.");
  }

  return (
    <section
      id="interactive-demo"
      data-demo="true"
      aria-label="Try the MiniBrief interactive demo"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-ink/10 bg-white text-left text-brand-ink shadow-frame sm:rounded-[22px]"
    >
      <div className="flex min-h-14 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-brand-ink/[0.08] bg-[#FCFCFD] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/photos/MiniBrief-Icon-Mono-Ink.png"
            alt=""
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-[22%]"
          />
          <span className="text-sm font-bold tracking-tight">MiniBrief</span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-ink/[0.08] bg-white px-2.5 py-1 text-[11px] font-medium text-[#616879] sm:text-xs">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-brand-blue"
          />
          Interactive demo · Sample data
        </span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-col border-b border-brand-ink/[0.08] bg-[#FAFAFC] p-3 lg:w-[188px] lg:border-b-0 lg:border-r lg:p-4">
          <p className="mb-5 hidden px-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7C8290] lg:block">
            Your workspace
          </p>
          <div
            role="tablist"
            aria-label="Demo views"
            className="grid grid-cols-3 gap-1 lg:flex lg:flex-col lg:gap-1.5"
          >
            {tabs.map(({ id, label, mobile, icon: Icon }, index) => (
              <button
                key={id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${instanceId}-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`${instanceId}-panel-${id}`}
                tabIndex={activeTab === id ? 0 : -1}
                onClick={() => setActiveTab(id)}
                onKeyDown={(event) => handleTabKey(event, index)}
                className={cn(
                  "flex min-h-10 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[12px] font-medium transition-colors motion-reduce:transition-none sm:gap-2 sm:text-xs lg:justify-start",
                  activeTab === id
                    ? "bg-[#EAF0FF] text-brand-blue"
                    : "text-[#636A7B] hover:bg-brand-ink/[0.04] hover:text-brand-ink",
                  focusRing,
                )}
              >
                <Icon
                  aria-hidden="true"
                  className="hidden size-4 shrink-0 sm:block"
                />
                <span className="lg:hidden">{mobile}</span>
                <span className="hidden lg:inline">{label}</span>
                {id === "promises" && (
                  <span className="ml-auto hidden min-w-4 text-center text-[11px] lg:inline">
                    {totalOpen}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-auto hidden px-2 pb-1 pt-12 lg:block">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-[#505A70]">
              <CircleCheck
                aria-hidden="true"
                className="size-3.5 text-brand-blue"
              />{" "}
              You stay in control
            </div>
            <p className="text-[11px] leading-relaxed text-[#7C8290]">
              Review every draft.
              <br />
              Make every call.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:min-h-[475px]">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-blue">
                A little clarity, every morning
              </p>
              <h2 className="text-xl font-semibold tracking-tight sm:text-[23px]">
                {activeTab === "brief"
                  ? "Your morning, made lighter."
                  : activeTab === "draft"
                    ? "Your words. A head start."
                    : "Keep your word, effortlessly."}
              </h2>
            </div>
            <div
              role="group"
              aria-label="Filter sample inboxes"
              className="inline-flex max-w-full flex-wrap gap-0.5 rounded-lg bg-[#F2F3F6] p-1"
            >
              {(["All inboxes", "Gmail", "Outlook"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={account === option}
                  onClick={() => changeAccount(option)}
                  className={cn(
                    "inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium transition-colors motion-reduce:transition-none sm:px-2.5",
                    account === option
                      ? "bg-white text-brand-ink shadow-sm"
                      : "text-[#636A7B] hover:text-brand-ink",
                    focusRing,
                  )}
                >
                  {option !== "All inboxes" && (
                    <ProviderLogo provider={option} className="size-3.5" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div
            id={`${instanceId}-panel-brief`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-tab-brief`}
            hidden={activeTab !== "brief"}
          >
            <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: threads.length, label: "Need a reply", icon: Mail },
                {
                  value: openPromises.filter((promise) => promise.today).length,
                  label: "Due today",
                  icon: CircleCheck,
                },
                {
                  value: openPromises.length,
                  label: "Open promises",
                  icon: ListChecks,
                },
              ].map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-brand-ink/[0.07] bg-[#FCFCFD] px-3 py-3 sm:px-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xl font-semibold tracking-tight">
                      {value}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="size-3.5 text-[#969CAB]"
                    />
                  </div>
                  <p className="text-[11px] text-[#636b7e] sm:text-[12px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_1.05fr]">
              <div className="min-w-0">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold">Start here</h3>
                  <span className="text-[11px] text-[#636b7e]">
                    Select a message
                  </span>
                </div>
                <div className="space-y-1.5">
                  {threads.map((thread) => (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => setSelectedId(thread.id)}
                      aria-pressed={selected.id === thread.id}
                      aria-controls={`${instanceId}-thread-details`}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-xl border p-3 text-left transition-colors motion-reduce:transition-none",
                        selected.id === thread.id
                          ? "border-brand-blue/25 bg-[#F0F4FF]"
                          : "border-brand-ink/[0.07] bg-white hover:border-brand-blue/20 hover:bg-[#FAFBFF]",
                        focusRing,
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                          selected.id === thread.id
                            ? "bg-[#DDE6FF] text-brand-blue"
                            : "bg-[#F0F1F5] text-[#636b7e]",
                        )}
                      >
                        {thread.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-[12px] font-semibold">
                            {thread.sender}
                          </span>
                          <span className="shrink-0 text-[10px] text-[#636b7e]">
                            {thread.time}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] text-[#495166]">
                          {thread.subject}
                        </span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-1 text-[10px] font-medium text-[#636b7e]">
                          <ProviderLogo
                            provider={thread.account}
                            className="size-3"
                          />
                          {thread.account}{" "}
                          <span
                            aria-hidden="true"
                            className="mx-1 text-[#A7ADBA]"
                          >
                            ·
                          </span>{" "}
                          {thread.priority}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "mt-2 size-3 shrink-0",
                          selected.id === thread.id
                            ? "text-brand-blue"
                            : "text-[#B7BDCA]",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div
                id={`${instanceId}-thread-details`}
                className="flex min-w-0 flex-col rounded-xl border border-brand-blue/15 bg-[#F7F9FF] p-4"
                aria-label={`Summary of ${selected.subject}`}
              >
                <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-blue">
                  <Sparkles aria-hidden="true" className="size-3.5" /> THE SHORT
                  VERSION
                </div>
                <h3 className="mb-2 text-sm font-semibold leading-snug">
                  {selected.subject}
                </h3>
                <p className="text-[12px] leading-[1.7] text-[#626B7F]">
                  {selected.summary}
                </p>
                <div className="mb-4 mt-4 border-t border-brand-blue/10 pt-3">
                  <p className="mb-1 text-[11px] font-semibold text-brand-ink">
                    Your next step
                  </p>
                  <p className="text-[12px] leading-relaxed text-[#626B7F]">
                    {selected.nextStep}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("draft");
                    tabRefs.current[1]?.focus();
                  }}
                  className={cn(
                    "mt-auto inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-blue-hover motion-reduce:transition-none",
                    focusRing,
                  )}
                >
                  Try a reply draft{" "}
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div
            id={`${instanceId}-panel-draft`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-tab-draft`}
            hidden={activeTab !== "draft"}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-ink/[0.07] bg-[#FAFAFC] p-3">
              <div className="min-w-0">
                <label
                  htmlFor={`${instanceId}-recipient`}
                  className="mb-1 block text-[11px] font-medium text-[#636b7e]"
                >
                  Replying to
                </label>
                <select
                  id={`${instanceId}-recipient`}
                  value={selected.id}
                  onChange={(event) => setSelectedId(event.target.value)}
                  className={cn(
                    "max-w-full rounded bg-transparent pr-3 text-xs font-semibold",
                    focusRing,
                  )}
                >
                  {threads.map((thread) => (
                    <option key={thread.id} value={thread.id}>
                      {thread.sender} · {thread.account}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[11px] text-[#636b7e]">
                {selected.subject}
              </span>
            </div>
            <div className="rounded-xl border border-brand-ink/10 bg-white p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <label
                  htmlFor={`${instanceId}-draft`}
                  className="flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Sparkles
                    aria-hidden="true"
                    className="size-3.5 text-brand-blue"
                  />{" "}
                  Suggested reply
                </label>
                <div
                  role="group"
                  aria-label="Reply tone"
                  className="flex gap-1"
                >
                  {demoTones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      aria-pressed={draft.tone === tone}
                      onClick={() =>
                        updateDraft({
                          tone,
                          text: selected.drafts[tone],
                          saved: false,
                        })
                      }
                      className={cn(
                        "min-h-8 rounded-md px-2.5 text-[11px] font-medium",
                        draft.tone === tone
                          ? "bg-[#EAF0FF] text-brand-blue"
                          : "text-[#636b7e] hover:bg-[#F2F3F6]",
                        focusRing,
                      )}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                id={`${instanceId}-draft`}
                value={draft.text}
                onChange={(event) =>
                  updateDraft({ text: event.target.value, saved: false })
                }
                rows={5}
                className={cn(
                  "block min-h-[146px] w-full resize-y rounded-lg border border-brand-ink/[0.08] bg-[#FCFCFD] p-3 text-xs leading-[1.8] text-[#495166]",
                  focusRing,
                )}
                aria-describedby={`${instanceId}-draft-help`}
              />
              <p
                id={`${instanceId}-draft-help`}
                className="mt-2 text-[11px] text-[#737B8C]"
              >
                Edit the words to make them yours. Choosing a tone starts a
                fresh sample draft.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-[#737B8C]">
                  Demo only · nothing is sent
                </span>
                <button
                  type="button"
                  disabled={!draft.text.trim() || draft.saved}
                  onClick={() => {
                    updateDraft({ saved: true });
                    setAnnouncement(
                      `Sample draft for ${selected.sender} saved for this demo session. Nothing was sent.`,
                    );
                  }}
                  className={cn(
                    "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-xs font-semibold text-white hover:bg-brand-blue-hover disabled:cursor-default disabled:bg-[#EAF0FF] disabled:text-brand-blue",
                    focusRing,
                  )}
                >
                  {draft.saved ? (
                    <CheckCheck aria-hidden="true" className="size-3.5" />
                  ) : (
                    <FileText aria-hidden="true" className="size-3.5" />
                  )}
                  {draft.saved ? "Saved in demo" : "Save sample draft"}
                </button>
              </div>
            </div>
          </div>

          <div
            id={`${instanceId}-panel-promises`}
            role="tabpanel"
            aria-labelledby={`${instanceId}-tab-promises`}
            hidden={activeTab !== "promises"}
          >
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-[#F0F4FF] px-4 py-3">
              <div>
                <p className="text-sm font-semibold">
                  {openPromises.length === 0
                    ? "A clean slate. Nicely done."
                    : `${openPromises.length} open ${openPromises.length === 1 ? "promise" : "promises"}`}
                </p>
                <p className="mt-1 text-[11px] text-[#626B7F]">
                  Small commitments. All accounted for.
                </p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue">
                <ListChecks aria-hidden="true" className="size-[18px]" />
              </span>
            </div>
            <div className="space-y-2.5">
              {promises.map((promise) => {
                const isComplete = completed.includes(promise.id);
                return (
                  <div
                    key={promise.id}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-3.5",
                      isComplete
                        ? "border-brand-ink/[0.05] bg-[#FAFAFC]"
                        : "border-brand-ink/[0.08] bg-white",
                    )}
                  >
                    <button
                      type="button"
                      aria-label={`${isComplete ? "Reopen" : "Complete"} promise: ${promise.title}`}
                      aria-pressed={isComplete}
                      onClick={() => {
                        setCompleted((current) =>
                          isComplete
                            ? current.filter((id) => id !== promise.id)
                            : [...current, promise.id],
                        );
                        setAnnouncement(
                          `${promise.title} ${isComplete ? "reopened" : "completed"}.`,
                        );
                      }}
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border",
                        isComplete
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-[#C8CDDA] bg-white text-transparent hover:border-brand-blue hover:text-brand-blue",
                        focusRing,
                      )}
                    >
                      <Check aria-hidden="true" className="size-4" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <h3
                          className={cn(
                            "text-xs font-semibold",
                            isComplete && "text-[#737B8C] line-through",
                          )}
                        >
                          {promise.title}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] font-medium",
                            isComplete
                              ? "text-[#636b7e]"
                              : promise.today
                                ? "text-[#A66024]"
                                : "text-[#636b7e]",
                          )}
                        >
                          {isComplete ? "Complete" : promise.due}
                        </span>
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-1 text-[11px] text-[#636b7e]">
                        {promise.person} ·
                        <ProviderLogo
                          provider={promise.account}
                          className="size-3"
                        />
                        {promise.account}
                      </p>
                      <p className="mt-2 text-[11px] italic leading-relaxed text-[#737B8C]">
                        {promise.context}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-brand-ink/[0.08] bg-[#FCFCFD] px-4 py-2.5 sm:px-6">
        <p className="text-[11px] text-[#636b7e]">
          Explore the demo. No inbox connection needed.
        </p>
        <button
          type="button"
          onClick={resetDemo}
          className={cn(
            "inline-flex min-h-7 items-center gap-1.5 rounded text-[11px] font-medium text-[#626B7F] hover:text-brand-blue",
            focusRing,
          )}
        >
          <RotateCcw aria-hidden="true" className="size-3" />
          Reset demo
        </button>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
