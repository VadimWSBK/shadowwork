<script lang="ts">
  import Login from './lib/Login.svelte';
  import Questionnaire from './lib/Questionnaire.svelte';
  import ViewAnswers from './lib/ViewAnswers.svelte';
  import Sidebar from './lib/Sidebar.svelte';
  import { courseData } from './lib/questions';
  import type { DayData } from './lib/questions';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let currentView: 'login' | 'intro' | 'questionnaire' | 'view-answers' = 'login';
  let username = '';
  let answers: Record<string, string[]> = {};
  let answersStore = writable<Record<string, string[]>>({});
  let navElement: HTMLElement;
  let isDarkText = false;
  let isMobileMenuOpen = false;
  let currentDay: DayData = courseData[0]; // Start with Intro
  let sidebarOpen = false;

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
  }

  onMount(() => {
    // Check if user is already logged in
    const savedUsername = localStorage.getItem('shadowwork_username');
    if (savedUsername) {
      username = savedUsername;
      currentView = 'intro';
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

  function getBrightness(color: string): number {
    // Parse RGB values from color string
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return 0;
    
    const [, r, g, b] = match.map(Number);
    // Calculate perceived brightness using standard formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  function handleLogin(event: CustomEvent<{ username: string }>) {
    username = event.detail.username;
    localStorage.setItem('shadowwork_username', username);
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

  function handleUpdateAnswer(dayId: string, index: number, newAnswer: string) {
    if (!answers[dayId]) {
      answers[dayId] = [];
    }
    answers[dayId][index] = newAnswer;
    answersStore.set(answers);
    // Save to localStorage
    localStorage.setItem(`answers_${username}`, JSON.stringify(answers));
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
      currentView = 'questionnaire';
    }
  }

  function logout() {
    localStorage.removeItem('shadowwork_username');
    localStorage.removeItem(`answers_${username}`);
    username = '';
    answers = {};
    answersStore.set({});
    currentView = 'login';
  }
</script>

<main class="min-h-screen">
  <!-- Navigation Header -->
  {#if currentView !== 'login'}
    <nav 
      bind:this={navElement}
      class="fixed top-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 transition-all duration-300 {currentView !== 'login' ? 'lg:left-80' : 'left-0'}"
    >
      <div class="max-w-none px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <button 
            class="lg:hidden p-2 text-white/80 hover:text-white"
            on:click={() => sidebarOpen = !sidebarOpen}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          

          
          <!-- User Account Section -->
          <div class="flex items-center gap-3 ml-auto">
            <span class="text-white/80 text-sm font-medium hidden sm:block">{username}</span>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
                <span class="text-white font-semibold text-sm">
                  {username.split(' ').map(name => name.charAt(0).toUpperCase()).join('').slice(0, 2)}
                </span>
              </div>
              <button 
                class="ml-2 p-1 text-white/60 hover:text-white/80 transition-colors duration-200"
                on:click={logout}
                aria-label="Logout"
                title="Logout"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
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
        />
      {/if}

      <!-- Main Content Area -->
      <div class="fixed top-16 bottom-0 right-0 overflow-y-auto transition-all duration-300 z-20 {currentView !== 'login' ? 'lg:left-80' : 'left-0'}">
        {#if currentView === 'login'}
          <Login on:login={handleLogin} />
        {:else if currentView === 'intro'}
          <div class="min-h-screen flex items-center justify-center py-4 px-4" transition:slide={{ duration: 300, easing: quintOut }}>
            <div class="w-full max-w-6xl mx-auto">
              <!-- Day Title and Description -->
              <div class="mb-6 text-left">
                <h1 class="text-2xl lg:text-3xl font-bold text-white mb-1">{currentDay.title}</h1>
                <p class="text-white/70 text-sm lg:text-base">{currentDay.subtitle}</p>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                <!-- Copy -->
                <div class="lg:col-span-2 border-l border-white/10 pl-6">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] mb-4 relative after:content-[''] after:block after:w-20 after:h-[3px] after:bg-white/25 after:rounded-full after:mt-3">
                  Welcome to Your Shadow Work Journey
                </h2>
                <p class="text-white/80 text-base sm:text-lg lg:text-xl leading-snug italic mb-6">A calm, guided space for honest self‑inquiry.</p>
                <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 max-w-2xl">
                  This space is here to help you gently explore the parts of yourself you don’t always see — the thoughts, feelings, and patterns that sit just out of view. As you move through the questions, you’ll bring more light to them, and with that comes clarity, relief, and room to grow.
                </p>
                <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 max-w-2xl">
                  Don’t overthink it. Write what comes up first — even if it’s messy or incomplete. Honesty matters more than polish.
                </p>
                <div class="mt-6 mb-4">
                  <p class="uppercase tracking-wide text-white/80 text-xs sm:text-sm mb-2">You may start to notice</p>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                      <span class="text-white/90">Greater clarity about why you react the way you do</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                      <span class="text-white/90">Awareness of hidden beliefs that have shaped your life</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                      <span class="text-white/90">Relief from emotions you’ve been holding back</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                      <span class="text-white/90">Insights into patterns in relationships, work, and self‑worth</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="mt-2 inline-block w-2.5 h-2.5 rounded-full bg-white/80 ring-2 ring-white/30 shadow-sm flex-shrink-0"></span>
                      <span class="text-white/90">A stronger sense of what you truly want</span>
                    </li>
                  </ul>
                </div>
                <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
                  Completing this process is like holding up a mirror to your inner world. What you discover here can be the first step toward deep transformation.
                </p>
                <p class="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                  Take your time. Be real. This is your journey.
                </p>
                <div class="flex justify-end">
                  <button
                    on:click={() => handleDayChange(courseData[1])}
                    class="px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
                    style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);"
                  >
                    Start the Journey
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
                      <circle cx="260" cy="160" r="45" fill="#ffffff" opacity="0.15"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else if currentView === 'questionnaire'}
          <Questionnaire 
            {answersStore}
            {username}
            {currentDay}
            onComplete={() => {}}
            onDayComplete={handleDayComplete}
            onShowAnswers={showAnswers}
          />
        {:else if currentView === 'view-answers'}
          <ViewAnswers 
            answers={$answersStore[currentDay.id] || []} 
            {username}
            {currentDay}
            onBack={backToQuestionnaire}
            onUpdateAnswer={(index, answer) => {
              handleUpdateAnswer(currentDay.id, index, answer);
            }}
          />
          {/if}
        </div>
      </div>

</main>
