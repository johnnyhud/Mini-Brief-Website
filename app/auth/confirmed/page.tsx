"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { PORTAL_SIGN_IN_URL } from "@/lib/portal";

/**
 * Email-confirmation landing page.
 *
 * Supabase/GoTrue confirms the email server-side, then redirects the browser
 * here (Auth → URL Configuration → Site URL / redirect allowlist points at
 * /auth/confirmed). On SUCCESS the URL fragment carries the session tokens
 * (#access_token=…&type=signup); on failure it carries an error
 * (#error=…&error_code=otp_expired&error_description=…). We don't need the
 * session — the extension owns auth — so this page is purely a friendly result
 * screen: confirmed / expired / something-went-wrong.
 *
 * ONE exception: PASSWORD-RESET links also land here (`type=recovery`). The
 * extension's "Forgot password?" points GoTrue's redirect_to at this page on
 * purpose — it is the allowlisted URL, and a redirect_to that is not on the
 * Auth → URL Configuration allowlist is silently dropped to Site URL (the
 * homepage) with the tokens in the hash and nothing to read them. So this page
 * recognises a recovery fragment and forwards it, fragment intact, to
 * /auth/reset-password, which owns the new-password form. Nothing is read
 * from or stored about the token here.
 */
type State = "loading" | "confirmed" | "expired" | "error";

export default function ConfirmedPage() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const parse = (s: string) =>
      new URLSearchParams(s.startsWith("#") || s.startsWith("?") ? s.slice(1) : s);
    const hash = parse(window.location.hash);
    const query = parse(window.location.search);
    const get = (k: string) => hash.get(k) ?? query.get(k);

    // Password-reset hand-off — see the header comment. window.location (not
    // the router) so the fragment travels verbatim; replace() so Back doesn't
    // return to a page that would forward again.
    if (get("type") === "recovery" && get("access_token")) {
      window.location.replace(`/auth/reset-password${window.location.hash}`);
      return;
    }

    const hasError = Boolean(get("error") || get("error_code") || get("error_description"));
    const errText = `${get("error_code") ?? ""} ${get("error_description") ?? ""}`;

    if (hasError) {
      setState(/expired|otp_expired/i.test(errText) ? "expired" : "error");
    } else {
      // GoTrue only redirects here after processing the link; no error → confirmed.
      setState("confirmed");
    }

    // Tidy the address bar so tokens/errors don't linger in the URL.
    if (window.location.hash || window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const views: Record<Exclude<State, "loading">, {
    icon: React.ReactNode;
    tint: string;
    title: string;
    body: string;
  }> = {
    confirmed: {
      icon: <CheckCircle2 className="h-8 w-8" style={{ color: "#22d3a0" }} />,
      tint: "#22d3a0",
      title: "Email confirmed",
      body: "Your MiniBrief account is active. Sign in to MiniBrief to start your trial.",
    },
    expired: {
      icon: <Clock className="h-8 w-8" style={{ color: "#5b72ff" }} />,
      tint: "#5b72ff",
      title: "This link has expired",
      body: "Confirmation and password-reset links are only valid for a short time and work once. Open MiniBrief and request a fresh one — “Resend confirmation email” or “Forgot password?” on the sign-in screen.",
    },
    error: {
      icon: <AlertTriangle className="h-8 w-8" style={{ color: "#f5a623" }} />,
      tint: "#f5a623",
      title: "Something went wrong",
      body: "We couldn’t verify this link. Open MiniBrief and request a new one from the sign-in screen — if it keeps happening, contact support.",
    },
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 font-body text-fg">
      <div className="w-full max-w-md text-center">
        {/* Wordmark */}
        <div className="mb-10 font-display text-2xl font-bold tracking-tight">
          MiniBrief<span style={{ color: "#5b72ff" }}>.</span>
        </div>

        {state === "loading" ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-7 w-7 animate-spin rounded-full border-2 border-white/20"
              style={{ borderTopColor: "#5b72ff" }}
            />
            <p className="text-sm text-fg-2">Confirming your email…</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-9">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: `${views[state].tint}1a` }}
            >
              {views[state].icon}
            </div>
            <h1 className="mb-3 font-display text-xl font-semibold">{views[state].title}</h1>
            <p className="text-sm leading-relaxed text-fg-2">{views[state].body}</p>

            <a
              href={PORTAL_SIGN_IN_URL}
              className="mt-6 inline-flex min-h-11 items-center text-sm font-medium"
              style={{ color: "#5b72ff" }}
            >
              Sign in to MiniBrief
            </a>
            <br />
            <a
              href="https://www.minibrief.app"
              className="mt-4 inline-block text-xs font-medium text-fg-3 transition hover:text-fg-2"
            >
              minibrief.app
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
