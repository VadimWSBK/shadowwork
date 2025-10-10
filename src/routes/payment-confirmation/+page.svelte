<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import logo from '../../assets/logo_shadowwork.png';
  
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let languageMenuOpen = false;
  let email = '';
  let resendLoading = false;
  let resendMessage = '';
  let resendSuccess = false;
  
  onMount(() => {
    // Get email from URL parameters (passed from Stripe)
    const urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email') || '';
    
    // Load saved language
    const savedLanguage = localStorage.getItem('shadowwork_language') as 'en' | 'de' | 'pl' | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'pl')) {
      currentLanguage = savedLanguage;
    }
  });
  
  function changeLanguage(lang: 'en' | 'de' | 'pl') {
    currentLanguage = lang;
    localStorage.setItem('shadowwork_language', lang);
    languageMenuOpen = false;
  }
  
  async function resendInvite() {
    if (!email) {
      resendMessage = 'Email address not found. Please contact support.';
      return;
    }
    
    resendLoading = true;
    resendMessage = '';
    
    try {
      const response = await fetch('/api/resend-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        resendSuccess = true;
        resendMessage = getTranslation('resendSuccess');
      } else {
        resendSuccess = false;
        resendMessage = result.error || getTranslation('resendError');
      }
    } catch (error) {
      resendSuccess = false;
      resendMessage = getTranslation('resendError');
    }
    
    resendLoading = false;
  }
  
  function getTranslation(key: string): string {
    const translations = {
      en: {
        title: 'Payment Successful!',
        subtitle: 'Welcome to your Shadow Work Journey',
        confirmationMessage: 'Thank you for your purchase! We\'ve sent your course invitation to:',
        inviteSent: 'Your invitation has been sent to your email address. Please check your inbox and spam folder.',
        nextSteps: 'What happens next?',
        step1: 'Check your email for an invitation link',
        step2: 'Click the link to create your account',
        step3: 'Start your 7-day shadow work journey',
        resendButton: 'Resend Invitation',
        resendSuccess: 'Invitation sent successfully! Please check your email.',
        resendError: 'Failed to send invitation. Please contact support.',
        contactTitle: 'Need Help?',
        contactMessage: 'If you don\'t receive the invitation within 15 minutes, please contact us:',
        emailSupport: 'Email Support',
        goToSales: 'Back to Course Info',
        checkEmail: 'Check Your Email'
      },
      de: {
        title: 'Zahlung erfolgreich!',
        subtitle: 'Willkommen zu Ihrer Shadow Work Journey',
        confirmationMessage: 'Vielen Dank für Ihren Kauf! Wir haben Ihre Kurseinladung gesendet an:',
        inviteSent: 'Ihre Einladung wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang und Spam-Ordner.',
        nextSteps: 'Was passiert als nächstes?',
        step1: 'Überprüfen Sie Ihre E-Mail auf einen Einladungslink',
        step2: 'Klicken Sie auf den Link, um Ihr Konto zu erstellen',
        step3: 'Beginnen Sie Ihre 7-tägige Shadow Work Journey',
        resendButton: 'Einladung erneut senden',
        resendSuccess: 'Einladung erfolgreich gesendet! Bitte überprüfen Sie Ihre E-Mail.',
        resendError: 'Einladung konnte nicht gesendet werden. Bitte kontaktieren Sie den Support.',
        contactTitle: 'Brauchen Sie Hilfe?',
        contactMessage: 'Falls Sie die Einladung nicht innerhalb von 15 Minuten erhalten, kontaktieren Sie uns bitte:',
        emailSupport: 'E-Mail Support',
        goToSales: 'Zurück zur Kursinfo',
        checkEmail: 'E-Mail überprüfen'
      },
      pl: {
        title: 'Płatność udana!',
        subtitle: 'Witamy w Twojej Shadow Work Journey',
        confirmationMessage: 'Dziękujemy za zakup! Wysłaliśmy zaproszenie do kursu na adres:',
        inviteSent: 'Zaproszenie zostało wysłane na Twój adres e-mail. Sprawdź swoją skrzynkę odbiorczą i folder spam.',
        nextSteps: 'Co dalej?',
        step1: 'Sprawdź swoją pocztę e-mail pod kątem linku zaproszenia',
        step2: 'Kliknij link, aby utworzyć swoje konto',
        step3: 'Rozpocznij swoją 7-dniową podróż shadow work',
        resendButton: 'Wyślij ponownie zaproszenie',
        resendSuccess: 'Zaproszenie wysłane pomyślnie! Sprawdź swoją pocztę e-mail.',
        resendError: 'Nie udało się wysłać zaproszenia. Skontaktuj się z pomocą techniczną.',
        contactTitle: 'Potrzebujesz pomocy?',
        contactMessage: 'Jeśli nie otrzymasz zaproszenia w ciągu 15 minut, skontaktuj się z nami:',
        emailSupport: 'Wsparcie e-mail',
        goToSales: 'Powrót do informacji o kursie',
        checkEmail: 'Sprawdź swoją pocztę e-mail'
      }
    };
    
    return translations[currentLanguage][key] || translations.en[key];
  }
</script>

<svelte:head>
  <title>Payment Confirmation - Shadow Work Journey</title>
  <meta name="description" content="Your payment was successful. Check your email for your course invitation." />
</svelte:head>

<div class="min-h-screen">
  <!-- Navigation Header -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-12">
        <div class="flex items-center gap-2">
          <img src={logo} alt="Shadow Work" class="opacity-90" style="height: 20px; width: auto;" />
          <span class="text-white font-bold text-lg">Shadow Work Journey</span>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Language Selector -->
          <div class="relative">
            <button
              class="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-white/15 border border-white/30 text-white/90"
              on:click={() => (languageMenuOpen = !languageMenuOpen)}
              title="Change language"
            >
              {currentLanguage.toUpperCase()}
            </button>
            {#if languageMenuOpen}
              <div class="absolute right-0 mt-2 min-w-[9rem] bg-white/15 border border-white/30 shadow-lg backdrop-blur-md p-1">
                <button class="w-full text-left px-3 py-2 text-sm hover:bg-white/20 text-white {currentLanguage==='en' ? 'bg-white/10' : ''}" on:click={() => changeLanguage('en')}>
                  English
                </button>
                <button class="w-full text-left px-3 py-2 text-sm hover:bg-white/20 text-white {currentLanguage==='de' ? 'bg-white/10' : ''}" on:click={() => changeLanguage('de')}>
                  Deutsch
                </button>
                <button class="w-full text-left px-3 py-2 text-sm hover:bg-white/20 text-white {currentLanguage==='pl' ? 'bg-white/10' : ''}" on:click={() => changeLanguage('pl')}>
                  Polski
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Success Icon -->
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-primary">
          {getTranslation('title')}
        </h1>
        
        <p class="text-xl text-white/80 mb-8 font-secondary">
          {getTranslation('subtitle')}
        </p>
      </div>

      <!-- Confirmation Message -->
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8">
        <div class="text-center">
          <p class="text-lg text-white/90 mb-4">
            {getTranslation('confirmationMessage')}
          </p>
          
          {#if email}
            <div class="inline-flex items-center px-4 py-2 bg-white/10 border border-white/30 text-white font-mono text-lg">
              {email}
            </div>
          {/if}
          
          <p class="text-white/80 mt-6">
            {getTranslation('inviteSent')}
          </p>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8">
        <h2 class="text-2xl font-bold text-white mb-6 text-center font-primary">
          {getTranslation('nextSteps')}
        </h2>
        
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center">
              <span class="text-accent font-bold text-sm">1</span>
            </div>
            <p class="text-white/90 text-lg font-secondary">{getTranslation('step1')}</p>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center">
              <span class="text-accent font-bold text-sm">2</span>
            </div>
            <p class="text-white/90 text-lg font-secondary">{getTranslation('step2')}</p>
          </div>
          
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center">
              <span class="text-accent font-bold text-sm">3</span>
            </div>
            <p class="text-white/90 text-lg font-secondary">{getTranslation('step3')}</p>
          </div>
        </div>
      </div>

      <!-- Resend Invitation -->
      {#if email}
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8">
          <div class="text-center">
            <h3 class="text-xl font-bold text-white mb-4 font-primary">
              {getTranslation('resendButton')}
            </h3>
            
            <p class="text-white/80 mb-6">
              Didn't receive the email? We can send it again.
            </p>
            
            <button
              on:click={resendInvite}
              disabled={resendLoading}
              class="inline-flex items-center px-6 py-3 text-white font-semibold border border-white/30 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if resendLoading}
                <svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" opacity="0.75"/>
                </svg>
              {/if}
              {getTranslation('resendButton')}
            </button>
            
            {#if resendMessage}
              <p class="mt-4 text-sm {resendSuccess ? 'text-green-400' : 'text-red-400'}">
                {resendMessage}
              </p>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Contact Support -->
      <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8">
        <h3 class="text-xl font-bold text-white mb-4 text-center font-primary">
          {getTranslation('contactTitle')}
        </h3>
        
        <div class="text-center">
          <p class="text-white/80 mb-6">
            {getTranslation('contactMessage')}
          </p>
          
          <div class="space-y-4">
            <a
              href="mailto:support@shadowworkjourney.com"
              class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {getTranslation('emailSupport')}
            </a>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/sales"
          class="px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all duration-200 text-center"
        >
          {getTranslation('goToSales')}
        </a>
        
        <a
          href="mailto:{email}"
          class="px-6 py-3 text-white font-semibold border-2 transition-all duration-300 hover:brightness-110 text-center"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-color: #D4AF37;"
        >
          {getTranslation('checkEmail')}
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Ensure square corners for all elements */
  * {
    border-radius: 0 !important;
  }
</style>
