import Image from "next/image";
import Link from "next/link";
import { WORDMARK } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Executive "MB." mark + wordmark, linking home. The wordmark inherits the
 * surrounding text colour; pass tone="dark" where the Logo sits on a dark
 * background to use the cream on-dark mark.
 */
export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
        className,
      )}
    >
      <Image
        src={tone === "dark" ? "/brand/executive-on-dark.svg" : "/brand/executive-on-light.svg"}
        alt=""
        width={56}
        height={32}
        unoptimized
        className="h-[32px] w-[56px] shrink-0"
      />
      <span className="text-lg font-semibold tracking-tight max-[359px]:sr-only">{WORDMARK}</span>
    </Link>
  );
}
