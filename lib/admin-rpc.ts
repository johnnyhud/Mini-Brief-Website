// Founders-only aggregate RPC fetchers and pure helpers. The Supabase client
// is injected (no React/Next imports, no "@/" aliases) so the normalisation and
// error mapping are unit-testable; lib/admin-api.ts binds the browser client.

export interface OnboardingChecklistRow {
  day: string;
  signups: number;
  skipped_never_miss: number;
  first_brief_seen: number;
  dismissed: number;
}

export interface AiFeedbackWeeklyRow {
  week: string;
  feature: string;
  up: number;
  down: number;
}

export interface RpcClient {
  auth: { getSession(): PromiseLike<{ data: { session: unknown } }> };
  rpc(
    fn: string,
    args: Record<string, unknown>,
  ): PromiseLike<{ data: unknown; error: { code?: string; message: string } | null }>;
}

export const ONBOARDING_COLS = [
  "signups",
  "skipped_never_miss",
  "first_brief_seen",
  "dismissed",
] as const;

async function callAdminRpc(
  sb: RpcClient,
  fn: string,
  from: string,
  to: string,
): Promise<Record<string, unknown>[]> {
  const { data: session } = await sb.auth.getSession();
  if (!session.session) throw new Error("not_signed_in");

  const { data, error } = await sb.rpc(fn, { p_from: from, p_to: to });
  if (error) {
    if (error.code === "42501") throw new Error("forbidden");
    throw new Error(error.message);
  }
  return (data ?? []) as Record<string, unknown>[];
}

export async function fetchOnboardingChecklist(
  sb: RpcClient,
  from: string,
  to: string,
): Promise<OnboardingChecklistRow[]> {
  const rows = await callAdminRpc(sb, "admin_onboarding_checklist", from, to);
  // bigint columns may arrive as strings; normalise to numbers.
  return rows.map((r) => {
    const row: Record<string, unknown> = { day: String(r.day) };
    for (const k of ONBOARDING_COLS) row[k] = Number(r[k] ?? 0);
    return row as unknown as OnboardingChecklistRow;
  });
}

export async function fetchAiFeedbackWeekly(
  sb: RpcClient,
  from: string,
  to: string,
): Promise<AiFeedbackWeeklyRow[]> {
  const rows = await callAdminRpc(sb, "admin_ai_feedback_weekly", from, to);
  return rows.map((r) => ({
    week: String(r.week),
    feature: String(r.feature),
    up: Number(r.up ?? 0),
    down: Number(r.down ?? 0),
  }));
}

export function onboardingTotals(
  rows: OnboardingChecklistRow[],
): Record<(typeof ONBOARDING_COLS)[number], number> {
  const out = { signups: 0, skipped_never_miss: 0, first_brief_seen: 0, dismissed: 0 };
  for (const r of rows) for (const k of ONBOARDING_COLS) out[k] += r[k];
  return out;
}

/** "NN%" of up votes, or "—" when there are no votes. */
export function formatPctUp(up: number, down: number): string {
  const n = up + down;
  return n === 0 ? "—" : `${Math.round((up / n) * 100)}%`;
}
