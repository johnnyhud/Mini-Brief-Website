/**
 * Guides loader. Pure functions over a list of guides, so the same code serves
 * the site (content/guides/index.ts) and the tests (a fixture list). No
 * imports on purpose: the test runs this file directly under Node.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Guide {
  /** URL segment: lowercase letters, digits and hyphens. Must be unique. */
  slug: string;
  title: string;
  /** Used as the meta description and on the index. */
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  body: GuideBlock[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validate(guide: Guide): void {
  if (!SLUG.test(guide.slug)) throw new Error(`Guide slug "${guide.slug}" is not a lowercase-hyphen slug`);
  if (!guide.title.trim()) throw new Error(`Guide "${guide.slug}" needs a title`);
  if (!guide.description.trim()) throw new Error(`Guide "${guide.slug}" needs a description`);
  if (!DATE.test(guide.date) || Number.isNaN(Date.parse(guide.date))) {
    throw new Error(`Guide "${guide.slug}" needs a YYYY-MM-DD date`);
  }
  if (guide.body.length === 0) throw new Error(`Guide "${guide.slug}" has an empty body`);
}

/** Validated guides, newest first. Throws on a bad or duplicate guide, which fails the build. */
export function listGuides(source: readonly Guide[]): Guide[] {
  const seen = new Set<string>();
  for (const guide of source) {
    validate(guide);
    if (seen.has(guide.slug)) throw new Error(`Duplicate guide slug "${guide.slug}"`);
    seen.add(guide.slug);
  }
  return [...source].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getGuide(source: readonly Guide[], slug: string): Guide | undefined {
  return listGuides(source).find((guide) => guide.slug === slug);
}
