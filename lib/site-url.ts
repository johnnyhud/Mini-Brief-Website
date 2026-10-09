/**
 * Clean origin (no whitespace, no trailing slash) from a raw env value. The
 * deployed NEXT_PUBLIC_SITE_URL carries a trailing newline, which broke
 * robots.txt and sitemap URLs when concatenated raw.
 */
export function normalizeSiteUrl(raw: string | undefined): string {
  return (raw ?? "https://minibrief.app").trim().replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
