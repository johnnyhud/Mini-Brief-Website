"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, LogOut, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivationFunnel } from "@/lib/activation-funnel";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import {
  adminApi,
  getActivationFunnel,
  getAiFeedbackWeekly,
  getOnboardingChecklist,
  type ActivationFunnelRow,
  type AdminAccountRow,
  type AiFeedbackWeeklyRow,
  type AuditRow,
  type OnboardingChecklistRow,
  type Overview,
} from "@/lib/admin-api";
import { formatPctUp, onboardingTotals } from "@/lib/admin-rpc";

type Phase = "loading" | "config" | "login" | "denied" | "ready";

export default function AdminPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [meEmail, setMeEmail] = useState<string | null>(null);

  const resolve = useCallback(async () => {
    const sb = getSupabaseBrowser();
    if (!sb) {
      setPhase("config");
      return;
    }
    const { data } = await sb.auth.getSession();
    if (!data.session) {
      setPhase("login");
      return;
    }
    try {
      const who = await adminApi.whoami();
      setMeEmail(who.email);
      setPhase("ready");
    } catch (e) {
      setPhase((e as Error).message === "forbidden" ? "denied" : "login");
    }
  }, []);

  useEffect(() => {
    void resolve();
  }, [resolve]);

  const signOut = async () => {
    await getSupabaseBrowser()?.auth.signOut();
    setPhase("login");
  };

  if (phase === "loading") return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;
  if (phase === "config") {
    return (
      <Centered>
        <p className="max-w-sm text-center text-sm text-fg-3">
          Supabase env not set. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>,
          then restart.
        </p>
      </Centered>
    );
  }
  if (phase === "login") return <LoginCard onDone={resolve} />;
  if (phase === "denied") {
    return (
      <Centered>
        <div className="text-center">
          <p className="text-sm text-fg">Not authorized.</p>
          <p className="mt-1 text-xs text-fg-3">
            This account is not staff. Ask an admin to grant access.
          </p>
          <Button variant="ghost" size="sm" className="mt-4" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </Centered>
    );
  }
  return <Dashboard meEmail={meEmail} onSignOut={signOut} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      {children}
    </div>
  );
}

function LoginCard({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sb = getSupabaseBrowser();
    if (!sb) return;
    setBusy(true);
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    onDone();
  };

  return (
    <Centered>
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-border bg-white/[0.02] p-8"
      >
        <h1 className="font-display text-xl font-bold text-fg">Team Admin</h1>
        <p className="mt-1 text-sm text-fg-3">Staff sign-in</p>
        <div className="mt-6 space-y-3">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={busy || !email || !password}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </div>
      </form>
    </Centered>
  );
}

function Dashboard({
  meEmail,
  onSignOut,
}: {
  meEmail: string | null;
  onSignOut: () => void;
}) {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<AdminAccountRow[]>([]);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyEmail, setBusyEmail] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  // Date range last applied in the funnel form; the other report sections follow it.
  const [appliedRange, setAppliedRange] = useState(() => ActivationFunnel.defaultRange());

  const load = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const [o, r, a] = await Promise.all([
        adminApi.overview(),
        adminApi.search(query),
        adminApi.audit(50),
      ]);
      setOverview(o);
      setRows(r);
      setAudit(a);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load("");
  }, [load]);

  const toggle = async (
    email: string,
    kind: "comp" | "staff",
    on: boolean,
  ) => {
    setBusyEmail(email);
    try {
      if (kind === "comp") await adminApi.setComp(email, on);
      else await adminApi.setStaff(email, on);
      toast.success(`${kind === "comp" ? "Comp" : "Staff"} ${on ? "granted" : "removed"} — ${email}`);
      await load(q);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyEmail(null);
    }
  };

  const del = async (email: string) => {
    setBusyEmail(email);
    try {
      await adminApi.deleteAccount(email);
      toast.success(`Deleted — ${email}`);
      setConfirmDel(null);
      await load(q);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyEmail(null);
    }
  };

  const stats: Array<[string, keyof Overview]> = [
    ["Users", "total_users"],
    ["Active", "active"],
    ["Trialing", "trialing"],
    ["Comp", "comp"],
    ["Staff", "staff"],
    ["Expired", "expired"],
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">Team Admin</h1>
          {meEmail && <p className="text-xs text-fg-3">{meEmail}</p>}
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign out
        </Button>
      </div>

      {/* Overview */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {stats.map(([label, key]) => (
          <div
            key={key}
            className="rounded-2xl border border-border bg-white/[0.02] px-3 py-4 text-center"
          >
            <p className="font-display text-2xl font-bold text-fg">
              {overview ? overview[key] : "—"}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-fg-3">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void load(q);
        }}
        className="mt-8 flex gap-2"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-3" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by email…"
            className="pl-11"
          />
        </div>
        <Button type="submit" size="md" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={() => load(q)}
          disabled={loading}
          aria-label="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </form>

      {/* Accounts */}
      <div className="mt-6 space-y-2">
        {loading ? (
          <p className="py-10 text-center text-sm text-fg-3">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-fg-3">No accounts.</p>
        ) : (
          rows.map((r) => {
            const comp = r.status === "comp";
            return (
              <div
                key={r.email}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white/[0.02] px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-fg">{r.email}</p>
                  <p className="mt-0.5 text-xs text-fg-3">
                    {r.is_staff ? "staff" : r.status}
                    {r.trial_ends_at
                      ? ` · trial ends ${new Date(r.trial_ends_at).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={busyEmail === r.email}
                    onClick={() => toggle(r.email, "comp", !comp)}
                  >
                    {comp ? "Remove comp" : "Grant comp"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={busyEmail === r.email}
                    onClick={() => toggle(r.email, "staff", !r.is_staff)}
                  >
                    {r.is_staff ? "Revoke staff" : "Make staff"}
                  </Button>
                  {confirmDel === r.email ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busyEmail === r.email}
                        onClick={() => del(r.email)}
                        className="text-red-400"
                      >
                        Confirm delete
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setConfirmDel(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={busyEmail === r.email}
                      onClick={() => setConfirmDel(r.email)}
                      className="text-red-400"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <FunnelSection onApply={setAppliedRange} />
      <OnboardingSection range={appliedRange} />
      <AiFeedbackSection range={appliedRange} />

      {/* Audit log */}
      <div className="mt-10">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-3">
          Recent admin actions
        </h2>
        <div className="mt-3 space-y-1">
          {audit.length === 0 ? (
            <p className="text-sm text-fg-3">No actions logged yet.</p>
          ) : (
            audit.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-white/[0.02] px-4 py-2 text-xs"
              >
                <span className="text-fg">
                  <span className="text-fg-3">{a.actor_email ?? "—"}</span>{" "}
                  {a.action}{" "}
                  <span className="text-fg-3">{a.target_email ?? ""}</span>
                </span>
                <span className="text-fg-3">
                  {new Date(a.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FunnelSection({
  onApply,
}: {
  onApply: (range: { from: string; to: string }) => void;
}) {
  const [range, setRange] = useState(() => ActivationFunnel.defaultRange());
  const [rows, setRows] = useState<ActivationFunnelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  const load = useCallback(async (from: string, to: string) => {
    setLoading(true);
    setDenied(false);
    try {
      setRows(await getActivationFunnel(from, to));
    } catch (e) {
      if ((e as Error).message === "forbidden") setDenied(true);
      else toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const d = ActivationFunnel.defaultRange();
    void load(d.from, d.to);
  }, [load]);

  const totals = ActivationFunnel.totals(rows);

  return (
    <div className="mt-10">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-3">
        Activation funnel
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onApply({ from: range.from, to: range.to });
          void load(range.from, range.to);
        }}
        className="mt-3 flex flex-wrap gap-2"
      >
        <Input
          type="date"
          value={range.from}
          onChange={(e) => setRange({ ...range, from: e.target.value })}
          className="w-auto"
          aria-label="From"
        />
        <Input
          type="date"
          value={range.to}
          onChange={(e) => setRange({ ...range, to: e.target.value })}
          className="w-auto"
          aria-label="To"
        />
        <Button type="submit" size="md" disabled={loading || !range.from || !range.to}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
        </Button>
      </form>

      {denied ? (
        <p className="mt-4 text-sm text-fg">
          Not authorized to view the activation funnel.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white/[0.02]">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-fg-3">
                <th className="px-3 py-2">Day (UTC)</th>
                {ActivationFunnel.COLUMNS.map(([label]) => (
                  <th key={label} className="px-3 py-2 text-right">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-fg">
              <tr className="border-t border-border font-semibold">
                <td className="px-3 py-2">Total</td>
                {ActivationFunnel.COLUMNS.map(([label, key]) => (
                  <td key={label} className="px-3 py-2 text-right">
                    {ActivationFunnel.formatCount(totals[key])}
                  </td>
                ))}
              </tr>
              {rows.map((r) => (
                <tr key={r.signup_day} className="border-t border-border">
                  <td className="px-3 py-2 text-fg-3">{r.signup_day}</td>
                  {ActivationFunnel.COLUMNS.map(([label, key]) => (
                    <td key={label} className="px-3 py-2 text-right">
                      {ActivationFunnel.formatCount(r[key])}
                    </td>
                  ))}
                </tr>
              ))}
              {!loading && rows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={9} className="px-3 py-4 text-center text-fg-3">
                    No signups in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <ul className="mt-2 space-y-0.5 text-[11px] text-fg-3">
        <li>Welcome seen is an upper bound.</li>
        <li>Returners count AI activity only.</li>
        <li>Returner totals cover finished days only; — means not yet available.</li>
      </ul>
    </div>
  );
}

type Loaded<T> =
  | { status: "loading" }
  | { status: "error"; forbidden: boolean }
  | { status: "ok"; rows: T[] };

// Loads one report for the shared range. A failure becomes an error state,
// never an empty/zero result, and never affects the other sections.
function useRangeReport<T>(
  range: { from: string; to: string },
  fetcher: (from: string, to: string) => Promise<T[]>,
): Loaded<T> {
  const [state, setState] = useState<Loaded<T>>({ status: "loading" });
  const { from, to } = range;

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    fetcher(from, to).then(
      (rows) => {
        if (!cancelled) setState({ status: "ok", rows });
      },
      (e: unknown) => {
        if (!cancelled)
          setState({ status: "error", forbidden: (e as Error).message === "forbidden" });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [from, to, fetcher]);

  return state;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-fg-3">
      {children}
    </h2>
  );
}

function SectionError({ forbidden, what }: { forbidden: boolean; what: string }) {
  return (
    <p className="mt-4 text-sm text-fg-3">
      {forbidden ? `Not authorized to view ${what}.` : `Couldn’t load ${what}.`}
    </p>
  );
}

function OnboardingSection({ range }: { range: { from: string; to: string } }) {
  const state = useRangeReport<OnboardingChecklistRow>(range, getOnboardingChecklist);
  const columns: Array<[string, keyof ReturnType<typeof onboardingTotals>]> = [
    ["Signups", "signups"],
    ["Skipped never-miss", "skipped_never_miss"],
    ["First brief seen", "first_brief_seen"],
    ["Dismissed", "dismissed"],
  ];

  return (
    <div className="mt-10">
      <SectionHeading>Onboarding checklist</SectionHeading>
      {state.status === "error" ? (
        <SectionError forbidden={state.forbidden} what="the onboarding checklist" />
      ) : state.status === "loading" ? (
        <p className="mt-4 text-sm text-fg-3">Loading…</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white/[0.02]">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-fg-3">
                <th className="px-3 py-2">Day (UTC)</th>
                {columns.map(([label]) => (
                  <th key={label} className="px-3 py-2 text-right">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-fg">
              <tr className="border-t border-border font-semibold">
                <td className="px-3 py-2">Total</td>
                {columns.map(([label, key]) => (
                  <td key={label} className="px-3 py-2 text-right">
                    {onboardingTotals(state.rows)[key]}
                  </td>
                ))}
              </tr>
              {state.rows.map((r) => (
                <tr key={r.day} className="border-t border-border">
                  <td className="px-3 py-2 text-fg-3">{r.day}</td>
                  {columns.map(([label, key]) => (
                    <td key={label} className="px-3 py-2 text-right">
                      {r[key]}
                    </td>
                  ))}
                </tr>
              ))}
              {state.rows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-3 py-4 text-center text-fg-3">
                    No data in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AiFeedbackSection({ range }: { range: { from: string; to: string } }) {
  const state = useRangeReport<AiFeedbackWeeklyRow>(range, getAiFeedbackWeekly);

  return (
    <div className="mt-10">
      <SectionHeading>AI feedback</SectionHeading>
      {state.status === "error" ? (
        <SectionError forbidden={state.forbidden} what="AI feedback" />
      ) : state.status === "loading" ? (
        <p className="mt-4 text-sm text-fg-3">Loading…</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white/[0.02]">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-fg-3">
                <th className="px-3 py-2">Week (UTC)</th>
                <th className="px-3 py-2">Feature</th>
                <th className="px-3 py-2 text-right">Up</th>
                <th className="px-3 py-2 text-right">Down</th>
                <th className="px-3 py-2 text-right">% up</th>
              </tr>
            </thead>
            <tbody className="text-fg">
              {state.rows.map((r) => (
                <tr key={`${r.week}|${r.feature}`} className="border-t border-border">
                  <td className="px-3 py-2 text-fg-3">{r.week}</td>
                  <td className="px-3 py-2">{r.feature}</td>
                  <td className="px-3 py-2 text-right">{r.up}</td>
                  <td className="px-3 py-2 text-right">{r.down}</td>
                  <td className="px-3 py-2 text-right">{formatPctUp(r.up, r.down)}</td>
                </tr>
              ))}
              {state.rows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-3 py-4 text-center text-fg-3">
                    No feedback in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
