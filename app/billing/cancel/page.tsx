import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { PORTAL_URL } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Checkout canceled — MiniBrief",
  description: "Your checkout was canceled and no charge was made.",
  robots: { index: false, follow: false },
};

export default function BillingCancel() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="site-backdrop" aria-hidden="true" />

      <nav className="relative z-10 flex items-center border-b border-white/[0.06] backdrop-blur-md px-6 sm:px-12 py-3.5">
        <Logo tone="dark" />
      </nav>

      <section className="relative z-[1] flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-fg-3 mb-4">
          <span className="live-dot" aria-hidden="true" />
          checkout canceled
        </div>

        <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-white mb-5 text-[clamp(40px,9vw,84px)]">
          Checkout <span className="text-grad">canceled</span>
        </h1>

        <p className="font-body text-fg-2 mb-4 text-[clamp(15px,1.8vw,18px)] max-w-[520px] leading-[1.65]">
          No charge was made. You can subscribe any time from Billing in{" "}
          <a href={PORTAL_URL} className="text-accent-b link-underline">
            MiniBrief
          </a>
          .
        </p>

        <p className="font-body text-fg-3 mb-9 text-[clamp(14px,1.6vw,16px)] max-w-[520px] leading-[1.65]">
          Questions? Email{" "}
          <a
            href="mailto:support@minibrief.app"
            className="text-accent-b link-underline"
          >
            support@minibrief.app
          </a>
          .
        </p>

        <Button asChild variant="ghost" size="lg">
          <Link href="/">Back to MiniBrief</Link>
        </Button>
      </section>
    </main>
  );
}
