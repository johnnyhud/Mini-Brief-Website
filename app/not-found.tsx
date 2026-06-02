import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col">
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
          This thread doesn't exist — or it's been auto-trashed by a very enthusiastic filter.
        </p>
        <Link href="/">
          <Button variant="hero" size="lg">
            Back to the inbox
          </Button>
        </Link>
      </section>
    </main>
  );
}
