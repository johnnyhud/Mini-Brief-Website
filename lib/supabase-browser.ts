"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser auth client for the admin dashboard. Uses the PUBLISHABLE
// anon key (safe in the browser) — never the service-role key. All
// privileged work happens server-side in the deployed `admin` Edge
// Function, which re-verifies the caller is staff.
let cached: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return cached;
}

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
