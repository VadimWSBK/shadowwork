<script lang="ts">
  import Login from './lib/Login.svelte';
  import Questionnaire from './lib/Questionnaire.svelte';
  import ViewAnswers from './lib/ViewAnswers.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let currentView: 'login' | 'questionnaire' | 'view-answers' = 'login';
  let username = '';
  let answers: string[] = [];
  let answersStore = writable<string[]>([]);
  let navElement: HTMLElement;
  let isDarkText = false;
  let isMobileMenuOpen = false;

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
      currentView = 'questionnaire';
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
    currentView = 'questionnaire';
    loadAnswers();
  }

  function loadAnswers() {
    const saved = localStorage.getItem(`answers_${username}`);
    if (saved) {
      answers = JSON.parse(saved);
    } else {
      answers = new Array(10).fill('');
    }
    answersStore.set(answers);
  }

  function handleAnswersUpdate(event: CustomEvent<string[]>) {
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

  function handleUpdateAnswer(index: number, newAnswer: string) {
    answers[index] = newAnswer;
    answersStore.set(answers);
    // Save to localStorage
    localStorage.setItem(`answers_${username}`, JSON.stringify(answers));
  }

  function logout() {
    localStorage.removeItem('shadowwork_username');
    localStorage.removeItem(`answers_${username}`);
    username = '';
    answers = [];
    answersStore.set([]);
    currentView = 'login';
  }
</script>

<main class="min-h-screen">
  <!-- Navigation Header -->
  {#if currentView !== 'login'}
    <nav 
      bind:this={navElement}
      class="sticky top-0 z-50 shadow-lg transition-colors duration-300"
      style="background-color: #0C6E78; color: white;"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-black/5">
              <svg class="w-6 h-6 text-gray-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-semibold tracking-tight transition-colors duration-300">Shadow Work</h1>
              <p class="text-xs opacity-70 transition-colors duration-300">Guided self‑inquiry</p>
            </div>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-2 sm:space-x-4">
            <button
              on:click={() => currentView = 'questionnaire'}
              class="px-3 sm:px-4 py-2 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-current/10 rounded-lg transition-all duration-300 {currentView === 'questionnaire' ? 'bg-current/15 opacity-100' : ''}"
            >
              Questions
            </button>
            <button
              on:click={showAnswers}
              class="px-3 sm:px-4 py-2 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-current/10 rounded-lg transition-all duration-300 {currentView === 'view-answers' ? 'bg-current/15 opacity-100' : ''}"
            >
              My Answers
            </button>
            <div class="h-6 w-px bg-current/20"></div>
            <div class="flex items-center space-x-3">
              <span class="text-sm opacity-80 transition-colors duration-300">Welcome, {username}</span>
              <button
                on:click={logout}
                class="px-3 py-1.5 text-xs font-medium opacity-90 hover:opacity-100 hover:bg-red-500/20 rounded-md transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              on:click={toggleMobileMenu}
              class="p-2 rounded-lg hover:bg-current/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Toggle mobile menu"
            >
              <svg class="w-6 h-6 transition-transform duration-200 {isMobileMenuOpen ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {#if !isMobileMenuOpen}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                {:else}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                {/if}
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        {#if isMobileMenuOpen}
          <div 
            class="md:hidden border-t border-white/10 mt-2 pt-4 pb-4 space-y-2"
            transition:slide={{ duration: 300, easing: quintOut }}
          >
            <button
              on:click={() => { currentView = 'questionnaire'; closeMobileMenu(); }}
              class="block w-full text-left px-4 py-3 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-current/10 rounded-lg transition-all duration-200 {currentView === 'questionnaire' ? 'bg-current/15 opacity-100' : ''}"
            >
              Questions
            </button>
            <button
              on:click={() => { showAnswers(); closeMobileMenu(); }}
              class="block w-full text-left px-4 py-3 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-current/10 rounded-lg transition-all duration-200 {currentView === 'view-answers' ? 'bg-current/15 opacity-100' : ''}"
            >
              My Answers
            </button>
            <div class="border-t border-white/10 my-2"></div>
            <div class="px-4 py-2">
              <span class="text-sm opacity-80">Welcome, {username}</span>
            </div>
            <button
              on:click={() => { logout(); closeMobileMenu(); }}
              class="block w-full text-left px-4 py-3 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        {/if}
      </div>
    </nav>
  {/if}

  <!-- Main Content -->
  <div class="relative">
    {#if currentView === 'login'}
      <Login on:login={handleLogin} />
    {:else if currentView === 'questionnaire'}
      <Questionnaire 
        answersStore={answersStore}
        {username}
        onComplete={() => {}}
      />
    {:else if currentView === 'view-answers'}
      <ViewAnswers 
        {answers} 
        {username}
        onBack={backToQuestionnaire}
        onUpdateAnswer={handleUpdateAnswer}
      />
    {/if}
  </div>

  <!-- Footer -->
  {#if currentView !== 'login'}
    <footer class="bg-secondary/20 backdrop-blur-sm border-t border-white/10 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <p class="text-white/80 text-sm">
              Shadow Work — a calm space for honest reflection
            </p>
            <p class="text-white/60 text-xs mt-1">
              Your reflections are private and stored locally on your device
            </p>
          </div>
          <div class="flex items-center space-x-6 text-xs text-white/60">
            <span>Progress is automatically saved</span>
            <span>•</span>
            <span>Data stays on your device</span>
            <span>•</span>
            <span>Take your time</span>
          </div>
        </div>
      </div>
    </footer>
  {/if}
</main>
