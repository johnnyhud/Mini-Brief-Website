import type { ChangelogEntry } from "@/lib/changelog";
import { entry as briefAndMorningEmail } from "./2026-10-09-brief-and-morning-email.ts";
import { entry as openLoops } from "./2026-10-09-open-loops.ts";
import { entry as gettingConnected } from "./2026-10-09-getting-connected.ts";
import { entry as website } from "./2026-10-09-website.ts";

/**
 * The changelog registry. Same-day entries show in the order listed here.
 * To add an entry, see README.md in this folder.
 */
export const changelog: ChangelogEntry[] = [briefAndMorningEmail, openLoops, gettingConnected, website];
