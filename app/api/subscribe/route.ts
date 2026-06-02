import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildConfirmationEmail, getResend } from "@/lib/resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  const source = body.source?.slice(0, 64) ?? "landing";
  const userAgent = req.headers.get("user-agent")?.slice(0, 256) ?? null;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source, user_agent: userAgent });

    if (error && error.code !== "23505") {
      console.error("[subscribe] supabase insert failed", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    console.log("[subscribe] (no supabase configured) new signup:", { email, source });
  }

  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send(buildConfirmationEmail(email));
    } catch (err) {
      console.error("[subscribe] resend send failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
