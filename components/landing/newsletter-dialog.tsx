"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Ctx = {
  open: (source?: string) => void;
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

  const open = useCallback((src = "landing") => {
    setSource(src);
    setStatus("idle");
    setEmail("");
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
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }
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
            <>
              <DialogTitle className="text-center">You're in.</DialogTitle>
              <DialogDescription className="mt-2 mb-5 text-center">
                Confirmation is on its way. We'll send one more email — the launch — and that's it.
              </DialogDescription>
              <div className="flex justify-center">
                <Button variant="ghost" size="md" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </>
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
                One launch email. No marketing blasts. We don't share your address — ever.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </NewsletterCtx.Provider>
  );
}

function CheckMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
