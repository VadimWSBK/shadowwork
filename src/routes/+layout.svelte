<script lang="ts">
  import { invalidate, invalidateAll } from '$app/navigation';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient';
  import '../app.css';

  // Only load Supabase auth for specific routes that need it
  const authRoutes = ['/login', '/signup', '/dashboard', '/reset'];
  const isAuthRoute = (pathname: string) => {
    return authRoutes.some(route => pathname.startsWith(route));
  };

  // Validate and clean up stale sessions on mount (only for auth routes)
  onMount(async () => {
    if (browser && isAuthRoute($page.url.pathname)) {
      try {
        // Use the main supabase client directly
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          // Clear any broken/invalid session tokens
          await supabase.auth.signOut();
        }
      } catch (e) {
        console.error('Session validation error:', e);
        // Clear broken session
        // Use the main supabase client directly
        await supabase.auth.signOut();
      }
    }
  });

  // Auth state changes are handled by App.svelte to avoid duplicate listeners
</script>

<slot />