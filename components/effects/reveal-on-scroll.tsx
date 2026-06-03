"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  stagger?: boolean;
  variant?: RevealVariant;
};

export function Reveal({ as: Tag = "div", stagger = false, variant = "up", className, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const baseClass = stagger
    ? "reveal-stagger"
    : variant === "up"
      ? "reveal"
      : `reveal-${variant}`;

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={cn(baseClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
