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

        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          <span className="font-body text-[11px] font-semibold tracking-[0.08em] uppercase text-fg-3 mb-1">
            Legal
          </span>
          <Link href="/privacy" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-body text-[13px] text-fg-2 hover:text-white transition-colors">
            Terms of Service
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
      </div>

      <div className="max-w-[1040px] mx-auto mt-9 pt-5 border-t border-white/[0.05]">
        <p className="font-body text-[12px] text-fg-3">
          © {new Date().getFullYear()} MiniBriefAI · Private by design. Your email is never stored.
        </p>
      </div>
    </footer>
  );
}
