<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import introBg from '../../assets/shadowwork_bg_intro.webp';
  import dashboardImg from '../../assets/ShadowWorkCourse_Dashboard.webp';
  import logo from '../../assets/LOGO_SELF_COACHING_TOOLS.svg';
  import day1Img from '../../assets/Day_Images/shadowwork_day_1.webp';
  import day2Img from '../../assets/Day_Images/shadowwork_day_2.webp';
  import day3Img from '../../assets/Day_Images/shadowwork_day_3.webp';
  import day4Img from '../../assets/Day_Images/shadowwork_day_4.webp';
  import day5Img from '../../assets/Day_Images/shadowwork_day_5.webp';
  import day6Img from '../../assets/Day_Images/shadowwork_day_6.webp';
  import day7Img from '../../assets/Day_Images/shadowwork_day_7.webp';
  
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let languageMenuOpen = false;
  let currentSlide = 0;
  
  const courseDays = [
    {
      id: 'day1',
      number: 1,
      title: 'Meeting Your Inner World',
      theme: 'Awareness • Grounding',
      description: 'Begin your journey by gently noticing and naming your emotions. Learn to slow down, meet the parts of yourself you often overlook, and let honesty lead the way.',
      image: day1Img
    },
    {
      id: 'day2', 
      number: 2,
      title: 'Triggers and Reflections',
      theme: 'Relationships • Projection',
      description: 'Relationships are mirrors. Explore what triggers you and what these reactions reveal about hidden parts of yourself asking to be seen.',
      image: day2Img
    },
    {
      id: 'day3',
      number: 3, 
      title: 'Shame, Guilt & Core Beliefs',
      theme: 'Self-Beliefs • Inner Critic',
      description: 'Meet shame and guilt with kindness to create space for a truer story. Listen to your inner voice and update the beliefs that hold you back.',
      image: day3Img
    },
    {
      id: 'day4',
      number: 4,
      title: 'Early Patterns & Family Rules', 
      theme: 'Origins • Childhood',
      description: 'Trace the roles, rules, and unspoken messages from childhood that still echo today. Decide which patterns you want to keep and which to release.',
      image: day4Img
    },
    {
      id: 'day5',
      number: 5,
      title: 'Boundaries, Power & Energy',
      theme: 'Agency • Limits', 
      description: 'Power lives in clear boundaries. Explore anger, money beliefs, and the places where you want to stand taller and reclaim your energy.',
      image: day5Img
    },
    {
      id: 'day6',
      number: 6,
      title: 'Desires & The Golden Shadow',
      theme: 'Authenticity • Strengths',
      description: 'Your deepest desires are signals. Qualities you admire in others may already live within you. Reclaim hidden strengths and say yes to what you truly want.',
      image: day6Img
    },
    {
      id: 'day7',
      number: 7,
      title: 'Integration & Next Steps',
      theme: 'Wholeness • Commitment',
      description: 'Gather your insights, offer yourself forgiveness, and choose small, practical actions that help your growth continue beyond this course.',
      image: day7Img
    }
  ];
  
  function nextSlide() {
    // On desktop, move by 3 cards at a time, on mobile move by 1
    const maxSlide = window.innerWidth >= 1024 ? Math.max(0, courseDays.length - 3) : courseDays.length - 1;
    const increment = window.innerWidth >= 1024 ? 3 : 1;
    
    if (currentSlide < maxSlide) {
      currentSlide = Math.min(currentSlide + increment, maxSlide);
    }
  }
  
  function prevSlide() {
    const increment = window.innerWidth >= 1024 ? 3 : 1;
    
    if (currentSlide > 0) {
      currentSlide = Math.max(currentSlide - increment, 0);
    }
  }
  
  // Scroll to CTA
  function scrollToCTA() {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function handleGetStarted() {
    // Redirect to Stripe payment
    // Replace with your actual Stripe checkout URL
    window.location.href = 'https://buy.stripe.com/YOUR_STRIPE_CHECKOUT_URL';
  }

  onMount(() => {
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
</script>

<svelte:head>
  <title>Shadow Work Course - Transform Your Inner World in 7 Days</title>
  <meta name="description" content="Discover your hidden potential with our comprehensive 7-day shadow work journey. Now 90% off - only $27 (originally $297)." />
</svelte:head>

<div class="min-h-screen">
  <!-- SVG Gradient Definition (hidden, reusable) -->
  <svg class="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <linearGradient id="golden-gradient-svg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FBCA29;stop-opacity:1" />
        <stop offset="1%" style="stop-color:#EBD27B;stop-opacity:1" />
        <stop offset="15%" style="stop-color:#D7B860;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#E7CE77;stop-opacity:1" />
        <stop offset="30%" style="stop-color:#EBD27B;stop-opacity:1" />
        <stop offset="60%" style="stop-color:#C2922E;stop-opacity:1" />
        <stop offset="87%" style="stop-color:#D0B057;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#AB7B2A;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
  
  <!-- Header -->
  <header class="relative bg-gradient-to-r from-primary via-secondary to-primary-dark">
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-4">
          <button on:click={() => goto('/')} class="flex items-center space-x-3 group">
            <img src={logo} alt="Self Coaching Tools Logo" class="w-12 h-12 object-contain" />
            <div class="text-left">
              <h1 class="text-2xl font-bold text-white font-primary group-hover:text-accent transition-colors duration-200">Shadow Work Journey</h1>
            </div>
          </button>
        </div>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="/#courses" class="text-white/90 hover:text-white transition-colors duration-200 font-medium font-secondary">Courses</a>
          <a href="/#about" class="text-white/90 hover:text-white transition-colors duration-200 font-medium font-secondary">About</a>
          <a href="/contact" class="text-white/90 hover:text-white transition-colors duration-200 font-medium font-secondary">Contact</a>
        </nav>
        
        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="relative" role="button" tabindex="0" on:click={() => (languageMenuOpen = !languageMenuOpen)} on:keydown={(e) => e.key === 'Enter' && (languageMenuOpen = !languageMenuOpen)}>
            <button class="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 px-3 py-2 hover:bg-white/10">
              <span class="text-sm font-medium font-secondary">
                {currentLanguage === 'en' ? 'EN' : currentLanguage === 'de' ? 'DE' : 'PL'}
              </span>
              <svg class="w-4 h-4 transition-transform duration-200 {languageMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {#if languageMenuOpen}
              <div class="absolute right-0 mt-2 w-32 bg-white shadow-lg z-50">
                <div class="py-1">
                  <button on:click={() => changeLanguage('en')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'en' ? 'bg-primary/10 text-primary' : ''} font-secondary">
                    English
                  </button>
                  <button on:click={() => changeLanguage('de')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'de' ? 'bg-primary/10 text-primary' : ''} font-secondary">
                    Deutsch
                  </button>
                  <button on:click={() => changeLanguage('pl')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'pl' ? 'bg-primary/10 text-primary' : ''} font-secondary">
                    Polski
                  </button>
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Get Started Button -->
          <button 
            on:click={scrollToCTA}
            class="btn-primary golden-border px-6 py-2 font-medium font-primary"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-primary-light via-primary to-secondary-dark pt-16 pb-16 min-h-[600px] overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 opacity-10">
      <img src={introBg} alt="" class="w-full h-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-black/10"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
        <!-- Left side - Text content -->
        <div class="text-center lg:text-left">
          <!-- Limited Time Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-[#D4AF37]/60 text-white mb-6 shadow-lg">
            <svg class="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-semibold uppercase tracking-wide">Limited Time Offer</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold golden-shimmer font-primary mb-4 leading-tight">
            Stop Self-Sabotage and Unlock Your Full Potential Without Years of Therapy
          </h1>
          
          <p class="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 mb-6 font-secondary leading-relaxed">
            A 7-day guided journaling course that helps you uncover hidden patterns and finally become who you're meant to be.
          </p>
          
          <!-- Price Section -->
          <div class="flex flex-col lg:flex-row items-center lg:items-baseline gap-4 mb-6">
            <div class="flex items-baseline gap-3">
              <span class="text-white/60 text-2xl line-through font-secondary">$297</span>
              <span class="text-5xl font-bold font-primary golden-shimmer">$27</span>
            </div>
            <div class="inline-flex items-center px-4 py-2 bg-green-500/20 text-white">
              <span class="font-bold font-secondary">Save $270 Today - 90% OFF</span>
            </div>
          </div>
          
          <!-- Primary CTA -->
          <button
            on:click={handleGetStarted}
            class="btn-primary golden-border px-8 py-4 text-lg font-bold font-primary"
          >
            <span class="flex items-center gap-2">
              Get Instant Access For $27
              <svg class="w-5 h-5" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </button>
          
          <p class="text-white/70 text-sm mt-4 font-secondary">Instant access • Secure payment</p>
        </div>
        
        <!-- Right side - Dashboard image -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative max-w-2xl w-full">
            <img 
              src={dashboardImg} 
              alt="Shadow Work Course Dashboard" 
              class="w-full h-auto object-contain drop-shadow-2xl"
            />
            <!-- Optional overlay for better text contrast -->
            <div class="absolute inset-0 bg-gradient-to-l from-transparent to-primary/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- What You'll Discover Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-primary">
          What You'll Discover
        </h2>
        <p class="text-xl text-white/80 max-w-2xl mx-auto font-secondary">
          A structured 7-day journey designed to help you meet, understand, and integrate the hidden parts of yourself.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Benefit 1 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Emotional Awareness</h3>
          <p class="text-white/80 font-secondary">
            Learn to recognize and name your emotions, breaking free from unconscious patterns that control your reactions.
          </p>
        </div>
        
        <!-- Benefit 2 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Better Relationships</h3>
          <p class="text-white/80 font-secondary">
            Understand your triggers and projections to create healthier, more authentic connections with others.
          </p>
        </div>
        
        <!-- Benefit 3 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Self-Compassion</h3>
          <p class="text-white/80 font-secondary">
            Meet your shame and guilt with kindness, transforming your inner critic into a supportive inner voice.
          </p>
        </div>
        
        <!-- Benefit 4 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Stronger Boundaries</h3>
          <p class="text-white/80 font-secondary">
            Learn to honor your limits and reclaim your energy by setting clear, healthy boundaries.
          </p>
        </div>
        
        <!-- Benefit 5 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Reclaim Your Power</h3>
          <p class="text-white/80 font-secondary">
            Discover hidden strengths and desires you've projected onto others, bringing them back home to yourself.
          </p>
        </div>
        
        <!-- Benefit 6 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div class="w-12 h-12 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 golden-icon" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-2 font-primary">Break Free From Patterns</h3>
          <p class="text-white/80 font-secondary">
            Trace childhood conditioning and family dynamics to understand—and release—patterns that no longer serve you.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 7-Day Journey Carousel Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-primary">
          Your 7-Day Transformation Journey
        </h2>
        <p class="text-xl text-white/80 max-w-2xl mx-auto font-secondary">
          Each day focuses on a specific theme with carefully crafted questions to guide your inner exploration.
        </p>
      </div>
      
      <!-- Carousel Container -->
      <div class="relative">
        <div class="overflow-hidden px-4">
          <div 
            class="carousel-track flex transition-transform duration-500 ease-in-out gap-6"
            style="--slide-index: {currentSlide};"
          >
            {#each courseDays as day}
              <div class="w-full lg:w-1/3 flex-shrink-0">
                <div class="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col">
                  <!-- Image Container with Overlay -->
                  <div class="relative overflow-hidden">
                    <img 
                      src={day.image} 
                      alt="Day {day.number}" 
                      class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    <!-- Day Badge -->
                    <div class="absolute top-2 left-2 sm:top-4 sm:left-4">
                      <div class="btn-primary golden-border px-2 py-0.5 sm:px-3 sm:py-1 shadow-lg">
                        <span class="font-bold text-xs sm:text-sm tracking-wide">DAY {day.number}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="text-center space-y-3 p-6 flex-1 flex flex-col">
                    <h3 class="text-white font-bold text-lg lg:text-xl group-hover:text-accent transition-colors duration-300 font-primary">{day.title}</h3>
                    <div class="inline-flex items-center justify-center px-3 py-1 bg-white/10 border border-white/20 text-white/80 text-xs uppercase tracking-wider font-medium">
                      {day.theme}
                    </div>
                    <p class="text-white/80 text-sm lg:text-base leading-relaxed font-secondary flex-1">{day.description}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Navigation Controls (Arrows + Dots) -->
        <div class="flex justify-center items-center mt-8 gap-6">
          <!-- Previous Arrow -->
          <button 
            on:click={prevSlide}
            disabled={currentSlide === 0}
            class="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 group disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Previous slide"
          >
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <!-- Dots Indicator -->
          <div class="flex justify-center gap-3">
            {#each Array.from({length: Math.ceil(courseDays.length / 3)}) as _, groupIndex}
              <button 
                on:click={() => currentSlide = groupIndex * 3}
                class="w-3 h-3 transition-all duration-300 {(currentSlide === groupIndex * 3) || (currentSlide > groupIndex * 3 && currentSlide < (groupIndex + 1) * 3) ? 'bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50' : 'bg-white/30 hover:bg-white/50'} hover:scale-125"
                aria-label="Go to group {groupIndex + 1}"
              ></button>
            {/each}
          </div>
          
          <!-- Next Arrow -->
          <button 
            on:click={nextSlide}
            disabled={currentSlide >= courseDays.length - 3}
            class="w-10 h-10 bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 hover:border-[#D4AF37]/50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 group disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Next slide"
          >
            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Social Proof / Features Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-primary">
          Why Choose This Course?
        </h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Feature 1 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2 font-primary">Structured & Proven Framework</h3>
              <p class="text-white/80 font-secondary">
                Our 7-day journey is based on established psychological principles and shadow work methodologies, carefully structured to guide you from awareness to integration.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Feature 2 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2 font-primary">Work At Your Own Pace</h3>
              <p class="text-white/80 font-secondary">
                Take as much time as you need with each day. Whether you complete it in a week or a month, the journey is yours to navigate.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Feature 3 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2 font-primary">Private & Secure</h3>
              <p class="text-white/80 font-secondary">
                Your answers are encrypted and stored securely. Only you have access to your journal entries and reflections.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Feature 4 -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2 font-primary">Download Your Progress</h3>
              <p class="text-white/80 font-secondary">
                Export your completed days as PDF documents to keep forever, review later, or share with a therapist or coach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Who Is This For Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-primary">
          Is This For You?
        </h2>
        <p class="text-xl text-white/80">
          This course is perfect if you...
        </p>
      </div>
      
      <div class="space-y-4">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            Feel stuck in repetitive patterns and want to understand why
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            React strongly to certain people or situations and want to understand your triggers
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            Struggle with self-criticism, shame, or limiting beliefs
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            Want to improve your relationships by understanding yourself better
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            Are ready to do the inner work required for lasting personal growth
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex items-start gap-4">
          <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="url(#golden-gradient-svg)" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-white/90 text-lg">
            Seek a structured approach to self-discovery and personal transformation
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA Section -->
  <section id="cta-section" class="py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-br from-primary/40 to-secondary/40 backdrop-blur-sm border-2 border-accent/40 p-8 sm:p-12 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-primary">
          Ready to Begin Your Journey?
        </h2>
        
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join hundreds of others who have transformed their relationship with themselves through shadow work.
        </p>
        
        <!-- Price Reminder -->
        <div class="flex flex-col items-center gap-4 mb-8">
          <div class="flex items-baseline gap-3">
            <span class="text-white/60 text-2xl line-through">$297</span>
            <span class="text-5xl sm:text-6xl font-bold animate-gradient-x">$27</span>
          </div>
          <div class="inline-flex items-center px-4 py-2 bg-green-500/20 border border-[#D4AF37]/60 text-white">
            <span class="font-bold">90% OFF - Save $270 - Limited Time Only</span>
          </div>
        </div>
        
        <button
          on:click={handleGetStarted}
          class="btn-primary golden-border px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold mb-4"
        >
          <span class="flex items-center gap-2">
            Get Instant Access For $27
            <svg class="w-5 h-5" fill="none" stroke="url(#golden-gradient-svg)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </span>
        </button>
        
        <p class="text-white/70 text-sm">Instant access • Secure payment • 100% private</p>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 font-primary">
          Frequently Asked Questions
        </h2>
      </div>
      
      <div class="space-y-6">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">Do I need any previous experience with shadow work?</h3>
          <p class="text-white/80 font-secondary">
            No! This course is designed for complete beginners. We guide you step-by-step through the process with clear explanations and thoughtful questions.
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">How long does each day take?</h3>
          <p class="text-white/80 font-secondary">
            Each day contains multiple questions that you can answer at your own pace. Most people spend 30-60 minutes per day, but you can take as much time as you need. The course adapts to your schedule.
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">Is my data private and secure?</h3>
          <p class="text-white/80 font-secondary">
            Absolutely. Your answers are encrypted and stored securely. Only you have access to your journal entries. We take your privacy seriously and never share your personal information.
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">Can I do this course if I'm in therapy?</h3>
          <p class="text-white/80 font-secondary">
            Yes! This course can complement therapy beautifully. Many participants use their answers to deepen conversations with their therapist. You can even export your answers as PDFs to share with your practitioner.
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">What if I need more than 7 days?</h3>
          <p class="text-white/80 font-secondary">
            Take all the time you need! There's no rush. You have lifetime access to the course and can revisit any day whenever you want. The 7-day structure is a guide, not a requirement.
          </p>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-6">
          <h3 class="text-xl font-bold text-white mb-3 font-primary">Is there a money-back guarantee?</h3>
          <p class="text-white/80 font-secondary">
            At just $27, we're offering this course at an incredible value. We're confident you'll find immense value in this journey. If you have any concerns after starting, please reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
    <div class="max-w-6xl mx-auto">
      <div class="text-center text-white/70 space-y-4">
        <div class="flex justify-center items-center gap-3 mb-4">
          <img src={logo} alt="Self Coaching Tools Logo" class="w-8 h-8 object-contain" />
          <span class="font-semibold">Shadow Work Journey</span>
        </div>
        
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="/contact" class="hover:text-white transition-colors">Contact</a>
          <a href="/faq" class="hover:text-white transition-colors">FAQ</a>
        </div>
        
        <p class="text-sm">
          © {new Date().getFullYear()} Shadow Work Journey. All rights reserved.
        </p>
      </div>
  </div>
  </footer>
</div>

<style>
  /* Ensure square corners for all elements */
  * {
    border-radius: 0 !important;
  }

  /* Carousel transform - mobile (1 card at a time, full width) */
  .carousel-track {
    transform: translateX(calc(-1 * var(--slide-index) * 100% - var(--slide-index) * 1.5rem));
  }

  /* Carousel transform - desktop (3 cards visible, move by groups of 3) */
  @media (min-width: 1024px) {
    .carousel-track {
      transform: translateX(calc(-1 * var(--slide-index) * 100% - var(--slide-index) * 1.5rem));
    }
  }

  /* Animated gradient for headline */
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-x {
    background: linear-gradient(-45deg, #ffffff, #D4AF37, #ffffff, #D4AF37);
    background-size: 300% 300%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-x 6s ease-in-out infinite;
  }
</style>
