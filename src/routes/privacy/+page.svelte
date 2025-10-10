<script lang="ts">
  import { goto } from '$app/navigation';
  import { t, type Language } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  let currentLanguage: Language = 'en';
  
  function checkLanguage() {
    const savedLanguage = localStorage.getItem('shadowwork_language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'pl')) {
      if (savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
      }
    }
  }
  
  onMount(() => {
    checkLanguage();
    
    // Check for language changes when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkLanguage();
      }
    };
    
    // Check for language changes periodically (every 500ms)
    const languageCheckInterval = setInterval(checkLanguage, 500);
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(languageCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
  
  function getFormattedDate() {
    const date = new Date();
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage === 'de' ? 'de-DE' : 'pl-PL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-[#004D56] via-[#00444B] to-[#003B41] p-4 sm:p-6 lg:p-8">
  <div class="max-w-4xl mx-auto">
    
    <!-- Back Button -->
    <button 
      on:click={() => goto('/dashboard')}
      class="mb-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      {t(currentLanguage, 'pages.backToDashboard')}
    </button>
    
    <!-- Content Card -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl p-8">
      <h1 class="text-4xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'pages.privacyPolicy')}</h1>
      <p class="text-white/60 text-sm mb-8">{t(currentLanguage, 'pages.lastUpdated', { date: getFormattedDate() })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section1.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section1.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>{t(currentLanguage, 'privacy.section1.accountInfo')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section1.courseData')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section1.technicalData')}</strong></li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section2.title')}</h2>
          <p class="leading-relaxed">{t(currentLanguage, 'privacy.section2.intro')}</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'privacy.section2.provide')}</li>
            <li>{t(currentLanguage, 'privacy.section2.save')}</li>
            <li>{t(currentLanguage, 'privacy.section2.notify')}</li>
            <li>{t(currentLanguage, 'privacy.section2.improve')}</li>
            <li>{t(currentLanguage, 'privacy.section2.security')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section3.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section3.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'privacy.section3.encrypted')}</li>
            <li>{t(currentLanguage, 'privacy.section3.passwords')}</li>
            <li>{t(currentLanguage, 'privacy.section3.supabase')}</li>
            <li>{t(currentLanguage, 'privacy.section3.audits')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section4.title')}</h2>
          <p class="leading-relaxed">
            <strong>{t(currentLanguage, 'privacy.section4.noSharing')}</strong>
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'privacy.section4.limited')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>{t(currentLanguage, 'privacy.section4.providers')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section4.legal')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section4.consent')}</strong></li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section5.title')}</h2>
          <p class="leading-relaxed">{t(currentLanguage, 'privacy.section5.intro')}</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>{t(currentLanguage, 'privacy.section5.access')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section5.rectification')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section5.erasure')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section5.portability')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section5.objection')}</strong></li>
          </ul>
          <p class="leading-relaxed mt-3">
            {t(currentLanguage, 'privacy.section5.contact')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section6.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section6.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>{t(currentLanguage, 'privacy.section6.immediate')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section6.noRecovery')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section6.noBackup')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section6.complete')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section6.noPurging')}</strong></li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>{t(currentLanguage, 'privacy.section6.important')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section7.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section7.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>{t(currentLanguage, 'privacy.section7.auth')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section7.preferences')}</strong></li>
          </ul>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'privacy.section7.noTracking')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section8.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section8.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section9.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section9.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section10.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section10.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'privacy.section11.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'privacy.section11.intro')}
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>{t(currentLanguage, 'privacy.section11.email')}</strong></li>
            <li><strong>{t(currentLanguage, 'privacy.section11.address')}</strong></li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

