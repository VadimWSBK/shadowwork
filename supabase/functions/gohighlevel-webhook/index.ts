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
const GHL_WEBHOOK_SECRET = Deno.env.get('GHL_WEBHOOK_SECRET');

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

  // Simple secret check (header or query param)
  if (GHL_WEBHOOK_SECRET) {
    const h = req.headers.get('x-webhook-secret') || new URL(req.url).searchParams.get('secret');
    if (h !== GHL_WEBHOOK_SECRET) {
      return ok({ error: 'Unauthorized' }, 401);
    }
  }

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

  // Upsert profile with payment_received flag
  const { error: upsertErr } = await supabase
    .from('profiles')
    .upsert({ email, username, payment_received: paid }, { onConflict: 'email' });
  if (upsertErr) return ok({ error: upsertErr.message }, 500);

  if (!paid) return ok({ message: 'Payment not confirmed; no magic link sent.' });

  // Trigger magic link email via Auth OTP
  const { error: otpErr } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true }
  });
  if (otpErr) return ok({ error: otpErr.message }, 500);

  return ok({ message: 'Magic link sent', email });
});