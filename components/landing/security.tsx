"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  Check,
  ChevronDown,
  CreditCard,
  Database,
  EyeOff,
  Globe,
  KeyRound,
  Link2,
  Lock,
  Radar,
  ScanSearch,
  Send,
  ServerOff,
  ShieldAlert,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { security } from "@/content/home";
import { cn } from "@/lib/utils";
import { TextLink } from "./link";
import { InlineCta } from "./inline-cta";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

const icons = [
  [ShieldAlert, Globe, Link2, Send, ScanSearch, Radar],
  [EyeOff, Lock, ServerOff, KeyRound, ShieldCheck, Timer, Database, CreditCard],
];

export function Security() {
  const [activeGroup, setActiveGroup] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsId = useId();

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % security.groups.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + security.groups.length) % security.groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = security.groups.length - 1;
    else return;
    event.preventDefault();
    setActiveGroup(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id={security.id} className="border-t border-brand-ink/10">
      <SectionHeader
        eyebrow={security.eyebrow}
        title={security.h2}
        tone="light"
      />
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-[#475569]">
        {security.intro}
      </p>
      <div
        role="tablist"
        aria-label="Explore MiniBrief security"
        className="mt-9 grid grid-cols-2 gap-1 rounded-2xl border border-brand-ink/10 bg-[#F5F5F7] p-1 sm:inline-grid"
      >
        {security.groups.map((group, index) => (
          <button
            key={group.title}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${tabsId}-tab-${index}`}
            role="tab"
            type="button"
            aria-selected={activeGroup === index}
            aria-controls={`${tabsId}-panel-${index}`}
            tabIndex={activeGroup === index ? 0 : -1}
            onClick={() => setActiveGroup(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className={cn(
              "min-h-12 rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none sm:px-6",
              activeGroup === index
                ? "bg-[#3A5FDC] text-white shadow-sm"
                : "text-[#475569] hover:bg-brand-blue/[0.05] hover:text-brand-ink",
            )}
          >
            {group.title}
          </button>
        ))}
      </div>
      {security.groups.map((group, g) => (
        <div
          key={group.title}
          role="tabpanel"
          id={`${tabsId}-panel-${g}`}
          aria-labelledby={`${tabsId}-tab-${g}`}
          hidden={activeGroup !== g}
          tabIndex={0}
          className="mt-6 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <ul role="list" className="grid items-start gap-3 md:grid-cols-2">
            {group.items.map((item, i) => {
              const Icon = icons[g][i % icons[g].length];
              return (
                <li key={item.title}>
                  <details className="group rounded-2xl border border-brand-ink/10 bg-[#ffffff] transition-colors open:border-[#3A5FDC]/30 open:bg-[#f0f4ff] hover:border-brand-ink/20 motion-reduce:transition-none">
                    <summary className="flex min-h-24 cursor-pointer list-none items-center gap-4 rounded-2xl p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3A5FDC]/10 text-[#3A5FDC]"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-base font-semibold leading-snug text-[#07091A]">
                        {item.title}
                      </span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-[#475569] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-6 text-base leading-relaxed text-[#475569] sm:pl-[4.75rem]">
                      {item.body}
                    </p>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="mt-8 rounded-2xl border border-brand-ink/10 bg-[#F5F5F7] p-5 sm:p-7">
        <h3 className="text-xs font-medium uppercase tracking-wider text-[#475569]">
          {security.alsoLead}
        </h3>
        <ul
          role="list"
          className="mt-4 grid gap-x-8 gap-y-3 text-sm leading-relaxed text-[#475569] md:grid-cols-2"
        >
          {security.also.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <Check
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3A5FDC]"
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-base">
        <TextLink
          href={security.link.href}
          tone="light"
          className="inline-flex min-h-11 items-center"
        >
          {security.link.label}
        </TextLink>
      </p>
      <InlineCta className="mt-4" />
    </Section>
  );
}
