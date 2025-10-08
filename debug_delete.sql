-- Debug script to test delete_user_answers RPC function
-- Run these queries one by one in Supabase SQL editor to debug

-- 1. Check if profiles table has user_id column
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND table_schema = 'public';

-- 2. Check current authenticated user
SELECT auth.uid() as current_user_id, auth.email() as current_email;

-- 3. Check if there's a profile for current user
SELECT p.id as profile_id, p.user_id, p.email, p.username 
FROM profiles p 
WHERE p.user_id = auth.uid();

-- 4. Check answers for current user (if profile exists)
SELECT a.id, a.profile_id, a.day_id, a.question_index, a.answer_text
FROM answers a
JOIN profiles p ON a.profile_id = p.id
WHERE p.user_id = auth.uid();

-- 5. Test the delete function directly
SELECT public.delete_user_answers() as delete_result;

-- 6. Check if answers still exist after delete
SELECT COUNT(*) as remaining_answers
FROM answers a
JOIN profiles p ON a.profile_id = p.id
WHERE p.user_id = auth.uid();