// Save Answer Edge Function — writes answers with user auth context and RLS
// Deno runtime
// @ts-ignore - Remote Deno import; resolved at runtime by Deno
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
// @ts-ignore - Remote ESM import for Deno; resolved at runtime by Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';
// Read function environment vars (cannot start with SUPABASE_). Set via:
// supabase functions secrets set SB_URL='https://<ref>.supabase.co' SB_ANON_KEY='<anon>'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
// Use anon key and forward user's Authorization header so RLS is enforced under user context
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
// Optional: service role key to support anonymous writes with explicit profile_id
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, Authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400'
};
function ok(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      ...corsHeaders
    }
  });
}
serve(async (req)=>{
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: corsHeaders
      });
    }
    if (req.method !== 'POST') return ok({
      error: 'Method not allowed'
    }, 405);
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
      const received = Array.from(req.headers.keys());
      return ok({
        error: 'Missing Authorization Bearer token',
        received_headers: received
      }, 401);
    }
    let payload;
    try {
      payload = await req.json();
    } catch  {
      return ok({
        error: 'Invalid JSON'
      }, 400);
    }
    const dayId = (payload.dayId || '').trim();
    const questionIndex = Number(payload.questionIndex);
    const answer = typeof payload.answer === 'string' ? payload.answer : '';
    const profileId = typeof payload.profileId === 'string' ? payload.profileId.trim() : '';
    if (!dayId || Number.isNaN(questionIndex)) return ok({
      error: 'Missing or invalid fields'
    }, 400);
    // Create client with anon key, and forward user Authorization header to enforce RLS
    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: authHeader
        }
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    // Try to resolve user context
    const { data: userInfo } = await supabaseUser.auth.getUser();
    const user = userInfo?.user;
    if (user?.id) {
      // Authenticated path: upsert using auth.uid()
      const { error } = await supabaseUser.rpc('upsert_answer_v2', {
        p_day_id: dayId,
        p_question_index: questionIndex,
        p_answer_text: answer
      });
      if (error) {
        return ok({
          success: false,
          error: error.message || 'RPC error'
        }, 400);
      }
      return ok({
        success: true
      }, 200);
    }
    // Anonymous path: require service role and explicit profileId
    if (SUPABASE_SERVICE_ROLE_KEY && profileId) {
      const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      const { error: adminErr } = await supabaseAdmin.rpc('upsert_answer_profile', {
        p_profile_id: profileId,
        p_day_id: dayId,
        p_question_index: questionIndex,
        p_answer_text: answer
      });
      if (adminErr) {
        return ok({
          success: false,
          error: adminErr.message || 'RPC error (admin)'
        }, 400);
      }
      return ok({
        success: true,
        mode: 'anonymous_admin'
      }, 200);
    }
    return ok({
      error: 'Unauthorized user or missing service role/profileId'
    }, 401);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return ok({
      error: `Unhandled error: ${message}`
    }, 500);
  }
});
