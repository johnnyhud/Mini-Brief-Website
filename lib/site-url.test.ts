import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSiteUrl } from "./site-url.ts";

test("normalizeSiteUrl strips a trailing newline", () => {
  assert.equal(normalizeSiteUrl("https://minibrief.app\n"), "https://minibrief.app");
});

test("normalizeSiteUrl strips trailing slashes and whitespace", () => {
  assert.equal(normalizeSiteUrl(" https://minibrief.app//\r\n"), "https://minibrief.app");
});

test("normalizeSiteUrl falls back to the production origin", () => {
  assert.equal(normalizeSiteUrl(undefined), "https://minibrief.app");
});
