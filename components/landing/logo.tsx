"use client";

import Image from "next/image";

export function Logo() {
  const onClick = () => {
    // Already at the top → reload; otherwise scroll back up.
    if (window.scrollY < 4) {
      window.location.reload();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Mini Brief — back to top"
      className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-b/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-opacity hover:opacity-80"
    >
      <Image
        src="/photos/MiniBrief-Icon-Mono-Ink.png"
        alt="Mini Brief"
        width={32}
        height={32}
        className="rounded-[22%]"
        priority
      />
      <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] leading-none">
        <span className="text-mini">Mini</span>Brief<span className="text-accent-b">AI</span>
      </span>
    </button>
  );
}
