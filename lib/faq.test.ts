import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { guides } from "../content/guides/index.ts";
import { faq } from "../content/faq.ts";
import { faqPage } from "./faq-schema.ts";
import { listGuides } from "./guides.ts";

const EXISTING_ITEMS = 6;
const items: ReadonlyArray<{ q: string; a: string; link?: { text: string; href: string } }> = faq.items;

test("the home FAQ has 11 or 12 items", () => {
  assert.ok(items.length >= 11 && items.length <= 12, `got ${items.length}`);
});

test("FAQPage JSON-LD carries every visible item, answer text unchanged", () => {
  const ld = faqPage(items);
  assert.equal(ld["@type"], "FAQPage");
  assert.deepEqual(
    ld.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
    items.map(({ q, a }) => ({ q, a })),
  );
});

test("every link.text appears verbatim in its answer", () => {
  for (const item of items) {
    if (item.link) assert.ok(item.a.includes(item.link.text), item.q);
  }
});

test("every link.href is an existing route or guide slug", () => {
  const slugs = new Set(listGuides(guides).map((g) => g.slug));
  for (const item of items) {
    if (!item.link) continue;
    const { href } = item.link;
    assert.ok(href.startsWith("/"), `${item.q}: ${href}`);
    const guide = href.match(/^\/guides\/([^/]+)$/);
    if (guide) assert.ok(slugs.has(guide[1]), `${item.q}: unknown guide ${href}`);
    else assert.ok(existsSync(new URL(`../app${href}/page.tsx`, import.meta.url)), `${item.q}: no route ${href}`);
  }
});

test("new answers have no banned words and no storage claims", () => {
  const banned = ["$", "free", "price", "trial", "verified", "verification", "casa", "shared inbox", "meeting prep", "stor"];
  for (const item of items.slice(EXISTING_ITEMS)) {
    const text = `${item.q}\n${item.a}`.toLowerCase();
    for (const word of banned) assert.ok(!text.includes(word), `${item.q}: "${word}"`);
  }
});
