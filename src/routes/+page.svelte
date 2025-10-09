<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';
  let unsub;
  let retryTimer;
  let loadingMessage = 'Loading…';

  function forwardToSignupPreservingParams() {
    if (typeof window === 'undefined') return;
    const { location } = window;
    goto(`/signup${location.search}${location.hash}`, { replaceState: true });
  }

  async function attemptRouting() {
    if (typeof window === 'undefined') return;
    const { location } = window;
    const searchParams = new URLSearchParams(location.search);
    const hash = location.hash || '';
    const hadInvite = searchParams.get('type') === 'invite'
      || searchParams.has('token_hash')
      || searchParams.has('code')
      || hash.includes('access_token')
      || hash.includes('refresh_token');

    if (hadInvite) {
      loadingMessage = 'Processing invite…';
      // Immediately redirect to signup with all parameters
      forwardToSignupPreservingParams();
      return;
    }

    loadingMessage = 'Checking session…';
    try {
      // Verify authentication securely first
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        goto('/dashboard', { replaceState: true });
      } else {
        goto('/login', { replaceState: true });
      }
    } catch {
      goto('/login', { replaceState: true });
    }
  }

  onMount(() => {
    attemptRouting();
    // Retry once after 1s if still on the loading page
    retryTimer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          loadingMessage = 'Redirecting…';
          attemptRouting();
        }
      } catch {}
    }, 1000);
  });

  onDestroy(() => {
    try { unsub?.data?.subscription?.unsubscribe?.(); } catch {}
    try { if (retryTimer) clearTimeout(retryTimer); } catch {}
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
  <div class="flex items-center gap-3 text-white/90">
    <span class="inline-block w-5 h-5 rounded border-2 border-white/40 border-t-white animate-spin"></span>
    <span class="text-sm">{loadingMessage}</span>
  </div>
</div>