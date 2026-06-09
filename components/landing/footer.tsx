import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/[0.06] px-6 sm:px-12 pt-10 pb-7">
      <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-7">
        <div className="max-w-[320px]">
          <Logo />
          <p className="font-body text-[13px] text-fg-3 leading-relaxed mt-3">
            Email intelligence for Gmail and Outlook. Private by design — your
            email is never stored on our side.
          </p>
        </div>

        <div className="flex flex-col gap-7 sm:flex-row sm:gap-16">
          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <span className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-3 mb-1">
              Legal
            </span>
            <Link href="/privacy" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
              Terms &amp; Privacy
            </Link>
            <Link href="/security" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
              Security
            </Link>
            <Link href="/accessibility" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
              Accessibility
            </Link>
            <a href="mailto:privacy@minibrief.app" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <nav aria-label="Social" className="flex flex-col gap-2.5">
            <span className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-3 mb-1">
              Connect
            </span>
            <a
              href="https://www.linkedin.com/company/minibrief-ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MiniBriefAI on LinkedIn"
              className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[rgba(13,21,40,0.5)] text-fg-2 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-border hover:text-accent-b hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl bg-accent-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative h-5 w-5"
              >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      <div className="max-w-[1040px] mx-auto mt-9 pt-5 border-t border-white/[0.05]">
        <p className="font-body text-[12px] text-fg-3">
          © {new Date().getFullYear()} MiniBriefAI · Private by design. Your email is never stored.
        </p>
      </div>
    </footer>
  );
}
