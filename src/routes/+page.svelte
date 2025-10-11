<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { t } from '../lib/i18n';
  import introBg from '../assets/shadowwork_bg_intro.webp';
  import day2Img from '../assets/shadowworkt_day_2.png';
  import day3Img from '../assets/shadow_work_day_3.png';
  import logo from '../assets/LOGO_SELF_COACHING_TOOLS.svg';
  import dashboardImg from '../assets/ShadowWorkCourse_Dashboard.webp';
  
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let languageMenuOpen = false;
  
  // Course data
  const courses = [
    {
      id: 'shadowwork',
      title: 'Shadow Work Journey',
      description: 'A 7-day guided journey into self-awareness, emotional healing, and personal transformation through shadow work.',
      status: 'available',
      duration: '7 days',
      difficulty: 'Beginner to Advanced',
      features: ['Daily guided exercises', 'Personal reflection prompts', 'Progress tracking', 'Secure data storage'],
      image: introBg,
      color: 'from-primary to-secondary'
    },
    {
      id: 'limiting-beliefs',
      title: 'Limiting Beliefs Transformation',
      description: 'Identify, challenge, and transform the limiting beliefs that hold you back from reaching your full potential.',
      status: 'coming-soon',
      duration: '5 days',
      difficulty: 'Intermediate',
      features: ['Belief identification exercises', 'Reframing techniques', 'Action planning tools', 'Progress monitoring'],
      image: day2Img,
      color: 'from-secondary to-frame'
    },
    {
      id: 'relationships',
      title: 'Healthy Relationships Mastery',
      description: 'Build stronger, more authentic connections through understanding communication patterns, boundaries, and emotional intimacy.',
      status: 'coming-soon',
      duration: '6 days',
      difficulty: 'Beginner to Intermediate',
      features: ['Communication assessment', 'Boundary setting guides', 'Conflict resolution tools', 'Relationship check-ins'],
      image: day3Img,
      color: 'from-frame to-primary-dark'
    }
  ];
  
  // Language cookie helpers
  const LANGUAGE_COOKIE = 'shadowwork_language';
  function setLanguageCookie(lang: 'en' | 'de' | 'pl') {
    try {
      const days = 365 * 2;
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
  
  function handleLanguageChange(lang: 'en' | 'de' | 'pl') {
    currentLanguage = lang;
    setLanguageCookie(lang);
    languageMenuOpen = false;
    document.documentElement.lang = lang;
  }
  
  function handleCourseClick(course: typeof courses[0]) {
    // Navigate to course description page
    goto(`/course/${course.id}`);
  }
  
  onMount(() => {
    // Set initial language
    const savedLang = getLanguageCookie();
    if (savedLang) {
      currentLanguage = savedLang;
      document.documentElement.lang = savedLang;
    }
  });
</script>

<svelte:head>
  <title>Self Coaching Tools - Transform Your Life Through Guided Courses</title>
  <meta name="description" content="Discover powerful self-coaching tools and courses designed to help you overcome limiting beliefs, improve relationships, and achieve personal transformation." />
</svelte:head>

<div class="min-h-screen">
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
                    <h1 class="text-2xl font-bold text-white font-primary group-hover:text-accent transition-colors duration-200">Self Coaching Tools</h1>
                  </div>
                </button>
              </div>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="/#courses" class="text-white/90 hover:text-white transition-colors duration-200 font-medium">Courses</a>
          <a href="/#about" class="text-white/90 hover:text-white transition-colors duration-200 font-medium">About</a>
          <a href="/contact" class="text-white/90 hover:text-white transition-colors duration-200 font-medium">Contact</a>
        </nav>
        
        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <div class="relative" role="button" tabindex="0" on:click={() => languageMenuOpen = !languageMenuOpen} on:keydown={(e) => e.key === 'Enter' && (languageMenuOpen = !languageMenuOpen)}>
            <button class="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200 px-3 py-2 hover:bg-white/10">
              <span class="text-sm font-medium">
                {currentLanguage === 'en' ? 'EN' : currentLanguage === 'de' ? 'DE' : 'PL'}
              </span>
              <svg class="w-4 h-4 transition-transform duration-200 {languageMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {#if languageMenuOpen}
              <div class="absolute right-0 mt-2 w-32 bg-primary/90 backdrop-blur-xl border border-white/20 shadow-lg z-50">
                <div class="py-1">
                  <button on:click={() => handleLanguageChange('en')} class="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 {currentLanguage === 'en' ? 'bg-white/20 text-accent' : ''}">
                    English
                  </button>
                  <button on:click={() => handleLanguageChange('de')} class="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 {currentLanguage === 'de' ? 'bg-white/20 text-accent' : ''}">
                    Deutsch
                  </button>
                  <button on:click={() => handleLanguageChange('pl')} class="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 {currentLanguage === 'pl' ? 'bg-white/20 text-accent' : ''}">
                    Polski
                  </button>
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Login Button -->
          <button 
            on:click={() => goto('/login')}
            class="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition-all duration-200 backdrop-blur-sm hover:border-accent/50 hover:text-accent"
          >
            Login
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
          <h2 class="text-4xl md:text-5xl font-bold golden-shimmer font-primary mb-4 leading-tight">
            Transform Your Life Through Self-Coaching
          </h2>
          <p class="text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 mb-8 font-secondary leading-relaxed">
            Discover powerful tools and guided courses designed to help you overcome limiting beliefs, improve relationships, and achieve lasting personal transformation.
          </p>
          <button 
            on:click={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            class="btn-primary golden-border px-8 py-4 font-bold"
          >
            <span class="flex items-center gap-2">
              Choose your Course
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </button>
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

  <!-- Main Content -->
  <main id="courses" class="bg-gradient-to-br from-primary-light via-primary to-secondary-dark py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-white font-primary mb-4">Available Courses</h3>
        <p class="text-lg text-white/90 max-w-2xl mx-auto">
          Choose from our carefully crafted self-coaching programs, each designed to address specific areas of personal development.
        </p>
      </div>
      
      <!-- Courses Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each courses as course}
          <div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group cursor-pointer" 
               role="button" tabindex="0"
               on:click={() => handleCourseClick(course)}
               on:keydown={(e) => e.key === 'Enter' && handleCourseClick(course)}>
            
            <!-- Course Image -->
            <div class="h-48 relative overflow-hidden">
              <img src={course.image} alt={course.title} class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-br {course.color} opacity-70"></div>
              <div class="absolute top-4 right-4">
                {#if course.status === 'available'}
                  <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-500/90 text-white backdrop-blur-sm">
                    Available
                  </span>
                {:else}
                  <span class="inline-flex golden-border border-1 items-center px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                    Coming Soon
                  </span>
                {/if}
              </div>
              <div class="absolute bottom-4 left-4 text-white">
                <h4 class="text-2xl font-bold font-primary">{course.title}</h4>
                <p class="text-sm text-white/90">{course.duration} • {course.difficulty}</p>
              </div>
            </div>
            
            <!-- Course Content -->
            <div class="p-6">
              <p class="text-white/90 mb-4 leading-relaxed">{course.description}</p>
              
              <!-- Features -->
              <div class="mb-6">
                <h5 class="text-sm font-semibold text-white mb-2">What's Included:</h5>
                <ul class="space-y-1">
                  {#each course.features as feature}
                    <li class="text-sm text-white/80 flex items-center">
                      <svg class="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  {/each}
                </ul>
              </div>
              
              <!-- Action Button -->
              <button class="w-full py-3 px-4 font-semibold
                           {course.status === 'available' 
                             ? 'btn-primary golden-border' 
                             : 'bg-white/20 text-white/70 cursor-not-allowed border-2 border-white/20'}">
                Learn More
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-primary-dark text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img src={logo} alt="Self Coaching Tools Logo" class="w-8 h-8 object-contain" />
            <div>
              <h4 class="text-xl font-bold font-primary">Self Coaching Tools</h4>
            </div>
          </div>
          <p class="text-white/80 mb-6 max-w-md">
            Empowering personal transformation through guided self-coaching programs. Discover your potential and create lasting positive change.
          </p>
          <div class="flex space-x-4">
            <button 
              on:click={() => goto('/login')}
              class="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium transition-all duration-200 backdrop-blur-sm hover:border-accent/50 hover:text-accent"
            >
              Get Started
            </button>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h5 class="text-lg font-semibold text-white mb-4">Quick Links</h5>
          <ul class="space-y-3">
            <li><a href="/#courses" class="text-white/70 hover:text-white transition-colors duration-200">Courses</a></li>
            <li><a href="/shadowwork" class="text-white/70 hover:text-white transition-colors duration-200">Shadow Work Journey</a></li>
            <li><a href="/login" class="text-white/70 hover:text-white transition-colors duration-200">Login</a></li>
            <li><a href="/contact?from=/" class="text-white/70 hover:text-white transition-colors duration-200">Contact</a></li>
          </ul>
        </div>
        
        <!-- Support -->
        <div>
          <h5 class="text-lg font-semibold text-white mb-4">Support</h5>
          <ul class="space-y-3">
            <li><a href="/faq?from=/" class="text-white/70 hover:text-white transition-colors duration-200">FAQ</a></li>
            <li><a href="/privacy?from=/" class="text-white/70 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="/terms?from=/" class="text-white/70 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            <li><a href="/disclaimer?from=/" class="text-white/70 hover:text-white transition-colors duration-200">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="border-t border-white/20 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-white/60 mb-4 md:mb-0">
            © 2024 Self Coaching Tools. All rights reserved.
          </p>
          <div class="flex items-center space-x-6 text-sm text-white/60">
            <span class="flex items-center gap-1">
              Made with 
              <svg class="w-4 h-4 golden-gradient-text" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              for personal growth
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<!-- Click outside to close language menu -->
{#if languageMenuOpen}
  <div class="fixed inset-0 z-40" role="button" tabindex="0" on:click={() => languageMenuOpen = false} on:keydown={(e) => e.key === 'Escape' && (languageMenuOpen = false)}></div>
{/if}
