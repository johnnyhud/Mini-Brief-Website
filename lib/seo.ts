import type { Metadata } from "next";
import { WORDMARK } from "@/lib/brand";

export { siteUrl, normalizeSiteUrl } from "@/lib/site-url";

/**
 * Canonical, Open Graph and Twitter metadata for one page, all derived from the
 * same title, description and path so they cannot drift apart. A page-level
 * openGraph replaces the layout's wholesale, so type and siteName are repeated.
 * No images are set here: app/opengraph-image.tsx supplies the default card.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: WORDMARK },
    twitter: { card: "summary_large_image", title, description },
  };
}
