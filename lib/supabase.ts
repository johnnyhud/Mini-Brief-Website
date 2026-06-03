import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;

  // Read via computed keys so Next.js does NOT inline these at build time.
  // That forces a runtime read, where Vercel always injects the env vars —
  // build-time inlining silently drops anything marked "Sensitive" and is the
  // usual reason this client comes back null in production.
  const env = process.env;
  const url = env["SUPABASE_URL"] || env["NEXT_PUBLIC_SUPABASE_URL"];
  const key = env["SUPABASE_SERVICE_ROLE_KEY"];

  if (!url || !key) {
    console.error("[supabase] admin client not configured", {
      hasUrl: Boolean(url),
      hasServiceKey: Boolean(key),
    });
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
