<script lang="ts">
  import Login from '$lib/Login.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let unsub: { data?: { subscription?: { unsubscribe?: () => void } } } | null = null;
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let languageMenuOpen = false;
  let isVerifying = false;
  let verifyMessage = 'Verifying login…';

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
        // Reload so the child Login component picks up the new language on mount
        window.location.replace('/login');
      }
    } catch {}
  }

  onMount(async () => {
    // Initialize language from cookie/localStorage
    try {
      let saved: string | null = null;
      if (browser) {
        const fromCookie = getLanguageCookie();
        saved = (fromCookie ?? localStorage.getItem('shadowwork_language'));
      }
      if (saved === 'en' || saved === 'de' || saved === 'pl') {
        currentLanguage = saved;
        if (typeof document !== 'undefined') document.documentElement.lang = currentLanguage;
      }
    } catch {}
    
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('code')) {
          // PKCE implicit flow: exchange ?code for a session
          isVerifying = true;
          verifyMessage = 'Verifying magic link…';
          await supabase.auth.exchangeCodeForSession(window.location.search);
        } else if (params.get('token_hash')) {
          // PKCE server-side style links using token_hash from customized email templates
          isVerifying = true;
          verifyMessage = 'Verifying magic link…';
          const token_hash = params.get('token_hash')!;
          const typeParam = params.get('type') || 'email';
          await supabase.auth.verifyOtp({ token_hash, type: typeParam as any });
        }
      }
    } catch {}

    // Bridge client session to server cookies so server-side guards allow app routes
    // Verify user is authenticated (validates JWT with auth server)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      isVerifying = true;
      verifyMessage = 'Redirecting to dashboard…';
      // After verification, get session tokens (needed for cookie bridging)
      // This is safe because we've already verified the user above
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        isVerifying = false;
        return;
      }
      try {
        await fetch('/auth/cookie', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
        });
      } catch {}
      goto('/dashboard');
    }

    // Also listen for auth changes initiated from the login form (password sign-in)
    try {
      unsub = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!session) return;
        isVerifying = true;
        verifyMessage = 'Syncing session…';
        try {
          await fetch('/auth/cookie', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
          });
        } catch {}
        verifyMessage = 'Redirecting to dashboard…';
        goto('/dashboard');
      });
    } catch {}
  });

  onDestroy(() => {
    try { unsub?.data?.subscription?.unsubscribe?.(); } catch {}
  });

</script>

{#if isVerifying}
  <!-- Full-screen loading overlay -->
  <div class="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
    <div class="flex items-center gap-3 text-white/90">
      <span class="inline-block w-5 h-5 rounded border-2 border-white/40 border-t-white animate-spin"></span>
      <span class="text-sm">{verifyMessage}</span>
    </div>
  </div>
{:else}
  <div class="login-page">
    <Login />
  </div>
{/if}