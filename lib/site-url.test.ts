import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSiteUrl } from "./site-url.ts";

test("normalizeSiteUrl strips a trailing newline", () => {
  assert.equal(normalizeSiteUrl("https://minibrief.app\n"), "https://www.minibrief.app");
});

test("normalizeSiteUrl strips trailing slashes and whitespace", () => {
  assert.equal(normalizeSiteUrl(" https://minibrief.app//\r\n"), "https://www.minibrief.app");
});

test("normalizeSiteUrl falls back to the canonical www origin", () => {
  assert.equal(normalizeSiteUrl(undefined), "https://www.minibrief.app");
});

test("normalizeSiteUrl maps the apex with a trailing slash to www", () => {
  assert.equal(normalizeSiteUrl("https://minibrief.app/"), "https://www.minibrief.app");
});

test("normalizeSiteUrl keeps www as www", () => {
  assert.equal(normalizeSiteUrl("https://www.minibrief.app\n"), "https://www.minibrief.app");
});

test("normalizeSiteUrl leaves other hosts unchanged", () => {
  assert.equal(
    normalizeSiteUrl("https://mini-brief-git-preview.vercel.app/"),
    "https://mini-brief-git-preview.vercel.app",
  );
  assert.equal(normalizeSiteUrl("http://localhost:3000"), "http://localhost:3000");
});
