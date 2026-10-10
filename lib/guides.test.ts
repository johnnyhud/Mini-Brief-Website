import assert from "node:assert/strict";
import { test } from "node:test";
import { guides } from "../content/guides/index.ts";
import { getGuide, listGuides, type Guide } from "./guides.ts";

// Test-only fixtures. Never put these in content/guides.
const fixture: Guide = {
  slug: "fixture-guide",
  title: "Fixture guide",
  description: "A fixture used by the loader tests.",
  date: "2026-01-02",
  body: [
    { type: "h2", text: "A heading" },
    { type: "p", text: "A paragraph." },
  ],
};
const older: Guide = { ...fixture, slug: "older-fixture", date: "2025-12-31" };

test("zero guides gives an empty list", () => {
  assert.deepEqual(listGuides([]), []);
  assert.equal(getGuide([], "anything"), undefined);
});

test("a fixture guide comes back with its slug and metadata", () => {
  const [guide] = listGuides([fixture]);
  assert.equal(guide.slug, "fixture-guide");
  assert.equal(guide.title, "Fixture guide");
  assert.equal(guide.description, "A fixture used by the loader tests.");
  assert.equal(guide.date, "2026-01-02");
  assert.equal(getGuide([fixture], "fixture-guide")?.title, "Fixture guide");
  assert.equal(getGuide([fixture], "missing"), undefined);
});

test("guides are listed newest first", () => {
  assert.deepEqual(listGuides([older, fixture]).map((g) => g.slug), ["fixture-guide", "older-fixture"]);
});

test("bad slugs, dates, empty bodies and duplicates are rejected", () => {
  assert.throws(() => listGuides([{ ...fixture, slug: "Bad Slug" }]));
  assert.throws(() => listGuides([{ ...fixture, date: "Jan 2" }]));
  assert.throws(() => listGuides([{ ...fixture, body: [] }]));
  assert.throws(() => listGuides([fixture, fixture]));
});

test("faq must have 2 to 4 entries with no empty q or a", () => {
  const ok = [
    { q: "Q1?", a: "A1." },
    { q: "Q2?", a: "A2." },
  ];
  assert.equal(listGuides([{ ...fixture, faq: ok }])[0].faq?.length, 2);
  assert.doesNotThrow(() => listGuides([fixture]));
  assert.throws(() => listGuides([{ ...fixture, faq: [ok[0]] }]));
  assert.throws(() => listGuides([{ ...fixture, faq: [...ok, ...ok, ok[0]] }]));
  assert.throws(() => listGuides([{ ...fixture, faq: [{ q: " ", a: "A." }, ok[1]] }]));
  assert.throws(() => listGuides([{ ...fixture, faq: [ok[0], { q: "Q?", a: "" }] }]));
});

const SLUGS = [
  "morning-brief-email",
  "one-daily-brief-for-gmail-and-outlook",
  "open-loops-sync",
  "outlook-admin-approval",
  "see-what-you-promised-in-email",
  "spot-phishing-in-gmail-and-outlook",
];

test("the registry has exactly the 6 guides, all valid, each with a FAQ", () => {
  const listed = listGuides(guides);
  assert.deepEqual(listed.map((g) => g.slug).sort(), SLUGS);
  for (const guide of listed) assert.ok(guide.faq && guide.faq.length >= 2, guide.slug);
});

test("guide text has no banned words and no storage claim beyond the site's wording", () => {
  const banned = ["$", "free", "price", "trial", "verified", "verification", "casa", "shared inbox", "meeting prep"];
  const allowed = "Message bodies are not stored on our servers.";
  for (const guide of listGuides(guides)) {
    const parts = [guide.title, guide.description];
    for (const block of guide.body) parts.push(...("items" in block ? block.items : [block.text]));
    for (const item of guide.faq ?? []) parts.push(item.q, item.a);
    const text = parts.join("\n").toLowerCase();
    for (const word of banned) assert.ok(!text.includes(word), `${guide.slug}: "${word}"`);
    const rest = text.split(allowed.toLowerCase()).join("");
    assert.ok(!rest.includes("stor"), `${guide.slug}: "stor" outside the allowed sentence`);
  }
});
