<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Redirect to the main landing page
  onMount(() => {
    goto('/', { replaceState: true });
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
  <div class="flex items-center gap-3 text-white/90">
    <span class="inline-block w-5 h-5 rounded border-2 border-white/40 border-t-white animate-spin"></span>
    <span class="text-sm font-secondary">Redirecting...</span>
  </div>
</div>
