<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { updateProfileSettings } from '$lib/supabaseHelpers';

  let ready = false;
  let loading = false;
  let errorMessage = '';
  let infoMessage = '';
  let username = '';
  let password = '';
  let confirm = '';
  let unsub: { data?: { subscription?: { unsubscribe?: () => void } } } | null = null;

  onMount(async () => {
    try {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const token_hash = searchParams.get('token_hash');
        const code = searchParams.get('code');
        const typeParam = ((searchParams.get('type') || hashParams.get('type')) || 'invite') as any;
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        let processed = false;
        if (token_hash) {
          const { error } = await supabase.auth.verifyOtp({ token_hash, type: typeParam });
          if (error) throw error;
          processed = true;
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.search);
          if (error) throw error;
          processed = true;
        } else if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
          processed = true;
        }

        const { data: { user } } = await supabase.auth.getUser();
        const { data: { session } } = await supabase.auth.getSession();
        if (!processed && !user) {
          throw new Error('Missing or invalid invite parameters');
        }

        // Bridge client session to server cookies for guarded routes
        try {
          const sess = session;
          if (sess) {
            await fetch('/auth/cookie', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ access_token: sess.access_token, refresh_token: sess.refresh_token })
            });
          }
        } catch {}

        // Listen for session changes while user sets password
        try {
          unsub = supabase.auth.onAuthStateChange(async (_event, _session) => {
            // No-op; session already bridged above
          });
        } catch {}
      }
      ready = true;
    } catch (e: any) {
      errorMessage = 'Invalid or expired invite link. Please request a new one.';
    }
  });

  onDestroy(() => {
    try { unsub?.data?.subscription?.unsubscribe?.(); } catch {}
  });

  async function handleSignup(event: Event) {
    event.preventDefault();
    errorMessage = '';
    infoMessage = '';
    if (!username || username.trim().length < 2) {
      errorMessage = 'Please enter a valid username (min 2 characters).';
      return;
    }
    if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (password !== confirm) {
      errorMessage = 'Passwords do not match.';
      return;
    }

    loading = true;
    try {
      // Set password on the invited user
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        throw updateError;
      }

      // Update profile username tied to the auth email
      const { data: { user } } = await supabase.auth.getUser();
      const email = user?.email as string | undefined;
      if (email) {
        const { error: profileError } = await updateProfileSettings({ email, username, language: 'en' });
        if (profileError) {
          // Not fatal for sign-up, but notify
          console.warn('Profile update failed:', profileError.message);
        }
      }

      infoMessage = 'Account created successfully. Redirecting...';
      // Ensure server cookies are set
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await fetch('/auth/cookie', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
          });
        }
      } catch {}

      setTimeout(() => goto('/dashboard'), 800);
    } catch (e: any) {
      errorMessage = e?.message || 'Could not complete sign up. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div class="p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Complete Your Account</h1>
        <p class="text-white/80">Set a username and password to finish sign up.</p>
      </div>
      <form class="space-y-6" on:submit|preventDefault={handleSignup}>
        {#if !ready}
          <div class="text-white/80 text-sm">Validating invite link…</div>
        {:else}
          {#if errorMessage}
            <p class="text-sm text-red-300">{errorMessage}</p>
          {/if}
          {#if infoMessage}
            <p class="text-sm text-green-300">{infoMessage}</p>
          {/if}
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Username</label>
            <input type="text" bind:value={username} placeholder="Your name"
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input type="password" bind:value={password} placeholder="••••••••" autocomplete="new-password"
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
            <input type="password" bind:value={confirm} placeholder="••••••••" autocomplete="new-password"
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm" />
          </div>
          <button class="w-full px-6 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-2"
                  style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);" disabled={!ready || loading}>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {#if loading}
              <svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" opacity="0.75"/></svg>
            {/if}
            <span class="relative z-10">{loading ? 'Setting up…' : 'Finish Sign Up'}</span>
          </button>
        {/if}
      </form>
      
    </div>
  </div>
</div>