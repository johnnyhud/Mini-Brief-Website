// Checks that every internal link in app/, components/ and content/ points at
// an existing route, public file or on-page anchor. No dependencies.
//   node scripts/check-links.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const sources = ["app", "components", "content"]
  .flatMap((d) => walk(join(root, d)))
  .filter((f) => /\.(tsx?|md)$/.test(f));

// Routes: every app/**/page.tsx. Dynamic segments ([slug]) match any one segment.
const routes = walk(join(root, "app"))
  .filter((f) => /[\\/]page\.tsx$/.test(f))
  .map((f) => "/" + relative(join(root, "app"), f).replace(/[\\/]?page\.tsx$/, "").split(/[\\/]/).filter(Boolean).join("/"))
  .map((r) => (r === "/" ? "/" : r.replace(/\/$/, "")));

function routeExists(path) {
  const parts = path.split("/").filter(Boolean);
  return routes.some((route) => {
    const rp = route.split("/").filter(Boolean);
    return rp.length === parts.length && rp.every((seg, i) => /^\[.+\]$/.test(seg) || seg === parts[i]);
  });
}

// Anchors: every static id in the sources.
const ids = new Set();
for (const file of sources) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/\bid(?:=|:\s*)\{?\s*["'`]([^"'`$]+)["'`]/g)) ids.add(m[1]);
}

const hrefPattern = /(?:href[=:]\s*\{?\s*|\]\()["'`]?([^"'`)\s}]+)/g;
const problems = [];
for (const file of sources) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(hrefPattern)) {
    const href = m[1];
    if (!href.startsWith("/") && !href.startsWith("#")) continue; // external, mailto, expression
    if (href.startsWith("//") || href.includes("${")) continue; // protocol-relative, template
    const [pathAndQuery, hash] = href.split("#");
    const path = pathAndQuery.split("?")[0] || "/";
    const line = text.slice(0, m.index).split("\n").length;
    const where = `${relative(root, file)}:${line}`;
    if (pathAndQuery && !routeExists(path) && !existsSync(join(root, "public", path))) {
      problems.push(`${where}  ${href}  (no such route or public file)`);
    } else if (hash && !ids.has(hash)) {
      problems.push(`${where}  ${href}  (no element with id="${hash}")`);
    }
  }
}

if (problems.length > 0) {
  console.error(`Broken internal links:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`Link check passed (${routes.length} routes, ${ids.size} anchors).`);
