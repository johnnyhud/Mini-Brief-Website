import assert from "node:assert/strict";
import { test } from "node:test";
import { faq } from "../content/faq.ts";
import { cta, footer, hero, nav } from "../content/home.ts";
import { PORTAL_GET_STARTED_URL, PORTAL_SIGN_IN_URL } from "./portal.ts";

const ctas: ReadonlyArray<{ label: string; href: string }> = [
  nav.signIn,
  nav.getStarted,
  hero.primary,
  cta.primary,
  ...footer.product.links.filter((l) => l.href.startsWith("http")),
];

test("no CTA label in content/home.ts says free", () => {
  for (const { label } of [...ctas, hero.secondary]) assert.doesNotMatch(label, /\bfree\b/i, label);
});

test("no FAQ answer says free", () => {
  for (const item of faq.items) assert.doesNotMatch(item.a, /\bfree\b/i, item.q);
});

test("every CTA href is a portal constant", () => {
  assert.ok(ctas.length >= 5);
  for (const { label, href } of ctas) {
    assert.ok(href === PORTAL_GET_STARTED_URL || href === PORTAL_SIGN_IN_URL, `${label}: ${href}`);
  }
});

test("CTA wording is consistent", () => {
  for (const c of ctas) {
    assert.equal(c.label, c.href === PORTAL_SIGN_IN_URL ? "Sign in" : "Get started");
  }
});
