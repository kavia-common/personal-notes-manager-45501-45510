# Ocean Notes - React + Supabase

A simple notes application allowing users to create, view, and manage personal notes. This frontend uses React and Supabase for data storage.

## Features

- Ocean Professional theme (blue primary with amber accents)
- Sidebar list with note titles/snippets
- Editor with debounced saves
- Create and delete notes
- Light/Dark theme toggle

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Create a .env file in notes_frontend with:

```
REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
REACT_APP_SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
```

See .env.example for required variables.

3) Start the app

```bash
npm start
```

The app runs at http://localhost:3000.

## Supabase Setup

- Create a new Supabase project and obtain the Project URL and anon public API key.
- Create the table "notes" with the following SQL:

```sql
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text,
  content text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security
alter table public.notes enable row level security;

-- For demo purposes, allow full access to anon role (adjust for auth-enabled apps)
create policy "Enable read for all" on public.notes
for select
to anon
using (true);

create policy "Enable insert for all" on public.notes
for insert
to anon
with check (true);

create policy "Enable update for all" on public.notes
for update
to anon
using (true);

create policy "Enable delete for all" on public.notes
for delete
to anon
using (true);
```

Note: For production, implement proper auth and RLS policies tied to user_id.

## Scripts

- npm start - Start dev server
- npm test - Run tests
- npm run build - Build for production

## Environment Variables

- REACT_APP_SUPABASE_URL - Supabase project URL
- REACT_APP_SUPABASE_KEY - Supabase anon public key

Do not commit real credentials. Use environment variables.

## Folder Structure

- src/components - UI components (Topbar, Sidebar, NoteEditor, EmptyState)
- src/services - Supabase CRUD logic for notes
- src/lib - Supabase client helper

## Style

The app implements the "Ocean Professional" theme using CSS variables in src/App.css. Adjust colors or radii as needed.
