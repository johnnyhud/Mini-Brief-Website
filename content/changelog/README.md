# Changelog

Shipped, user-facing changes, shown newest first at `/changelog` and in the
feed at `/changelog/rss.xml`.

## Adding an entry

1. Create `content/changelog/<yyyy-mm-dd>-<slug>.ts`:

   ```ts
   import type { ChangelogEntry } from "@/lib/changelog";

   export const entry: ChangelogEntry = {
     slug: "my-change",   // lowercase letters, digits, hyphens; unique
     date: "2026-10-09",  // YYYY-MM-DD
     title: "Short title",
     items: ["One plain-language change."],
   };
   ```

2. Import it in `content/changelog/index.ts` and add it to the `changelog` array.

## Content rules

- User-facing, plain language, already shipped.
- No internal, security or infrastructure detail.
- No prices, no unreleased features.
- No storage claims beyond: email bodies aren't stored.
- No Google verification claims.

`npm test` checks these (banned words included).
