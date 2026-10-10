/**
 * Use-case ("Who it's for") pages loader. Pure functions over a list of
 * segments, so the same code serves the site (content/for/index.ts) and the
 * tests. No imports on purpose: the test runs this file directly under Node.
 */

export interface SegmentPain {
  /** The inbox problem, in the reader's words. Rendered as the h2. */
  pain: string;
  /** How a shipped feature handles it. Plain text. */
  body: string;
}

export interface Segment {
  /** URL segment: lowercase letters, digits and hyphens. Must be unique. */
  slug: string;
  /** Short name used in the breadcrumb and the footer link. */
  name: string;
  /** Page h1 and the base of the page title. */
  title: string;
  /** Used as the meta description. */
  description: string;
  intro: string;
  /** 3 to 4 inbox pains mapped to shipped features. */
  pains: SegmentPain[];
  /** 2 to 3 guide slugs, rendered as "Read next". */
  guides: string[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validate(segment: Segment): void {
  const id = `Segment "${segment.slug}"`;
  if (!SLUG.test(segment.slug)) throw new Error(`${id} is not a lowercase-hyphen slug`);
  for (const key of ["name", "title", "description", "intro"] as const) {
    if (!segment[key].trim()) throw new Error(`${id} needs a ${key}`);
  }
  if (segment.pains.length < 3 || segment.pains.length > 4) throw new Error(`${id} needs 3 to 4 pains`);
  for (const p of segment.pains) {
    if (!p.pain.trim() || !p.body.trim()) throw new Error(`${id} has a pain with an empty pain or body`);
  }
  if (segment.guides.length < 2 || segment.guides.length > 3) throw new Error(`${id} needs 2 to 3 guides`);
}

/** Validated segments, in source order. Throws on a bad or duplicate segment, which fails the build. */
export function listSegments(source: readonly Segment[]): Segment[] {
  const seen = new Set<string>();
  for (const segment of source) {
    validate(segment);
    if (seen.has(segment.slug)) throw new Error(`Duplicate segment slug "${segment.slug}"`);
    seen.add(segment.slug);
  }
  return [...source];
}

export function getSegment(source: readonly Segment[], slug: string): Segment | undefined {
  return listSegments(source).find((segment) => segment.slug === slug);
}
