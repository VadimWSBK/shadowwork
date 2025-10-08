-- Fix user deletion issues
-- Run these commands in your Supabase SQL editor

-- 1. First, check current foreign key constraints
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name,
    rc.delete_rule
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    JOIN information_schema.referential_constraints AS rc
      ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name IN ('profiles', 'answers')
  AND tc.table_schema = 'public';

-- 2. Drop existing foreign key constraint on profiles.user_id if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_user_id_fkey' 
        AND table_name = 'profiles'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_id_fkey;
    END IF;
END $$;

-- 3. Recreate the foreign key constraint with CASCADE delete
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Ensure answers table has proper foreign key with CASCADE delete
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'answers_profile_id_fkey' 
        AND table_name = 'answers'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.answers DROP CONSTRAINT answers_profile_id_fkey;
    END IF;
END $$;

ALTER TABLE public.answers 
ADD CONSTRAINT answers_profile_id_fkey 
FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 5. Update the RLS policy to allow service role deletions
DROP POLICY IF EXISTS answers_no_delete_for_users ON public.answers;

CREATE POLICY answers_no_delete_for_users ON public.answers
  FOR DELETE
  USING (auth.role() = 'service_role');

-- 6. Create a comprehensive user deletion function
CREATE OR REPLACE FUNCTION public.delete_user_completely(user_uuid uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_answers_count int := 0;
  deleted_profile_count int := 0;
  error_message text;
BEGIN
  -- Check if user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_uuid) THEN
    RETURN json_build_object('success', false, 'error', 'User not found');
  END IF;

  -- Delete answers first (this should cascade from profile deletion, but being explicit)
  DELETE FROM public.answers 
  WHERE profile_id IN (
    SELECT id FROM public.profiles WHERE user_id = user_uuid
  );
  
  GET DIAGNOSTICS deleted_answers_count = ROW_COUNT;
  
  -- Delete profile (this should cascade when user is deleted, but being explicit)
  DELETE FROM public.profiles WHERE user_id = user_uuid;
  
  GET DIAGNOSTICS deleted_profile_count = ROW_COUNT;
  
  -- The auth user deletion should now work because foreign key constraints are satisfied
  RETURN json_build_object(
    'success', true, 
    'deleted_answers', deleted_answers_count,
    'deleted_profiles', deleted_profile_count,
    'message', 'User data deleted successfully. Auth user deletion should now work.'
  );
  
EXCEPTION WHEN OTHERS THEN
  GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
  RETURN json_build_object('success', false, 'error', error_message);
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.delete_user_completely(uuid) TO service_role;

-- 7. Test the setup (optional - uncomment to test)
-- SELECT public.delete_user_completely('your-user-id-here'::uuid);
