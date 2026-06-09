-- Combined waitlist setup (migrations 0001 + 0002), idempotent.
-- Paste this whole block into the Supabase SQL editor for the project the
-- website's SUPABASE_URL points at, then Run. Safe to run more than once.

create extension if not exists "pgcrypto";

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

alter table public.newsletter_subscribers enable row level security;
-- No public policies: writes go through the service-role key in the API route.

-- Referral queue columns.
alter table public.newsletter_subscribers
  add column if not exists referral_code text,
  add column if not exists referred_by text,
  add column if not exists referrals integer not null default 0;

update public.newsletter_subscribers
  set referral_code = encode(gen_random_bytes(6), 'hex')
  where referral_code is null;

alter table public.newsletter_subscribers
  alter column referral_code set default encode(gen_random_bytes(6), 'hex'),
  alter column referral_code set not null;

create unique index if not exists newsletter_subscribers_referral_code_key
  on public.newsletter_subscribers (referral_code);

create index if not exists newsletter_subscribers_rank_idx
  on public.newsletter_subscribers (referrals desc, created_at asc);

create or replace function public.increment_referral(p_code text)
returns void
language sql
as $$
  update public.newsletter_subscribers
    set referrals = referrals + 1
    where referral_code = p_code;
$$;
