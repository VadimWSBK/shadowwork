<script lang="ts">
  import Login from '$lib/Login.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('code')) {
          // PKCE implicit flow: exchange ?code for a session
          await supabase.auth.exchangeCodeForSession(window.location.search);
        } else if (params.get('token_hash')) {
          // PKCE server-side style links using token_hash from customized email templates
          const token_hash = params.get('token_hash')!;
          const typeParam = params.get('type') || 'email';
          await supabase.auth.verifyOtp({ token_hash, type: typeParam as any });
        }
      }
    } catch {}

    // Bridge client session to server cookies so server-side guards allow app routes
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      try {
        await fetch('/auth/cookie', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
        });
      } catch {}
      goto('/dashboard');
    }
  });
</script>

<Login />