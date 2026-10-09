const APEX_ORIGIN = "https://minibrief.app";
const CANONICAL_ORIGIN = "https://www.minibrief.app";

/**
 * Clean origin (no whitespace, no trailing slash) from a raw env value. The
 * deployed NEXT_PUBLIC_SITE_URL carries a trailing newline, which broke
 * robots.txt and sitemap URLs when concatenated raw.
 *
 * The production apex maps to www, the host it already redirects to, so
 * canonical URLs never point at a redirecting host. Other hosts are untouched.
 */
export function normalizeSiteUrl(raw: string | undefined): string {
  const origin = (raw ?? APEX_ORIGIN).trim().replace(/\/+$/, "");
  return origin === APEX_ORIGIN ? CANONICAL_ORIGIN : origin;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
