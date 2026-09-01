-- LogicSpark Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text unique not null,
  created_at timestamptz default now()
);

-- Questions table
create table if not exists questions (
  id uuid primary key default uuid_generate_v4(),
  question_text text not null,
  category text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard', 'Expert')),
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null check (correct_answer in ('A', 'B', 'C', 'D')),
  explanation text,
  hint text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Quiz attempts table
create table if not exists quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score integer not null default 0,
  total_questions integer not null,
  correct_answers integer not null default 0,
  incorrect_answers integer not null default 0,
  percentage numeric(5,2) not null default 0,
  category text not null,
  difficulty text not null,
  time_taken integer default 0,
  created_at timestamptz default now()
);

-- Quiz answers table
create table if not exists quiz_answers (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid not null references quiz_attempts(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  selected_answer text not null,
  correct_answer text not null,
  is_correct boolean not null default false
);

-- Create indexes
create index if not exists idx_questions_category on questions(category);
create index if not exists idx_questions_difficulty on questions(difficulty);
create index if not exists idx_questions_active on questions(is_active);
create index if not exists idx_quiz_attempts_user on quiz_attempts(user_id);
create index if not exists idx_quiz_attempts_created on quiz_attempts(created_at desc);
create index if not exists idx_quiz_answers_attempt on quiz_answers(attempt_id);

-- Row Level Security Policies

-- Profiles: Users can only read and update their own profile
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Questions: All authenticated users can read active questions
alter table questions enable row level security;

create policy "Authenticated users can read active questions"
  on questions for select
  using (auth.role() = 'authenticated' and is_active = true);

-- Quiz attempts: Users can only access their own attempts
alter table quiz_attempts enable row level security;

create policy "Users can view own attempts"
  on quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own attempts"
  on quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Quiz answers: Users can only access answers from their own attempts
alter table quiz_answers enable row level security;

create policy "Users can view own answers"
  on quiz_answers for select
  using (
    exists (
      select 1 from quiz_attempts
      where quiz_attempts.id = quiz_answers.attempt_id
      and quiz_attempts.user_id = auth.uid()
    )
  );

create policy "Users can insert own answers"
  on quiz_answers for insert
  with check (
    exists (
      select 1 from quiz_attempts
      where quiz_attempts.id = quiz_answers.attempt_id
      and quiz_attempts.user_id = auth.uid()
    )
  );

-- Function to auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
