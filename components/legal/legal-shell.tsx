import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalShell({ title, updated, children }: Props) {
  return (
    <>
      <div className="site-backdrop" aria-hidden="true" />
      <div className="relative z-[1] min-h-screen flex flex-col">
        <header className="border-b border-white/[0.06] px-6 sm:px-12 py-3.5">
          <Link
            href="/"
            aria-label="Mini Brief — home"
            className="inline-flex items-center gap-2 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-accent-b/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Image
              src="/photos/MiniBrief-Icon-Mono-Ink.png"
              alt="Mini Brief"
              width={28}
              height={28}
              className="rounded-[22%]"
            />
            <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] leading-none">
              <span className="text-mini">Mini</span>Brief<span className="text-accent-b">AI</span>
            </span>
          </Link>
        </header>

        <main className="flex-1 px-6 sm:px-12 py-12 sm:py-16">
          <article className="max-w-[760px] mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-body text-[13px] text-fg-3 hover:text-fg-2 transition-colors mb-8"
            >
              <span aria-hidden="true">←</span> Back to home
            </Link>

            <h1 className="font-display text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] text-white leading-[1.15] mb-2">
              {title}
            </h1>
            <p className="font-body text-[13px] text-fg-3 mb-10">Last updated: {updated}</p>

            <div className="legal-prose font-body text-[15px] text-fg-2 leading-[1.7]">
              {children}
            </div>

            <p className="font-body text-[13px] text-fg-3 leading-relaxed mt-12 pt-6 border-t border-white/[0.06]">
              This document is written in plain language for transparency. It is
              not legal advice and is being finalized ahead of launch. Questions?
              Email{" "}
              <a href="mailto:privacy@minibrief.app" className="text-accent-b hover:underline">
                privacy@minibrief.app
              </a>
              .
            </p>
          </article>
        </main>

        <footer className="border-t border-white/[0.06] px-6 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-body text-[12px] text-fg-3">
            © {new Date().getFullYear()} MiniBriefAI · Private by design.
          </div>
          <nav className="flex items-center gap-5 font-body text-[12px] text-fg-3">
            <Link href="/privacy" className="hover:text-fg-2 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-fg-2 transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-fg-2 transition-colors">Security</Link>
            <Link href="/accessibility" className="hover:text-fg-2 transition-colors">Accessibility</Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
