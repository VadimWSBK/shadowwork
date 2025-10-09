<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from './i18n';
  import { supabase } from './supabaseClient';
  import { browser } from '$app/environment';
  import { onMount, onDestroy } from 'svelte';
  import { isAuthorizedUser } from './supabaseHelpers';
  
  const dispatch = createEventDispatcher<{ login: { username: string } }>();
  
  let email = '';
  let password = '';
  let errorMessage = '';
  let infoMessage = '';
  let loading = false;
  let loadingAction: 'login' | 'link' | null = null;
  let showResetConfirm = false;
  export let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let mounted = false;
  let languageMenuOpen = false;
  let languageMenuRef: HTMLDivElement | null = null;

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

  // Handle click outside to close dropdown
  function handleClickOutside(event: MouseEvent) {
    if (languageMenuOpen && languageMenuRef && !languageMenuRef.contains(event.target as Node)) {
      languageMenuOpen = false;
    }
  }

  onMount(() => {
    mounted = true;
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
    
    // Add click outside listener
    if (browser) {
      document.addEventListener('click', handleClickOutside);
    }
  });
  
  onDestroy(() => {
    // Clean up click outside listener
    if (browser) {
      document.removeEventListener('click', handleClickOutside);
    }
  });

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
  
  function isValidEmail(value: string): boolean {
    return /.+@.+\..+/.test(value);
  }
  
  async function handleSendLink() {
    errorMessage = '';
    infoMessage = '';
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }

    // If already authenticated, check authorization; if not authorized, sign out to allow new link
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const authorized = await isAuthorizedUser();
      if (authorized) {
        const authedEmail = user.email ?? e;
        dispatch('login', { username: authedEmail });
        return;
      } else {
        try { await supabase.auth.signOut(); } catch {}
      }
    }

    // Not authenticated: check if user exists by attempting OTP sign-in
    // without creating a new user. If the user exists, Supabase will send a Magic Link.
    loading = true;
    loadingAction = 'link';
    const redirectTo = browser ? `${location.origin}/login` : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email: e,
      options: { shouldCreateUser: false, emailRedirectTo: redirectTo }
    });
    loading = false;
    loadingAction = null;

    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('user not found')) {
        errorMessage = 'No account found for this email.';
      } else if (msg.includes('redirect')) {
        errorMessage = 'Invalid redirect URL. Add /login to Supabase Auth URLs.';
      } else {
        errorMessage = 'Unable to send login link. Please try again later.';
      }
      return;
    }

    infoMessage = 'A login link has been sent to your email. Please check your inbox.';
    // Keep the user on the login page; they will be redirected after opening the link
  
    // Do not dispatch login here; wait for session to be established via Magic Link
  }

  async function handleLoginPassword() {
    errorMessage = '';
    infoMessage = '';
    const e = email.trim().toLowerCase();
    const p = password;
    if (!isValidEmail(e)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }
    if (!p) {
      errorMessage = 'Please enter your password';
      return;
    }
    loading = true;
    loadingAction = 'login';
    const { data, error } = await supabase.auth.signInWithPassword({ email: e, password: p });
    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('invalid login credentials')) {
        errorMessage = 'Invalid email or password.';
      } else {
        errorMessage = 'Login failed. Please try again.';
      }
      loading = false;
      loadingAction = null;
      return;
    }
    // Get authenticated user data securely
    const { data: { user } } = await supabase.auth.getUser();
    const authedEmail = user?.email ?? e;
    dispatch('login', { username: authedEmail });
    // Keep loading while the page bridges cookies and redirects
    infoMessage = t(currentLanguage, 'login.redirecting');
  }

  async function handleForgotPassword() {
    errorMessage = '';
    infoMessage = '';
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }
    loading = true;
    const redirectTo = browser ? `${location.origin}/reset` : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(e, { redirectTo });
    loading = false;
    if (error) {
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('user not found')) {
        errorMessage = 'No account found for this email.';
      } else if (msg.includes('redirect')) {
        errorMessage = 'Invalid redirect URL. Add /reset to Supabase Auth URLs.';
      } else {
        errorMessage = 'Could not send reset email. Please try again.';
      }
      return;
    }
    infoMessage = 'Password reset email sent. Check your inbox.';
  }

  function openResetConfirm() {
    errorMessage = '';
    infoMessage = '';
    const e = email.trim().toLowerCase();
    if (!isValidEmail(e)) {
      errorMessage = 'Please enter a valid email address';
      return;
    }
    showResetConfirm = true;
  }

  async function confirmReset() {
    showResetConfirm = false;
    await handleForgotPassword();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && showResetConfirm) {
      showResetConfirm = false;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
  <!-- Language Switcher (top-right) -->
  <div class="fixed top-4 right-4 z-50" bind:this={languageMenuRef}>
    <div class="relative">
      <button
        class="inline-flex items-center justify-center w-10 h-10 rounded bg-white/15 border text-white/90 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        style="border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
        on:click={() => (languageMenuOpen = !languageMenuOpen)}
        aria-haspopup="menu"
        aria-expanded={languageMenuOpen}
        title="Change language"
      >
        <span class="sr-only">Change language</span>
        <span class="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
      </button>
      {#if languageMenuOpen}
        <div class="fixed sm:absolute right-4 left-4 sm:right-0 sm:left-auto mt-2 w-auto sm:w-40 bg-white/15 border rounded shadow-lg backdrop-blur-md p-1 z-50"
             style="border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;">
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
    <!-- Removed box background, border and heavy shadow to fit app layout -->
    <div class="p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-white/20 border border-white/30 rounded mx-auto mb-4 flex items-center justify-center shadow-md backdrop-blur-sm">
          <svg class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">{t(currentLanguage, 'login.title')}</h1>
        <p class="text-white/80">{t(currentLanguage, 'login.subtitle')}</p>
      </div>
      
      {#if mounted}
      <form on:submit|preventDefault={handleLoginPassword} class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-white/80 mb-2">
            {t(currentLanguage, 'login.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            placeholder={t(currentLanguage, 'login.emailPlaceholder')}
            required
            autocomplete="email"
            class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 rounded focus:outline-none transition-all duration-200 shadow-inner backdrop-blur-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-white/80 mb-2">
            {t(currentLanguage, 'login.passwordLabel')}
          </label>
          <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="••••••••"
            autocomplete="new-password"
            class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 rounded focus:outline-none transition-all duration-200 shadow-inner backdrop-blur-sm"
          />
          {#if errorMessage}
            <p class="mt-2 text-sm text-red-300">{errorMessage}</p>
          {/if}
          {#if infoMessage}
            <p class="mt-2 text-sm text-green-300">{infoMessage}</p>
          {/if}
          <div class="mt-2 text-right">
            <a
              href="/login#forgot-password"
              on:click|preventDefault={openResetConfirm}
              class={`text-xs text-white/70 hover:text-white underline underline-offset-4 ${(!email.trim() || loading) ? 'pointer-events-none opacity-50' : ''}`}
            >
              {t(currentLanguage, 'login.forgotPasswordLink')}
            </a>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!email.trim() || loading}
          class="w-full px-6 py-3 text-sm font-bold text-white rounded shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-2 border"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {#if loading && loadingAction === 'login'}
            <svg class="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" opacity="0.75"/></svg>
          {/if}
          <span class="relative z-10">{loading && loadingAction === 'login' ? t(currentLanguage, 'login.loggingIn') : t(currentLanguage, 'login.loginButton')}</span>
        </button>

        <button
          type="button"
          on:click|preventDefault={handleSendLink}
          disabled={!email.trim() || loading}
          class="w-full px-6 py-3 text-sm font-bold text-[#0C6E78] bg-white/80 hover:bg-white rounded shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border relative overflow-hidden group"
          style="border-image: rounded linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {#if loading && loadingAction === 'link'}
            <svg class="w-4 h-4 animate-spin text-[#0C6E78]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" opacity="0.75"/></svg>
          {/if}
          {loading && loadingAction === 'link' ? t(currentLanguage, 'login.sendingLink') : t(currentLanguage, 'login.sendLinkButton')}
        </button>

      </form>
      {/if}

      {#if showResetConfirm}
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/50" role="button" tabindex="0" aria-label="Close"
               on:click={() => (showResetConfirm = false)}
               on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') showResetConfirm = false; }}
          ></div>
          <div class="relative z-10 w-full max-w-md mx-auto rounded shadow-xl p-6 text-white" style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);">
            <h3 class="text-lg font-semibold mb-2">{t(currentLanguage, 'login.resetConfirmTitle')}</h3>
            <p class="text-sm text-white/80 mb-4">
              {t(currentLanguage, 'login.resetConfirmBody', { email: email.trim().toLowerCase() })}
            </p>
            <div class="flex items-center gap-3 justify-end">
              <button type="button" class="px-4 py-2 text-sm rounded bg-white/10 hover:bg-white/20 border border-white/20" on:click={() => (showResetConfirm = false)}>
                {t(currentLanguage, 'login.cancel')}
              </button>
              <button type="button" class="px-4 py-2 text-sm font-semibold rounded text-[#0C6E78] bg-white hover:bg-white/90" on:click={confirmReset}>
                {t(currentLanguage, 'login.sendResetEmail')}
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <div class="mt-8 pt-6 border-t border-white/20">
        <p class="text-xs text-white/70 text-center leading-relaxed">
          {t(currentLanguage, 'login.disclaimer')}
        </p>
      </div>
    </div>
  </div>
</div>