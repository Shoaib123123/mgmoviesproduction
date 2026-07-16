# MG Movies client editor setup

1. Create a Supabase project.
2. Open **SQL Editor**, paste and run `supabase/schema.sql`.
3. In **Authentication > Users**, create the one client account with an email and password. Do not add a registration screen to this project.
4. Copy that user's UUID and run this in SQL Editor:

```sql
insert into public.admin_users (user_id)
values ('CLIENT_AUTH_USER_UUID');
```

5. Copy `.env.example` to `.env` and set the URL and **Publishable key** from Supabase's Connect dialog.
6. Run `npm install`, then `npm start`.

The client signs in at `/admin/login`. They can edit page text, upload or replace Home/hero/gallery/story/contact media, and manage portfolio images/videos.

Only the user listed in `admin_users` can write. Website visitors can read content and view files from the public `website-media` bucket. Never put a Supabase secret or service-role key into `.env` for this React app.
