import type { Guide } from "@/lib/guides";
import { guide as seeWhatYouPromised } from "./see-what-you-promised-in-email.ts";
import { guide as spotPhishing } from "./spot-phishing-in-gmail-and-outlook.ts";
import { guide as oneDailyBrief } from "./one-daily-brief-for-gmail-and-outlook.ts";
import { guide as outlookAdminApproval } from "./outlook-admin-approval.ts";
import { guide as openLoopsSync } from "./open-loops-sync.ts";
import { guide as morningBriefEmail } from "./morning-brief-email.ts";

/**
 * The guide registry. Empty it and /guides is a 404 and drops out of the sitemap.
 * To add a guide, see README.md in this folder.
 */
export const guides: Guide[] = [
  seeWhatYouPromised,
  spotPhishing,
  oneDailyBrief,
  outlookAdminApproval,
  openLoopsSync,
  morningBriefEmail,
];
