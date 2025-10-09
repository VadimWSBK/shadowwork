<script lang="ts">
  import Login from '$lib/Login.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  let unsub: { data?: { subscription?: { unsubscribe?: () => void } } } | null = null;
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
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
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
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
        try {
          await fetch('/auth/cookie', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ access_token: session.access_token, refresh_token: session.refresh_token })
          });
        } catch {}
        goto('/dashboard');
      });
    } catch {}
  });

  onDestroy(() => {
    try { unsub?.data?.subscription?.unsubscribe?.(); } catch {}
  });

</script>

<div class="login-page">
  <Login />
</div>