import { demoVideo } from "@/content/home";

/**
 * The self-hosted demo clip. Off until `demoVideo.enabled` is true in
 * content/home.ts. `muted` + `playsInline` are what let iOS Safari autoplay;
 * React 19 serialises both into the server HTML.
 */
export function DemoVideo({ className }: { className?: string }) {
  if (!demoVideo.enabled) return null;
  return (
    <div className={className}>
      <video
        controls
        muted
        loop
        playsInline
        preload="none"
        poster={demoVideo.poster}
        aria-label="MiniBrief demo"
        className="h-auto w-full rounded-xl border border-brand-muted/50 bg-brand-page"
      >
        <source src={demoVideo.webm} type="video/webm" />
        <source src={demoVideo.mp4} type="video/mp4" />
      </video>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- plain fallback; the poster's dimensions are not in the config */}
        <img
          src={demoVideo.poster}
          alt="MiniBrief demo"
          className="h-auto w-full rounded-xl border border-brand-muted/50 bg-brand-page"
        />
      </noscript>
    </div>
  );
}
