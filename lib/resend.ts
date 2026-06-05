import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export function buildConfirmationEmail(toEmail: string) {
  const from = process.env.RESEND_FROM_EMAIL ?? "Mini Brief <hello@minibrief.app>";
  const subject = "You're on the Mini Brief list";
  const html = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#070c18;font-family:Inter,Arial,sans-serif;color:#ffffff">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#070c18">
          <tr><td align="center" style="padding:48px 24px">
            <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0d1528;border:1px solid rgba(74,98,245,0.25);border-radius:18px;overflow:hidden">
              <tr><td style="padding:32px 32px 24px">
                <div style="font-family:Outfit,Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#ffffff">
                  <span style="color:#6b7299">Mini</span>Brief<span style="color:#5b72ff">AI</span>
                </div>
              </td></tr>
              <tr><td style="padding:8px 32px 24px">
                <h1 style="font-family:Outfit,Arial,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;margin:0 0 12px">You're on the list.</h1>
                <p style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#8892b0;margin:0 0 20px">Thanks for your interest in Mini Brief, email intelligence for Gmail and Outlook. We will send you a single email when the extension is available for Chrome and Firefox.</p>
                <p style="font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:#8892b0;margin:0">Nothing else until then. No marketing, just the launch notice.</p>
              </td></tr>
              <tr><td style="padding:0 32px 32px;border-top:1px solid rgba(255,255,255,0.06)">
                <p style="font-family:Inter,Arial,sans-serif;font-size:12px;color:#4a5278;margin:24px 0 0">Sent because ${toEmail} joined the early-access list at minibrief.app</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`;

  return { from, to: toEmail, subject, html };
}
