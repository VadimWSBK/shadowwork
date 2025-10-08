// Delete Answers Edge Function — removes all answers for a user
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
    let payload: any;
    try { payload = await req.json(); } catch { return ok({ error: 'Invalid JSON' }, 400); }
    const profileId = typeof payload?.profileId === 'string' ? payload.profileId.trim() : '';

    // If we have a user Authorization header, try RPC delete under user context
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: { headers: { Authorization: authHeader } },
        auth: { autoRefreshToken: false, persistSession: false }
      });
      const { data: userInfo } = await supabaseUser.auth.getUser();
      const user = userInfo?.user;
      if (user?.id) {
        const { data, error } = await supabaseUser.rpc('delete_user_answers');
        if (error) return ok({ success: false, error: error.message || 'RPC error' }, 400);
        return ok({ success: true, ...(data || {}) }, 200);
      }
    }

    // Anonymous/admin path: require service role and explicit profileId
    if (SUPABASE_SERVICE_ROLE_KEY && profileId) {
      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
      });
      const { error } = await supabaseAdmin.from('answers').delete().eq('profile_id', profileId);
      if (error) return ok({ success: false, error: error.message || 'Admin delete error' }, 400);
      return ok({ success: true, mode: 'anonymous_admin' }, 200);
    }

    return ok({ error: 'Unauthorized or missing service role/profileId' }, 401);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return ok({ error: `Unhandled error: ${message}` }, 500);
  }
});