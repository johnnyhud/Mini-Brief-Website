import assert from "node:assert/strict";
import { test } from "node:test";
import { changelog } from "../content/changelog/index.ts";
import { buildChangelogRss, listChangelog, type ChangelogEntry } from "./changelog.ts";

// Test-only fixtures. Never put these in content/changelog.
const fixture: ChangelogEntry = { slug: "fixture", date: "2026-01-02", title: "Fixture", items: ["A change."] };
const older: ChangelogEntry = { ...fixture, slug: "older", date: "2025-12-31" };

test("zero entries gives an empty list", () => {
  assert.deepEqual(listChangelog([]), []);
});

test("entries are listed newest first, same-day entries keep registry order", () => {
  const sameDay = { ...fixture, slug: "same-day" };
  assert.deepEqual(listChangelog([older, fixture, sameDay]).map((e) => e.slug), ["fixture", "same-day", "older"]);
});

test("bad slugs, dates, titles, empty items and duplicates are rejected", () => {
  assert.throws(() => listChangelog([{ ...fixture, slug: "Bad Slug" }]));
  assert.throws(() => listChangelog([{ ...fixture, date: "Jan 2" }]));
  assert.throws(() => listChangelog([{ ...fixture, date: "2026-13-45" }]));
  assert.throws(() => listChangelog([{ ...fixture, title: " " }]));
  assert.throws(() => listChangelog([{ ...fixture, items: [] }]));
  assert.throws(() => listChangelog([{ ...fixture, items: [" "] }]));
  assert.throws(() => listChangelog([fixture, fixture]));
});

test("the RSS feed is RSS 2.0 with absolute links and escaped text", () => {
  const feed = buildChangelogRss(listChangelog([{ ...fixture, title: "A & B", items: ["<b>x</b>"] }, older]), "https://example.com");
  assert.ok(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">'));
  assert.ok(feed.includes("<link>https://example.com/changelog#fixture</link>"));
  assert.ok(feed.includes("<title>A &amp; B</title>"));
  assert.ok(!feed.includes("<b>"));
  assert.ok(feed.includes("<pubDate>Fri, 02 Jan 2026 00:00:00 GMT</pubDate>"));
  assert.equal(feed.split("<item>").length - 1, 2);
});

test("the registry is valid, newest first, with the 4 seed entries", () => {
  const listed = listChangelog(changelog);
  const dates = listed.map((e) => e.date);
  assert.deepEqual(dates, [...dates].sort().reverse());
  assert.deepEqual(listed.map((e) => e.slug), ["brief-and-morning-email", "open-loops", "getting-connected", "website"]);
});

test("changelog text has no banned words and no storage claim", () => {
  const banned = ["$", "free", "price", "trial", "verified", "verification", "casa", "shared inbox", "meeting prep", "rls", "migration", "claude", "analytics", "crm"];
  for (const entry of listChangelog(changelog)) {
    const text = [entry.title, ...entry.items].join("\n").toLowerCase();
    for (const word of banned) assert.ok(!text.includes(word), `${entry.slug}: "${word}"`);
    assert.ok(!text.includes("stor"), `${entry.slug}: "stor"`);
  }
});
