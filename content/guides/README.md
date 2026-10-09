# Guides

Guides are plain TypeScript objects, one file per guide. There are none yet:
while this folder holds no guides, `/guides` returns a 404, is left out of the
sitemap, and nothing links to it. The first guide you register switches the
index, every article and the sitemap entries on.

## Adding a guide

1. Create `content/guides/<slug>.ts`:

   ```ts
   import type { Guide } from "@/lib/guides";

   export const guide: Guide = {
     slug: "my-guide",                // lowercase letters, digits, hyphens; unique; becomes /guides/my-guide
     title: "Title of the guide",
     description: "One or two sentences, used as the meta description and on the index.",
     date: "2026-10-09",              // YYYY-MM-DD
     body: [
       { type: "p", text: "A paragraph." },
       { type: "h2", text: "A section heading" },
       { type: "ul", items: ["First point", "Second point"] },
     ],
   };
   ```

2. Register it in `content/guides/index.ts`: import it and add it to the
   `guides` array.

Block types: `p`, `h2`, `h3` (each with `text`), and `ul` / `ol` (with `items`).
Text is plain text, not HTML or Markdown. The page title is the `h1`, so start
the body at `h2`. Give links their own sentence for now; blocks have no inline
links.

A bad slug, a bad date, an empty body or a duplicate slug fails the build.

## Content rules

- No prices, no "free", no plan names.
- No features that are not built.
- No storage claims beyond the site's existing wording: email bodies aren't
  stored.
