// Source-level SEO check: every public page sets title, description and a
// canonical path through pageMetadata, and the sitemap lists it. Reads files
// as text so it needs no `@/` alias resolution and no build.
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const read = (...p: string[]) => readFileSync(join(root, ...p), "utf8");

const sitemap = read("app", "sitemap.ts");
const sitemapPaths = new Set([...sitemap.matchAll(/path:\s*"(\/[^"]*)"/g)].map((m) => m[1]));
sitemapPaths.add("/guides"); // added in code once guides exist

const slugsIn = (dir: string) =>
  readdirSync(join(root, "content", dir))
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => /\bslug:\s*"([^"]+)"/.exec(read("content", dir, f))?.[1])
    .filter((s): s is string => Boolean(s));

const staticPages = ["/", "/security", "/how-it-works", "/why-minibrief", "/changelog", "/privacy", "/terms", "/accessibility", "/guides"];
const pageFile = (route: string) => join("app", ...route.split("/").filter(Boolean), "page.tsx");

// A page may take its strings from a content module (`title: home.title`,
// imported from "@/content/home"). Follow that import and require real
// literals in the exported object; everything else must be a literal here.
function metadataStrings(route: string, src: string): { title?: string; description?: string } {
  const ref = /title:\s*(\w+)\.title\b/.exec(src)?.[1];
  if (!ref) {
    return {
      title: /title:\s*["'`]([^"'`]+)/.exec(src)?.[1],
      description: /description:\s*["'`]([^"'`]+)/.exec(src)?.[1],
    };
  }
  assert.match(src, new RegExp(`description:\\s*${ref}\\.description\\b`), `${route}: description does not come from ${ref}`);
  const imp = new RegExp(`import\\s*\\{[^}]*?\\b(?:(\\w+)\\s+as\\s+)?${ref}\\b[^}]*\\}\\s*from\\s*"@/content/([\\w-]+)"`).exec(src);
  assert.ok(imp, `${route}: ${ref} is not imported from @/content/*`);
  const exported = imp[1] ?? ref;
  const mod = read("content", `${imp[2]}.ts`);
  const block = new RegExp(`export const ${exported}\\b[^=]*=\\s*\\{([\\s\\S]*?)\\}\\s*as const;`).exec(mod)?.[1];
  assert.ok(block, `${route}: content/${imp[2]}.ts has no ${exported} object`);
  return {
    title: /title:\s*["'`]([^"'`]+)/.exec(block)?.[1],
    description: /description:\s*["'`]([^"'`]+)/.exec(block)?.[1],
  };
}

test("static pages set title, description and a matching canonical path", () => {
  for (const route of staticPages) {
    const src = read(pageFile(route));
    assert.match(src, /pageMetadata\(\{/, `${route}: no pageMetadata call`);
    const { title, description } = metadataStrings(route, src);
    assert.ok(title && title.trim().length > 0, `${route}: no title`);
    assert.ok(description && description.trim().length > 0, `${route}: no description`);
    const pathConst = /path:\s*([A-Z_][A-Z0-9_]*)\b/.exec(src)?.[1];
    const canonical = pathConst ? new RegExp(`const ${pathConst}\\s*=\\s*"([^"]*)"`).exec(src)?.[1] : /path:\s*"([^"]*)"/.exec(src)?.[1];
    assert.equal(canonical, route, `${route}: canonical path does not match route`);
  }
});

test("dynamic pages build metadata from their slug", () => {
  const guide = read("app", "guides", "[slug]", "page.tsx");
  assert.match(guide, /path:\s*`\/guides\/\$\{/);
  assert.match(guide, /description:/);
  const seg = read("app", "for", "[slug]", "page.tsx");
  assert.match(seg, /path:\s*`\/for\/\$\{/);
  assert.match(seg, /description:/);
});

test("the sitemap includes every page", () => {
  for (const route of staticPages) assert.ok(sitemapPaths.has(route), `${route} missing from sitemap`);
  for (const slug of slugsIn("for")) assert.ok(sitemapPaths.has(`/for/${slug}`), `/for/${slug} missing from sitemap`);
  assert.match(sitemap, /siteGuides\.map/, "guide pages are not added to the sitemap");
  assert.ok(slugsIn("guides").length > 0);
});

test("every sitemap route has a page file", () => {
  for (const route of sitemapPaths) {
    if (route.startsWith("/for/")) assert.ok(existsSync(join(root, "app", "for", "[slug]", "page.tsx")));
    else assert.ok(existsSync(join(root, pageFile(route))), `${route}: no page file`);
  }
});

test("404 is not indexed", () => {
  assert.match(read("app", "not-found.tsx"), /robots:\s*\{\s*index:\s*false/);
});
