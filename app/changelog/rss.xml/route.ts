import { buildChangelogRss } from "@/lib/changelog";
import { siteUrl } from "@/lib/site-url";
import { siteChangelog } from "@/lib/site-changelog";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildChangelogRss(siteChangelog, siteUrl), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
