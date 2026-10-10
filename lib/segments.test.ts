import assert from "node:assert/strict";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { footer } from "../content/home.ts";
import { guides } from "../content/guides/index.ts";
import { segmentClosing, segments } from "../content/for/index.ts";
import { getSegment, listSegments, type Segment } from "./segments.ts";

const appDir = join(fileURLToPath(import.meta.url), "..", "..", "app");

function routes(dir: string, prefix = ""): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return routes(full, `${prefix}/${name}`);
    return name === "page.tsx" ? [prefix || "/"] : [];
  });
}

const staticRoutes = new Set(routes(appDir).filter((r) => !r.includes("[")));
const guideSlugs = new Set(guides.map((g) => g.slug));

// Test-only fixture. Never put this in content/for.
const fixture: Segment = {
  slug: "fixture",
  name: "Fixture",
  title: "Fixture title",
  description: "A fixture.",
  intro: "An intro.",
  pains: [1, 2, 3].map((n) => ({ pain: `Pain ${n}`, body: `Body ${n}.` })),
  guides: ["a", "b"],
};

test("bad slugs, missing fields, pain and guide counts, and duplicates are rejected", () => {
  assert.doesNotThrow(() => listSegments([fixture]));
  assert.throws(() => listSegments([{ ...fixture, slug: "Bad Slug" }]));
  assert.throws(() => listSegments([{ ...fixture, title: " " }]));
  assert.throws(() => listSegments([{ ...fixture, pains: fixture.pains.slice(0, 2) }]));
  assert.throws(() => listSegments([{ ...fixture, pains: [...fixture.pains, ...fixture.pains] }]));
  assert.throws(() => listSegments([{ ...fixture, pains: [{ pain: "", body: "x" }, ...fixture.pains.slice(1)] }]));
  assert.throws(() => listSegments([{ ...fixture, guides: ["a"] }]));
  assert.throws(() => listSegments([fixture, fixture]));
  assert.equal(getSegment([fixture], "missing"), undefined);
});

test("the registry has exactly the 3 segments, with unique slugs", () => {
  const listed = listSegments(segments);
  assert.deepEqual(listed.map((s) => s.slug).sort(), [
    "agencies-and-consultancies",
    "real-estate-agents",
    "trades-and-local-services",
  ]);
});

test("the page file exists and every guide link is a real guide", () => {
  assert.ok(existsSync(join(appDir, "for", "[slug]", "page.tsx")));
  assert.ok(staticRoutes.has("/how-it-works") && staticRoutes.has("/security"));
  for (const segment of listSegments(segments)) {
    for (const slug of segment.guides) assert.ok(guideSlugs.has(slug), `${segment.slug}: no such guide ${slug}`);
  }
});

test("the footer links every segment page", () => {
  const hrefs = new Set(footer.whoItsFor.links.map((l) => l.href));
  for (const segment of listSegments(segments)) assert.ok(hrefs.has(`/for/${segment.slug}`), segment.slug);
  assert.equal(hrefs.size, segments.length);
});

test("copy has no banned words and the only storage line is the allowed one", () => {
  const banned = [
    "$", "free", "price", "pricing", "trial", "verified", "verification", "casa", "approved by",
    "trusted by", "relationship", "shared inbox", "mls", "crm", "customers", "testimonial",
  ];
  for (const segment of listSegments(segments)) {
    const text = [
      segment.title,
      segment.name,
      segment.description,
      segment.intro,
      ...segment.pains.flatMap((p) => [p.pain, p.body]),
    ]
      .join("\n")
      .toLowerCase();
    for (const word of banned) assert.ok(!text.includes(word), `${segment.slug}: "${word}"`);
    assert.ok(!/\d/.test(text.split("microsoft 365").join("")),`${segment.slug}: no stats or numbers`);
    assert.ok(!text.includes("stor"), `${segment.slug}: storage wording belongs in segmentClosing only`);
  }
  assert.equal(segmentClosing, "Email bodies aren't stored.");
});
