import assert from "node:assert/strict";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { guides } from "../content/guides/index.ts";
import { howItWorksMetadata, howItWorksPage } from "../content/how-it-works.ts";
import { PORTAL_GET_STARTED_URL } from "./portal.ts";

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
const allLinks = [...howItWorksPage.steps.flatMap((s) => s.links), howItWorksPage.closingLink, howItWorksPage.cta];

test("the page file exists and there are 7 steps", () => {
  assert.ok(existsSync(join(appDir, "how-it-works", "page.tsx")));
  assert.equal(howItWorksPage.steps.length, 7);
});

test("every href is a real route, a real guide, or the Get started URL", () => {
  for (const { href } of allLinks) {
    if (href.startsWith("/guides/")) {
      assert.ok(guideSlugs.has(href.slice("/guides/".length)), `no such guide: ${href}`);
    } else if (href.startsWith("/")) {
      assert.ok(staticRoutes.has(href), `no such route: ${href}`);
    } else {
      assert.equal(href, PORTAL_GET_STARTED_URL);
    }
  }
});

test("required links are present", () => {
  const hrefs = new Set(allLinks.map((l) => l.href));
  for (const href of [
    PORTAL_GET_STARTED_URL,
    "/guides/outlook-admin-approval",
    "/guides/morning-brief-email",
    "/guides/open-loops-sync",
    "/security",
    "/guides/spot-phishing-in-gmail-and-outlook",
  ]) {
    assert.ok(hrefs.has(href), href);
  }
});

test("copy has no banned words and the only storage line is the allowed one", () => {
  const banned = ["$", "free", "price", "trial", "verified", "verification", "casa"];
  const text = [
    howItWorksMetadata.title,
    howItWorksMetadata.description,
    howItWorksPage.h1,
    howItWorksPage.intro,
    howItWorksPage.closing,
    ...howItWorksPage.steps.flatMap((s) => [s.title, s.body, ...s.links.map((l) => l.label)]),
  ]
    .join("\n")
    .toLowerCase();
  for (const word of banned) assert.ok(!text.includes(word), `"${word}"`);
  const rest = text.split("email bodies aren't stored.").join("");
  assert.ok(!rest.includes("stor"), "storage wording outside the allowed line");
});
