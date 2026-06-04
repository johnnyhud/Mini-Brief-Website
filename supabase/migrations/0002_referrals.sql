-- Waitlist referral queue: each subscriber gets a unique referral code, can be
-- attributed to a referrer, and accumulates a referral count used for ranking.

alter table public.newsletter_subscribers
  add column if not exists referral_code text,
  add column if not exists referred_by text,
  add column if not exists referrals integer not null default 0;

-- Backfill codes for any existing rows. gen_random_bytes is evaluated per row,
-- so each gets a distinct value (pgcrypto is enabled in 0001).
update public.newsletter_subscribers
  set referral_code = encode(gen_random_bytes(6), 'hex')
  where referral_code is null;

-- New rows always get a code by default, and the column is now mandatory.
alter table public.newsletter_subscribers
  alter column referral_code set default encode(gen_random_bytes(6), 'hex'),
  alter column referral_code set not null;

create unique index if not exists newsletter_subscribers_referral_code_key
  on public.newsletter_subscribers (referral_code);

-- Rank ordering for the queue: most referrals first, then earliest signup.
create index if not exists newsletter_subscribers_rank_idx
  on public.newsletter_subscribers (referrals desc, created_at asc);

-- Atomic increment of a referrer's count when someone uses their link.
-- No-ops safely if the code does not exist.
create or replace function public.increment_referral(p_code text)
returns void
language sql
as $$
  update public.newsletter_subscribers
    set referrals = referrals + 1
    where referral_code = p_code;
$$;
