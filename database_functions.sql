-- Required RPC functions for stable shadowwork operations
-- Run these in your Supabase SQL editor

-- 1. Upsert answer function (atomic, server-side profile resolution)
CREATE OR REPLACE FUNCTION public.upsert_answer(
  day_id text,
  question_index int,
  answer_text text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id uuid;
  result_row answers%ROWTYPE;
  -- Local aliases to avoid ambiguity between function params and table columns
  _day_id text := day_id;
  _question_index int := question_index;
  _answer_text text := answer_text;
BEGIN
  -- Get the profile_id for the current authenticated user
  SELECT p.id INTO user_profile_id
  FROM profiles p
  WHERE p.user_id = auth.uid()
  LIMIT 1;
  
  -- If no profile found, try to create one using email
  IF user_profile_id IS NULL THEN
    INSERT INTO profiles (user_id, email, username)
    SELECT auth.uid(), auth.email(), COALESCE(auth.email(), 'user_' || auth.uid()::text)
    WHERE auth.uid() IS NOT NULL
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO user_profile_id;
    
    -- If still null, get the existing one
    IF user_profile_id IS NULL THEN
      SELECT p.id INTO user_profile_id
      FROM profiles p
      WHERE p.user_id = auth.uid()
      LIMIT 1;
    END IF;
  END IF;
  
  -- Fail if we still can't resolve profile
  IF user_profile_id IS NULL THEN
    RAISE EXCEPTION 'Could not resolve profile for user';
  END IF;
  
  -- Atomic upsert
  INSERT INTO answers (profile_id, day_id, question_index, answer_text, updated_at)
  VALUES (user_profile_id, _day_id, _question_index, _answer_text, now())
  ON CONFLICT (profile_id, day_id, question_index)
  DO UPDATE SET 
    answer_text = EXCLUDED.answer_text,
    updated_at = now()
  RETURNING * INTO result_row;
  
  RETURN json_build_object('success', true, 'id', result_row.id);
END;
$$;

-- Safer variant with distinct parameter names to avoid any naming ambiguity
CREATE OR REPLACE FUNCTION public.upsert_answer_v2(
  p_day_id text,
  p_question_index int,
  p_answer_text text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id uuid;
  result_row answers%ROWTYPE;
BEGIN
  -- Resolve profile for current authenticated user
  SELECT p.id INTO user_profile_id
  FROM public.profiles p
  WHERE p.user_id = auth.uid()
  LIMIT 1;

  -- Try to create profile if missing
  IF user_profile_id IS NULL THEN
    INSERT INTO public.profiles (user_id, email, username)
    SELECT auth.uid(), auth.email(), COALESCE(auth.email(), 'user_' || auth.uid()::text)
    WHERE auth.uid() IS NOT NULL
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO user_profile_id;

    IF user_profile_id IS NULL THEN
      SELECT p.id INTO user_profile_id
      FROM public.profiles p
      WHERE p.user_id = auth.uid()
      LIMIT 1;
    END IF;
  END IF;

  IF user_profile_id IS NULL THEN
    RAISE EXCEPTION 'Could not resolve profile for user';
  END IF;

  -- Atomic upsert into answers
  INSERT INTO public.answers (profile_id, day_id, question_index, answer_text, updated_at)
  VALUES (user_profile_id, p_day_id, p_question_index, p_answer_text, now())
  ON CONFLICT (profile_id, day_id, question_index)
  DO UPDATE SET 
    answer_text = EXCLUDED.answer_text,
    updated_at = now()
  RETURNING * INTO result_row;

  RETURN json_build_object('success', true, 'id', result_row.id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_answer_v2(text, int, text) TO authenticated;

-- Lightweight fallback RPC that upserts using an explicit profile_id
CREATE OR REPLACE FUNCTION public.upsert_answer_profile(
  p_profile_id uuid,
  p_day_id text,
  p_question_index int,
  p_answer_text text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result_row answers%ROWTYPE;
BEGIN
  IF p_profile_id IS NULL THEN
    RAISE EXCEPTION 'Missing profile_id';
  END IF;

  INSERT INTO public.answers (profile_id, day_id, question_index, answer_text, updated_at)
  VALUES (p_profile_id, p_day_id, p_question_index, p_answer_text, now())
  ON CONFLICT (profile_id, day_id, question_index)
  DO UPDATE SET 
    answer_text = EXCLUDED.answer_text,
    updated_at = now()
  RETURNING * INTO result_row;

  RETURN json_build_object('success', true, 'id', result_row.id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_answer_profile(uuid, text, int, text) TO authenticated;

-- 2. Get user answers function
CREATE OR REPLACE FUNCTION public.get_user_answers()
RETURNS TABLE(day_id text, question_index int, answer_text text, updated_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id uuid;
BEGIN
  -- Get the profile_id for the current authenticated user
  SELECT p.id INTO user_profile_id
  FROM profiles p
  WHERE p.user_id = auth.uid()
  LIMIT 1;
  
  -- Return empty if no profile
  IF user_profile_id IS NULL THEN
    RETURN;
  END IF;
  
  -- Return all answers for this user
  RETURN QUERY
  SELECT a.day_id, a.question_index, a.answer_text, a.updated_at
  FROM answers a
  WHERE a.profile_id = user_profile_id
  ORDER BY a.day_id, a.question_index;
END;
$$;

-- 3. Delete user answers function
CREATE OR REPLACE FUNCTION public.delete_user_answers()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_profile_id uuid;
  deleted_count int := 0;
BEGIN
  -- Get the profile_id for the current authenticated user
  SELECT p.id INTO user_profile_id
  FROM profiles p
  WHERE p.user_id = auth.uid()
  LIMIT 1;
  
  -- Return success if no profile (nothing to delete)
  IF user_profile_id IS NULL THEN
    RETURN json_build_object('success', true, 'deleted_count', 0);
  END IF;
  
  -- Delete all answers for this user
  DELETE FROM answers 
  WHERE profile_id = user_profile_id;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN json_build_object('success', true, 'deleted_count', deleted_count);
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.upsert_answer(text, int, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_answers() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_answers() TO authenticated;

-- Ensure the answers table has the right structure
-- (Run these only if needed - check your current schema first)

-- Make username nullable if it isn't already
-- ALTER TABLE answers ALTER COLUMN username DROP NOT NULL;

-- Add unique constraint if it doesn't exist
-- ALTER TABLE answers ADD CONSTRAINT answers_profile_day_question_unique 
--   UNIQUE (profile_id, day_id, question_index);

-- Set default for updated_at if not set
-- ALTER TABLE answers ALTER COLUMN updated_at SET DEFAULT now();

-- Ensure profiles table links to auth.users
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);
-- CREATE UNIQUE INDEX IF NOT EXISTS profiles_user_id_unique ON profiles(user_id);

-- 4. Row-Level Security (RLS) policies to ensure only the author can read/write their answers
-- Enable RLS if not already enabled
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- Allow users to read only their own rows
CREATE POLICY answers_select_own ON public.answers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = answers.profile_id AND p.user_id = auth.uid()
    )
  );

-- Allow users to insert rows only for themselves
CREATE POLICY answers_insert_own ON public.answers
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = answers.profile_id AND p.user_id = auth.uid()
    )
  );

-- Allow users to update rows only if they own them
CREATE POLICY answers_update_own ON public.answers
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = answers.profile_id AND p.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = answers.profile_id AND p.user_id = auth.uid()
    )
  );

-- Optionally, block DELETEs from regular users; reserve for RPC or admin
CREATE POLICY answers_no_delete_for_users ON public.answers
  FOR DELETE
  USING (false);