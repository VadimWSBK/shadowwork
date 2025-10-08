# Testing Delete Account Functionality

## Prerequisites Checklist

### ✅ 1. Database Fixes Applied
- [ ] Run all SQL commands from `quick_fix_user_deletion.sql` in Supabase SQL editor
- [ ] Verify foreign key constraints have `ON DELETE CASCADE`
- [ ] Confirm RLS policies allow service role deletions

### ✅ 2. Edge Function Deployed
- [x] `delete-profile` function is deployed and active (confirmed above)

### ✅ 3. Frontend Changes Applied
- [x] Updated `handleDeleteProfile` function with proper redirect
- [x] Added loading states and user feedback
- [x] Enhanced cleanup and error handling

## Test Steps

### Step 1: Create a Test User
1. Go to your app (should be running on localhost)
2. Create a new test user account
3. Log in with the test user
4. Complete a few questionnaire answers to create test data

### Step 2: Test Delete Account
1. Navigate to Settings
2. Scroll down to find the "Delete Account" section (red box with trash icon)
3. Click "Delete Account"
4. Confirm the deletion in the modal

### Step 3: Verify Results
1. **Expected**: User should be redirected to login page immediately
2. **Check Supabase Dashboard**:
   - Go to Authentication → Users
   - Verify the test user account is deleted
3. **Check Database**:
   - Go to Database → Tables
   - Check `profiles` table: no profile for deleted user
   - Check `answers` table: no answers for deleted user

## Troubleshooting

### If deletion fails with 500 error:
- Ensure you've run the SQL fixes in Supabase
- Check the function logs in Supabase Dashboard → Functions → delete-profile

### If user isn't redirected:
- Check browser console for errors
- Verify the redirect logic in `handleDeleteProfile`

### If data isn't deleted:
- Verify foreign key constraints have `ON DELETE CASCADE`
- Check RLS policies allow service role operations

## Expected Behavior
- Loading spinner appears during deletion
- User sees success message briefly
- Immediate redirect to login page
- Complete cleanup of all user data
- User account removed from authentication
