<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t, type Language } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  let currentLanguage: Language = 'en';
  
  // Get the 'from' query parameter, default to '/dashboard'
  $: backUrl = $page.url.searchParams.get('from') || '/dashboard';
  
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
      on:click={() => goto(backUrl)}
      class="mb-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      {backUrl === '/dashboard' ? t(currentLanguage, 'pages.backToDashboard') : t(currentLanguage, 'pages.back')}
    </button>
    
    <!-- Content Card -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl p-8">
      <h1 class="text-4xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'pages.disclaimer')}</h1>
      <p class="text-white/60 text-sm mb-8">{t(currentLanguage, 'pages.lastUpdated', { date: getFormattedDate() })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <!-- Important Notice -->
        <div class="bg-blue-500/10 border border-blue-400/30 rounded p-6 my-6">
          <div class="flex items-start gap-3">
            <svg class="w-8 h-8 text-blue-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="text-xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'disclaimer.important.title')}</h3>
              <p class="text-white/90 leading-relaxed">
                {t(currentLanguage, 'disclaimer.important.content')}
              </p>
            </div>
          </div>
        </div>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section1.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section1.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section1.medical')}</li>
            <li>{t(currentLanguage, 'disclaimer.section1.therapy')}</li>
            <li>{t(currentLanguage, 'disclaimer.section1.crisis')}</li>
            <li>{t(currentLanguage, 'disclaimer.section1.professional')}</li>
          </ul>
          <p class="leading-relaxed mt-3">
            {t(currentLanguage, 'disclaimer.section1.creators')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section2.title')}</h2>
          <p class="leading-relaxed">
            <strong>{t(currentLanguage, 'disclaimer.section2.intro')}</strong>
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section2.condition')}</li>
            <li>{t(currentLanguage, 'disclaimer.section2.therapy')}</li>
            <li>{t(currentLanguage, 'disclaimer.section2.trauma')}</li>
            <li>{t(currentLanguage, 'disclaimer.section2.suicidal')}</li>
            <li>{t(currentLanguage, 'disclaimer.section2.history')}</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>{t(currentLanguage, 'disclaimer.section2.consult')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section3.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section3.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section3.severe')}</li>
            <li>{t(currentLanguage, 'disclaimer.section3.harm')}</li>
            <li>{t(currentLanguage, 'disclaimer.section3.crisis')}</li>
            <li>{t(currentLanguage, 'disclaimer.section3.overwhelmed')}</li>
            <li>{t(currentLanguage, 'disclaimer.section3.guidance')}</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>{t(currentLanguage, 'disclaimer.section3.emergency')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section4.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section4.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section4.emotions')}</li>
            <li>{t(currentLanguage, 'disclaimer.section4.memories')}</li>
            <li>{t(currentLanguage, 'disclaimer.section4.discomfort')}</li>
            <li>{t(currentLanguage, 'disclaimer.section4.awareness')}</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>{t(currentLanguage, 'disclaimer.section4.breaks')}</strong>
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section5.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section5.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section5.outcomes')}</li>
            <li>{t(currentLanguage, 'disclaimer.section5.improvement')}</li>
            <li>{t(currentLanguage, 'disclaimer.section5.resolution')}</li>
            <li>{t(currentLanguage, 'disclaimer.section5.goals')}</li>
          </ul>
          <p class="leading-relaxed mt-3">
            {t(currentLanguage, 'disclaimer.section5.variation')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section6.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section6.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section6.replace')}</li>
            <li>{t(currentLanguage, 'disclaimer.section6.diagnose')}</li>
            <li>{t(currentLanguage, 'disclaimer.section6.personalized')}</li>
            <li>{t(currentLanguage, 'disclaimer.section6.relationship')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section7.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section7.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section7.responsible')}</li>
            <li>{t(currentLanguage, 'disclaimer.section7.seek')}</li>
            <li>{t(currentLanguage, 'disclaimer.section7.limitations')}</li>
            <li>{t(currentLanguage, 'disclaimer.section7.rely')}</li>
            <li>{t(currentLanguage, 'disclaimer.section7.stop')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section8.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section8.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section9.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section9.intro')}
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>{t(currentLanguage, 'disclaimer.section9.distress')}</li>
            <li>{t(currentLanguage, 'disclaimer.section9.actions')}</li>
            <li>{t(currentLanguage, 'disclaimer.section9.damages')}</li>
            <li>{t(currentLanguage, 'disclaimer.section9.injury')}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section10.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section10.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section11.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section11.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section12.title')}</h2>
          <p class="leading-relaxed font-semibold">
            {t(currentLanguage, 'disclaimer.section12.content')}
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3 font-primary">{t(currentLanguage, 'disclaimer.section13.title')}</h2>
          <p class="leading-relaxed">
            {t(currentLanguage, 'disclaimer.section13.intro')}
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>{t(currentLanguage, 'disclaimer.section13.email')}</strong></li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

