"use client";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/effects/reveal-on-scroll";
import { Magnetic } from "@/components/effects/magnetic";
import { useNewsletter } from "./newsletter-dialog";

export function CtaSection() {
  const { open } = useNewsletter();

  return (
    <Reveal as="section" variant="zoom" className="cta-divider relative z-[1] px-6 pt-16 pb-20 flex flex-col items-center text-center border-t border-white/[0.05]">
      <div
        className="absolute w-[500px] h-[220px] top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(74,98,245,0.18), transparent 70%)" }}
        aria-hidden="true"
      />
      <h2 className="relative font-display font-bold tracking-[-0.02em] text-white mb-3 leading-[1.15] text-[clamp(26px,4vw,40px)]">
        Be first to know when it launches.
      </h2>
      <p className="relative font-body text-[16px] text-fg-2 mb-6 max-w-[520px] leading-relaxed">
        Mini Brief launches soon. Join the waitlist and we will email you once when it is live. Nothing else.
      </p>
      <Magnetic>
        <Button variant="hero" size="lg" onClick={() => open("cta-section")}>
          Join the waitlist
        </Button>
      </Magnetic>
      <p className="relative font-body text-[12px] text-fg-3 mt-4">
        Launching soon for Chrome &amp; Firefox · One launch email, nothing else · Your email is never stored
      </p>
    </Reveal>
  );
}
