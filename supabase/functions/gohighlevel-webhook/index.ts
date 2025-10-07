// Supabase Edge Function: GHL payment webhook -> send magic link
// Deno runtime
// @ts-ignore - Remote Deno import; resolved at runtime by Deno
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
// @ts-ignore - Remote ESM import for Deno; resolved at runtime by Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.3';

// Minimal declaration to satisfy local TypeScript tooling outside Deno
declare const Deno: {
  env: { get(name: string): string | undefined };
};

type Payload = {
  email?: string;
  username?: string;
  payment_status?: string; // e.g., 'paid'
  payment_received?: boolean;
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// Removed custom webhook secret gating; rely on platform JWT when using supabase.co endpoint

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

function ok(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

serve(async (req) => {
  if (req.method !== 'POST') return ok({ error: 'Method not allowed' }, 405);

  // No custom secret check; authorization is handled by Supabase when calling
  // the supabase.co/functions/v1/* endpoint with an Authorization: Bearer <anon-key>

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return ok({ error: 'Invalid JSON' }, 400);
  }

  const email = (payload.email || '').trim().toLowerCase();
  const username = (payload.username || '').trim();
  const paid = Boolean(payload.payment_received) || payload.payment_status === 'paid';

  if (!email) return ok({ error: 'Missing email' }, 400);

  // Update existing profile or insert a new one with a unique username
  const { data: profRows, error: selErr } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('email', email)
    .limit(1);
  // Non-fatal: continue even if profile read fails

  if (!selErr && profRows && profRows.length > 0) {
    const { error: updErr } = await supabase
      .from('profiles')
      .update({ payment_received: paid })
      .eq('email', email);
    // Non-fatal: ignore update errors
  } else {
    const safeUsername = username || `user_${crypto.randomUUID().slice(0, 8)}`;
    const { error: insErr } = await supabase
      .from('profiles')
      .insert({ email, username: safeUsername, payment_received: paid });
    // Non-fatal: ignore insert errors (e.g., constraints or RLS)
  }

  // Intentionally skip setting username here to avoid unique-constraint collisions.

  if (!paid) return ok({ message: 'Payment not confirmed; no magic link sent.' });

  // Try sending a magic link via email (if OTP sign-in is allowed)
  const { error: otpErr } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false }
  });
  if (!otpErr) {
    return ok({ message: 'Magic link sent', email });
  }

  // Fallback: generate a magic link (for existing users) or signup link if user doesn’t exist
  const msg = String(otpErr.message || '').toLowerCase();
  let type: 'magiclink' | 'signup' = 'magiclink';
  if (msg.includes('user not found') || msg.includes('no user')) {
    type = 'signup';
  }

  const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
    type,
    email
  });
  if (linkErr) return ok({ error: linkErr.message }, 500);
  return ok({ message: type === 'magiclink' ? 'Magic link generated' : 'Signup link generated', email, action_link: linkData?.action_link });
});