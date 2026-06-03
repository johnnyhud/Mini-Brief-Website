import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildConfirmationEmail, getResend } from "@/lib/resend";
import { appendSignup } from "@/lib/signups-excel";

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
  } else if (process.env.NODE_ENV !== "production") {
    // Local dev with no Supabase configured — store in the Excel file. The
    // filesystem is read-only on serverless hosts, so this never runs in prod.
    try {
      appendSignup({
        email,
        source,
        signedUpAt: new Date().toISOString(),
        userAgent,
      });
    } catch (err) {
      console.error("[subscribe] excel append failed", err);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  } else {
    // Production but Supabase isn't configured — surface it clearly instead of
    // attempting a read-only filesystem write.
    console.error("[subscribe] no storage configured in production");
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
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
