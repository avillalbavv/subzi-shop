-- SubZi (Supabase) - Tablas + RLS
-- Ejecutar en Supabase: SQL Editor

-- Perfil público
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy if not exists "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy if not exists "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

create policy if not exists "profiles_update_own"
on public.profiles for update
using (auth.uid() = id);

-- Estado del usuario (carrito, cashback, pedidos)
create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cart jsonb default '[]'::jsonb,
  discount jsonb,
  cashback jsonb,
  use_cashback boolean default false,
  orders jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table public.user_state enable row level security;

create policy if not exists "user_state_select_own"
on public.user_state for select
using (auth.uid() = user_id);

create policy if not exists "user_state_insert_own"
on public.user_state for insert
with check (auth.uid() = user_id);

create policy if not exists "user_state_update_own"
on public.user_state for update
using (auth.uid() = user_id);

-- Actualiza updated_at automáticamente
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_state_updated_at on public.user_state;
create trigger trg_user_state_updated_at
before update on public.user_state
for each row execute function public.set_updated_at();
