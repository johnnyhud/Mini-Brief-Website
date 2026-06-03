import type { Metadata } from "next";
import { Logo } from "@/components/landing/logo";

export const metadata: Metadata = {
  title: "Down for repairs — MiniBrief",
  description: "Mini Brief is getting a quick tune-up. We'll be back shortly.",
  robots: { index: false, follow: false },
};

export default function Maintenance() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="site-backdrop" aria-hidden="true" />

      <nav className="relative z-10 flex items-center border-b border-white/[0.06] backdrop-blur-md px-6 sm:px-12 py-3.5">
        <Logo />
      </nav>

      <section className="relative z-[1] flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-fg-3 mb-4">
          <span className="live-dot" aria-hidden="true" />
          scheduled maintenance
        </div>

        <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-white mb-4 text-[clamp(48px,11vw,108px)]">
          Be right <span className="text-grad">back</span>
        </h1>

        <p className="font-display italic text-fg-2 mb-8 text-[clamp(16px,2vw,20px)] max-w-[520px]">
          Mini Brief is getting a quick tune-up. We&rsquo;ll be back in your inbox
          shortly &mdash; thanks for your patience.
        </p>

        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg-3">
          Questions?{" "}
          <a
            href="mailto:hello@minibrief.ai"
            className="text-accent-b link-underline"
          >
            hello@minibrief.ai
          </a>
        </p>
      </section>
    </main>
  );
}
