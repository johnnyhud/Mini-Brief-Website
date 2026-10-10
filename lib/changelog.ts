/**
 * Changelog loader and RSS builder. Pure functions over a list of entries, so
 * the same code serves the site (content/changelog/index.ts) and the tests (a
 * fixture list). No imports on purpose: the test runs this file directly under
 * Node.
 */

export interface ChangelogEntry {
  /** Anchor and feed id: lowercase letters, digits and hyphens. Must be unique. */
  slug: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  title: string;
  /** Plain-language, user-facing changes. At least one. */
  items: string[];
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validate(entry: ChangelogEntry): void {
  if (!SLUG.test(entry.slug)) throw new Error(`Changelog slug "${entry.slug}" is not a lowercase-hyphen slug`);
  if (!entry.title.trim()) throw new Error(`Changelog entry "${entry.slug}" needs a title`);
  if (!DATE.test(entry.date) || Number.isNaN(Date.parse(entry.date))) {
    throw new Error(`Changelog entry "${entry.slug}" needs a YYYY-MM-DD date`);
  }
  if (entry.items.length === 0) throw new Error(`Changelog entry "${entry.slug}" has no items`);
  if (entry.items.some((item) => !item.trim())) throw new Error(`Changelog entry "${entry.slug}" has an empty item`);
}

/** Validated entries, newest first. Same-day entries keep registry order. Throws on a bad or duplicate entry. */
export function listChangelog(source: readonly ChangelogEntry[]): ChangelogEntry[] {
  const seen = new Set<string>();
  for (const entry of source) {
    validate(entry);
    if (seen.has(entry.slug)) throw new Error(`Duplicate changelog slug "${entry.slug}"`);
    seen.add(entry.slug);
  }
  return [...source].sort((a, b) => b.date.localeCompare(a.date));
}

function xml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

/** RSS 2.0 feed for already-listed entries. Links are absolute, built from origin. */
export function buildChangelogRss(entries: readonly ChangelogEntry[], origin: string): string {
  const items = entries
    .map((entry) => {
      const link = `${origin}/changelog#${entry.slug}`;
      const html = `<ul>${entry.items.map((item) => `<li>${xml(item)}</li>`).join("")}</ul>`;
      return [
        "    <item>",
        `      <title>${xml(entry.title)}</title>`,
        `      <link>${xml(link)}</link>`,
        `      <guid isPermaLink="true">${xml(link)}</guid>`,
        `      <pubDate>${rfc822(entry.date)}</pubDate>`,
        `      <description>${xml(html)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");
  const updated = entries.length > 0 ? `\n    <lastBuildDate>${rfc822(entries[0].date)}</lastBuildDate>` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>MiniBrief changelog</title>
    <link>${xml(`${origin}/changelog`)}</link>
    <description>What's new in MiniBrief.</description>
    <language>en</language>${updated}
${items}
  </channel>
</rss>
`;
}
