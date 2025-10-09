import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const url = PUBLIC_SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL;
const key = PUBLIC_SUPABASE_ANON_KEY || (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Versioned storage key - increment when you make breaking auth changes
    storageKey: 'sb-shadowwork-auth-v1'
  }
});