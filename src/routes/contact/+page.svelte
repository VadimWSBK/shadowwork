<script lang="ts">
  import { goto } from '$app/navigation';
  import { t, type Language } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  };
  
  let isSubmitting = false;
  let submitStatus = '';
  let errors: Record<string, string> = {};
  let currentLanguage: Language = 'en';
  
  let categories: Array<{ value: string; label: string }> = [];
  
  function updateCategories() {
    categories = [
      { value: 'general', label: t(currentLanguage, 'contact.form.categories.general') },
      { value: 'technical', label: t(currentLanguage, 'contact.form.categories.technical') },
      { value: 'billing', label: t(currentLanguage, 'contact.form.categories.billing') },
      { value: 'privacy', label: t(currentLanguage, 'contact.form.categories.privacy') },
      { value: 'course', label: t(currentLanguage, 'contact.form.categories.course') },
      { value: 'other', label: t(currentLanguage, 'contact.form.categories.other') }
    ];
  }
  
  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t(currentLanguage, 'contact.form.errors.nameRequired');
    }
    
    if (!formData.email.trim()) {
      errors.email = t(currentLanguage, 'contact.form.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t(currentLanguage, 'contact.form.errors.emailInvalid');
    }
    
    if (!formData.subject.trim()) {
      errors.subject = t(currentLanguage, 'contact.form.errors.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      errors.message = t(currentLanguage, 'contact.form.errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      errors.message = t(currentLanguage, 'contact.form.errors.messageTooShort');
    }
    
    return Object.keys(errors).length === 0;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    isSubmitting = true;
    submitStatus = '';
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      submitStatus = 'success';
      formData = { name: '', email: '', subject: '', message: '', category: 'general' };
      
      // In a real app, you would send this to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
    } catch (error) {
      submitStatus = 'error';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  function resetForm() {
    formData = { name: '', email: '', subject: '', message: '', category: 'general' };
    errors = {};
    submitStatus = '';
  }
  
  function checkLanguage() {
    const savedLanguage = localStorage.getItem('shadowwork_language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'pl')) {
      if (savedLanguage !== currentLanguage) {
        currentLanguage = savedLanguage;
        updateCategories();
      }
    }
  }
  
  onMount(() => {
    checkLanguage();
    updateCategories();
    
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
    
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-white mb-4 font-primary">{t(currentLanguage, 'contact.title')}</h1>
      <p class="text-white/70 text-lg">{t(currentLanguage, 'contact.subtitle')}</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl p-8">
          
          <!-- Success Message -->
          {#if submitStatus === 'success'}
            <div class="bg-green-500/10 border border-green-400/30 rounded p-6 mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2 font-primary">{t(currentLanguage, 'contact.form.success.title')}</h3>
                  <p class="text-white/80">
                    {t(currentLanguage, 'contact.form.success.message')}
                  </p>
                  <button 
                    on:click={resetForm}
                    class="mt-3 text-green-300 hover:text-white underline text-sm"
                  >
                    {t(currentLanguage, 'contact.form.success.sendAnother')}
                  </button>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Error Message -->
          {#if submitStatus === 'error'}
            <div class="bg-red-500/10 border border-red-400/30 rounded p-6 mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-6 h-6 text-red-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3l-6.928-12c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2 font-primary">{t(currentLanguage, 'contact.form.error.title')}</h3>
                  <p class="text-white/80">
                    {t(currentLanguage, 'contact.form.error.message')}
                  </p>
                </div>
              </div>
            </div>
          {/if}
          
          <form on:submit={handleSubmit} class="space-y-6">
            
            <!-- Name -->
            <div>
              <label for="name" class="block text-white font-medium mb-2">{t(currentLanguage, 'contact.form.name')} *</label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent {errors.name ? 'border-red-400' : ''}"
                placeholder={t(currentLanguage, 'contact.form.placeholders.name')}
              />
              {#if errors.name}
                <p class="text-red-400 text-sm mt-1">{errors.name}</p>
              {/if}
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-white font-medium mb-2">{t(currentLanguage, 'contact.form.email')} *</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent {errors.email ? 'border-red-400' : ''}"
                placeholder={t(currentLanguage, 'contact.form.placeholders.email')}
              />
              {#if errors.email}
                <p class="text-red-400 text-sm mt-1">{errors.email}</p>
              {/if}
            </div>
            
            <!-- Category -->
            <div>
              <label for="category" class="block text-white font-medium mb-2">{t(currentLanguage, 'contact.form.category')}</label>
              <select
                id="category"
                bind:value={formData.category}
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent"
              >
                {#each categories as category}
                  <option value={category.value} class="bg-[#004D56] text-white">{category.label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Subject -->
            <div>
              <label for="subject" class="block text-white font-medium mb-2">{t(currentLanguage, 'contact.form.subject')} *</label>
              <input
                type="text"
                id="subject"
                bind:value={formData.subject}
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent {errors.subject ? 'border-red-400' : ''}"
                placeholder={t(currentLanguage, 'contact.form.placeholders.subject')}
              />
              {#if errors.subject}
                <p class="text-red-400 text-sm mt-1">{errors.subject}</p>
              {/if}
            </div>
            
            <!-- Message -->
            <div>
              <label for="message" class="block text-white font-medium mb-2">{t(currentLanguage, 'contact.form.message')} *</label>
              <textarea
                id="message"
                bind:value={formData.message}
                rows="6"
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent resize-vertical {errors.message ? 'border-red-400' : ''}"
                placeholder={t(currentLanguage, 'contact.form.placeholders.message')}
              ></textarea>
              {#if errors.message}
                <p class="text-red-400 text-sm mt-1">{errors.message}</p>
              {/if}
              <p class="text-white/50 text-sm mt-1">{formData.message.length} {t(currentLanguage, 'contact.form.characters')}</p>
            </div>
            
            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full bg-[#0C6E78] hover:bg-[#0a5a61] disabled:bg-white/20 disabled:cursor-not-allowed text-white px-6 py-4 rounded font-medium transition-colors flex items-center justify-center gap-2"
              >
                {#if isSubmitting}
                  <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  {t(currentLanguage, 'contact.form.sendingMessage')}
                {:else}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  {t(currentLanguage, 'contact.form.sendMessage')}
                {/if}
              </button>
            </div>
            
          </form>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div class="space-y-6">
        
        <!-- Response Time -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6">
          <h3 class="text-lg font-semibold text-white mb-3 font-primary">{t(currentLanguage, 'contact.info.responseTime.title')}</h3>
          <p class="text-white/70 text-sm leading-relaxed">
            {t(currentLanguage, 'contact.info.responseTime.message')}
          </p>
        </div>
        
        <!-- Alternative Contact -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6">
          <h3 class="text-lg font-semibold text-white mb-3 font-primary">{t(currentLanguage, 'contact.info.alternativeContact.title')}</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-3 text-white/70">
              <svg class="w-4 h-4 text-[#0C6E78]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:support@shadowwork.com" class="hover:text-white transition-colors">support@shadowwork.com</a>
            </div>
          </div>
        </div>
        
        <!-- FAQ Link -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6">
          <h3 class="text-lg font-semibold text-white mb-3 font-primary">{t(currentLanguage, 'contact.info.quickHelp.title')}</h3>
          <p class="text-white/70 text-sm mb-3">
            {t(currentLanguage, 'contact.info.quickHelp.message')}
          </p>
          <a 
            href="/faq" 
            class="inline-flex items-center gap-2 text-[#0C6E78] hover:text-white transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {t(currentLanguage, 'contact.info.quickHelp.browseFaq')}
          </a>
        </div>
        
        <!-- Privacy Notice -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6">
          <h3 class="text-lg font-semibold text-white mb-3 font-primary">{t(currentLanguage, 'contact.info.privacy.title')}</h3>
          <p class="text-white/70 text-sm leading-relaxed">
            {t(currentLanguage, 'contact.info.privacy.message')}
          </p>
        </div>
        
      </div>
      
    </div>
    
  </div>
</div>
