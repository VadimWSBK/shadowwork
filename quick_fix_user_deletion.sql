-- Quick fix for user deletion issue
-- Run these commands one by one in your Supabase SQL editor

-- Step 1: Check current foreign key constraints
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

-- Step 2: Drop the existing foreign key constraint on profiles.user_id
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Step 3: Recreate it with CASCADE delete
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 4: Also ensure answers table has CASCADE delete
ALTER TABLE public.answers DROP CONSTRAINT IF EXISTS answers_profile_id_fkey;

ALTER TABLE public.answers 
ADD CONSTRAINT answers_profile_id_fkey 
FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Step 5: Update the RLS policy to allow service role deletions
DROP POLICY IF EXISTS answers_no_delete_for_users ON public.answers;

CREATE POLICY answers_no_delete_for_users ON public.answers
  FOR DELETE
  USING (auth.role() = 'service_role');
