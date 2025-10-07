<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { browser } from '$app/environment';
  import { supabase } from '$lib/supabaseClient';
  import '../app.css';
  // No props needed

  // Refresh data on auth changes in the browser only
  if (browser) {
    supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });
  }
</script>

<slot />