import assert from "node:assert/strict";
import { test } from "node:test";
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
