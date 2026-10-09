// Pure formatting/totals logic for the admin activation funnel. No React or
// Supabase imports so it stays trivially testable.

import type { ActivationFunnelRow } from "@/lib/admin-api";

export type FunnelColumn = Exclude<keyof ActivationFunnelRow, "signup_day">;

export class ActivationFunnel {
  static readonly COLUMNS: ReadonlyArray<[string, FunnelColumn]> = [
    ["Signups", "signups"],
    ["Phone verified", "phone_verified"],
    ["Mailbox connected", "mailbox_connected"],
    ["Welcome seen", "welcome_seen"],
    ["First brief", "first_brief"],
    ["D1", "d1_returners"],
    ["D7", "d7_returners"],
    ["D28", "d28_returners"],
  ];

  /** Sum per column. NULLs are skipped, not counted as 0; a column that is
   *  NULL on every row (no finished days) totals NULL. */
  static totals(rows: ActivationFunnelRow[]): Record<FunnelColumn, number | null> {
    const out = {} as Record<FunnelColumn, number | null>;
    for (const [, key] of ActivationFunnel.COLUMNS) {
      let sum: number | null = null;
      for (const r of rows) {
        const v = r[key];
        if (v !== null) sum = (sum ?? 0) + v;
      }
      out[key] = sum;
    }
    return out;
  }

  static formatCount(v: number | null): string {
    return v === null ? "—" : String(v);
  }

  /** YYYY-MM-DD in UTC, `daysAgo` days before `now`. */
  static isoDay(now: Date, daysAgo = 0): string {
    const d = new Date(now.getTime() - daysAgo * 86_400_000);
    return d.toISOString().slice(0, 10);
  }

  /** Default range: last 28 days including today (UTC). */
  static defaultRange(now = new Date()): { from: string; to: string } {
    return { from: ActivationFunnel.isoDay(now, 27), to: ActivationFunnel.isoDay(now) };
  }
}
