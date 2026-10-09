import { ArrowUpRight } from "lucide-react";
import { inlineCta } from "@/content/home";
import { PORTAL_GET_STARTED_URL } from "@/lib/portal";
import { cn } from "@/lib/utils";

/** A compact signup link for the end of a product section. */
export function InlineCta({ className }: { className?: string }) {
  return (
    <p className={cn("mt-8", className)}>
      <a
        href={PORTAL_GET_STARTED_URL}
        className="landing-action inline-flex min-h-11 items-center justify-center gap-3 rounded-xl bg-[#3A5FDC] px-5 text-sm font-semibold text-white hover:bg-[#3352C8]"
      >
        {inlineCta.label}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </p>
  );
}
