import { createClient } from "@supabase/supabase-js";
const PUBLIC_SUPABASE_URL = "https://gaafkvyzvchroojmvjdu.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYWZrdnl6dmNocm9vam12amR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNjM3NzcsImV4cCI6MjA3NDgzOTc3N30.ng-cTBCVxV1UtkmpRZjdX66-PZtiHOAdxyie0cfcmxg";
const url = PUBLIC_SUPABASE_URL;
const key = PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    // Versioned storage key - increment when you make breaking auth changes
    storageKey: "sb-shadowwork-auth-v1"
  }
});
export {
  supabase as s
};
