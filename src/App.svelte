<script lang="ts">
  import Login from './lib/Login.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import Questionnaire from './lib/Questionnaire.svelte';
  import ViewAnswers from './lib/ViewAnswers.svelte';
  import Settings from './lib/Settings.svelte';
  import Dashboard from './lib/Dashboard.svelte';
  import { getCourseData } from './lib/questions';
  import type { DayData } from './lib/questions';
  import type { Language } from './lib/questions';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { quintOut, cubicOut } from 'svelte/easing';
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
  import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
  

  let currentView: 'login' | 'dashboard' | 'intro' | 'day-intro' | 'questionnaire' | 'view-answers' | 'day-completion' = 'login';
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
  let sidebarCollapsed = false;
  let showSettings = false;
  let showCompletionPage = false;
  let completedDay: DayData | null = null;
  let dayIntroImageLoaded = false;
  let isTransitioningDay = false;

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
      if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLanguage;
      }
    }

    // Check if user is already logged in
    const savedUsername = localStorage.getItem('shadowwork_username');
    if (savedUsername) {
      username = savedUsername;
      currentView = 'dashboard';
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
    // Don't interfere with signup page invite processing
    if (typeof window !== 'undefined' && window.location.pathname === '/signup') {
      return;
    }
    
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
    // If authorized and currently at login, proceed to dashboard
    if (currentView === 'login') {
      currentDay = courseData[0];
      currentView = 'dashboard';
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
    currentView = 'dashboard';
    loadAnswers();
  }
  
  function handleStartIntro() {
    currentDay = courseData[0];
    currentView = 'intro';
  }
  
  function handleGoToDashboard() {
    currentView = 'dashboard';
    currentDay = courseData[0]; // Reset to intro to avoid highlighting both dashboard and a day
  }

  // Helper function to check if user has started any day
  function hasStartedAnyDay(): boolean {
    return Object.keys(answers).some(dayId => {
      const dayAnswers = answers[dayId] || [];
      return dayAnswers.some(answer => answer && answer.trim().length > 0);
    });
  }

  // Helper function to check if user has started a specific day
  function hasStartedDay(dayId: string): boolean {
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.some(answer => answer && answer.trim().length > 0);
  }

  // Helper function to get the appropriate button text
  function getJourneyButtonText(): string {
    return hasStartedAnyDay() 
      ? t(currentLanguage, 'app.continueJourneyButton')
      : t(currentLanguage, 'app.startJourneyButton');
  }

  function getDayButtonText(dayId: string): string {
    return hasStartedDay(dayId)
      ? t(currentLanguage, 'app.continueDayButton', { day: getDayNumber(dayId) })
      : t(currentLanguage, 'app.startDayButton', { day: getDayNumber(dayId) });
  }

  // Helper function to get day statistics
  function getDayStats(dayId: string) {
    const dayAnswers = answers[dayId] || [];
    const answeredQuestions = dayAnswers.filter(answer => answer && answer.trim().length > 0);
    const totalWords = answeredQuestions.reduce((sum, answer) => {
      return sum + (answer.trim().split(/\s+/).length || 0);
    }, 0);
    const totalCharacters = answeredQuestions.reduce((sum, answer) => {
      return sum + (answer.trim().length || 0);
    }, 0);
    const progress = dayAnswers.length > 0 ? Math.round((answeredQuestions.length / dayAnswers.length) * 100) : 0;
    
    return {
      answeredQuestions: answeredQuestions.length,
      totalQuestions: dayAnswers.length,
      progress,
      totalWords,
      totalCharacters
    };
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

  // Track ongoing save operations to prevent race conditions
  const ongoingSaves = new Map<string, Promise<{ success: boolean; error?: any }>>();

  async function handleUpdateAnswer(dayId: string, index: number, newAnswer: string): Promise<{ success: boolean; error?: any }> {
  // Create a unique key for this save operation
  const saveKey = `${dayId}-${index}`;
  
  // If there's already a save in progress for this answer, wait for it to complete first
  if (ongoingSaves.has(saveKey)) {
    console.log('⏳ Waiting for ongoing save to complete:', saveKey);
    await ongoingSaves.get(saveKey);
  }
  
  // Start the save operation
  const savePromise = (async () => {
    try {
      // Store original value in case we need to rollback
      const originalAnswer = answers[dayId]?.[index];
      
      // Persist to Supabase using simple storage with retry logic
      const maxRetries = 3;
      let lastError;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`💾 handleUpdateAnswer attempt ${attempt}/${maxRetries}:`, { dayId, index, profileId });
          
          const result = await answerStorage.saveAnswer(dayId, index, newAnswer);
          if (result.success) {
            console.log('✅ handleUpdateAnswer successful on attempt', attempt);
            
            // Only update local state after successful save
            if (!answers[dayId]) {
              answers[dayId] = [];
            }
            answers[dayId][index] = newAnswer;
            answersStore.set(answers);
            
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
    } finally {
      // Clean up the ongoing save tracker
      ongoingSaves.delete(saveKey);
    }
  })();
  
  // Track this save operation
  ongoingSaves.set(saveKey, savePromise);
  
  return savePromise;
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
    
    // Find the completed day
    const day = courseData.find(d => d.id === dayId);
    if (day) {
      completedDay = day;
      showCompletionPage = true;
      currentView = 'day-completion';
    }
  }

  function continueToNextDay() {
    if (!completedDay) return;
    
    // Find the current day index
    const currentDayIndex = courseData.findIndex(day => day.id === completedDay.id);
    
    // Check if there's a next day available
    if (currentDayIndex !== -1 && currentDayIndex < courseData.length - 1) {
      const nextDay = courseData[currentDayIndex + 1];
      handleDayChange(nextDay);
    } else {
      // If it's the last day, go to dashboard
      currentView = 'dashboard';
      currentDay = courseData[0]; // Reset to intro
    }
    
    // Close completion page
    showCompletionPage = false;
    completedDay = null;
  }

  function goToDashboard() {
    // Always go to dashboard regardless of which day was completed
    currentView = 'dashboard';
    currentDay = courseData[0]; // Reset to intro
    
    showCompletionPage = false;
    completedDay = null;
  }

  async function downloadDayPDF() {
    if (!completedDay) return;
    
    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import('jspdf');
      
      // Get answers for this day
      const dayAnswers = $answersStore[completedDay.id] || [];
      const dayIndex = courseData.findIndex(day => day.id === completedDay.id);
      
      // Create PDF with proper Unicode support
      const pdf = new jsPDF();
      
      // Get localized date format
      const dateFormat = currentLanguage === 'en' ? 'en-US' : currentLanguage === 'de' ? 'de-DE' : 'pl-PL';
      const formattedDate = new Date().toLocaleDateString(dateFormat, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Get the translated course data for the current language
      const translatedCourseData = getCourseData(currentLanguage);
      const translatedDay = translatedCourseData.find(day => day.id === completedDay.id);
      const questionsToUse = translatedDay ? translatedDay.questions : completedDay.questions;
      
      // Set up fonts and colors
      pdf.setFontSize(24);
      pdf.setTextColor(12, 110, 120); // Teal color
      pdf.setFont('helvetica', 'bold');
      pdf.text(t(currentLanguage, 'pdf.title'), 20, 30);
      
      pdf.setFontSize(18);
      pdf.setTextColor(60, 60, 60);
      pdf.text(t(currentLanguage, 'pdf.dayTitle', { day: dayIndex, theme: completedDay.subtitle }), 20, 50);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(t(currentLanguage, 'pdf.completedOn', { date: formattedDate }), 20, 65);
      
      const answeredCount = dayAnswers.filter(answer => answer && answer.trim().length > 0).length;
      const totalWords = dayAnswers.reduce((sum, answer) => {
        if (!answer || answer.trim().length === 0) return sum;
        return sum + answer.trim().split(/\s+/).length;
      }, 0);
      
      pdf.text(t(currentLanguage, 'pdf.progress', { answered: answeredCount, total: questionsToUse.length }), 20, 80);
      pdf.text(t(currentLanguage, 'pdf.totalWords', { words: totalWords }), 20, 90);
      
      // Add a line separator with better styling
      pdf.setDrawColor(12, 110, 120);
      pdf.setLineWidth(0.5);
      pdf.line(20, 105, 190, 105);
      
      // Add questions and answers with improved formatting
      let yPosition = 120;
      const maxWidth = 170;
      const lineHeight = 7;
      
      questionsToUse.forEach((question, index) => {
        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        
        const answer = dayAnswers[index] || t(currentLanguage, 'answers.noResponse');
        
        // Question number and text with better formatting
        pdf.setFontSize(13);
        pdf.setTextColor(12, 110, 120);
        pdf.setFont('helvetica', 'bold');
        const questionNumber = t(currentLanguage, 'questionnaire.questionNumber', { number: index + 1 });
        pdf.text(questionNumber, 20, yPosition);
        yPosition += 8;
        
        // Question text
        pdf.setFontSize(11);
        pdf.setTextColor(40, 40, 40);
        pdf.setFont('helvetica', 'normal');
        // Ensure proper encoding for special characters
        const questionText = question.text.replace(/[^\x00-\x7F]/g, (char) => {
          return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        });
        const questionLines = pdf.splitTextToSize(questionText, maxWidth);
        pdf.text(questionLines, 20, yPosition);
        yPosition += questionLines.length * lineHeight + 5;
        
        // Question Explanation (if available)
        if (question.explanation) {
          pdf.setFontSize(9);
          pdf.setTextColor(100, 100, 100);
          pdf.setFont('helvetica', 'italic');
          // Ensure proper encoding for special characters in explanations
          const explanationText = question.explanation.replace(/[^\x00-\x7F]/g, (char) => {
            return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          });
          const explanationLines = pdf.splitTextToSize(explanationText, maxWidth);
          pdf.text(explanationLines, 20, yPosition);
          yPosition += explanationLines.length * lineHeight + 8;
        }
        
        // Answer with better formatting
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        pdf.setFont('helvetica', 'bold');
        const answerLabel = t(currentLanguage, 'pdf.answer');
        pdf.text(answerLabel, 20, yPosition);
        yPosition += 6;
        
        pdf.setFontSize(10);
        pdf.setTextColor(40, 40, 40);
        pdf.setFont('helvetica', 'normal');
        // Ensure proper encoding for special characters in answers
        const answerText = answer.replace(/[^\x00-\x7F]/g, (char) => {
          return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        });
        const answerLines = pdf.splitTextToSize(answerText, maxWidth);
        pdf.text(answerLines, 20, yPosition);
        yPosition += answerLines.length * lineHeight + 15;
        
        // Add subtle separator between questions
        if (index < questionsToUse.length - 1) {
          pdf.setDrawColor(220, 220, 220);
          pdf.setLineWidth(0.2);
          pdf.line(20, yPosition - 5, 190, yPosition - 5);
        }
      });
      
      // Save the PDF with localized filename
      const fileName = t(currentLanguage, 'pdf.fileName', { 
        day: dayIndex, 
        date: new Date().toISOString().split('T')[0] 
      });
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error downloading day summary:', error);
      alert(t(currentLanguage, 'errors.pdfDownloadFailed') || 'Error downloading your day summary. Please try again.');
    }
  }

  async function handleDayChange(day: DayData) {
    if (isTransitioningDay) {
      console.log('Transition already in progress, ignoring day change request');
      return; // Prevent multiple simultaneous transitions
    }
    
    isTransitioningDay = true;
    dayIntroImageLoaded = false;
    
    // Preload the image for the day intro view before starting the transition
    if (day.id !== 'intro') {
      await preloadDayImage(day.id);
    } else {
      dayIntroImageLoaded = true;
    }
    
    // Small delay to allow current transition to complete
    await new Promise(resolve => setTimeout(resolve, 50));
    currentDay = day;
    if (day.id === 'intro') {
      currentView = 'intro';
    } else {
      currentView = 'day-intro';
    }
    
    isTransitioningDay = false;
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

  async function handleDeleteProfile() {
    try {
      console.log('🗑️ Starting profile deletion process...');
      
      // Verify user is authenticated and get access token
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const { data: sessionRes } = await supabase.auth.getSession();
      const accessToken = sessionRes?.session?.access_token || '';
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      if (PUBLIC_SUPABASE_ANON_KEY) headers['apikey'] = PUBLIC_SUPABASE_ANON_KEY;

      // Call delete-profile function
      let deletionSuccessful = false;
      try {
        console.log('🔄 Calling delete-profile function...');
        const { data: fnData, error: fnError } = await supabase.functions.invoke('delete-profile', {
          headers,
          body: {}
        });
        
        if (fnError) {
          console.warn('❌ delete-profile function error:', fnError.message);
          // Still proceed with cleanup even if function fails
        } else {
          console.log('✅ delete-profile function result:', fnData);
          deletionSuccessful = fnData?.success === true;
        }
      } catch (e) {
        console.warn('❌ delete-profile invoke failed:', e);
        // Still proceed with cleanup
      }

      console.log('🧹 Clearing local state and storage...');
      // Clear local state and storage
      try {
        localStorage.removeItem('shadowwork_language');
        localStorage.removeItem('shadowwork_username');
        localStorage.removeItem('shadowwork_profile_id');
        localStorage.removeItem('shadowwork_answers');
      } catch (e) {
        console.warn('Failed to clear localStorage:', e);
      }

      // Reset component state
      username = '';
      profileId = '';
      answers = {};
      answersStore.set({});
      currentUser = null;
      authorized = false;
      currentView = 'login';

      console.log('🚪 Signing out from Supabase...');
      // Sign out from Supabase and clear server cookies
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Failed to sign out from Supabase:', e);
      }
      
      try { 
        await fetch('/auth/logout', { method: 'POST' }); 
      } catch (e) {
        console.warn('Failed to clear server cookies:', e);
      }

      console.log('🔄 Redirecting to login page...');
      // Close settings popup first
      showSettings = false;
      
      // Add a small delay to ensure the popup closes before redirect
      setTimeout(() => {
        // Use window.location for a hard redirect to ensure clean state
        window.location.href = '/login';
      }, 100);
      
    } catch (error) {
      console.warn('❌ Delete profile failed:', error);
      // Close settings and redirect to login even if deletion fails
      showSettings = false;
      
      // Add delay for error case too
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  }

  function changeLanguage(language: Language) {
    currentLanguage = language;
    localStorage.setItem('shadowwork_language', language);
    setLanguageCookie(language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
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

  function getDayImage(dayId: string): string | null {
    switch(dayId) {
      case 'day1': return introBg;
      case 'day2': return day2Img;
      case 'day3': return day3Img;
      case 'day4': return day4Img;
      case 'day5': return day5Img;
      case 'day6': return day6Img;
      case 'day7': return day7Img;
      default: return null;
    }
  }

  async function preloadDayImage(dayId: string): Promise<void> {
    const imageSrc = getDayImage(dayId);
    if (!imageSrc) {
      dayIntroImageLoaded = true;
      return;
    }

    return new Promise((resolve) => {
      const img = new Image();
      
      // If image is already cached, it loads synchronously
      const isAlreadyCached = img.complete || img.naturalWidth > 0;
      
      img.onload = () => {
        dayIntroImageLoaded = true;
        resolve();
      };
      img.onerror = () => {
        // Even if image fails to load, proceed with transition
        console.warn(`Failed to preload image for ${dayId}`);
        dayIntroImageLoaded = true;
        resolve();
      };
      
      // Start loading
      img.src = imageSrc;
      
      // If already cached, resolve immediately
      if (img.complete) {
        dayIntroImageLoaded = true;
        resolve();
        return;
      }
      
      // Set timeout to prevent indefinite waiting
      setTimeout(() => {
        if (!dayIntroImageLoaded) {
          console.warn(`Image preload timeout for ${dayId}, proceeding anyway`);
          dayIntroImageLoaded = true;
          resolve();
        }
      }, 2000); // Max 2 seconds wait for image
    });
  }

  // Passphrase handlers removed — encryption is automatic now.
</script>

  <main class="min-h-screen">
  <!-- Navigation Header -->
  {#if currentView !== 'login'}
    <nav 
      bind:this={navElement}
      class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 transition-all duration-500 {sidebarCollapsed ? 'lg:left-20' : 'lg:left-80'}"
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
                class="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-white/15 border border-white/30 text-white/90"
                on:click={() => (languageMenuOpen = !languageMenuOpen)}
                bind:this={languageMenuButtonEl}
                aria-haspopup="menu"
                aria-expanded={languageMenuOpen}
                title="Change language"
              >
                {currentLanguage.toUpperCase()}
              </button>
              {#if languageMenuOpen}
                <div class="absolute right-0 mt-2 min-w-[9rem] max-w-[90vw] bg-white/15 border border-white/30 rounded shadow-lg backdrop-blur-md p-1" bind:this={languageMenuEl}>
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
            <span class="text-white/80 text-sm font-medium hidden sm:block">{username}</span>
            <div class="flex items-center">
              <button 
                class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center border-2 border-white/30 shadow-lg hover:bg-white/25 transition-all duration-200"
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
          onPreloadDay={preloadDayImage}
          onDashboard={handleGoToDashboard}
          bind:isOpen={sidebarOpen}
          bind:isCollapsed={sidebarCollapsed}
          {currentLanguage}
          {currentView}
        />
        {#if sidebarOpen}
          <!-- Overlay that closes sidebar when clicking outside (mobile only) -->
          <div 
            class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" 
            on:click={() => (sidebarOpen = false)}
            on:keydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
            role="button"
            tabindex="0"
            aria-label="Close sidebar"
          ></div>
        {/if}
      {/if}
 
      <div class="fixed top-16 bottom-0 right-0 overflow-y-auto transition-all duration-500 z-20 {currentView !== 'login' ? (sidebarCollapsed ? 'lg:left-20' : 'lg:left-80') : 'left-0'}">
        {#if currentView === 'login'}
          <Login {currentLanguage} on:login={handleLogin} />
        {:else if currentView === 'dashboard'}
          <Dashboard 
            {courseData}
            {answersStore}
            {username}
            {currentLanguage}
            onDayChange={handleDayChange}
            onStartIntro={handleStartIntro}
          />
        {:else if currentView === 'intro'}
          <div class="flex items-center justify-center p-2 sm:p-4 lg:p-10" transition:slide={{ duration: 500, easing: quintOut }}>
            <div class="w-full max-w-6xl mx-auto">
              <!-- Day Title and Description -->
              <div class="mb-6 text-left relative">
                {#if currentDay.id !== 'intro'}
                  <div class="absolute top-0 right-0">
                    <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded px-4 py-2 shadow-lg">
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
                    <span class="inline-flex items-center px-3 py-1 text-sm font-semibold rounded bg-white/20 text-white/90 border border-white/30">
                      {calculateCompletionRate(currentDay.id)}%
                    </span>
                  {/if}
                </div>
                <p class="text-white/70 text-sm lg:text-base">{currentDay.subtitle}</p>
              </div>
              
              <div class="grid grid-cols-1 gap-8 lg:gap-12 items-center">
                <!-- Copy -->
                <div class="border-l border-white/10 pl-6">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] mb-4 relative after:content-[''] after:block after:w-20 after:h-[3px] after:bg-white/25 after:rounded after:mt-3">
                  {t(currentLanguage, 'app.welcomeTitle')}
                </h2>
                
                <div class="mt-4 mb-6">
                  <button
                    on:click={() => handleDayChange(courseData[1])}
                    class="px-5 sm:px-6 lg:px-7 py-3 sm:py-4 lg:py-4.5 text-sm sm:text-base font-bold text-white rounded shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:brightness-110 relative overflow-hidden group border"
                    style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <span class="relative z-10 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      {getJourneyButtonText()}
                    </span>
                  </button>
                </div>

                <div class="mt-10 mb-12">
                  <div class="grid grid-cols-1 gap-8">
                    <div class="relative overflow-hidden rounded p-6 lg:p-8 bg-cover bg-center bg-no-repeat ring-1 ring-white/10 w-full" style={`background-image: linear-gradient(to bottom right, rgba(0,68,75,0.65), rgba(0,68,75,0.75)), url('${introBg}')`}>
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
                        <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
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
                    class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group border"
                    style="background-color: #0C6E78; border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <span class="relative z-10">{getJourneyButtonText()}</span>
                  </button>
                </div>
                </div>
              </div>
            <div class="mt-10 pt-6 border-t border-white/10">
              <p class="uppercase tracking-wide text-white/80 text-xs sm:text-sm mb-2">{t(currentLanguage, 'app.howToUseTitle')}</p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo1')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo2')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo3')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo4')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo5')}</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="mt-2 inline-block w-2.5 h-2.5 rounded bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                  <span class="text-white/90">{t(currentLanguage, 'app.howTo6')}</span>
                </li>
              </ul>
            </div>
            </div>
          </div>
        {:else if currentView === 'day-intro'}
          {#key currentDay.id}
            <div class=" flex items-center justify-center p-2 sm:p-4 lg:p-10" transition:slide={{ duration: 400, easing: quintOut }}>
              <div class="w-full max-w-6xl mx-auto">
                <div class="mb-6 text-left">
                  <h1 class="text-2xl lg:text-3xl font-bold text-white mb-1">{currentDay.title}</h1>
                  <p class="text-white/70 text-sm lg:text-base">{currentDay.subtitle}</p>
                </div>
                
                <div class="grid grid-cols-1 gap-8 lg:gap-12 items-start">
                  <div class="border-l border-white/10 pl-6">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] mb-4">
                      {getDayIntro(currentLanguage, currentDay.id)?.title ?? ''}
                    </h2>
                    <div class="flex flex-wrap items-start gap-3 mb-3">
                      <span class="inline-flex items-start px-3 py-1 text-xs font-semibold rounded bg-white/15 border border-white/30 text-white/90">{t(currentLanguage, 'app.themeLabel', { theme: getDayIntro(currentLanguage, currentDay.id)?.theme ?? '' })}</span>
                      <span class="inline-flex items-start px-3 py-1 text-xs font-semibold rounded bg-white/15 border border-white/30 text-white/90">{t(currentLanguage, 'app.questionsLabel', { count: currentDay.questions.length })}</span>
                    </div>
                    {#if getDayImage(currentDay.id)}
                      <div class="relative w-3xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
                        {#if !dayIntroImageLoaded}
                          <div class="absolute inset-0 flex items-center justify-center bg-white/5 rounded ring-1 ring-white/10">
                            <svg class="w-8 h-8 animate-spin text-white/50" viewBox="0 0 24 24" aria-hidden="true">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                          </div>
                        {/if}
                        <img 
                          src={getDayImage(currentDay.id)} 
                          alt="{currentDay.title} illustration" 
                          class="w-full rounded ring-1 ring-white/10 transition-opacity duration-300 {dayIntroImageLoaded ? 'opacity-100' : 'opacity-0'}" 
                          loading="eager"
                          decoding="async"
                          on:load={() => dayIntroImageLoaded = true}
                        />
                      </div>
                    {/if}
                    
                    <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                      {getDayIntro(currentLanguage, currentDay.id)?.intro}
                    </p>
                    <p class="text-white/80 text-sm mb-6">{t(currentLanguage, 'app.dayIntroTip')}</p>
                  
                    <div class="flex gap-3 justify-start mb-6">
                      <button
                        on:click={() => currentView = 'questionnaire'}
                        class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group border"
                        style="background-color: #0C6E78; border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
                      >
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                        <span class="relative z-10">{getDayButtonText(currentDay.id)}</span>
                      </button>
                      
                      <!-- View Summary Button - Only show when day is 100% completed -->
                      {#if getDayStats(currentDay.id).progress === 100}
                        <button
                          on:click={() => { completedDay = currentDay; showCompletionPage = true; currentView = 'day-completion'; }}
                          class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-semibold text-white rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:brightness-110 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-xl flex items-center gap-2"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
{t(currentLanguage, 'summary.viewSummary')}
                        </button>
                      {/if}
                    </div>

                    <!-- Day Statistics -->
                    {#if getDayStats(currentDay.id).totalQuestions > 0}
                      {@const stats = getDayStats(currentDay.id)}
                      <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded p-4">
                        <h3 class="text-white font-semibold text-sm mb-3">{t(currentLanguage, 'app.dayStats')}</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div class="text-center">
                            <div class="text-2xl font-bold text-white">{stats.answeredQuestions}</div>
                            <div class="text-xs text-white/70">{t(currentLanguage, 'app.questionsAnswered')}</div>
                          </div>
                          <div class="text-center">
                            <div class="text-2xl font-bold text-white">{stats.progress}%</div>
                            <div class="text-xs text-white/70">{t(currentLanguage, 'app.progress')}</div>
                          </div>
                          <div class="text-center">
                            <div class="text-2xl font-bold text-white">{stats.totalWords}</div>
                            <div class="text-xs text-white/70">{t(currentLanguage, 'app.totalWords')}</div>
                          </div>
                          <div class="text-center">
                            <div class="text-2xl font-bold text-white">{stats.totalCharacters}</div>
                            <div class="text-xs text-white/70">{t(currentLanguage, 'app.totalCharacters')}</div>
                          </div>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/key}
        {:else if currentView === 'questionnaire'}
          {#key currentDay.id}
            <div transition:slide={{ duration: 500, easing: quintOut }}>
              <Questionnaire 
                {answersStore}
                {username}
                {profileId}
                {currentDay}
                {currentLanguage}
                onDayComplete={handleDayComplete}
                onShowAnswers={showAnswers}
              />
            </div>
          {/key}
        {:else if currentView === 'view-answers'}
          {#key currentDay.id}
            <div transition:slide={{ duration: 500, easing: quintOut }}>
              <ViewAnswers 
                answers={$answersStore[currentDay.id] || []} 
                {username}
                {currentDay}
                {currentLanguage}
                onBack={backToQuestionnaire}
                onUpdateAnswer={(index, answer) => handleUpdateAnswer(currentDay.id, index, answer)}
              />
            </div>
          {/key}
        {:else if currentView === 'day-completion' && completedDay}
          {#key completedDay.id}
            <div transition:slide={{ duration: 500, easing: quintOut }}>
              <!-- Day Completion Page -->
              <div class="min-h-screen p-6">
                <div class="max-w-6xl mx-auto">
                  <!-- Back to Questionnaire Button - Top Left -->
                  <div class="mb-4">
                    <button
                      on:click={() => { currentView = 'questionnaire'; }}
                      class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/30 hover:border-white/50 backdrop-blur-xl flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
{t(currentLanguage, 'summary.goBackToQuestionnaire')}
                    </button>
                  </div>
                  
                  <!-- Page Header Container -->
                  <div class="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <!-- Day Summary Title -->
                    <div class="text-2xl font-bold text-white text-center sm:text-left">
{t(currentLanguage, 'summary.daySummaryTitle', { day: courseData.findIndex(day => day.id === completedDay.id) })}
                    </div>
                    
                    <!-- Download Button -->
                    <button
                      on:click={downloadDayPDF}
                      class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/30 hover:border-white/50 backdrop-blur-xl flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
{t(currentLanguage, 'summary.downloadDaySummary', { day: courseData.findIndex(day => day.id === completedDay.id) })}
                    </button>
                  </div>

                  <!-- Congratulations Section -->
                  <div class="text-center mb-8">
                    <!-- Success icon -->
                    <div class="w-16 h-16 bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    
                    <h1 class="text-3xl font-bold text-white mb-4">{t(currentLanguage, 'summary.congratulations')}</h1>
                    <p class="text-white/90 text-lg mb-3">{t(currentLanguage, 'summary.completedDay', { day: courseData.findIndex(day => day.id === completedDay.id) })}</p>
                    <h2 class="text-xl font-semibold text-white">{completedDay.subtitle}</h2>
                  </div>

                  <!-- Day Summary Stats -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {#if completedDay}
                      {@const dayAnswers = $answersStore[completedDay.id] || []}
                      {@const dayIndex = courseData.findIndex(day => day.id === completedDay.id)}
                      {@const answeredCount = dayAnswers.filter(answer => answer && answer.trim().length > 0).length}
                      {@const totalWords = dayAnswers.reduce((sum, answer) => {
                        if (!answer || answer.trim().length === 0) return sum;
                        return sum + answer.trim().split(/\s+/).length;
                      }, 0)}
                      {@const completionRate = Math.round((answeredCount / completedDay.questions.length) * 100)}
                      
                      <div class="bg-white/10 backdrop-blur-xl border border-white/30 p-6 text-center shadow-lg hover:bg-white/15 transition-all duration-300">
                        <div class="text-2xl font-bold text-white mb-2">{answeredCount}/{completedDay.questions.length}</div>
                        <p class="text-white/70 text-sm">{t(currentLanguage, 'summary.questionsAnswered')}</p>
                      </div>
                      
                      <div class="bg-white/10 backdrop-blur-xl border border-white/30 p-6 text-center shadow-lg hover:bg-white/15 transition-all duration-300">
                        <div class="text-2xl font-bold text-white mb-2">{totalWords}</div>
                        <p class="text-white/70 text-sm">{t(currentLanguage, 'summary.wordsWritten')}</p>
                      </div>
                      
                      <div class="bg-white/10 backdrop-blur-xl border border-white/30 p-6 text-center shadow-lg hover:bg-white/15 transition-all duration-300">
                        <div class="text-2xl font-bold text-white mb-2">{completionRate}%</div>
                        <p class="text-white/70 text-sm">{t(currentLanguage, 'summary.completionRate')}</p>
                      </div>
                    {/if}
                  </div>

                  <!-- Day Summary -->
                  <div class="bg-white/10 backdrop-blur-xl border border-white/30 p-6 mb-8 shadow-lg">
                    <h3 class="text-lg font-semibold text-white mb-4">{t(currentLanguage, 'summary.daySummary')}</h3>
                    <p class="text-white/80 leading-relaxed text-base">
                      {@html t(currentLanguage, 'summary.daySummaryText', { 
                        day: courseData.findIndex(day => day.id === completedDay.id),
                        theme: `<strong class="text-white">${completedDay.subtitle}</strong>`
                      })}
                    </p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                    <!-- Go to Dashboard - Left -->
                    <button
                      on:click={goToDashboard}
                      class="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all duration-300 border border-white/30 hover:border-white/50 backdrop-blur-xl flex items-center justify-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
{t(currentLanguage, 'summary.goToDashboard')}
                    </button>
                    
                    <!-- Continue to Next Day - Right -->
                    {#if courseData.findIndex(day => day.id === completedDay.id) < courseData.length - 1}
                      <button
                        on:click={continueToNextDay}
                        class="flex-1 px-6 py-3 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:brightness-110 relative overflow-hidden group border"
                        style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
                      >
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                        <span class="relative z-10">{t(currentLanguage, 'summary.continueToNextDay', { nextDay: courseData.findIndex(day => day.id === completedDay.id) + 1 })}</span>
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
              
              <!-- Answers Section -->
              <div class="mt-12">
                <ViewAnswers 
                  answers={$answersStore[completedDay.id] || []} 
                  {username}
                  currentDay={completedDay}
                  {currentLanguage}
                  onBack={() => { currentView = 'questionnaire'; }}
                  onUpdateAnswer={(index, answer) => handleUpdateAnswer(completedDay.id, index, answer)}
                />
              </div>
              
              <!-- Scroll to Top Button -->
              <div class="flex justify-center mt-12 mb-8">
                <button
                  on:click={() => {
                    // Find the main content container with overflow-y-auto
                    const mainContainer = document.querySelector('.fixed.top-16.bottom-0.right-0.overflow-y-auto');
                    if (mainContainer) {
                      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      // Fallback to window scrolling
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/30 hover:border-white/50 backdrop-blur-xl flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  Scroll to Top
                </button>
              </div>
            </div>
          {/key}
          {/if}
        </div>
      </div>


  <!-- Settings Modal -->
  {#if showSettings}
    <Settings 
      {username}
      email={currentUser?.email}
      {currentLanguage}
      nameSaveStatus={nameSaveStatus}
      on:close={() => showSettings = false}
      on:logout={logout}
      on:changePassword={handleChangePassword}
      on:changeName={handleChangeName}
      on:deleteAllData={handleDeleteAllData}
      on:deleteProfile={handleDeleteProfile}
      on:changeLanguage={handleChangeLanguage}
    />
  {/if}

</main>

