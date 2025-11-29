-- Create enum for app roles
create type public.app_role as enum ('admin', 'user');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  status text default 'active' check (status in ('active', 'suspended', 'deleted')),
  created_at timestamp with time zone default now(),
  last_login timestamp with time zone,
  notes text
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'user',
  unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create analytics_properties table
create table public.analytics_properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  ga4_property_id text not null,
  property_name text not null,
  domain text not null,
  is_active boolean default true,
  connected_at timestamp with time zone default now(),
  disconnected_at timestamp with time zone,
  disconnected_by uuid references public.profiles(id)
);

-- Enable RLS on analytics_properties
alter table public.analytics_properties enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for profiles
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Allow insert for authenticated users"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

-- RLS Policies for user_roles
create policy "Admins can view all roles"
on public.user_roles for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Users can view own roles"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

create policy "Only admins can manage roles"
on public.user_roles for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for analytics_properties
create policy "Users can view own properties"
on public.analytics_properties for select
to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Users can insert own properties"
on public.analytics_properties for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update own properties"
on public.analytics_properties for update
to authenticated
using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create policy "Only admins can delete properties"
on public.analytics_properties for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  
  -- Auto-assign admin role for admin@aloopsdigital.com
  if new.email = 'admin@aloopsdigital.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  
  return new;
end;
$$;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();