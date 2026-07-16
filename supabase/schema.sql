-- Run this once in Supabase Dashboard > SQL Editor.
-- Create the client Auth user first in Authentication > Users, then run the
-- final INSERT below with that user's UUID. There is no registration UI.

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text not null,
  sub_category text,
  media_type text not null check (media_type in ('image', 'video')),
  url text not null,
  storage_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create or replace function public.is_site_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()) $$;

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.portfolio_items enable row level security;

create policy "admin can view own role" on public.admin_users for select to authenticated using (user_id = auth.uid());
create policy "public can read website content" on public.site_content for select using (true);
create policy "site admin manages website content" on public.site_content for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());
create policy "public can read portfolio" on public.portfolio_items for select using (true);
create policy "site admin manages portfolio" on public.portfolio_items for all to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

insert into storage.buckets (id, name, public) values ('website-media', 'website-media', true)
on conflict (id) do update set public = true;

create policy "site admin uploads website media" on storage.objects for insert to authenticated with check (bucket_id = 'website-media' and public.is_site_admin());
create policy "site admin reads website media" on storage.objects for select to authenticated using (bucket_id = 'website-media' and public.is_site_admin());
create policy "site admin deletes website media" on storage.objects for delete to authenticated using (bucket_id = 'website-media' and public.is_site_admin());

-- Replace this UUID after creating the one client account in Authentication > Users.
-- insert into public.admin_users (user_id) values ('PASTE_CLIENT_AUTH_USER_UUID_HERE');
