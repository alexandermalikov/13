-- Run once in Supabase SQL Editor. Public visitors can read published content;
-- signed-in users with app_metadata.role='admin' or 'developer' can manage CMS content.
create extension if not exists pgcrypto;

create table if not exists public.school_news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  category text not null default 'school' check (category in ('school', 'students', 'events')),
  cover jsonb not null default '{"type":"pattern","theme":"school"}'::jsonb,
  translations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists school_news_publication_idx on public.school_news (status, published_at desc);

create table if not exists public.school_people (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('teacher', 'student')),
  photo_url text,
  sort_order integer not null default 0,
  translations jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.school_settings (
  key text primary key,
  value jsonb not null default '""'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.school_news enable row level security;
alter table public.school_people enable row level security;
alter table public.school_settings enable row level security;

drop policy if exists "Public read published news" on public.school_news;
create policy "Public read published news" on public.school_news for select using (status = 'published' or (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer'));
drop policy if exists "Authenticated manage news" on public.school_news;
create policy "Authenticated manage news" on public.school_news for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer'));

drop policy if exists "Public read people" on public.school_people;
create policy "Public read people" on public.school_people for select to anon, authenticated using (true);
drop policy if exists "Authenticated manage people" on public.school_people;
create policy "Authenticated manage people" on public.school_people for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer'));

drop policy if exists "Public read school settings" on public.school_settings;
create policy "Public read school settings" on public.school_settings for select to anon, authenticated using (true);
drop policy if exists "Authenticated manage school settings" on public.school_settings;
create policy "Authenticated manage school settings" on public.school_settings for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer')) with check ((auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer'));

grant select, insert, update, delete on public.school_news to anon, authenticated;
grant select, insert, update, delete on public.school_people to anon, authenticated;
grant select, insert, update, delete on public.school_settings to anon, authenticated;
