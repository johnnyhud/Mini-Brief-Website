import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildConfirmationEmail, getResend } from "@/lib/resend";
import { appendSignup } from "@/lib/signups-excel";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_RE = /^[a-z0-9]{1,32}$/i;

type SubscriberRow = {
  referral_code: string;
  referrals: number;
  created_at: string;
};

// Position in the queue: how many subscribers rank ahead, plus one.
// Ranking is most referrals first, then earliest signup.
async function computeQueue(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  row: SubscriberRow,
) {
  const ahead = await supabase
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true })
    .or(
      `referrals.gt.${row.referrals},and(referrals.eq.${row.referrals},created_at.lt.${row.created_at})`,
    );

  const total = await supabase
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true });

  return {
    position: (ahead.count ?? 0) + 1,
    total: total.count ?? null,
    referrals: row.referrals,
  };
}

export async function POST(req: Request) {
  let body: { email?: string; source?: string; ref?: string };
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
  const ref = body.ref && CODE_RE.test(body.ref) ? body.ref.toLowerCase() : null;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    // Insert the new subscriber and read back their generated code + rank data.
    const insert = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source, user_agent: userAgent, referred_by: ref })
      .select("referral_code, referrals, created_at")
      .single();

    let row = insert.data as SubscriberRow | null;
    let isNew = true;

    if (insert.error) {
      if (insert.error.code === "23505") {
        // Already on the list — return their existing standing (idempotent UX).
        isNew = false;
        const existing = await supabase
          .from("newsletter_subscribers")
          .select("referral_code, referrals, created_at")
          .eq("email", email)
          .single();
        row = existing.data as SubscriberRow | null;
      } else {
        console.error("[subscribe] supabase insert failed", insert.error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
      }
    }

    // Credit the referrer only for genuinely new signups, and never self-credit.
    if (isNew && ref && row && ref !== row.referral_code) {
      const { error: rpcError } = await supabase.rpc("increment_referral", { p_code: ref });
      if (rpcError) console.error("[subscribe] increment_referral failed", rpcError);
    }

    if (!row) {
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    // Only send the confirmation email for brand-new signups.
    // Resend's SDK returns { data, error } and does NOT throw on API
    // rejection, so we must inspect `error` — not just catch exceptions.
    if (isNew) {
      const resend = getResend();
      if (resend) {
        try {
          const { error: sendError } = await resend.emails.send(
            buildConfirmationEmail(email),
          );
          if (sendError) {
            console.error("[subscribe] resend send failed", sendError);
          }
        } catch (err) {
          console.error("[subscribe] resend send threw", err);
        }
      }
    }

    const queue = await computeQueue(supabase, row);
    return NextResponse.json({ ok: true, code: row.referral_code, ...queue });
  }

  if (process.env.NODE_ENV !== "production") {
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
    // No queue data without Supabase; return a usable shape for the UI.
    return NextResponse.json({ ok: true, code: null, position: null, total: null, referrals: 0 });
  }

  // Production but Supabase isn't configured — surface it clearly instead of
  // attempting a read-only filesystem write.
  console.error("[subscribe] no storage configured in production");
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
