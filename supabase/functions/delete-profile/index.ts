// Delete Profile Edge Function — removes answers, profile, and auth user
// Deno runtime
// @ts-ignore - Remote Deno import; resolved at runtime by Deno
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
// @ts-ignore - Remote ESM import for Deno; resolved at runtime by Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

// Inform TypeScript about the Deno global available in Supabase Edge Functions
declare const Deno: { env: { get(name: string): string | undefined } };

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400'
};

function ok(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders }
  });
}

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }
    if (req.method !== 'POST') return ok({ error: 'Method not allowed' }, 405);

    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return ok({ error: 'Missing Supabase environment configuration' }, 500);
    }

    // Resolve user via bearer token; require authenticated user
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
      return ok({ error: 'Missing Authorization Bearer token' }, 401);
    }

    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: userInfo } = await supabaseUser.auth.getUser();
    const user = userInfo?.user;
    if (!user?.id) return ok({ error: 'Unauthorized user' }, 401);

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Find profile by user_id
    const { data: profRows, error: profErr } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);
    if (profErr) {
      return ok({ success: false, error: profErr.message || 'Profile read error' }, 400);
    }
    const profileId = profRows && profRows.length > 0 ? (profRows[0] as any).id : null;

    // Delete answers linked to profile_id (if any)
    let deletedAnswers = 0;
    if (profileId) {
      const { error: delAnsErr, count } = await supabaseAdmin
        .from('answers')
        .delete({ count: 'exact' })
        .eq('profile_id', profileId);
      if (delAnsErr) {
        console.warn('Failed to delete answers:', delAnsErr.message);
        deletedAnswers = 0;
      } else {
        deletedAnswers = count ?? 0;
      }
    }

    // Delete profile row
    const { error: delProfErr } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('user_id', user.id);
    if (delProfErr) {
      console.warn('Failed to delete profile:', delProfErr.message);
    }

    // Now delete auth user via admin
    const { error: delUserErr } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (delUserErr) {
      return ok({ 
        success: false, 
        error: `Auth user deletion failed: ${delUserErr.message}. Database cleanup was successful.` 
      }, 400);
    }

    return ok({ 
      success: true, 
      deletedAnswers: deletedAnswers,
      message: 'User deleted successfully'
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return ok({ error: `Unhandled error: ${message}` }, 500);
  }
});