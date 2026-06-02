"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/**
 * Drop the demo video here when ready:  public/video/intro.mp4
 * (optional poster frame:               public/photos/intro-poster.jpg)
 * Change these two constants if you use different filenames.
 */
const VIDEO_SRC = "/video/intro.mp4";
const POSTER_SRC = "/photos/intro-poster.jpg";

type Ctx = { open: (source?: string) => void };

const VideoCtx = createContext<Ctx | null>(null);

export function useVideo() {
  const ctx = useContext(VideoCtx);
  if (!ctx) throw new Error("useVideo must be used inside <VideoProvider>");
  return ctx;
}

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errored, setErrored] = useState(false);

  const open = useCallback((_source?: string) => {
    setErrored(false);
    setIsOpen(true);
  }, []);

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[min(920px,94vw)] p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <DialogTitle>See Mini Brief in action</DialogTitle>
            <DialogDescription className="mt-1.5">
              A short walkthrough of triage, voice-matched drafts, and one-click unsubscribe.
            </DialogDescription>
          </div>

          <div className="relative aspect-video w-full bg-black border-t border-white/[0.06]">
            {errored ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="font-display text-[16px] font-semibold text-white">
                  Demo video coming soon
                </p>
                <p className="font-body text-[13px] text-fg-3 max-w-[360px] leading-relaxed">
                  We&apos;re finishing the walkthrough. Join the waitlist and
                  you&apos;ll see it the moment it&apos;s ready.
                </p>
              </div>
            ) : (
              // Keyed so the element is recreated each open (resets playback).
              <video
                key={isOpen ? "open" : "closed"}
                className="absolute inset-0 h-full w-full"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                controls
                playsInline
                preload="metadata"
                onError={() => setErrored(true)}
              >
                Your browser does not support embedded video.
              </video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </VideoCtx.Provider>
  );
}
