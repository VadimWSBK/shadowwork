<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t } from '../../../lib/i18n';
  import introBg from '../../../assets/shadowwork_bg_intro.webp';
  import day2Img from '../../../assets/shadowworkt_day_2.png';
  import day3Img from '../../../assets/shadow_work_day_3.png';
  
  let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  let languageMenuOpen = false;
  
  // Course data - same as main page but with more detailed information
  const courses = [
    {
      id: 'shadowwork',
      title: 'Shadow Work Journey',
      subtitle: 'A Transformative 7-Day Experience',
      description: 'A 7-day guided journey into self-awareness, emotional healing, and personal transformation through shadow work.',
      detailedDescription: `The Shadow Work Journey is a comprehensive program designed to help you explore the hidden aspects of your psyche and integrate them into conscious awareness. Through daily guided exercises, you'll learn to identify patterns, heal emotional wounds, and develop greater self-compassion.

This transformative experience combines ancient wisdom with modern psychology to help you:
• Recognize and work with your shadow aspects
• Develop emotional intelligence and self-awareness
• Break free from limiting patterns and beliefs
• Cultivate deeper self-acceptance and compassion
• Create lasting positive change in your life

Each day builds upon the previous, creating a powerful cumulative effect that can lead to profound personal transformation.`,
      status: 'available',
      duration: '7 days',
      difficulty: 'Beginner to Advanced',
      price: '$27',
      originalPrice: '$297',
      features: [
        'Daily guided exercises',
        'Personal reflection prompts', 
        'Progress tracking',
        'Secure data storage',
        'Lifetime access',
        'Mobile-friendly interface',
        'Expert-designed content',
        'Community support'
      ],
      benefits: [
        'Increased self-awareness and emotional intelligence',
        'Improved relationships and communication',
        'Greater self-acceptance and compassion',
        'Reduced anxiety and stress',
        'Enhanced decision-making abilities',
        'Deeper understanding of personal patterns'
      ],
      image: introBg,
      color: 'from-primary to-secondary',
      testimonials: [
        {
          name: 'Sarah M.',
          text: 'This journey changed my life. I finally understand myself better and feel more confident in my relationships.',
          rating: 5
        },
        {
          name: 'Michael K.',
          text: 'The daily exercises were exactly what I needed to break through my limiting beliefs.',
          rating: 5
        }
      ]
    },
    {
      id: 'limiting-beliefs',
      title: 'Limiting Beliefs Transformation',
      subtitle: 'Break Free from Mental Barriers',
      description: 'Identify, challenge, and transform the limiting beliefs that hold you back from reaching your full potential.',
      detailedDescription: `Our Limiting Beliefs Transformation course is designed to help you identify and overcome the mental barriers that prevent you from achieving your goals and living your best life.

Through proven psychological techniques and practical exercises, you'll learn to:
• Recognize limiting beliefs in real-time
• Challenge and reframe negative thought patterns
• Develop empowering belief systems
• Create lasting behavioral changes
• Build unshakeable confidence

This program combines cognitive-behavioral therapy principles with mindfulness practices to create lasting transformation.`,
      status: 'coming-soon',
      duration: '5 days',
      difficulty: 'Intermediate',
      price: '$67',
      originalPrice: '$147',
      features: [
        'Belief identification exercises',
        'Reframing techniques',
        'Action planning tools',
        'Progress monitoring',
        'Guided meditations',
        'Practical worksheets'
      ],
      benefits: [
        'Eliminate self-sabotaging thoughts',
        'Build unshakeable confidence',
        'Achieve goals more easily',
        'Improve self-esteem',
        'Develop positive mindset',
        'Increase motivation and drive'
      ],
      image: day2Img,
      color: 'from-secondary to-frame',
      testimonials: []
    },
    {
      id: 'relationships',
      title: 'Healthy Relationships Mastery',
      subtitle: 'Build Deeper, More Authentic Connections',
      description: 'Build stronger, more authentic connections through understanding communication patterns, boundaries, and emotional intimacy.',
      detailedDescription: `The Healthy Relationships Mastery course teaches you the essential skills needed to build and maintain fulfilling relationships in all areas of your life.

You'll learn to:
• Communicate effectively and assertively
• Set healthy boundaries
• Resolve conflicts constructively
• Build emotional intimacy
• Recognize and avoid toxic patterns
• Cultivate empathy and understanding

This comprehensive program covers relationships with partners, family, friends, and colleagues, giving you the tools to create meaningful connections.`,
      status: 'coming-soon',
      duration: '6 days',
      difficulty: 'Beginner to Intermediate',
      price: '$77',
      originalPrice: '$167',
      features: [
        'Communication assessment',
        'Boundary setting guides',
        'Conflict resolution tools',
        'Relationship check-ins',
        'Interactive exercises',
        'Expert guidance'
      ],
      benefits: [
        'Improved communication skills',
        'Stronger personal boundaries',
        'Better conflict resolution',
        'Deeper emotional connections',
        'Reduced relationship stress',
        'Increased relationship satisfaction'
      ],
      image: day3Img,
      color: 'from-frame to-primary-dark',
      testimonials: []
    }
  ];
  
  let course = null;
  
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
  
  function handleBuyCourse() {
    // For now, redirect to login. In the future, this could redirect to a payment page
    if (course?.status === 'available') {
      goto('/login');
    } else {
      alert('This course is coming soon! Stay tuned for updates.');
    }
  }
  
  function handleStartCourse() {
    // Redirect to login for available courses
    if (course?.status === 'available') {
      goto('/login');
    }
  }
  
  onMount(() => {
    // Set initial language
    const savedLang = getLanguageCookie();
    if (savedLang) {
      currentLanguage = savedLang;
      document.documentElement.lang = savedLang;
    }
    
    // Find the course based on the slug
    const slug = $page.params.slug;
    course = courses.find(c => c.id === slug);
    
    if (!course) {
      // Redirect to home if course not found
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>{course?.title || 'Course'} - Self Coaching Tools</title>
  <meta name="description" content={course?.description || 'Transform your life with our self-coaching courses'} />
</svelte:head>

{#if course}
  <div class="min-h-screen">
    <!-- Header -->
    <header class="relative bg-gradient-to-r from-primary via-secondary to-primary-dark">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button on:click={() => goto('/')} class="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Back to Courses</span>
            </button>
          </div>
          
          <!-- Language Selector -->
          <div class="relative" role="button" tabindex="0" on:click={() => languageMenuOpen = !languageMenuOpen} on:keydown={(e) => e.key === 'Enter' && (languageMenuOpen = !languageMenuOpen)}>
            <button class="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200">
              <span class="text-sm font-medium">
                {currentLanguage === 'en' ? 'English' : currentLanguage === 'de' ? 'Deutsch' : 'Polski'}
              </span>
              <svg class="w-4 h-4 transition-transform duration-200 {languageMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {#if languageMenuOpen}
              <div class="absolute right-0 mt-2 w-32 bg-white shadow-lg z-50">
                <div class="py-1">
                  <button on:click={() => handleLanguageChange('en')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'en' ? 'bg-primary/10 text-primary' : ''}">
                    English
                  </button>
                  <button on:click={() => handleLanguageChange('de')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'de' ? 'bg-primary/10 text-primary' : ''}">
                    Deutsch
                  </button>
                  <button on:click={() => handleLanguageChange('pl')} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 {currentLanguage === 'pl' ? 'bg-primary/10 text-primary' : ''}">
                    Polski
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-light via-primary to-secondary-dark py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Course Info -->
          <div class="text-white">
            <div class="mb-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                {course.duration} • {course.difficulty}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold font-primary mb-4">{course.title}</h1>
            <p class="text-xl text-white/90 mb-6">{course.subtitle}</p>
            <p class="text-lg text-white/80 mb-8">{course.description}</p>
            
            <!-- Price -->
            {#if course.status === 'available'}
              <div class="mb-8">
                <div class="flex items-center space-x-4 mb-4">
                  <span class="text-3xl font-bold text-white">{course.price}</span>
                  <span class="text-lg text-white/70 line-through">{course.originalPrice}</span>
                  <span class="inline-flex items-center px-3 py-1 text-sm font-medium bg-accent/20 text-accent border border-accent/30">
                    Limited Time Offer
                  </span>
                </div>
              </div>
            {/if}
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              {#if course.status === 'available'}
                <button 
                  on:click={handleBuyCourse}
                  class="inline-flex items-center justify-center px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 relative overflow-hidden group border-2 shadow-2xl hover:shadow-3xl"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90 group-hover:opacity-100"></div>
                  <div class="absolute inset-0" style="border-color: #D4AF37; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    Buy Now - {course.price}
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h6"></path>
                    </svg>
                  </span>
                </button>
                <button 
                  on:click={handleStartCourse}
                  class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold transition-all duration-200 backdrop-blur-sm"
                >
                  Start Free Trial
                </button>
              {:else}
                <button 
                  disabled
                  class="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/20 text-white/70 font-semibold cursor-not-allowed backdrop-blur-sm"
                >
                  Coming Soon
                </button>
              {/if}
            </div>
          </div>
          
          <!-- Course Image -->
          <div class="relative">
            <div class="relative h-96 bg-gradient-to-br {course.color} overflow-hidden">
              <img src={course.image} alt={course.title} class="w-full h-full object-cover opacity-80" />
              <div class="absolute inset-0 bg-gradient-to-br {course.color} opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Details -->
    <section class="bg-gradient-to-br from-primary-light via-primary to-secondary-dark py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Detailed Description -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8">
              <h2 class="text-3xl font-bold text-white font-primary mb-6">About This Course</h2>
              <div class="text-white/90 leading-relaxed whitespace-pre-line">
                {course.detailedDescription}
              </div>
            </div>
            
            <!-- Benefits -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8">
              <h3 class="text-2xl font-bold text-white font-primary mb-6">What You'll Achieve</h3>
              <ul class="space-y-4">
                {#each course.benefits as benefit}
                  <li class="flex items-start gap-3 text-white/90">
                    <svg class="w-6 h-6 mt-0.5 flex-shrink-0" style="color: #D4AF37;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Testimonials -->
            {#if course.testimonials.length > 0}
              <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8">
                <h3 class="text-2xl font-bold text-white font-primary mb-6">What Students Say</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {#each course.testimonials as testimonial}
                    <div class="bg-white/5 p-6">
                      <div class="flex items-center mb-4">
                        {#each Array(testimonial.rating) as _}
                          <svg class="w-5 h-5" style="color: #D4AF37;" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        {/each}
                      </div>
                      <p class="text-white/90 mb-4">"{testimonial.text}"</p>
                      <p class="text-white/70 font-medium">- {testimonial.name}</p>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          
          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- What's Included -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6">
              <h3 class="text-xl font-bold text-white font-primary mb-4">What's Included</h3>
              <ul class="space-y-3">
                {#each course.features as feature}
                  <li class="flex items-center gap-3 text-white/90">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: #D4AF37;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm">{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Course Info -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6">
              <h3 class="text-xl font-bold text-white font-primary mb-4">Course Details</h3>
              <div class="space-y-3 text-white/90">
                <div class="flex justify-between">
                  <span>Duration:</span>
                  <span class="text-white">{course.duration}</span>
                </div>
                <div class="flex justify-between">
                  <span>Difficulty:</span>
                  <span class="text-white">{course.difficulty}</span>
                </div>
                <div class="flex justify-between">
                  <span>Format:</span>
                  <span class="text-white">Self-paced</span>
                </div>
                <div class="flex justify-between">
                  <span>Access:</span>
                  <span class="text-white">Lifetime</span>
                </div>
              </div>
            </div>
            
            <!-- Guarantee -->
            {#if course.status === 'available'}
              <div class="bg-accent/10 backdrop-blur-xl p-6" style="border: 1px solid #D4AF37;">
                <h3 class="text-xl font-bold text-accent font-primary mb-4">30-Day Guarantee</h3>
                <p class="text-white/90 text-sm">
                  If you're not completely satisfied with your purchase, we'll refund your money within 30 days, no questions asked.
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    {#if course.status === 'available'}
      <section class="bg-primary-dark py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-white font-primary mb-4">Ready to Transform Your Life?</h2>
          <p class="text-xl text-white/90 mb-8">
            Join thousands of people who have already started their journey with {course.title}.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              on:click={handleBuyCourse}
              class="inline-flex items-center justify-center px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 relative overflow-hidden group border-2 shadow-2xl hover:shadow-3xl"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90 group-hover:opacity-100"></div>
              <div class="absolute inset-0" style="border-color: #D4AF37; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);"></div>
              <span class="relative z-10 flex items-center gap-2">
                Get Started Now - {course.price}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    {/if}
  </div>
{:else}
  <!-- Loading or not found state -->
  <div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center">
    <div class="text-center text-white">
      <h1 class="text-2xl font-bold mb-4">Course Not Found</h1>
      <p class="mb-6">The course you're looking for doesn't exist.</p>
      <button on:click={() => goto('/')} class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold transition-colors duration-200">
        Back to Courses
      </button>
    </div>
  </div>
{/if}

<!-- Click outside to close language menu -->
{#if languageMenuOpen}
  <div class="fixed inset-0 z-40" role="button" tabindex="0" on:click={() => languageMenuOpen = false} on:keydown={(e) => e.key === 'Escape' && (languageMenuOpen = false)}></div>
{/if}
