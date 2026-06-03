"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
};

/**
 * Wraps an element so it gently leans toward the cursor while hovered,
 * then springs back on leave. Pure transform — no layout shift.
 */
export function Magnetic({ children, strength = 0.25, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}
