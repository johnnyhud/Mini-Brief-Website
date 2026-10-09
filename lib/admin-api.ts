"use client";

// Typed client for the deployed `admin` Edge Function
// (https://<ref>.supabase.co/functions/v1/admin). Authorization is the
// signed-in user's Supabase access token; the function re-checks
// is_admin server-side, so this UI is convenience, not the boundary.

import { getSupabaseBrowser, SUPABASE_URL } from "@/lib/supabase-browser";

export interface AdminAccountRow {
  email: string;
  status: string;
  trial_ends_at: string | null;
  current_period_end: string | null;
  is_staff: boolean;
  created_at: string;
}

export type Overview = {
  total_users: number;
  staff: number;
  comp: number;
  active: number;
  trialing: number;
  expired: number;
};

export interface AuditRow {
  id: number;
  actor_email: string | null;
  action: string;
  target_email: string | null;
  detail: string | null;
  created_at: string;
}

export interface ActivationFunnelRow {
  signup_day: string;
  signups: number;
  phone_verified: number;
  mailbox_connected: number;
  welcome_seen: number;
  first_brief: number;
  // NULL until the signup day has finished (UTC).
  d1_returners: number | null;
  d7_returners: number | null;
  d28_returners: number | null;
}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const sb = getSupabaseBrowser();
  if (!sb) throw new Error("Supabase not configured");
  const { data } = await sb.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("not_signed_in");

  const res = await fetch(`${SUPABASE_URL}/functions/v1/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error("not_signed_in");
  if (res.status === 403) throw new Error("forbidden");
  if (!res.ok) {
    const e = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(e.error ?? `admin ${res.status}`);
  }
  return (await res.json()) as T;
}

export const adminApi = {
  whoami: () => call<{ admin: boolean; email: string | null }>({ action: "whoami" }),
  overview: () => call<Overview>({ action: "overview" }),
  search: (q: string) => call<AdminAccountRow[]>({ action: "search", q }),
  setComp: (email: string, on: boolean) =>
    call<{ result: string }>({ action: "set_comp", email, on }),
  setStaff: (email: string, on: boolean) =>
    call<{ result: string }>({ action: "set_staff", email, on }),
  deleteAccount: (email: string) =>
    call<{ result: string }>({ action: "delete_account", email }),
  audit: (lim = 50) => call<AuditRow[]>({ action: "audit", lim }),
};

const COUNT_COLS = [
  "signups",
  "phone_verified",
  "mailbox_connected",
  "welcome_seen",
  "first_brief",
] as const;
const RETURNER_COLS = ["d1_returners", "d7_returners", "d28_returners"] as const;

// Calls the admin-only RPC with the signed-in session. Postgres 42501
// (insufficient privilege) maps to "forbidden", like the Edge Function's 403.
export async function getActivationFunnel(
  from: string,
  to: string,
): Promise<ActivationFunnelRow[]> {
  const sb = getSupabaseBrowser();
  if (!sb) throw new Error("Supabase not configured");
  const { data: session } = await sb.auth.getSession();
  if (!session.session) throw new Error("not_signed_in");

  const { data, error } = await sb.rpc("admin_activation_funnel", {
    p_from: from,
    p_to: to,
  });
  if (error) {
    if (error.code === "42501") throw new Error("forbidden");
    throw new Error(error.message);
  }
  // bigint columns may arrive as strings; normalise to numbers.
  return ((data ?? []) as Record<string, unknown>[]).map((r) => {
    const row: Record<string, unknown> = { signup_day: String(r.signup_day) };
    for (const k of COUNT_COLS) row[k] = Number(r[k] ?? 0);
    for (const k of RETURNER_COLS) row[k] = r[k] == null ? null : Number(r[k]);
    return row as unknown as ActivationFunnelRow;
  });
}
