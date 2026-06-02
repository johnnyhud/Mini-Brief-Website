"use client";

import { Button } from "@/components/ui/button";
import { HeroCard } from "./hero-card";
import { useNewsletter } from "./newsletter-dialog";

export function Hero() {
  const { open } = useNewsletter();

  return (
    <section className="relative z-[1] flex flex-col items-center text-center px-5 sm:px-6 pt-16 sm:pt-24 pb-10 sm:pb-14">
      <h1 className="hero-anim font-display font-extrabold tracking-[-0.04em] leading-[0.98] text-white mb-6 max-w-[900px] text-[clamp(42px,7.6vw,76px)]">
        <span className="text-grad">Email intelligence</span>
        <br className="hidden sm:block" /> for executives who can&apos;t afford
        to miss things.
      </h1>

      <p
        className="hero-anim font-body text-fg-2 mb-9 text-[clamp(16px,1.7vw,19px)] max-w-[600px] leading-[1.65]"
        style={{ animationDelay: "0.08s" }}
      >
        Mini Brief works inside Gmail and Outlook. It triages your inbox, flags
        what needs a reply, and drafts responses in your own voice — with your
        email content never stored on our servers.
      </p>

      <div className="hero-anim mb-4" style={{ animationDelay: "0.14s" }}>
        <Button variant="hero" size="lg" onClick={() => open("hero-primary")}>
          Join the waitlist
        </Button>
      </div>

      <p
        className="hero-anim font-body text-[12px] text-fg-3 mb-12 sm:mb-16"
        style={{ animationDelay: "0.2s" }}
      >
        Launching soon for Chrome &amp; Firefox · We never store your email · Zero tracking
      </p>

      <div className="relative w-full flex justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 w-[min(900px,98vw)] h-[88%] z-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 42%, rgba(74,98,245,0.30), rgba(123,92,255,0.12) 55%, transparent 75%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[min(560px,80vw)] h-10 z-0 rounded-[50%]"
          style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.45), transparent 70%)", filter: "blur(8px)" }}
        />
        <div className="relative z-[1]">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
