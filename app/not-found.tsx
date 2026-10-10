import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";
import { PORTAL_GET_STARTED_URL } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Not found — MiniBrief",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Why MiniBrief", href: "/why-minibrief" },
  { label: "Get started", href: PORTAL_GET_STARTED_URL },
];

const linkClass = "inline-flex min-h-11 items-center text-fg-2 underline underline-offset-4 hover:text-white";

export default function NotFound() {
  return (
    <main id="main" className="relative min-h-screen flex flex-col">
      <div className="bg-canvas" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div className="bg-grid" aria-hidden="true" />

      <nav className="relative z-10 flex items-center border-b border-white/[0.06] backdrop-blur-md px-6 sm:px-12 py-3.5">
        <Logo />
      </nav>

      <section className="relative z-[1] flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-fg-3 mb-3">
          error 404
        </div>
        <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[0.95] text-white mb-3 text-[clamp(56px,12vw,120px)]">
          <span className="text-mini">Not</span>Found
        </h1>
        <p className="font-display italic text-fg-2 mb-8 text-[clamp(16px,2vw,20px)] max-w-[520px]">
          This thread doesn&rsquo;t exist — or it&rsquo;s been auto-trashed by a very enthusiastic filter.
        </p>
        <Link href="/">
          <Button variant="hero" size="lg">
            Back to the inbox
          </Button>
        </Link>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
          {links.map((item) => (
            <li key={item.label}>
              {item.href.startsWith("/") ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
