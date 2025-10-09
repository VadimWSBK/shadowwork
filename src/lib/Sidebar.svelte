<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { DayData } from './questions';
  import type { Writable } from 'svelte/store';
  import { t } from './i18n';
  
  const dispatch = createEventDispatcher();
  
  export let courseData: DayData[] = [];
  export let currentDay: string = 'intro';
  export let answersStore: Writable<Record<string, string[]>>;
  export let onDayChange: (day: DayData) => void;
  export let onPreloadDay: (dayId: string) => Promise<void>;
  export let onDashboard: () => void;
  export let isOpen: boolean = true;
  export let currentLanguage: 'en' | 'de' | 'pl' = 'en';
  export let currentView: string = 'dashboard';
  export let isCollapsed: boolean = false;
  
  // Load collapsed state from localStorage on mount
  import { onMount } from 'svelte';
  onMount(() => {
    const saved = localStorage.getItem('shadowwork_sidebar_collapsed');
    if (saved === 'true') {
      isCollapsed = true;
    }
  });
  
  function toggleCollapse() {
    const newState = !isCollapsed;
    isCollapsed = newState;
    localStorage.setItem('shadowwork_sidebar_collapsed', String(newState));
  }
  
  // Calculate overall progress
  $: overallProgress = calculateOverallProgress($answersStore, courseData);
  
  // Get current day data
  $: currentDayData = courseData.find(day => day.id === currentDay) || courseData[0];
  
  function calculateOverallProgress(answers: Record<string, string[]>, days: DayData[]): number {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    days.forEach(day => {
      if (day.id !== 'intro') {
        totalQuestions += day.questions.length;
        const dayAnswers = answers[day.id] || [];
        answeredQuestions += dayAnswers.filter(answer => answer && answer.trim().length > 0).length;
      }
    });
    
    return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  }
  
  async function selectDay(day: DayData) {
    // Add visual feedback with a brief delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 50));
    onDayChange(day);
    // Close sidebar on mobile after navigating
    isOpen = false;
  }
</script>

<div class="fixed top-16 left-0 bg-white/15 backdrop-blur-md border-r border-white/30 h-[calc(100vh-4rem)] flex flex-col z-40 transform transition-all duration-500 sidebar-container {isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:top-0 lg:h-screen'} {isCollapsed ? 'w-20' : 'w-80'}">
  
  <!-- Header -->
  <div class="border-b border-white/30 relative z-50 transition-all duration-300 {isCollapsed ? 'p-4' : 'p-6'}">
    <div class="flex items-center justify-between">
      {#if !isCollapsed}
        <div>
          <h1 class="text-xl font-bold text-white mb-2">{t(currentLanguage, 'sidebar.title')}</h1>
          <p class="text-white/80 text-sm">{t(currentLanguage, 'sidebar.subtitle')}</p>
        </div>
      {/if}
      
      <div class="flex items-center gap-2 {isCollapsed ? 'mx-auto' : ''}">
        <!-- Desktop collapse/expand button -->
        <button 
          class="hidden lg:block p-2 text-white/90 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
          on:click={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg class="w-5 h-5 transition-transform duration-300 {isCollapsed ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
          </svg>
        </button>
        
        <!-- Mobile close button -->
        {#if !isCollapsed}
          <button 
            class="lg:hidden p-2 text-white/90 hover:text-white"
            on:click={() => isOpen = false}
            aria-label={t(currentLanguage, 'sidebar.close')}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Overall Progress -->
  {#if !isCollapsed}
    <div class="p-6 border-b border-white/30">
      <div class="mb-3">
        <div class="flex justify-between items-center mb-2">
          <span class="text-white text-sm font-medium">{t(currentLanguage, 'sidebar.overallProgress')}</span>
          <span class="text-white text-sm font-bold">{Math.round(overallProgress)}%</span>
        </div>
        <div class="w-full bg-white/25 rounded h-2">
          <div 
            class="h-2 rounded bg-green-500"
            style="width: {overallProgress}%"
          ></div>
        </div>
      </div>
      <p class="text-white/70 text-xs">{t(currentLanguage, 'sidebar.completedOf100', { count: Math.round((overallProgress / 100) * 100) })}</p>
    </div>
  {:else}
    <!-- Collapsed progress indicator -->
    <div class="p-2 border-b border-white/30">
      <div class="flex flex-col items-center gap-2">
        <div class="relative w-12 h-12">
          <svg class="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none" class="text-white/20"></circle>
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke="currentColor" 
              stroke-width="3" 
              fill="none" 
              class="text-green-500"
              stroke-dasharray="{2 * Math.PI * 20}"
              stroke-dashoffset="{2 * Math.PI * 20 * (1 - overallProgress / 100)}"
              stroke-linecap="round"
            ></circle>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-white text-xs font-bold">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Navigation Menu -->
  <div class="flex-1 overflow-y-auto sidebar-nav">
    <nav class="{isCollapsed ? 'p-2' : 'p-4'}">
      <!-- Dashboard Link -->
      <button
        class="w-full text-left rounded transition-all duration-500 group transform hover:scale-[1.02] active:scale-[0.98] mb-2 {currentView === 'dashboard' ? 'bg-white/25 text-white shadow-lg' : 'text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md'} {isCollapsed ? 'p-2 flex justify-center' : 'p-3'}"
        on:click={() => { onDashboard(); isOpen = false; }}
        title={isCollapsed ? 'Dashboard' : ''}
      >
        {#if isCollapsed}
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        {:else}
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span class="font-medium">Dashboard</span>
          </div>
        {/if}
      </button>
      
      <div class="border-b border-white/15 my-3 {isCollapsed ? 'mx-2' : 'mx-3'}"></div>
      
      {#each courseData as day, index}
        {@const completion = day.id !== 'intro' ? Math.round((($answersStore[day.id] || []).filter(answer => answer && answer.trim().length > 0).length / day.questions.length) * 100) : 0}
        <button
          class="w-full text-left rounded transition-all duration-500 group transform hover:scale-[1.02] active:scale-[0.98] {currentView !== 'dashboard' && currentDay === day.id ? 'bg-white/25 text-white shadow-lg' : 'text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md'} {isCollapsed ? 'p-2 flex justify-center' : 'p-3'}"
          on:click={() => selectDay(day)}
          on:mouseenter={() => day.id !== 'intro' && onPreloadDay(day.id)}
          on:focus={() => day.id !== 'intro' && onPreloadDay(day.id)}
          title={isCollapsed ? `${day.title}${day.id !== 'intro' ? ` (${completion}%)` : ''}` : ''}
        >
          {#if isCollapsed}
            <!-- Collapsed view: icon only -->
            <div class="relative">
              {#if day.id === 'intro'}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              {:else}
                <div class="text-lg font-bold">{day.id.replace('day', '')}</div>
              {/if}
              {#if day.id !== 'intro' && completion === 100}
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white/30"></div>
              {/if}
            </div>
          {:else}
            <!-- Expanded view: full details -->
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-medium">{day.title}</span>
                  {#if day.id !== 'intro'}
                    <span class="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded text-white/90 {completion === 100 ? 'bg-green-500' : 'bg-white/20'}">
                      {completion}%
                    </span>
                  {/if}
                </div>
                {#if day.subtitle}
                  <div class="text-xs text-white/70 mt-1">{day.subtitle}</div>
                {/if}
              </div>
              {#if day.id !== 'intro'}
                <div class="flex flex-col items-end text-xs text-white/70 ml-2">
                  <div>{t(currentLanguage, 'sidebar.questionsCount', { count: day.questions.length })}</div>
                </div>
              {/if}
            </div>
          {/if}
        </button>
        {#if index < courseData.length - 1}
          <div class="border-b border-white/15 my-2 {isCollapsed ? 'mx-2' : 'mx-3'}"></div>
        {/if}
      {/each}
    </nav>
  </div>
  
  <!-- Footer -->
  {#if !isCollapsed}
    <div class="p-6 border-t border-white/30">
      <div class="text-center">
        <p class="text-white/70 text-xs">{t(currentLanguage, 'sidebar.footerLine1')}</p>
        <p class="text-white/70 text-xs">{t(currentLanguage, 'sidebar.footerLine2')}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Prevent scroll propagation from sidebar to main content */
  .sidebar-container {
    overscroll-behavior: contain;
  }
  
  .sidebar-nav {
    overscroll-behavior: contain;
  }
</style>