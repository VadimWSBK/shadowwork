<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { DayData } from './questions';
  import type { Writable } from 'svelte/store';
  
  const dispatch = createEventDispatcher();
  
  export let courseData: DayData[] = [];
  export let currentDay: string = 'intro';
  export let answersStore: Writable<Record<string, string[]>>;
  export let onDayChange: (day: DayData) => void;
  export let isOpen: boolean = true;
  
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
  
  function selectDay(day: DayData) {
    onDayChange(day);
  }
</script>

<div class="fixed top-16 left-0 w-80 bg-white/15 backdrop-blur-md border-r border-white/30 h-[calc(100vh-4rem)] flex flex-col z-40 transform transition-transform duration-300 sidebar-container {isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:top-0 lg:h-screen'}">
  
  <!-- Header -->
  <div class="p-6 border-b border-white/30 relative z-50">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-white mb-2">Shadow Work Course</h1>
        <p class="text-white/80 text-sm">7-Day Journey of Self-Discovery</p>
      </div>
      <!-- Mobile close button -->
      <button 
        class="lg:hidden p-2 text-white/90 hover:text-white"
        on:click={() => isOpen = false}
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Overall Progress -->
  <div class="p-6 border-b border-white/30">
    <div class="mb-3">
      <div class="flex justify-between items-center mb-2">
        <span class="text-white text-sm font-medium">Overall Progress</span>
        <span class="text-white text-sm font-bold">{Math.round(overallProgress)}%</span>
      </div>
      <div class="w-full bg-white/25 rounded-full h-2">
        <div 
          class="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-white to-white/90"
          style="width: {overallProgress}%"
        ></div>
      </div>
    </div>
    <p class="text-white/70 text-xs">{Math.round((overallProgress / 100) * 100)} of 100 questions completed</p>
  </div>
  
  <!-- Navigation Menu -->
  <div class="flex-1 overflow-y-auto sidebar-nav">
    <nav class="p-4">
      {#each courseData as day, index}
        <button
          class="w-full text-left p-3 rounded-lg transition-all duration-200 group {currentDay === day.id ? 'bg-white/25 text-white' : 'text-white/90 hover:bg-white/15 hover:text-white'}"
          on:click={() => selectDay(day)}
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium">{day.title}</span>
                {#if day.id !== 'intro'}
                  <span class="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white/90">
                    {Math.round((($answersStore[day.id] || []).filter(answer => answer && answer.trim().length > 0).length / day.questions.length) * 100)}%
                  </span>
                {/if}
              </div>
              {#if day.subtitle}
                <div class="text-xs text-white/70 mt-1">{day.subtitle}</div>
              {/if}
            </div>
            {#if day.id !== 'intro'}
              <div class="flex flex-col items-end text-xs text-white/70 ml-2">
                <div>{day.questions.length} questions</div>
              </div>
            {/if}
          </div>
        </button>
        {#if index < courseData.length - 1}
          <div class="border-b border-white/15 mx-3 my-2"></div>
        {/if}
      {/each}
    </nav>
  </div>
  
  <!-- Footer -->
  <div class="p-6 border-t border-white/30">
    <div class="text-center">
      <p class="text-white/70 text-xs">Take your time with each question</p>
      <p class="text-white/70 text-xs">Your journey matters</p>
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Prevent scroll propagation from sidebar to main content */
  .sidebar-container {
    overscroll-behavior: contain;
  }
  
  .sidebar-nav {
    overscroll-behavior: contain;
  }
</style>