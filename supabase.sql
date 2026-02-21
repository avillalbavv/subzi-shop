-- SubZi (Supabase) - Tablas + RLS + triggers (MEJORADO)
-- Ejecutar en Supabase: SQL Editor

-- =========================
-- PROFILES
-- =========================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles for select
using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles for update
using (auth.uid() = id);

-- =========================
-- USER STATE (carrito, cashback, pedidos)
-- =========================
create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cart jsonb default '[]'::jsonb,
  discount jsonb,
  cashback jsonb,
  use_cashback boolean default false,
  orders jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_state enable row level security;

drop policy if exists user_state_select_own on public.user_state;
create policy user_state_select_own
on public.user_state for select
using (auth.uid() = user_id);

drop policy if exists user_state_insert_own on public.user_state;
create policy user_state_insert_own
on public.user_state for insert
with check (auth.uid() = user_id);

drop policy if exists user_state_update_own on public.user_state;
create policy user_state_update_own
on public.user_state for update
using (auth.uid() = user_id);

-- =========================
-- updated_at triggers
-- =========================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_user_state_updated_at on public.user_state;
create trigger trg_user_state_updated_at
before update on public.user_state
for each row execute function public.set_updated_at();

-- =========================
-- Auto-provision: al crear usuario, crear profile + user_state
-- (esto evita que el frontend tenga que crear filas manualmente)
-- =========================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'first_name',''), coalesce(new.raw_user_meta_data->>'last_name',''))
  on conflict (id) do update
    set email = excluded.email,
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        updated_at = now();

  insert into public.user_state (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========================
-- Índices (opcionales)
-- =========================
create index if not exists profiles_email_idx on public.profiles (email);
