import { segments } from "@/content/for";
import { getSegment, listSegments } from "@/lib/segments";

/** The site's validated use-case pages. */
export const siteSegments = listSegments(segments);

export function getSiteSegment(slug: string) {
  return getSegment(segments, slug);
}
