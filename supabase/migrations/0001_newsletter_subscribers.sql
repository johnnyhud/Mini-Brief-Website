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
