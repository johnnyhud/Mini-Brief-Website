import { guides } from "@/content/guides";
import { getGuide, listGuides } from "@/lib/guides";

/** The site's validated guides, newest first. Empty until Marketing adds one. */
export const siteGuides = listGuides(guides);

export function getSiteGuide(slug: string) {
  return getGuide(guides, slug);
}
