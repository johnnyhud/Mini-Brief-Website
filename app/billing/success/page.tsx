import type { Metadata } from "next";
import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { PORTAL_URL } from "@/lib/portal";

export const metadata: Metadata = {
  title: "You're all set — MiniBrief",
  description: "Your MiniBrief subscription is active.",
  robots: { index: false, follow: false },
};

export default function BillingSuccess() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="site-backdrop" aria-hidden="true" />

      <nav className="relative z-10 flex items-center border-b border-white/[0.06] backdrop-blur-md px-6 sm:px-12 py-3.5">
        <Logo tone="dark" />
      </nav>

      <section className="relative z-[1] flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-fg-3 mb-4">
          <span className="live-dot" aria-hidden="true" />
          subscription active
        </div>

        <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-white mb-5 text-[clamp(40px,9vw,84px)]">
          You&rsquo;re all set <span aria-hidden="true">🎉</span>
        </h1>

        <p className="font-body text-fg-2 mb-4 text-[clamp(15px,1.8vw,18px)] max-w-[520px] leading-[1.65]">
          Thanks for subscribing to MiniBrief. Your subscription is active.
        </p>

        <p className="font-body text-fg-3 mb-9 text-[clamp(14px,1.6vw,16px)] max-w-[520px] leading-[1.65]">
          Head back to{" "}
          <a href={PORTAL_URL} className="text-accent-b link-underline">
            MiniBrief
          </a>
          . Your plan updates within a minute; if it hasn&rsquo;t, refresh the
          page.
        </p>

        <Button asChild variant="primary" size="lg">
          <a href={PORTAL_URL}>Open MiniBrief</a>
        </Button>
      </section>
    </main>
  );
}
