<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';

  let password = '';
  let confirm = '';
  let errorMessage = '';
  let infoMessage = '';
  let loading = false;
  let ready = false;

  onMount(async () => {
    // Support both PKCE (?code=...) and token_hash (?token_hash=...&type=recovery)
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      // Some custom email templates may use alternate names; support a few fallbacks
      const token_hash = params.get('token_hash') || params.get('token') || params.get('hash');
      const typeParam = params.get('type') || 'recovery';

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.search);
        if (error) throw error;
      } else if (token_hash) {
        // Password-reset links are email-based recovery; use the EmailOtpType 'recovery' by default
        const { error } = await supabase.auth.verifyOtp({ token_hash, type: typeParam as any });
        if (error) throw error;
      } else {
        throw new Error('Missing code or token in URL');
      }
    } catch (e: any) {
      errorMessage = 'Invalid or expired reset link. Please request a new one.';
      return;
    }

    // Persist session cookies on the server so guarded routes work
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
    ready = true;
  });

  async function handleReset(event: Event) {
    event.preventDefault();
    errorMessage = '';
    infoMessage = '';
    if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters.';
      return;
    }
    if (password !== confirm) {
      errorMessage = 'Passwords do not match.';
      return;
    }
    loading = true;
    const { error } = await supabase.auth.updateUser({ password });
    loading = false;
    if (error) {
      errorMessage = 'Could not update password. Please try again.';
      return;
    }
    infoMessage = 'Password updated successfully.';
    setTimeout(() => goto('/login'), 1000);
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div class="p-8">
      <h1 class="text-2xl font-bold text-white mb-4">Reset your password</h1>
      {#if errorMessage && !ready}
        <p class="text-sm text-red-300 mb-6">{errorMessage}</p>
      {/if}
      {#if ready}
        <form on:submit={handleReset} class="space-y-6">
          <div>
            <label for="new-password" class="block text-sm font-medium text-white/80 mb-2">New password</label>
            <input
              id="new-password"
              type="password"
              bind:value={password}
              placeholder="••••••••"
              class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm"
            />
          </div>
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-white/80 mb-2">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              bind:value={confirm}
              placeholder="••••••••"
              class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm"
            />
          </div>
          {#if errorMessage}
            <p class="mt-2 text-sm text-red-300">{errorMessage}</p>
          {/if}
          {#if infoMessage}
            <p class="mt-2 text-sm text-green-300">{infoMessage}</p>
          {/if}
          <button
            type="submit"
            disabled={loading}
            class="w-full px-6 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10">Update password</span>
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>