<script lang="ts">
  import { t, getDaySummary, type Language } from './i18n';
  import type { DayData } from './questions';
  import type { Writable } from 'svelte/store';
  import Footer from './Footer.svelte';
  
  export let courseData: DayData[];
  export let answersStore: Writable<Record<string, string[]>>;
  export let username: string;
  export let currentLanguage: Language;
  export let onDayChange: (day: DayData) => void;
  export let onStartIntro: () => void;
  
  $: answers = $answersStore;
  
  // Check if answers are loaded
  $: answersLoaded = answers && Object.keys(answers).length > 0;
  
  // Calculate overall statistics
  $: totalQuestions = courseData.slice(1).reduce((sum, day) => sum + day.questions.length, 0);
  $: totalAnswered = answers ? courseData.slice(1).reduce((sum, day) => {
    const dayAnswers = answers[day.id] || [];
    return sum + dayAnswers.filter(a => a && a.trim().length > 0).length;
  }, 0) : 0;
  $: overallCompletion = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
  $: totalWords = answers ? courseData.slice(1).reduce((sum, day) => {
    const dayAnswers = answers[day.id] || [];
    return sum + dayAnswers.reduce((wordSum, a) => {
      if (!a || a.trim().length === 0) return wordSum;
      return wordSum + a.trim().split(/\s+/).length;
    }, 0);
  }, 0) : 0;
  
  // Days completed (100% answered)
  $: daysCompleted = answers ? courseData.slice(1).filter(day => {
    const dayAnswers = answers[day.id] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return answered === day.questions.length;
  }).length : 0;
  
  // Current day (first day with incomplete answers or last day)
  $: currentDay = answers ? (courseData.slice(1).find(day => {
    const dayAnswers = answers[day.id] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return answered < day.questions.length;
  }) || courseData[courseData.length - 1]) : courseData[courseData.length - 1];
  
  // Get completion rate for a specific day
  function getDayCompletion(dayId: string): number {
    const day = courseData.find(d => d.id === dayId);
    if (!day || day.questions.length === 0 || !answers) return 0;
    const dayAnswers = answers[dayId] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return Math.round((answered / day.questions.length) * 100);
  }
  
  // Get character count for a day
  function getDayCharacters(dayId: string): number {
    if (!answers) return 0;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.reduce((sum, a) => sum + (a?.length || 0), 0);
  }

  // Get word count for a day
  function getDayWords(dayId: string): number {
    if (!answers) return 0;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.reduce((sum, a) => {
      if (!a || a.trim().length === 0) return sum;
      return sum + a.trim().split(/\s+/).length;
    }, 0);
  }
  
  // Check if day is started
  function isDayStarted(dayId: string): boolean {
    if (!answers) return false;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.some(a => a && a.trim().length > 0);
  }
</script>

<div class="min-h-screen p-4 sm:p-6 lg:p-10">
  <div class="max-w-7xl mx-auto space-y-6">
    
    {#if !answersLoaded}
      <!-- Loading state -->
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white/70">Loading your journey...</p>
        </div>
      </div>
    {:else}
    
    <!-- Welcome Header -->
    <div class="relative overflow-hidden rounded bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 p-8 shadow-2xl">
      <div class="relative z-10">
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome back, {username}! 👋
        </h1>
        <p class="text-white/80 text-lg">
          {#if overallCompletion === 100}
            🎉 Congratulations! You've completed your shadow work journey.
          {:else if overallCompletion === 0}
            Ready to begin your journey of self-discovery?
          {:else if overallCompletion < 30}
            You're just getting started. Keep going!
          {:else if overallCompletion < 70}
            You're making great progress. Stay committed!
          {:else}
            Almost there! Finish strong!
          {/if}
        </p>
      </div>
      
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-50"></div>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Overall Progress -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide">Overall Progress</h3>
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-2">{overallCompletion}%</div>
        <div class="w-full bg-white/20 rounded-full h-2">
          <div 
            class="bg-green-500 h-2 rounded-full"
            style="width: {overallCompletion}%"
          ></div>
        </div>
      </div>

      <!-- Questions Answered -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide">Questions</h3>
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1">{totalAnswered}/{totalQuestions}</div>
        <p class="text-white/60 text-sm">questions answered</p>
      </div>

      <!-- Days Completed -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide">Days Done</h3>
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1">{daysCompleted}/7</div>
        <p class="text-white/60 text-sm">days completed</p>
      </div>

      <!-- Total Words -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide">Written</h3>
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1">{totalWords}</div>
        <p class="text-white/60 text-sm">words written</p>
      </div>
    </div>

    <!-- Continue Journey / Getting Started -->
    {#if overallCompletion > 0 && overallCompletion < 100}
      <div class="bg-gradient-to-br from-[#0C6E78]/30 to-[#0A5A63]/30 backdrop-blur-xl border border-[#0C6E78]/50 rounded p-6 shadow-lg">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-white mb-2">Continue Your Journey</h2>
            <p class="text-white/80 text-sm">
              {currentDay.title}: {currentDay.subtitle}
            </p>
            <p class="text-white/60 text-sm mt-1">
              {getDayCompletion(currentDay.id)}% complete
            </p>
          </div>
          <button
            on:click={() => onDayChange(currentDay)}
            class="px-6 py-3 text-base font-bold text-white rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group border whitespace-nowrap"
            style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            <span class="relative z-10 flex items-center gap-2">
              Continue
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    {:else if overallCompletion === 0}
      <div class="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-white mb-2">Ready to Begin?</h2>
            <p class="text-white/80 text-sm">
              Start with the introduction to understand what shadow work is and how this journey will unfold.
            </p>
          </div>
          <button
            on:click={onStartIntro}
            class="px-6 py-3 text-base font-bold text-white rounded shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group border whitespace-nowrap"
            style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
            <span class="relative z-10 flex items-center gap-2">
              View Introduction
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-gradient-to-br from-green-500/30 to-green-600/30 backdrop-blur-xl border border-green-400/50 rounded p-6 shadow-lg">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white mb-1">Journey Complete! 🎉</h2>
            <p class="text-white/80 text-sm">
              You've completed all 7 days. Review your answers anytime or restart your journey.
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Days Overview -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-white">Your Journey</h2>
        <button
          on:click={onStartIntro}
          class="text-white/70 hover:text-white text-sm flex items-center gap-2 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          View Introduction
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each courseData.slice(1) as day, index}
          {@const completion = getDayCompletion(day.id)}
          {@const isComplete = completion === 100}
          {@const isStarted = isDayStarted(day.id)}
          {@const isCurrent = currentDay?.id === day.id}
          {@const words = getDayWords(day.id)}
          
          <button
            on:click={() => onDayChange(day)}
            class="group relative bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/30 hover:border-white/40 rounded p-6 shadow-lg transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-lg"
            class:ring-2={isCurrent}
            class:ring-[#0C6E78]={isCurrent}
          >
            {#if isCurrent}
              <div class="absolute top-3 right-3 px-2 py-1 bg-[#0C6E78] text-white text-xs font-bold rounded">
                CURRENT
              </div>
            {/if}
            
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="text-white text-sm font-semibold uppercase tracking-wide mb-1">
                  Day {index + 1}
                </div>
                <h3 class="text-lg font-bold text-white mb-1">{day.subtitle}</h3>
              </div>
              
              {#if isComplete}
                <div class="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              {:else if isStarted}
                <div class="w-10 h-10 bg-[#0C6E78]/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              {:else}
                <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              {/if}
            </div>
            
            <p class="text-white/70 text-sm mb-4 line-clamp-2">
              {getDaySummary(currentLanguage, day.id)}
            </p>
            
            <!-- Progress Bar -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-white/60">{completion}% complete</span>
                <span class="text-white/60">{day.questions.length} questions</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  class="h-1.5 rounded-full bg-green-500"
                  style="width: {completion}%"
                ></div>
              </div>
              
              {#if words > 0}
                <div class="text-xs text-white/50">
                  {words} words written
                </div>
              {/if}
            </div>
            
            <!-- Hover effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded pointer-events-none"></div>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Footer -->
    <Footer {currentLanguage} />
    
    {/if}
  </div>
</div>

