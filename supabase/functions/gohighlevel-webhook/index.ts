// Supabase Edge Function: GHL webhook -> send invite link
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.3';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

function ok(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

serve(async (req) => {
  if (req.method !== 'POST') return ok({ error: 'Method not allowed' }, 405);

  let payload;
  try {
    payload = await req.json();
  } catch {
    return ok({ error: 'Invalid JSON' }, 400);
  }

  const email = (payload.email || '').trim().toLowerCase();
  if (!email) return ok({ error: 'Missing email' }, 400);

  console.log('📧 Processing invite for:', email);

  // First, check if profile exists (this might indicate an orphaned profile)
  const { data: profileData } = await supabase
    .from('profiles')
    .select('id, user_id')
    .eq('email', email)
    .single();

  if (profileData) {
    console.log('⚠️ Profile exists for:', email);
    // If profile exists, check if the auth user also exists
    if (profileData.user_id) {
      console.log('⚠️ Auth user also exists, skipping invitation');
      return ok({ message: 'User already exists', email });
    }
    // Profile exists but no auth user - this is an orphaned profile
    // Delete it so the trigger can recreate it properly
    console.log('🗑️ Deleting orphaned profile for:', email);
    await supabase.from('profiles').delete().eq('id', profileData.id);
  }

  // Send invitation - this creates the user in auth.users and sends invite email
  console.log('📤 Sending invitation to:', email);
  const { data: inviteData, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${SUPABASE_URL.replace(/\/$/, '')}/signup`,
    data: {
      email_confirmed: false // User needs to confirm via invite link
    }
  });

  if (inviteErr) {
    console.error('❌ Failed to send invitation:', inviteErr.message);
    return ok({ error: inviteErr.message }, 500);
  }

  console.log('✅ Invitation sent successfully to:', email);
  return ok({ 
    message: 'Invitation sent', 
    email,
    user_id: inviteData?.user?.id
  });
});
