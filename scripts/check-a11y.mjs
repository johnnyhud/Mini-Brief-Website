// Runs axe-core over every page in the sitemap plus the 404 page and fails on
// serious/critical violations (WCAG 2.2 AA tags).
//
// Not part of `npm test`: it needs a running server and a browser. CI installs the
// tooling with `npm i --no-save` (see docs/ci/a11y-perf.yml.example), so package.json
// and the lockfile are unchanged.
//
//   npm run build && npm start &
//   BASE_URL=http://localhost:3000 node scripts/check-a11y.mjs
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const sitemapRes = await fetch(`${base}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Could not fetch ${base}/sitemap.xml (${sitemapRes.status})`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/this-page-does-not-exist"); // 404 page

const browser = await chromium.launch();
let failed = 0;
for (const path of [...new Set(paths)]) {
  const page = await browser.newPage();
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
  const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  console.log(`${blocking.length ? "FAIL" : "ok  "} ${path}`);
  for (const v of blocking) {
    failed++;
    console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
    for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(" ")}`);
  }
  await page.close();
}
await browser.close();

if (failed) {
  console.error(`${failed} serious/critical axe violation(s)`);
  process.exit(1);
}
console.log("No serious/critical axe violations.");
