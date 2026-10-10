import { changelog } from "@/content/changelog";
import { listChangelog } from "@/lib/changelog";

/** The site's validated changelog entries, newest first. */
export const siteChangelog = listChangelog(changelog);
