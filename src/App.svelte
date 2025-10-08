<script lang="ts">
  import Login from './lib/Login.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import Questionnaire from './lib/Questionnaire.svelte';
  import ViewAnswers from './lib/ViewAnswers.svelte';
  import Settings from './lib/Settings.svelte';
  import { getCourseData } from './lib/questions';
  import type { DayData } from './lib/questions';
  import type { Language } from './lib/questions';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import introBg from './assets/shadowwork_bg_intro.webp';
  import sittingWomanShadow from './assets/logo_shadowwork.png';
  import day2Img from './assets/shadowworkt_day_2.png';
  import day3Img from './assets/shadow_work_day_3.png';
  import day4Img from './assets/shadowwork_day_4.png';
  import day5Img from './assets/shadowwork_day_5.png';
  import day6Img from './assets/shadowwork_day_6.png';
  import day7Img from './assets/shadow_work_day_7.png';
  import { t, getDaySummary, getDayIntro } from './lib/i18n';
  import { supabase } from './lib/supabaseClient';
  import { isAuthorizedUser, getProfileByEmail, updateProfileSettings } from './lib/supabaseHelpers';
  import { answerStorage, type AnswerRow } from './lib/simpleAnswerStorage';
  import { getAuthenticatedUser, type AuthUserInfo } from './lib/auth';
  

  let currentView: 'login' | 'intro' | 'day-intro' | 'questionnaire' | 'view-answers' = 'login';
  let username = '';
  let profileId = '';
  let currentLanguage: Language = 'en';
  let languageMenuOpen = false;
  let courseData: DayData[] = getCourseData(currentLanguage);
  $: courseData = getCourseData(currentLanguage);
  let answers: Record<string, string[]> = {};
  let answersStore = writable<Record<string, string[]>>({});
  let nameSaveStatus: { success: boolean; message?: string } | null = null;

  let currentUser: any = null;
  let authorized = false;
  let navElement: HTMLElement;
  let languageMenuEl: HTMLElement | null = null;
  let languageMenuButtonEl: HTMLElement | null = null;
  let isDarkText = false;
  let isMobileMenuOpen = false;
  let currentDay: DayData = courseData[0]; // Start with Intro
  let sidebarOpen = false;
  let showSettings = false;

  // Cookie helpers for language persistence
  const LANGUAGE_COOKIE = 'shadowwork_language';
  function setLanguageCookie(lang: Language) {
    try {
      const days = 365 * 2; // 2 years
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
      const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(lang)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
    } catch {}
  }
  function getLanguageCookie(): Language | null {
    try {
      const m = document.cookie.match(/(?:^|;\s*)shadowwork_language=([^;]+)/);
      const val = m ? decodeURIComponent(m[1]) : null;
      if (val === 'en' || val === 'de' || val === 'pl') return val as Language;
      return null;
    } catch {
      return null;
    }
  }

  const daySummaries: Record<string, string> = {
    day1: 'Grounding and emotional awareness. Notice, name, and normalize feelings.',
    day2: 'Triggers, projection and relationships. See what reactions reveal about you.',
    day3: 'Shame, guilt and self-beliefs. Meet the inner critic and the stories you carry.',
    day4: 'Childhood patterns and family conditioning. Trace roles, rules, and dynamics.',
    day5: 'Anger, boundaries, money and power. Clarify limits, energy, and agency.',
    day6: 'Desires, authenticity and the golden shadow. Reclaim strengths and true wants.',
    day7: 'Integration, forgiveness and next steps. Choose small, practical commitments.'
  };

  const dayIntros: Record<string, { title: string; theme: string; intro: string }> = {
    day1: { title: 'Meeting your inner world', theme: 'Awareness', intro: 'Every journey begins with noticing. Today you will gently meet the parts of yourself you often overlook. Slow down, name what you feel, and let honesty lead the way.' },
    day2: { title: 'Triggers and reflections', theme: 'Relationships', intro: 'Relationships are mirrors. When something or someone sets you off, it shows you a part of yourself asking to be seen. Today you will look at triggers and what they reveal.' },
    day3: { title: 'Shame, guilt and core beliefs', theme: 'Self-beliefs', intro: 'Hidden beliefs can shape your choices. By meeting shame and guilt with kindness, you create space for a truer story. Today you will listen to your inner voice and update it.' },
    day4: { title: 'Early patterns and family rules', theme: 'Origins', intro: 'Many patterns began in childhood. Roles, rules, and unspoken messages still echo. Today you will trace where they came from and decide which ones you want to keep.' },
    day5: { title: 'Boundaries, power and energy', theme: 'Agency', intro: 'Power lives in clear boundaries. When you honor your limits, your energy returns. Today you will explore anger, money beliefs, and the places you want to stand taller.' },
    day6: { title: 'Desires and the golden shadow', theme: 'Authenticity', intro: 'Your deepest desires are signals. Qualities you admire in others may already live in you. Today you will reclaim hidden strengths and say yes to what you truly want.' },
    day7: { title: 'Integration and next steps', theme: 'Wholeness', intro: 'Wholeness means welcoming all parts of you. Today you will gather your insights, offer yourself forgiveness, and choose small actions that help your growth continue.' }
  };

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (isMobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
      closeMobileMenu();
    }
    // Close language menu when clicking outside of the dropdown or its toggle button
    if (languageMenuOpen) {
      const target = event.target as Node;
      const insideMenu = languageMenuEl ? languageMenuEl.contains(target) : false;
      const insideButton = languageMenuButtonEl ? languageMenuButtonEl.contains(target) : false;
      if (!insideMenu && !insideButton) {
        languageMenuOpen = false;
      }
    }
  }

  onMount(() => {
    // Load saved language
    const cookieLang = getLanguageCookie();
    const savedLanguage = (cookieLang ?? (localStorage.getItem('shadowwork_language') as Language | null));
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'pl')) {
      currentLanguage = savedLanguage;
    }

    // Check if user is already logged in
    const savedUsername = localStorage.getItem('shadowwork_username');
    if (savedUsername) {
      username = savedUsername;
      currentView = 'intro';
      currentDay = courseData[0];
      loadAnswers();
    }

    // Add click outside listener for mobile menu
    document.addEventListener('click', handleClickOutside);

    // Add scroll listener for dynamic text color
    const handleScroll = () => {
      if (!navElement) return;
      
      const rect = navElement.getBoundingClientRect();
      const elementBelow = document.elementFromPoint(rect.left + rect.width / 2, rect.bottom + 1);
      
      if (elementBelow) {
        const computedStyle = window.getComputedStyle(elementBelow);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Check if the background is bright
        const brightness = getBrightness(backgroundColor);
        isDarkText = brightness > 128; // Switch to dark text on bright backgrounds
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  });

  onMount(() => {
    // Restore profileId from localStorage on app initialization
    try {
      const storedProfileId = localStorage.getItem('shadowwork_profile_id');
      if (storedProfileId) {
        profileId = storedProfileId;
        console.log('🔄 Restored profileId from localStorage:', profileId);
      }
    } catch (e) {
      console.warn('Could not restore profileId from localStorage:', e);
    }

    (async () => {
      const userInfo = await getAuthenticatedUser();
      currentUser = userInfo as any;
      await checkAuthAndRedirect();
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, _newSession) => {
      const userInfo = await getAuthenticatedUser();
      currentUser = userInfo as any;
      await checkAuthAndRedirect();
    });
    // Ensure we clean up the subscription when component is destroyed
    return () => {
      try {
        authListener?.subscription?.unsubscribe();
      } catch {}
    };
  });

  async function checkAuthAndRedirect() {
    if (!currentUser) {
      authorized = false;
      currentView = 'login';
      // Ensure we're on the login page when not authenticated
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        goto('/login');
      }
      return;
    }
    authorized = await isAuthorizedUser();
    if (!authorized) {
      // Sign out unauthorized users to avoid lingering sessions
      await supabase.auth.signOut();
      currentView = 'login';
      goto('/login');
      return;
    }
    // Load profile settings when authorized
    const email = currentUser?.email as string | undefined;
    console.log('🔍 Loading profile for email:', email, 'Current profileId:', profileId);
    if (email) {
      const { data } = await getProfileByEmail(email);
      if (data) {
        const newProfileId = (data.id as string) || '';
        console.log('📥 Profile loaded from database:', { id: newProfileId, username: data.username });
        profileId = newProfileId;
        username = (data.username as string) || email;
        const lang = (data.language as Language) || (localStorage.getItem('shadowwork_language') as Language) || 'en';
        if (lang === 'en' || lang === 'de' || lang === 'pl') {
          currentLanguage = lang;
        }
        localStorage.setItem('shadowwork_username', username);
        localStorage.setItem('shadowwork_language', currentLanguage);
        if (profileId) {
          localStorage.setItem('shadowwork_profile_id', profileId);
          console.log('💾 ProfileId saved to localStorage:', profileId);
        } else {
          console.warn('⚠️ ProfileId is empty, not saving to localStorage');
        }
        // Hydrate answers from remote after profile is known
        await hydrateAnswersFromRemote();
      } else {
        // Ensure a profile record exists for this email
        await updateProfileSettings({ email, username: email, language: currentLanguage });
        // Try to read back the profile to capture profileId
        const { data: created } = await getProfileByEmail(email);
        profileId = (created?.id as string) || '';
        if (profileId) localStorage.setItem('shadowwork_profile_id', profileId);
        await hydrateAnswersFromRemote();
      }
    }
    // If authorized and currently at login, proceed to intro
    if (currentView === 'login') {
      currentDay = courseData[0];
      currentView = 'intro';
    }
  }

  async function hydrateAnswersFromRemote() {
    try {
      const { data } = await answerStorage.getAnswers();
      
      // Always build the in-memory structure: Record<dayId, string[]> with proper lengths
      const next: Record<string, string[]> = {};
      courseData.forEach(day => {
        next[day.id] = new Array(day.questions.length).fill('');
      });
      
      // If we have data, populate it
      if (data && data.length > 0) {
        for (const row of data) {
          const d = row.day_id;
          const i = Number(row.question_index ?? 0);
          if (next[d] && i >= 0 && i < next[d].length) {
            next[d][i] = row.answer_text || '';
          }
        }
      }
      
      answers = next;
      answersStore.set(next);
      console.log('✅ Loaded answers from remote:', data?.length || 0, 'rows');
    } catch (error) {
      console.error('Failed to load answers:', error);
    }
  }

  function getBrightness(color: string): number {
    // Parse RGB values from color string
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return 0;
    
    const [, r, g, b] = match.map(Number);
    // Calculate perceived brightness using standard formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  async function handleLogin(event: CustomEvent<{ username: string }>) {
    username = event.detail.username;
    localStorage.setItem('shadowwork_username', username);
    // Enforce auth guard: only proceed if currentUser exists and user is authorized
    const { data: { user } } = await supabase.auth.getUser();
    currentUser = user || null;
    const ok = currentUser ? await isAuthorizedUser() : false;
    if (!ok) {
      currentView = 'login';
      return;
    }
    currentDay = courseData[0]; // Set to intro
    currentView = 'intro';
    loadAnswers();
  }

  function loadAnswers() {
    const saved = localStorage.getItem(`answers_${username}`);
    if (saved) {
      answers = JSON.parse(saved);
    } else {
      // Initialize empty answers for all days
      answers = {};
      courseData.forEach(day => {
        answers[day.id] = new Array(day.questions.length).fill('');
      });
    }
    answersStore.set(answers);
  }

  function handleAnswersUpdate(event: CustomEvent<Record<string, string[]>>) {
    answers = event.detail;
  }

  function showAnswers() {
    // Get current answers from store
    answersStore.subscribe(value => {
      answers = value;
    })();
    currentView = 'view-answers';
  }

  function backToQuestionnaire() {
    currentView = 'questionnaire';
  }

  async function handleUpdateAnswer(dayId: string, index: number, newAnswer: string): Promise<{ success: boolean; error?: any }> {
  if (!answers[dayId]) {
    answers[dayId] = [];
  }
  answers[dayId][index] = newAnswer;
  answersStore.set(answers);
  // No longer saving to localStorage - Supabase is our source of truth

  // Persist to Supabase using simple storage with retry logic
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`💾 handleUpdateAnswer attempt ${attempt}/${maxRetries}:`, { dayId, index, profileId });
      
      const result = await answerStorage.saveAnswer(dayId, index, newAnswer);
      if (result.success) {
        console.log('✅ handleUpdateAnswer successful on attempt', attempt);
        return { success: true };
      } else {
        lastError = result.error;
        console.warn(`❌ handleUpdateAnswer failed on attempt ${attempt}:`, result.error);
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } catch (e) {
      lastError = e;
      console.warn(`💥 handleUpdateAnswer threw on attempt ${attempt}:`, e);
      
      // Wait before retry
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error('❌ handleUpdateAnswer failed after all retries:', lastError);
  return { success: false, error: lastError };
}

  function calculateCompletionRate(dayId: string): number {
    const dayAnswers = answers[dayId] || [];
    const day = courseData.find(d => d.id === dayId);
    if (!day) return 0;
    
    const answeredCount = dayAnswers.filter(answer => answer && answer.trim().length > 0).length;
    return Math.round((answeredCount / day.questions.length) * 100);
  }

  function handleDayComplete(dayId: string) {
    // Handle day completion logic if needed
    console.log(`Day ${dayId} completed`);
    
    // Find the current day index
    const currentDayIndex = courseData.findIndex(day => day.id === dayId);
    
    // Check if there's a next day available
    if (currentDayIndex !== -1 && currentDayIndex < courseData.length - 1) {
      // Automatically progress to the next day
      const nextDay = courseData[currentDayIndex + 1];
      handleDayChange(nextDay);
    }
  }

  function handleDayChange(day: DayData) {
    currentDay = day;
    if (day.id === 'intro') {
      currentView = 'intro';
    } else {
      currentView = 'day-intro';
    }
  }

  async function logout() {
    console.log('🚪 Logging out, clearing profileId:', profileId);
    
    // Clear local state first
    localStorage.removeItem('shadowwork_username');
    localStorage.removeItem('shadowwork_profile_id');
    username = '';
    profileId = '';
    console.log('🧹 ProfileId cleared during logout');
    answers = {};
    answersStore.set({});
    showSettings = false;
    
    // Set view to login immediately to prevent UI flicker
    currentView = 'login';
    currentUser = null;
    authorized = false;
    
    // Sign out from Supabase
    await supabase.auth.signOut();
    // Clear server-side auth cookies to fully invalidate session
    try {
      await fetch('/auth/logout', { method: 'POST' });
    } catch {}
    
    // Navigate to login page
    goto('/login');
  }

  async function handleChangePassword(event: CustomEvent<{ oldPassword: string; newPassword: string }>) {
    const { oldPassword, newPassword } = event.detail;
    const email = currentUser?.email as string | undefined;
    if (!email) {
      alert('You need to be logged in to change your password.');
      return;
    }
    try {
      // Verify current password by signing in
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: oldPassword });
      if (signInError) {
        const msg = (signInError.message || '').toLowerCase();
        if (msg.includes('invalid login credentials')) {
          alert('Current password is incorrect.');
        } else {
          alert('Could not verify current password. Please try again.');
        }
        return;
      }

      // Update password for the authenticated user
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        alert(`Could not update password: ${error.message || 'Unknown error'}`);
        return;
      }
      alert('Password changed successfully!');
      showSettings = false;
    } catch (e: any) {
      alert(`Password change failed: ${e?.message || 'Unknown error'}`);
    }
  }

  async function handleChangeName(event: CustomEvent<{ newName: string }>) {
    const { newName } = event.detail;
    username = newName;
    localStorage.setItem('shadowwork_username', newName);
    
    // Update profile in Supabase and notify Settings of result
    const email = currentUser?.email as string | undefined;
    if (email) {
      const { error } = await updateProfileSettings({ email, username: newName });
      if (error) {
        nameSaveStatus = { success: false, message: error.message || 'Could not save name' };
        return;
      }
    }
    nameSaveStatus = { success: true };
  }

  async function handleDeleteAllData() {
    // Clear in-memory state
    answers = {};
    answersStore.set({});
    
    // Clear user preferences from localStorage (keep language and username for UX)
    // No need to clear answers from localStorage since we don't store them there anymore
    
    // Delete from Supabase
    try {
      const result = await answerStorage.deleteAllAnswers();
      if (!result.success) {
        console.warn('Delete operation failed:', result.error);
      } else {
        console.log('✅ All answers deleted successfully');
      }
    } catch (error) {
      console.warn('Delete operation failed:', error);
    }
    
    // Reinitialize empty state
    await hydrateAnswersFromRemote();
  }

  function changeLanguage(language: Language) {
    currentLanguage = language;
    localStorage.setItem('shadowwork_language', language);
    setLanguageCookie(language);
    const email = currentUser?.email as string | undefined;
    if (email && (language === 'en' || language === 'de' || language === 'pl')) {
      updateProfileSettings({ email, language }).catch(() => {});
    }
    // Keep the same current day id when switching languages
    const newData = getCourseData(language);
    const sameId = currentDay?.id || 'intro';
    const updatedDay = newData.find(d => d.id === sameId) || newData[0];
    currentDay = updatedDay;
  }

  function handleChangeLanguage(event: CustomEvent<{ language: Language }>) {
    const { language } = event.detail;
    changeLanguage(language);
  }

  function getDayNumber(id: string): number {
    const m = id.match(/day(\d+)/);
    return m ? Number(m[1]) : 0;
  }

  // Passphrase handlers removed — encryption is automatic now.
</script>

  <main class="min-h-screen">
  <!-- Navigation Header -->
  {#if currentView !== 'login'}
    <nav 
      bind:this={navElement}
      class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 transition-all duration-300 lg:left-80"
    >
      <div class="max-w-none px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <button 
            class="lg:hidden p-2 text-white/80 hover:text-white"
            on:click={() => sidebarOpen = !sidebarOpen}
            aria-label="Toggle sidebar menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          
          <!-- User Account Section -->
          <div class="flex items-center gap-3 ml-auto">
            <div class="relative">
              <button
                class="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-white/15 border border-white/30 text-white/90"
                on:click={() => (languageMenuOpen = !languageMenuOpen)}
                bind:this={languageMenuButtonEl}
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                title="Change language"
              >
                {currentLanguage.toUpperCase()}
              </button>
              {#if languageMenuOpen}
                <div class="absolute right-0 mt-2 w-36 bg-white/15 border border-white/30 rounded-xl shadow-lg backdrop-blur-md p-1" bind:this={languageMenuEl}>
                  <button class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/20 text-white {currentLanguage==='en' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('en'); languageMenuOpen = false; }}>
                    English
                  </button>
                  <button class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/20 text-white {currentLanguage==='de' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('de'); languageMenuOpen = false; }}>
                    Deutsch
                  </button>
                  <button class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-white/20 text-white {currentLanguage==='pl' ? 'bg-white/10' : ''}" on:click={() => { changeLanguage('pl'); languageMenuOpen = false; }}>
                    Polski
                  </button>
                </div>
              {/if}
            </div>
            <span class="text-white/80 text-sm font-medium hidden sm:block">{username}</span>
            <div class="flex items-center">
              <button 
                class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg hover:bg-white/25 transition-all duration-200"
                on:click={() => showSettings = true}
                aria-label={t(currentLanguage, 'settings.title')}
                title={t(currentLanguage, 'settings.title')}
              >
                <span class="text-white font-semibold text-sm">
                  {username.split(' ').map(name => name.charAt(0).toUpperCase()).join('').slice(0, 2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  {/if}
<!-- Main Content -->
    <div class="relative">
      <!-- Sidebar -->
      {#if currentView !== 'login'}
        <Sidebar 
          {courseData}
          currentDay={currentDay.id}
          {answersStore}
          onDayChange={handleDayChange}
          bind:isOpen={sidebarOpen}
          {currentLanguage}
        />
      {/if}
 
      <div class="fixed top-16 bottom-0 right-0 overflow-y-auto transition-all duration-300 z-20 {currentView !== 'login' ? 'lg:left-80' : 'left-0'}">
        {#if currentView === 'login'}
          <Login {currentLanguage} on:login={handleLogin} />
        {:else if currentView === 'intro'}
          <div class="min-h-screen flex items-center justify-center py-4 px-4" transition:slide={{ duration: 300, easing: quintOut }}>
            <div class="w-full max-w-6xl mx-auto">
              <!-- Day Title and Description -->
              <div class="mb-6 text-left relative">
                {#if currentDay.id !== 'intro'}
                  <div class="absolute top-0 right-0">
                    <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 shadow-lg">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-white">{calculateCompletionRate(currentDay.id)}%</div>
                        <div class="text-xs text-white/80 font-medium">{t(currentLanguage, 'questionnaire.complete')}</div>
                      </div>
                    </div>
                  </div>
                {/if}
                <div class="flex items-center gap-3 mb-1">
                  <h1 class="text-2xl lg:text-3xl font-bold text-white">{currentDay.title}</h1>
                  {#if currentDay.id !== 'intro'}
                    <span class="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-white/20 text-white/90 border border-white/30">
                      {calculateCompletionRate(currentDay.id)}%
                    </span>
                  {/if}
                </div>
                <p class="text-white/70 text-sm lg:text-base">{currentDay.subtitle}</p>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                <!-- Copy -->
                <div class="lg:col-span-2 border-l border-white/10 pl-6">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] mb-4 relative after:content-[''] after:block after:w-20 after:h-[3px] after:bg-white/25 after:rounded-full after:mt-3">
                  {t(currentLanguage, 'app.welcomeTitle')}
                </h2>

                <div class="mt-10 mb-12">
                  <div class="grid grid-cols-1 gap-8">
                    <div class="relative overflow-hidden rounded-xl p-6 lg:p-8 bg-cover bg-center bg-no-repeat ring-1 ring-white/10 w-full" style={`background-image: linear-gradient(to bottom right, rgba(0,68,75,0.65), rgba(0,68,75,0.75)), url('${introBg}')`}>
                      <img src={sittingWomanShadow} alt="silhouette" class="pointer-events-none select-none absolute -right-24 bottom-0 w-[22rem] sm:w-[26rem] md:w-[30rem] opacity-20" />
                      <p class="uppercase tracking-wide text-white/80 text-xs sm:text-sm mb-4">{t(currentLanguage, 'app.whatIsShadowWorkTitle')}</p>
                      <div class="space-y-5 text-white/90 leading-relaxed">
                        <p>{t(currentLanguage, 'app.whatIsShadowWorkP1')}</p>
                        <p>{t(currentLanguage, 'app.whatIsShadowWorkP2')}</p>
                        <p>{t(currentLanguage, 'app.whatIsShadowWorkP3')}</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="mt-4 mb-6">
                  <p class="uppercase tracking-wide text-white/80 text-xs sm:text-sm mb-2">{t(currentLanguage, 'app.overviewTitle')}</p>
                  <ul class="space-y-4">
                    {#each courseData.slice(1) as day}
                      <li class="flex items-start gap-3">
                        <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                        <div>
                          <p class="text-white font-semibold text-sm sm:text-base">{day.title}: {day.subtitle}</p>
                          <p class="text-white/90 text-sm">{getDaySummary(currentLanguage, day.id)}</p>
                        </div>
                      </li>
                    {/each}
                  </ul>
                </div>

                <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                  {t(currentLanguage, 'app.takeYourTimeLine')}
                </p>

                <div class="flex justify-start">
                  <button
                    on:click={() => handleDayChange(courseData[1])}
                    class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group"
                    style="background-color: #0C6E78;"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <span class="relative z-10">{t(currentLanguage, 'app.startJourneyButton')}</span>
                  </button>
                </div>
              </div>
    
                <!-- Decorative Image / Illustration -->
                <div class="lg:col-span-1">
                  <div class="relative">
                    <svg aria-hidden="true" class="w-full h-auto" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stop-color="#0C6E78" />
                          <stop offset="50%" stop-color="#0A5A63" />
                          <stop offset="100%" stop-color="#0C6E78" />
                        </linearGradient>
                      </defs>
                      <path d="M200 30c60 0 120 40 140 100 20 60-10 140-70 170s-150 10-190-40c-40-50-40-120 0-170 40-50 100-60 120-60z" fill="url(#introGrad)" opacity="0.25"></path>
                      
                    </svg>
                  </div>
                </div>
              </div>
            <div class="mt-10 pt-6 border-t border-white/10">
              <p class="uppercase tracking-wide text-white/80 text-xs sm:text-sm mb-2">{t(currentLanguage, 'app.howToUseTitle')}</p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo1')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo2')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo3')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo4')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo5')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo6')}</span>
                </li>
              </ul>
            </div>
            </div>
          </div>
        {:else if currentView === 'day-intro'}
          <div class="min-h-screen flex items-center justify-center py-4 px-4" transition:slide={{ duration: 300, easing: quintOut }}>
            <div class="w-full max-w-6xl mx-auto">
              <div class="mb-6 text-left">
                <h1 class="text-2xl lg:text-3xl font-bold text-white mb-1">{currentDay.title}</h1>
                <p class="text-white/70 text-sm lg:text-base">{currentDay.subtitle}</p>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div class="lg:col-span-2 border-l border-white/10 pl-6">
                  <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] mb-4">
                    {getDayIntro(currentLanguage, currentDay.id)?.title ?? ''}
                  </h2>
                  <div class="flex flex-wrap items-center gap-3 mb-3">
                    <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-white/15 border border-white/30 text-white/90">{t(currentLanguage, 'app.themeLabel', { theme: getDayIntro(currentLanguage, currentDay.id)?.theme ?? '' })}</span>
                    <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-white/15 border border-white/30 text-white/90">{t(currentLanguage, 'app.questionsLabel', { count: currentDay.questions.length })}</span>
                  </div>
                  {#if currentDay.id === 'day1'}
                    <img src={introBg} alt="Day 1 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day2'}
                    <img src={day2Img} alt="Day 2 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day3'}
                    <img src={day3Img} alt="Day 3 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day4'}
                    <img src={day4Img} alt="Day 4 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day5'}
                    <img src={day5Img} alt="Day 5 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day6'}
                    <img src={day6Img} alt="Day 6 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {:else if currentDay.id === 'day7'}
                    <img src={day7Img} alt="Day 7 illustration" class="w-full rounded-xl mb-4 ring-1 ring-white/10" />
                  {/if}
                  <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                    {getDayIntro(currentLanguage, currentDay.id)?.intro}
                  </p>
                  <p class="text-white/80 text-sm mb-6">{t(currentLanguage, 'app.dayIntroTip')}</p>
                
                  <div class="flex gap-3 justify-start">
                    <button
                      on:click={() => currentView = 'questionnaire'}
                      class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group"
                      style="background-color: #0C6E78;"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                      <span class="relative z-10">{t(currentLanguage, 'app.startDayButton', { day: getDayNumber(currentDay.id) })}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if currentView === 'questionnaire'}
          <Questionnaire 
            {answersStore}
            {username}
            {profileId}
            {currentDay}
            {currentLanguage}
            onDayComplete={handleDayComplete}
            onShowAnswers={showAnswers}
          />
        {:else if currentView === 'view-answers'}
          <ViewAnswers 
            answers={$answersStore[currentDay.id] || []} 
            {username}
            {currentDay}
            {currentLanguage}
            onBack={backToQuestionnaire}
            onUpdateAnswer={(index, answer) => handleUpdateAnswer(currentDay.id, index, answer)}
          />
          {/if}
        <footer class="px-4 sm:px-6 lg:px-8 mt-8 mb-6 pt-4 border-t border-white/10 text-center">
          <p class="text-[11px] sm:text-xs text-white/50 leading-snug">
            Disclaimer: This app provides educational self‑reflection prompts and is not therapy, counseling, medical, or psychological advice. It does not diagnose, treat, or prevent any condition and is not a substitute for professional care. If you have concerns about your mental or physical health, or you are experiencing significant distress, please consult a qualified healthcare professional. If you feel unsafe or in Crisis, seek immediate support from local emergency or Crisis services.
          </p>
        </footer>
        </div>
      </div>

  <!-- Settings Modal -->
  {#if showSettings}
    <Settings 
      {username}
      {currentLanguage}
      nameSaveStatus={nameSaveStatus}
      on:close={() => showSettings = false}
      on:logout={logout}
      on:changePassword={handleChangePassword}
      on:changeName={handleChangeName}
      on:deleteAllData={handleDeleteAllData}
      on:changeLanguage={handleChangeLanguage}
    />
  {/if}

</main>
