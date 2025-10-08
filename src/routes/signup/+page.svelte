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

        const { data: { user, session } } = await supabase.auth.getUser();
        if (!processed && !user) {
          throw new Error('Missing or invalid invite parameters');
        }

        // Bridge client session to server cookies for guarded routes
        try {
          const sess = session || (await supabase.auth.getSession()).data.session;
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

<div class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden">
      <div class="px-6 py-5 border-b border-white/20">
        <h1 class="text-white text-xl font-bold">Complete Your Account</h1>
        <p class="text-white/70 text-sm">Set a username and password to finish sign up.</p>
      </div>
      <form class="p-6 space-y-4" on:submit|preventDefault={handleSignup}>
        {#if !ready}
          <div class="text-white/80 text-sm">Validating invite link…</div>
        {:else}
          {#if errorMessage}
            <div class="text-red-200 bg-red-900/30 border border-red-300/30 rounded-lg p-3 text-sm">{errorMessage}</div>
          {/if}
          {#if infoMessage}
            <div class="text-emerald-200 bg-emerald-900/30 border border-emerald-300/30 rounded-lg p-3 text-sm">{infoMessage}</div>
          {/if}
          <div>
            <label class="block text-white/80 text-sm mb-1">Username</label>
            <input type="text" bind:value={username} class="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Your name" />
          </div>
          <div>
            <label class="block text-white/80 text-sm mb-1">Password</label>
            <input type="password" bind:value={password} class="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Create a password" />
          </div>
          <div>
            <label class="block text-white/80 text-sm mb-1">Confirm Password</label>
            <input type="password" bind:value={confirm} class="w-full rounded-lg bg-white/10 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40" placeholder="Re-enter password" />
          </div>
          <button class="w-full px-4 py-2 rounded-xl font-semibold text-white bg-white/15 border border-white/30 hover:bg-white/20 transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={!ready || loading}>
            {#if loading}
              Setting up…
            {:else}
              Finish Sign Up
            {/if}
          </button>
        {/if}
      </form>
    </div>
  </div>
</div>