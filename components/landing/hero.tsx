import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import dynamic from "next/dynamic";
import { hero } from "@/content/home";
import { ProviderLogo } from "@/components/provider-logo";
import { Container } from "./section";

// Code-split the demo's client bundle off the critical path. It still renders
// on the server, so the markup (and layout) is identical.
const InteractiveDemo = dynamic(() =>
  import("./interactive-demo").then((m) => m.InteractiveDemo),
);

export function Hero() {
  return (
    <section className="landing-hero relative isolate overflow-hidden pb-4 pt-12 sm:pt-16 lg:pt-24">
      <div
        aria-hidden="true"
        className="landing-hero-grid pointer-events-none absolute inset-0 -z-10"
      />
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3A5FDC]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#3A5FDC]"
              />{" "}
              Your inbox, reimagined
              <span className="ml-1 rounded border border-brand-ink/15 px-1.5 py-0.5 text-[9px] tracking-[0.12em] text-[#475569]">
                BETA
              </span>
            </p>
            <h1 className="mt-7 text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[1.02] tracking-[-0.065em] text-[#07091A]">
              {hero.h1}
              <br />
              <span className="text-[#3A5FDC]">{hero.accent}</span>
            </h1>
          </div>
          <div className="max-w-md pb-1 lg:pb-2">
            <p className="text-lg leading-[1.7] text-[#475569]">{hero.sub}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={hero.primary.href}
                className="landing-action inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#3A5FDC] px-5 text-sm font-semibold text-white hover:bg-[#3352C8]"
              >
                {hero.primary.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={hero.secondary.href}
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm font-medium text-brand-ink hover:text-[#3A5FDC]"
              >
                Explore the demo
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-[#475569]">
              <Check
                className="h-3.5 w-3.5 text-[#3A5FDC]"
                aria-hidden="true"
              />{" "}
              Free trial. No separate AI bill.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-brand-ink/10 pt-5 text-xs text-[#475569] lg:mt-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#475569]">
              Made for your inboxes
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#07091A]">
              <ProviderLogo provider="Gmail" />
              Gmail
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#07091A]">
              <ProviderLogo provider="Outlook" />
              Outlook
            </span>
          </div>
          <a
            href="#privacy"
            className="inline-flex min-h-8 items-center gap-2 rounded text-[#475569] hover:text-brand-ink"
          >
            <ShieldCheck
              className="h-4 w-4 text-[#3A5FDC]"
              aria-hidden="true"
            />
            Message bodies are not stored on our servers.
          </a>
        </div>

        <div className="landing-demo-stage relative mt-9 rounded-[24px] border border-brand-ink/[0.12] bg-[#edf1fb] p-2.5 shadow-[0_30px_80px_-40px_rgba(58,95,220,0.22)] sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3 pt-0.5 text-[10px] uppercase tracking-[0.16em] text-[#475569] sm:px-2 sm:pb-4 sm:pt-1">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#3A5FDC]"
                aria-hidden="true"
              />
              A little clarity. Try it for yourself.
            </span>
            <span className="text-[#475569]">No sign-up needed</span>
          </div>
          <InteractiveDemo />
        </div>
      </Container>
    </section>
  );
}
