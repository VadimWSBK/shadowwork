<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (typeof window === 'undefined') return;
    const { location } = window;
    const searchParams = new URLSearchParams(location.search);
    const hash = location.hash || '';
    const isInvite = searchParams.get('type') === 'invite'
      || searchParams.has('token_hash')
      || searchParams.has('code')
      || hash.includes('access_token')
      || hash.includes('refresh_token');

    if (isInvite) {
      // Preserve query + hash when forwarding to signup
      goto(`/signup${location.search}${location.hash}`);
    } else {
      goto('/login');
    }
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
  <div class="text-white/80 text-sm">Loading…</div>
</div>