-- Run once in Supabase SQL Editor to enable news cover uploads from /#/admin.
-- The bucket is public so published article images can be displayed on the site.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('school-news', 'school-news', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read school news images" on storage.objects;
create policy "Public read school news images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'school-news');

drop policy if exists "Admins upload school news images" on storage.objects;
create policy "Admins upload school news images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'school-news'
  and (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'developer')
);
