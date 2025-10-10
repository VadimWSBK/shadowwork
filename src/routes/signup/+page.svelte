<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { updateProfileSettings } from '$lib/supabaseHelpers';
  import { t } from '$lib/i18n';
  import { browser } from '$app/environment';

  let ready = false;
  let loading = false;
  let errorMessage = '';
  let infoMessage = '';
  let username = '';
  let password = '';
  let confirm = '';
  let unsub: { data?: { subscription?: { unsubscribe?: () => void } } } | null = null;
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let mounted = false;
  let languageMenuOpen = false;

  // Cookie helpers for language persistence
  const LANGUAGE_COOKIE = 'shadowwork_language';
  function setLanguageCookie(lang: 'en' | 'de' | 'pl') {
    try {
      const days = 365 * 2; // 2 years
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(lang)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
    } catch {}
  }
  function getLanguageCookie(): 'en' | 'de' | 'pl' | null {
    try {
      const m = document.cookie.match(/(?:^|;\s*)shadowwork_language=([^;]+)/);
      const val = m ? decodeURIComponent(m[1]) : null;
      if (val === 'en' || val === 'de' || val === 'pl') return val as any;
      return null;
    } catch {
      return null;
    }
  }

  function changeLanguage(language: 'en' | 'de' | 'pl') {
    currentLanguage = language;
    try { 
      if (browser) {
        localStorage.setItem('shadowwork_language', language);
        setLanguageCookie(language);
        document.documentElement.lang = language;
      }
    } catch {}
  }

  onMount(async () => {
    mounted = true;
    
    // Initialize language
    try {
      let saved: string | null = null;
      if (browser) {
        const fromCookie = getLanguageCookie();
        saved = (fromCookie ?? localStorage.getItem('shadowwork_language'));
      }
      if (saved === 'en' || saved === 'de' || saved === 'pl') {
        currentLanguage = saved;
      }
    } catch {}
    
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
        
        // Process different types of invite links
        if (token_hash) {
          console.log('Processing token_hash invite...');
          const { error } = await supabase.auth.verifyOtp({ token_hash, type: typeParam });
          if (error) throw error;
          processed = true;
        } else if (code) {
          console.log('Processing code invite...');
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.search);
          if (error) throw error;
          processed = true;
        } else if (access_token && refresh_token) {
          console.log('Processing access_token invite...');
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) throw error;
          processed = true;
        }

        // Verify we have a valid session (validates JWT with auth server)
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!processed && !user) {
          throw new Error('Missing or invalid invite parameters');
        }

        console.log('Invite processed successfully, user:', user?.email);

        // Bridge client session to server cookies for guarded routes
        try {
          // After verification, get session tokens (needed for cookie bridging)
          // This is safe because we've already verified the user above
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            await fetch('/auth/cookie', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
            });
            console.log('Server cookies set successfully');
          }
        } catch (e) {
          console.warn('Failed to set server cookies:', e);
        }

        // Clean up URL to remove sensitive tokens
        try {
          window.history.replaceState({}, document.title, '/signup');
        } catch {}
      }
      ready = true;
    } catch (e: any) {
      console.error('Invite processing error:', e);
      errorMessage = t(currentLanguage, 'signup.invalidInvite');
      ready = true; // Still show the form so user can see the error
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
      errorMessage = t(currentLanguage, 'signup.usernameRequired');
      return;
    }
    if (password.length < 8) {
      errorMessage = t(currentLanguage, 'signup.passwordTooShort');
      return;
    }
    if (password !== confirm) {
      errorMessage = t(currentLanguage, 'signup.passwordsMismatch');
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

      infoMessage = t(currentLanguage, 'signup.success');
      // Ensure server cookies are set
      try {
        // Get session tokens for cookie bridging (user already verified above)
        // This is safe because we've already called getUser() and updated the user
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
      errorMessage = e?.message || t(currentLanguage, 'signup.setupFailed');
    } finally {
      loading = false;
    }
  }
</script>

<div class="signup-page min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <!-- Language Switcher (top-right) -->
  <div class="fixed top-4 right-4 z-50">
    <div class="relative">
      <button
        class="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-white/15 text-white/90 hover:bg-white/20 transition-colors focus:outline-none"
        on:click={() => (languageMenuOpen = !languageMenuOpen)}
        aria-haspopup="menu"
        aria-expanded={languageMenuOpen}
        title="Change language"
      >
        <span class="text-xs font-semibold tracking-wide">{currentLanguage.toUpperCase()}</span>
      </button>
      {#if languageMenuOpen}
        <div class="absolute right-0 mt-2 min-w-[9rem] max-w-[90vw] bg-white/15 rounded shadow-lg backdrop-blur-md p-1">
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 text-white {currentLanguage==='en' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('en'); languageMenuOpen = false; }}>
            English
          </button>
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 text-white {currentLanguage==='de' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('de'); languageMenuOpen = false; }}>
            Deutsch
          </button>
          <button class="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 text-white {currentLanguage==='pl' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('pl'); languageMenuOpen = false; }}>
            Polski
          </button>
        </div>
      {/if}
    </div>
  </div>
  <div class="w-full max-w-md">
    <div class="p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-white/20 border border-white/30 rounded mx-auto mb-4 flex items-center justify-center shadow-md backdrop-blur-sm">
          <svg class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white mb-1">{t(currentLanguage, 'login.title')}</h1>
        <h2 class="text-3xl font-bold text-white mb-2">{t(currentLanguage, 'signup.title')}</h2>
        <p class="text-white/80">{t(currentLanguage, 'signup.subtitle')}</p>
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
            <label class="block text-sm font-medium text-white/80 mb-2">{t(currentLanguage, 'signup.usernameLabel')}</label>
            <input type="text" bind:value={username} placeholder={t(currentLanguage, 'signup.usernamePlaceholder')}
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 rounded focus:outline-none transition-all duration-200 shadow-inner backdrop-blur-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">{t(currentLanguage, 'signup.passwordLabel')}</label>
            <input type="password" bind:value={password} placeholder={t(currentLanguage, 'signup.passwordPlaceholder')} autocomplete="new-password"
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 rounded focus:outline-none transition-all duration-200 shadow-inner backdrop-blur-sm" />
            <p class="mt-1 text-xs text-white/60">{t(currentLanguage, 'signup.passwordRequirement')}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">{t(currentLanguage, 'signup.confirmPasswordLabel')}</label>
            <input type="password" bind:value={confirm} placeholder={t(currentLanguage, 'signup.confirmPasswordPlaceholder')} autocomplete="new-password"
                   class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 rounded focus:outline-none transition-all duration-200 shadow-inner backdrop-blur-sm" />
          </div>
          <button class="w-full px-6 py-3 text-sm font-bold text-white rounded shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-2 border"
                  style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;" disabled={!ready || loading}>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {#if loading}
              <svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" opacity="0.75"/></svg>
            {/if}
            <span class="relative z-10">{loading ? t(currentLanguage, 'signup.settingUp') : t(currentLanguage, 'signup.finishButton')}</span>
          </button>
        {/if}
      </form>
      
      <div class="mt-8 pt-6 border-t border-white/20">
        <p class="text-xs text-white/70 text-center leading-relaxed">
          {t(currentLanguage, 'signup.disclaimer')}
        </p>
      </div>
    </div>
  </div>
</div>