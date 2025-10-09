<script lang="ts">
  import { invalidate, invalidateAll } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import '../app.css';
  // No props needed

  // Validate and clean up stale sessions on mount
  onMount(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        // Clear any broken/invalid session tokens
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error('Session validation error:', e);
      // Clear broken session
      await supabase.auth.signOut();
    }
  });

  // Refresh data on auth changes in the browser only
  if (browser) {
    supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const access_token = session?.access_token;
          const refresh_token = session?.refresh_token;
          if (access_token && refresh_token) {
            await fetch('/auth/cookie', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ access_token, refresh_token })
            });
          }
        } else if (event === 'SIGNED_OUT') {
          await fetch('/auth/logout', { method: 'POST' });
        }
      } catch (e) {
        console.error('Failed to sync auth cookies:', e);
      } finally {
        // Ensure all data that depends on auth is re-fetched
        invalidate('supabase:auth');
        try { await invalidateAll(); } catch {}
      }
    });
  }
</script>

<slot />