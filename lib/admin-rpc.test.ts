import assert from "node:assert/strict";
import { test } from "node:test";
import {
  fetchAiFeedbackWeekly,
  fetchOnboardingChecklist,
  formatPctUp,
  onboardingTotals,
  type RpcClient,
} from "./admin-rpc.ts";

type Result = { data: unknown; error: { code?: string; message: string } | null };

function mock(
  result: Result,
  session: unknown = { access_token: "t" },
): RpcClient & { calls: Array<[string, Record<string, unknown>]> } {
  const calls: Array<[string, Record<string, unknown>]> = [];
  return {
    calls,
    auth: { getSession: async () => ({ data: { session } }) },
    rpc: async (fn, args) => {
      calls.push([fn, args]);
      return result;
    },
  };
}

const forbidden: Result = { data: null, error: { code: "42501", message: "x" } };

test("onboarding checklist: string bigints become numbers", async () => {
  const sb = mock({
    data: [
      { day: "2026-10-01", signups: "5", skipped_never_miss: "2", first_brief_seen: "3", dismissed: "1" },
    ],
    error: null,
  });
  const rows = await fetchOnboardingChecklist(sb, "2026-10-01", "2026-10-02");
  assert.deepEqual(rows, [
    { day: "2026-10-01", signups: 5, skipped_never_miss: 2, first_brief_seen: 3, dismissed: 1 },
  ]);
  assert.deepEqual(sb.calls, [
    ["admin_onboarding_checklist", { p_from: "2026-10-01", p_to: "2026-10-02" }],
  ]);
});

test("onboarding checklist: empty and null data → []", async () => {
  assert.deepEqual(await fetchOnboardingChecklist(mock({ data: [], error: null }), "a", "b"), []);
  assert.deepEqual(await fetchOnboardingChecklist(mock({ data: null, error: null }), "a", "b"), []);
});

test("onboarding checklist: 42501 → forbidden, other errors keep message", async () => {
  await assert.rejects(fetchOnboardingChecklist(mock(forbidden), "a", "b"), {
    message: "forbidden",
  });
  await assert.rejects(
    fetchOnboardingChecklist(
      mock({ data: null, error: { code: "22023", message: "bad range" } }),
      "a",
      "b",
    ),
    { message: "bad range" },
  );
});

test("no session → not_signed_in, RPC never called", async () => {
  const sb = mock({ data: [], error: null }, null);
  await assert.rejects(fetchAiFeedbackWeekly(sb, "a", "b"), { message: "not_signed_in" });
  assert.equal(sb.calls.length, 0);
});

test("ai feedback: string bigints become numbers", async () => {
  const sb = mock({
    data: [{ week: "2026-09-28", feature: "brief", up: "7", down: "3" }],
    error: null,
  });
  assert.deepEqual(await fetchAiFeedbackWeekly(sb, "a", "b"), [
    { week: "2026-09-28", feature: "brief", up: 7, down: 3 },
  ]);
  assert.equal(sb.calls[0][0], "admin_ai_feedback_weekly");
});

test("ai feedback: empty → [] and 42501 → forbidden", async () => {
  assert.deepEqual(await fetchAiFeedbackWeekly(mock({ data: [], error: null }), "a", "b"), []);
  await assert.rejects(fetchAiFeedbackWeekly(mock(forbidden), "a", "b"), {
    message: "forbidden",
  });
});

test("onboardingTotals sums columns; empty is zeros", () => {
  assert.deepEqual(onboardingTotals([]), {
    signups: 0,
    skipped_never_miss: 0,
    first_brief_seen: 0,
    dismissed: 0,
  });
  assert.deepEqual(
    onboardingTotals([
      { day: "a", signups: 1, skipped_never_miss: 2, first_brief_seen: 3, dismissed: 4 },
      { day: "b", signups: 1, skipped_never_miss: 0, first_brief_seen: 1, dismissed: 1 },
    ]),
    { signups: 2, skipped_never_miss: 2, first_brief_seen: 4, dismissed: 5 },
  );
});

test("formatPctUp shows — when there are no votes", () => {
  assert.equal(formatPctUp(0, 0), "—");
  assert.equal(formatPctUp(1, 2), "33%");
  assert.equal(formatPctUp(0, 4), "0%");
  assert.equal(formatPctUp(3, 0), "100%");
});
