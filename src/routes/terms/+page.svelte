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
      <h1 class="text-4xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'pages.termsOfService')}</h1>
      <p class="text-white/60 text-sm mb-8">{t(currentLanguage, 'pages.lastUpdated', { date: getFormattedDate() })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section1.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section1.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section2.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section2.intro')}
          </p>
          <p class="leading-relaxed mt-2">
            <strong>{t(currentLanguage, 'terms.section2.important')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section3.title')}</h2>
          <p class="leading-relaxed">{t(currentLanguage, 'terms.section3.intro')}</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'terms.section3.age')}</li>
            <li>{t(currentLanguage, 'terms.section3.registration')}</li>
            <li>{t(currentLanguage, 'terms.section3.security')}</li>
            <li>{t(currentLanguage, 'terms.section3.notify')}</li>
          </ul>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section3.responsibility')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section4.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section4.intro')}
          </p>
          <p class="leading-relaxed mt-2">
            <strong>{t(currentLanguage, 'terms.section4.refund')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section5.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section5.intro')}
          </p>
          <p class="leading-relaxed mt-2">{t(currentLanguage, 'terms.section5.prohibited')}</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'terms.section5.reproduce')}</li>
            <li>{t(currentLanguage, 'terms.section5.derivative')}</li>
            <li>{t(currentLanguage, 'terms.section5.commercial')}</li>
            <li>{t(currentLanguage, 'terms.section5.reverse')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section6.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section6.intro')}
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section6.privacy')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section7.title')}</h2>
          <p class="leading-relaxed">{t(currentLanguage, 'terms.section7.intro')}</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'terms.section7.illegal')}</li>
            <li>{t(currentLanguage, 'terms.section7.unauthorized')}</li>
            <li>{t(currentLanguage, 'terms.section7.interfere')}</li>
            <li>{t(currentLanguage, 'terms.section7.automated')}</li>
            <li>{t(currentLanguage, 'terms.section7.impersonate')}</li>
            <li>{t(currentLanguage, 'terms.section7.viruses')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section8.title')}</h2>
          <p class="leading-relaxed font-semibold">
            {t(currentLanguage, 'terms.section8.important')}
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section8.educational')}
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section8.emergency')}
          </p>
          <ul class="list-disc pl-6 space-y-1 mt-2">
            <li>{t(currentLanguage, 'terms.section8.us')}</li>
            <li>{t(currentLanguage, 'terms.section8.international')}: <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" class="text-[#0C6E78] hover:text-white underline">findahelpline.com</a></li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section9.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section9.intro')}
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section9.limit')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section10.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section10.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'terms.section10.uninterrupted')}</li>
            <li>{t(currentLanguage, 'terms.section10.defects')}</li>
            <li>{t(currentLanguage, 'terms.section10.viruses')}</li>
            <li>{t(currentLanguage, 'terms.section10.results')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section11.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section11.intro')}
          </p>
          <p class="leading-relaxed mt-2">
            {t(currentLanguage, 'terms.section11.user')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section12.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section12.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section13.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section13.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'terms.section14.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'terms.section14.intro')}
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>{t(currentLanguage, 'terms.section14.email')}</strong></li>
            <li><strong>{t(currentLanguage, 'terms.section14.address')}</strong></li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

