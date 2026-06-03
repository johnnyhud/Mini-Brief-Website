import path from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import * as XLSX from "xlsx";

// Local Excel store for early-access sign-ups. Each row is one email.
// NOTE: writes to the project filesystem, so this only persists when running
// somewhere with a stable, writable disk (local dev or a long-running server).
// On ephemeral/serverless hosts (e.g. Vercel) the file resets between deploys
// and may be read-only — swap this for the Supabase path before launch.

const FILE_PATH = path.join(process.cwd(), "New User Sign-Ups.xlsx");
const SHEET_NAME = "Sheet1";
const HEADERS = ["Email", "Source", "Signed Up At", "User Agent"];

export type SignupRow = {
  email: string;
  source: string;
  signedUpAt: string; // ISO timestamp
  userAgent: string | null;
};

function loadWorkbook(): XLSX.WorkBook {
  // Read/write the bytes ourselves: SheetJS's readFile/writeFile can't reach
  // the filesystem once Next.js bundles this module.
  if (existsSync(FILE_PATH)) {
    return XLSX.read(readFileSync(FILE_PATH), { type: "buffer" });
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([HEADERS]), SHEET_NAME);
  return wb;
}

/**
 * Appends a sign-up to the local Excel file, creating the workbook/header row
 * if needed. Throws on filesystem errors so the caller can decide how to react.
 */
export function appendSignup(row: SignupRow): void {
  const wb = loadWorkbook();

  let sheet = wb.Sheets[SHEET_NAME];
  if (!sheet) {
    sheet = XLSX.utils.aoa_to_sheet([HEADERS]);
    XLSX.utils.book_append_sheet(wb, sheet, SHEET_NAME);
  }

  // Ensure a header row exists on a blank/empty sheet.
  const ref = sheet["!ref"];
  if (!ref || ref === "A1") {
    XLSX.utils.sheet_add_aoa(sheet, [HEADERS], { origin: "A1" });
  }

  XLSX.utils.sheet_add_aoa(
    sheet,
    [[row.email, row.source, row.signedUpAt, row.userAgent ?? ""]],
    { origin: -1 } // append after the last existing row
  );

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
  writeFileSync(FILE_PATH, buf);
}
