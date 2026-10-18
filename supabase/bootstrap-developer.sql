-- Create your first account in Supabase Dashboard > Authentication > Users first.
-- Replace the email below with that account's exact email, then run this once.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"developer"}'::jsonb
where lower(email) = lower('YOUR_EMAIL_HERE');

-- Confirm exactly one row was updated. Sign in to /#/developer again so the new
-- developer role is included in the fresh access token.
