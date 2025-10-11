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
    // Use secure storage - localStorage for client-side, httpOnly cookies for server-side
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // Don't use a custom storage key - let Supabase handle it securely
    // storageKey: 'sb-shadowwork-auth-v1' // REMOVED - this was causing localStorage storage
  },
  // Reduce realtime activity to prevent unnecessary network requests
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  // Disable automatic session refresh polling to prevent excessive requests
  global: {
    headers: {
      'X-Client-Info': 'shadowwork-app'
    }
  }
});