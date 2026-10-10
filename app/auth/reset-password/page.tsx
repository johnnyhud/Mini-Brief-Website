"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, Eye, EyeOff } from "lucide-react";

/**
 * Password-reset landing page.
 *
 * The extension's "Forgot password?" asks GoTrue for a recovery email
 * (POST /auth/v1/recover). GoTrue verifies the link server-side and redirects
 * the browser to the allowlisted /auth/confirmed with the recovery session in
 * the URL fragment (#access_token=…&refresh_token=…&type=recovery); that page
 * recognises `type=recovery` and forwards here with the fragment intact. On a
 * bad/expired link the fragment carries an error instead.
 *
 * This page then sets the new password with `PUT /auth/v1/user` using the
 * recovery access token as a Bearer. The token lives in component state only:
 * it is stripped from the address bar on read and is never persisted — the
 * extension owns auth, and the marketing site should hold no session at all.
 *
 * The password policy shown here MUST match the hosted GoTrue settings
 * (supabase/config.toml in the extension repo: minimum_password_length = 12,
 * password_requirements = "lower_upper_letters_digits") — the same rules the
 * extension's create-account form shows. Client looser than server → the user
 * commits to a password and gets a raw policy string; client stricter → we
 * refuse a password the backend would accept. `lower_upper_letters_digits`
 * does NOT require a symbol; do not add one here without changing config.toml.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const MIN_PASSWORD_LENGTH = 12;

interface PasswordRule {
  id: "length" | "lower" | "upper" | "digit";
  label: string;
  met: boolean;
}

function checkPassword(password: string): PasswordRule[] {
  return [
    { id: "length", label: `At least ${MIN_PASSWORD_LENGTH} characters`, met: password.length >= MIN_PASSWORD_LENGTH },
    { id: "lower", label: "One lowercase letter", met: /[a-z]/.test(password) },
    { id: "upper", label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { id: "digit", label: "One number", met: /[0-9]/.test(password) },
  ];
}

type State =
  | "loading"
  | "form"        // valid recovery token in hand
  | "done"        // password updated
  | "expired"     // link expired / already used
  | "invalid"     // no token in the URL at all (typed the URL, or bounced)
  | "error";      // GoTrue rejected the link for another reason

export default function ResetPasswordPage() {
  const [state, setState] = useState<State>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const parse = (s: string) =>
      new URLSearchParams(s.startsWith("#") || s.startsWith("?") ? s.slice(1) : s);
    const hash = parse(window.location.hash);
    const query = parse(window.location.search);
    const get = (k: string) => hash.get(k) ?? query.get(k);

    const hasError = Boolean(get("error") || get("error_code") || get("error_description"));
    const errText = `${get("error_code") ?? ""} ${get("error_description") ?? ""}`;
    const accessToken = get("access_token");

    if (hasError) {
      setState(/expired|otp_expired/i.test(errText) ? "expired" : "error");
    } else if (accessToken) {
      setToken(accessToken);
      setState("form");
    } else {
      setState("invalid");
    }

    // Tidy the address bar so the recovery token doesn't linger in history,
    // the tab title, or anything that reads the URL. It's held in state only.
    if (window.location.hash || window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const rules = checkPassword(password);
  const policyMet = rules.every((r) => r.met);
  const passwordsMatch = password === confirm;
  const showMismatch = confirm.length > 0 && !passwordsMatch;
  const canSubmit = !busy && policyMet && confirm.length > 0 && passwordsMatch && Boolean(token);

  const submit = async () => {
    if (!canSubmit || !token) return;
    if (!SUPABASE_URL || !ANON_KEY) {
      setMsg("This page isn’t configured yet (missing Supabase environment). Please contact support.");
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error_description?: string;
          msg?: string;
          message?: string;
          error_code?: string;
        };
        const text = body.error_description || body.msg || body.message || "";
        // A recovery session that has expired between opening the link and
        // pressing the button reads as a 401 — send them back for a new link
        // rather than showing a bare "unauthorized".
        if (res.status === 401 || /expired|invalid.*token|jwt/i.test(text)) {
          setState("expired");
          return;
        }
        // Everything else (policy rejection, breached-password check, "same as
        // old password") is a message the user can act on — show it verbatim.
        setMsg(text || `Could not update the password (${res.status}).`);
        return;
      }
      // The password is changed. Now end every OTHER session the account has.
      //
      // ASVS 2.2.2 requires that a successful password change (including via
      // reset/recovery) terminates all other active sessions and their stateful
      // refresh tokens. Recovery is the ONLY path by which a Mini Brief password
      // changes — the extension has no change-password screen — so this is the
      // single place that requirement can be satisfied.
      //
      // `scope=others` deliberately: it revokes every refresh token for the
      // account EXCEPT the one presented, so a stolen session on another device
      // dies here while this recovery session stays valid long enough to finish
      // rendering the success state. Without it, an attacker holding a refresh
      // token keeps mailbox access even after the legitimate owner resets the
      // password, which is precisely the scenario the control exists for.
      //
      // Best effort, and deliberately NOT awaited into the failure path: the
      // password HAS changed by this point, and failing the whole flow over a
      // revocation blip would leave the user staring at an error for something
      // that already succeeded. GoTrue's own behaviour may also already revoke
      // on password change; this call is idempotent either way.
      try {
        await fetch(`${SUPABASE_URL}/auth/v1/logout?scope=others`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: ANON_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // Network failure revoking other sessions. The password change stands.
      }

      // Done. The recovery session dies with this tab; the token is never
      // stored anywhere. Nothing further to clean up.
      setToken(null);
      setPassword("");
      setConfirm("");
      setState("done");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const results: Record<Exclude<State, "loading" | "form">, {
    icon: React.ReactNode;
    tint: string;
    title: string;
    body: string;
  }> = {
    done: {
      icon: <CheckCircle2 className="h-8 w-8" style={{ color: "#22d3a0" }} />,
      tint: "#22d3a0",
      title: "Password updated",
      body: "Sign in to MiniBrief with your new password.",
    },
    expired: {
      icon: <Clock className="h-8 w-8" style={{ color: "#5b72ff" }} />,
      tint: "#5b72ff",
      title: "This link has expired",
      body: "Password-reset links are only valid for a short time and work once. Open MiniBrief, choose “Forgot password?” again, and use the newest email.",
    },
    invalid: {
      icon: <AlertTriangle className="h-8 w-8" style={{ color: "#f5a623" }} />,
      tint: "#f5a623",
      title: "No reset link found",
      body: "This page only works from the link in a password-reset email. Open MiniBrief, choose “Forgot password?”, and follow the link we send you.",
    },
    error: {
      icon: <AlertTriangle className="h-8 w-8" style={{ color: "#f5a623" }} />,
      tint: "#f5a623",
      title: "Something went wrong",
      body: "We couldn’t verify this reset link. Open MiniBrief and request a new one — if it keeps happening, contact support.",
    },
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition placeholder:text-fg-3 focus:border-[#5b72ff] focus-visible:ring-2 focus-visible:ring-[#5b72ff]";

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 font-body text-fg">
      <div className="w-full max-w-md text-center">
        <div className="mb-10 font-display text-2xl font-bold tracking-tight">
          MiniBrief<span style={{ color: "#5b72ff" }}>.</span>
        </div>

        {state === "loading" ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-7 w-7 animate-spin rounded-full border-2 border-white/20"
              style={{ borderTopColor: "#5b72ff" }}
            />
            <p className="text-sm text-fg-2">Checking your reset link…</p>
          </div>
        ) : state === "form" ? (
          <form
            className="rounded-2xl border border-border bg-surface p-9 text-left"
            onSubmit={(e) => { e.preventDefault(); void submit(); }}
          >
            <h1 className="mb-1 font-display text-xl font-semibold">Choose a new password</h1>
            <p className="mb-6 text-sm text-fg-2">
              You’ll use this to sign in to MiniBrief.
            </p>

            <label className="mb-1.5 block text-xs font-medium text-fg-2" htmlFor="new-password">
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                autoFocus
                className={`${inputClass} pr-11`}
                placeholder="At least 12 characters"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-3 transition hover:text-fg-2"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <ul className="mt-3 space-y-1.5" aria-label="Password requirements">
              {rules.map((rule) => (
                <li key={rule.id} className="flex items-center gap-2 text-xs" style={{ color: rule.met ? "#22d3a0" : undefined }}>
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
                    {rule.met ? (
                      <path d="M2.5 6.2l2.4 2.4L9.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.45" />
                    )}
                  </svg>
                  <span className={rule.met ? "" : "text-fg-2"}>{rule.label}</span>
                  <span className="sr-only">{rule.met ? " — met" : " — not met"}</span>
                </li>
              ))}
            </ul>

            <label className="mb-1.5 mt-5 block text-xs font-medium text-fg-2" htmlFor="confirm-password">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              aria-invalid={showMismatch || undefined}
              className={`${inputClass}${showMismatch ? " border-[#e05555]" : ""}`}
              placeholder="Type it again"
            />
            {showMismatch && <p className="mt-1.5 text-xs" style={{ color: "#e05555" }}>Passwords do not match.</p>}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: "#5b72ff" }}
            >
              {busy ? "Updating…" : "Update password"}
            </button>

            {msg && (
              <p className="mt-4 text-center text-xs leading-relaxed" style={{ color: "#e05555" }} role="alert">
                {msg}
              </p>
            )}
          </form>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-9">
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: `${results[state].tint}1a` }}
            >
              {results[state].icon}
            </div>
            <h1 className="mb-3 font-display text-xl font-semibold">{results[state].title}</h1>
            <p className="text-sm leading-relaxed text-fg-2">{results[state].body}</p>

            <a
              href="https://www.minibrief.app"
              className="mt-8 inline-block text-xs font-medium text-fg-3 transition hover:text-fg-2"
            >
              minibrief.app
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
