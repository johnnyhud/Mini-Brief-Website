"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Ctx = {
  open: (source?: string) => void;
};

type Result = {
  code: string | null;
  position: number | null;
  total: number | null;
  referrals: number;
};

const NewsletterCtx = createContext<Ctx | null>(null);

export function useNewsletter() {
  const ctx = useContext(NewsletterCtx);
  if (!ctx) throw new Error("useNewsletter must be used inside <NewsletterProvider>");
  return ctx;
}

export function NewsletterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("landing");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [result, setResult] = useState<Result | null>(null);
  // The referral code from an incoming ?ref= link, captured once on mount.
  const referrer = useRef<string | null>(null);

  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref && /^[a-z0-9]{1,32}$/i.test(ref)) referrer.current = ref.toLowerCase();
    } catch {
      /* no-op */
    }
  }, []);

  const open = useCallback((src = "landing") => {
    setSource(src);
    setStatus("idle");
    setEmail("");
    setResult(null);
    setIsOpen(true);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source, ref: referrer.current ?? undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as Result & { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setResult({
        code: data.code ?? null,
        position: data.position ?? null,
        total: data.total ?? null,
        referrals: data.referrals ?? 0,
      });
      setStatus("done");
      toast.success("You're on the list — see you at launch.");
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Couldn't sign you up");
    }
  };

  return (
    <NewsletterCtx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          {status === "done" ? (
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-2xl bg-[rgba(74,98,245,0.12)] border border-accent-border shadow-[0_0_24px_rgba(74,98,245,0.25)]">
              <CheckMark />
            </div>
          ) : (
            <Image
              src="/photos/MiniBrief-Icon-Mono-Ink.png"
              alt="Mini Brief"
              width={48}
              height={48}
              className="w-12 h-12 mx-auto mb-4 rounded-2xl shadow-[0_0_24px_rgba(74,98,245,0.25)]"
              priority
            />
          )}

          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-live bg-[rgba(34,211,160,0.08)] border border-[rgba(34,211,160,0.22)] px-3 py-1 rounded-full">
              <span className="live-dot" />
              Coming soon
            </span>
          </div>

          {status === "done" ? (
            <DoneState result={result} onClose={() => setIsOpen(false)} />
          ) : (
            <>
              <DialogTitle className="text-center">Get the launch email.</DialogTitle>
              <DialogDescription className="mt-2 mb-5 text-center">
                Mini Brief isn't on the Chrome Web Store yet. Drop your email and you'll be first when it goes live.
              </DialogDescription>

              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  autoFocus
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === "submitting"}
                  className="sm:px-7 shrink-0"
                >
                  {status === "submitting" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Joining…
                    </span>
                  ) : (
                    "Join waitlist"
                  )}
                </Button>
              </form>

              <p className="font-body text-[11px] text-fg-3 text-center mt-4 leading-relaxed">
                No marketing blasts — just product news. We don't share your address, ever.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </NewsletterCtx.Provider>
  );
}

function DoneState({ result, onClose }: { result: Result | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = (() => {
    if (!result?.code) return null;
    const origin =
      (typeof window !== "undefined" && window.location.origin) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://minibrief.app";
    return `${origin}/?ref=${result.code}`;
  })();

  const shareText = "I just joined the MiniBrief waitlist — AI email intelligence for Gmail & Outlook that never stores your email. Skip ahead with my link:";

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied — share it to move up.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  return (
    <>
      <DialogTitle className="text-center">
        {result?.position ? (
          <>
            You&rsquo;re <span className="text-accent-b">#{result.position.toLocaleString()}</span> in line.
          </>
        ) : (
          "You're in."
        )}
      </DialogTitle>
      <DialogDescription className="mt-2 mb-5 text-center">
        {shareUrl
          ? "Move up the queue for early access — every friend who joins with your link bumps you ahead."
          : "Confirmation is on its way. We'll be in touch as launch gets close."}
      </DialogDescription>

      {shareUrl && (
        <>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-[rgba(255,255,255,0.03)] p-1.5 pl-3">
            <span className="flex-1 truncate font-mono text-[12px] text-fg-2">{shareUrl}</span>
            <Button type="button" variant="primary" size="sm" onClick={copy} className="shrink-0">
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>

          <div className="mt-3 flex gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-[rgba(255,255,255,0.03)] py-2.5 font-body text-[13px] text-fg-2 transition-colors hover:text-white hover:border-white/20"
            >
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.10] bg-[rgba(255,255,255,0.03)] py-2.5 font-body text-[13px] text-fg-2 transition-colors hover:text-white hover:border-white/20"
            >
              LinkedIn
            </a>
          </div>

          <p className="font-body text-[12px] text-fg-3 text-center mt-4 leading-relaxed">
            {result && result.referrals > 0
              ? `${result.referrals} ${result.referrals === 1 ? "friend has" : "friends have"} joined with your link.`
              : "No referrals yet — share your link to climb the list."}
          </p>
        </>
      )}

      <div className="flex justify-center mt-4">
        <Button variant="ghost" size="md" onClick={onClose}>
          Close
        </Button>
      </div>
    </>
  );
}

function CheckMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
