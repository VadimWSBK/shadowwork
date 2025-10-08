<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';
  let unsub;

  onMount(() => {
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
      // Preserve query + hash when forwarding to signup
      goto(`/signup${location.search}${location.hash}`);
      // Also listen for the session being created asynchronously by Supabase
      try {
        unsub = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (!session) return;
          try {
            await fetch('/auth/cookie', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
            });
          } catch {}
          goto('/signup');
        });
      } catch {}
      return;
    }

    // If Supabase already consumed the hash and established a session, forward to signup.
    // Otherwise, default to login.
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          goto('/signup');
        } else {
          goto('/login');
        }
      } catch {
        goto('/login');
      }
    })();
  });

  onDestroy(() => {
    try { unsub?.data?.subscription?.unsubscribe?.(); } catch {}
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
  <div class="text-white/80 text-sm">Loading…</div>
</div>