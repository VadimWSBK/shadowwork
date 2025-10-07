<script lang="ts">
  import { courseData, type DayData } from './questions';
  import { type Writable } from 'svelte/store';
  import { tick, onMount, onDestroy } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { cubicInOut, quintOut } from 'svelte/easing';
  import { t } from './i18n';
  import { persistAnswer } from './supabaseHelpers';

  export let answersStore: Writable<Record<string, string[]>>;
  export let onDayComplete = (dayId: string) => {};
  export let onShowAnswers = () => {};
  export let username = '';
  export let profileId = '';
  export let currentDay: DayData;
  export let currentLanguage: 'en' | 'de' | 'pl' = 'en';

  let currentIndex = 0;
  let answerEl: HTMLTextAreaElement;
  let saveTimer: number;
  let isTransitioning = false;
  let direction: 'forward' | 'backward' = 'forward';
  let displayIndex = 0; // Separate display index for smoother transitions
  let showConfirmModal = false;
  let unansweredCount = 0;

  // Autosave state
  let autosaveTimer: number;
  // Track last-saved answers to avoid redundant remote writes
  let lastSavedAnswers: Record<string, string[]> = {};
  // Saving state for animated indicator
  let isSaving = false;
  let saveError = '';
  let saveSlow = false;
  let saveRetryAttempts = 0;

  // Reset currentIndex when day changes
  $: if (currentDay) {
    currentIndex = 0;
    displayIndex = 0;
    isTransitioning = false;
  }

  $: questions = currentDay.questions;
  $: current = questions[currentIndex];
  $: currentQuestion = current.text;
  $: explanation = current.explanation;
  $: dayAnswers = $answersStore[currentDay.id] || [];
  $: charCount = (dayAnswers[currentIndex] || '').length;
  $: answeredCount = dayAnswers.filter(answer => answer && answer.trim().length > 0).length;
  $: completionRate = Math.round((answeredCount / questions.length) * 100);

  // Update display index after transition completes
  $: if (!isTransitioning) {
    displayIndex = currentIndex;
  }

  // Ensure lastSavedAnswers has an array for the current day
  $: if (currentDay) {
    if (!lastSavedAnswers[currentDay.id]) {
      lastSavedAnswers[currentDay.id] = [...($answersStore[currentDay.id] || [])];
    }
  }

  async function next() {
    if (isTransitioning) return;
    await maybeSaveCurrentAnswer();
    
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      tick().then(() => answerEl?.focus());
    } else {
      const unanswered = dayAnswers.filter((a) => !a || a.trim().length === 0).length;
      if (unanswered > 0) {
        unansweredCount = unanswered;
        showConfirmModal = true;
      } else {
        onDayComplete(currentDay.id);
      }
    }
  }

  function confirmComplete() {
    showConfirmModal = false;
    onDayComplete(currentDay.id);
  }

  function cancelComplete() {
    showConfirmModal = false;
  }

  async function prev() {
    if (isTransitioning) return;
    
    if (currentIndex > 0) {
      currentIndex--;
      tick().then(() => answerEl?.focus());
    }
  }

  function updateAnswer(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    answersStore.update((allAnswers) => {
      if (!allAnswers[currentDay.id]) {
        allAnswers[currentDay.id] = [];
      }
      allAnswers[currentDay.id][currentIndex] = value;
      return allAnswers;
    });
    if (typeof window !== 'undefined' && username) {
      clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        // Persist to localStorage only; remote persistence handled by autosave/Next
        localStorage.setItem(`answers_${username}`, JSON.stringify($answersStore));
      }, 300);
    }
  }

  async function maybeSaveCurrentAnswer() {
    const dayId = currentDay.id;
    const idx = currentIndex;
    const currentValue = ($answersStore[dayId]?.[idx] || '');
    const lastSavedValue = (lastSavedAnswers[dayId]?.[idx] || '');
    const currentTrim = currentValue.trim();
    const lastTrim = lastSavedValue.trim();
    // Only save if something was entered and content changed
    if (currentTrim.length === 0 && lastTrim.length === 0) return;
    if (currentValue === lastSavedValue) return;
    if (isSaving) return;

    isSaving = true;
    saveError = '';
    saveSlow = false;
    let completed = false;
    const timerId = typeof window !== 'undefined' ? window.setTimeout(() => {
      if (!completed) {
        saveSlow = true;
      }
    }, 6000) : 0;
    // Hard-fail after 20s to avoid indefinite spinner if the network hangs
    const failAfterId = typeof window !== 'undefined' ? window.setTimeout(() => {
      if (!completed) {
        saveError = 'Save failed. Will retry.';
        saveSlow = false;
        isSaving = false;
        scheduleRetry(dayId, idx);
      }
    }, 20000) : 0;

    try {
      const { error } = await persistAnswer({
        profileId,
        username,
        dayId,
        questionIndex: idx,
        answer: currentValue,
      });
      completed = true;
      if (!error) {
        if (!lastSavedAnswers[dayId]) lastSavedAnswers[dayId] = [];
        lastSavedAnswers[dayId][idx] = currentValue;
        saveError = '';
        saveRetryAttempts = 0;
      } else {
        saveError = 'Save failed. Will retry.';
        console.warn('Persist answer failed:', error);
        scheduleRetry(dayId, idx);
      }
    } catch (e) {
      completed = true;
      saveError = 'Save failed. Will retry.';
      console.warn('Persist answer threw:', e);
      scheduleRetry(dayId, idx);
    } finally {
      isSaving = false;
      saveSlow = false;
      if (timerId) clearTimeout(timerId);
      if (failAfterId) clearTimeout(failAfterId);
    }
  }

  function scheduleRetry(dayId: string, idx: number) {
    if (typeof window === 'undefined') return;
    const attempt = Math.min(saveRetryAttempts + 1, 3);
    saveRetryAttempts = attempt;
    const delay = Math.min(16000, 2000 * Math.pow(2, attempt - 1));
    window.setTimeout(async () => {
      const currentValue = ($answersStore[dayId]?.[idx] || '');
      const lastSavedValue = (lastSavedAnswers[dayId]?.[idx] || '');
      if (currentValue.trim().length === 0) return;
      if (currentValue === lastSavedValue) return; // already saved meanwhile

      isSaving = true;
      saveSlow = false;
      saveError = '';
      try {
        const { error } = await persistAnswer({
          profileId,
          username,
          dayId,
          questionIndex: idx,
          answer: currentValue,
        });
        if (!error) {
          if (!lastSavedAnswers[dayId]) lastSavedAnswers[dayId] = [];
          lastSavedAnswers[dayId][idx] = currentValue;
          saveError = '';
          saveRetryAttempts = 0;
        } else {
          saveError = 'Save failed.';
          console.warn('Persist answer failed on retry:', error);
        }
      } catch (e) {
        saveError = 'Save failed.';
        console.warn('Persist answer threw on retry:', e);
      } finally {
        isSaving = false;
      }
    }, delay);
  }

  function autosaveTick() {
    if (typeof window === 'undefined') return;
    if (!username && !profileId) return;
    void maybeSaveCurrentAnswer();
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      autosaveTimer = window.setInterval(autosaveTick, 10000);
    }
  });

  onDestroy(() => {
    if (autosaveTimer) clearInterval(autosaveTimer);
    if (saveTimer) clearTimeout(saveTimer);
  });
</script>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(12, 110, 120, 0.4); }
    50% { box-shadow: 0 0 0 10px rgba(12, 110, 120, 0); }
  }
  
  @keyframes bounce-in {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  .bounce-in {
    animation: bounce-in 0.3s ease-out;
  }
  
  .progress-bar-animated {
    background-size: 20px 20px;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      transparent 75%,
      transparent
    );
    animation: progress-stripes 1s linear infinite;
  }
  
  @keyframes progress-stripes {
    0% { background-position: 0 0; }
    100% { background-position: 20px 0; }
  }
</style>

<div class="min-h-screen flex items-center justify-center py-4 px-4">
  <div class="w-full max-w-4xl mx-auto">

    <!-- Header -->
    <div class="p-4 mb-6">
      <!-- View Answers Button -->
      <div class="flex justify-end mb-4">
        <button 
          on:click={onShowAnswers}
          class="px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-200 rounded-lg backdrop-blur-sm border border-white/30"
        >
          {t(currentLanguage, 'questionnaire.viewAnswers')}
        </button>
      </div>
      
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div class="text-center sm:text-left">
          <h2 class="text-xl lg:text-2xl font-bold text-white mb-2 bounce-in">{currentDay.title}</h2>
          <p class="text-white/80 text-base lg:text-lg transition-all duration-300">{currentDay.subtitle}</p>
          <p class="text-white/60 text-sm lg:text-base mt-1">{t(currentLanguage, 'questionnaire.questionXofY', { x: currentIndex + 1, y: questions.length })}</p>
        </div>
        <div class="text-center sm:text-right">
          <div class="text-xl lg:text-2xl font-bold text-white transition-all duration-500 bounce-in" style="animation-delay: 0.2s;">{completionRate}%</div>
          <div class="text-sm lg:text-base text-white/70">{t(currentLanguage, 'questionnaire.complete')}</div>
        </div>
      </div>
      
      <div class="w-full bg-gray-400 rounded-full h-3 lg:h-4 mt-4" role="progressbar" aria-valuenow={completionRate} aria-valuemin="0" aria-valuemax="100" aria-label={t(currentLanguage, 'questionnaire.progressAria')}>
        <div class="h-3 lg:h-4 rounded-full transition-all duration-700 ease-out relative overflow-hidden progress-bar-animated" style="width: {completionRate}%; background: linear-gradient(90deg, #ffffff 0%, #f3f4f6 50%, #ffffff 100%);">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-4 relative">
      <div class="relative">
        {#if !isTransitioning}
          <div 
            in:fly={{ 
              x: direction === 'forward' ? 300 : -300, 
              duration: 450, 
              easing: quintOut
            }}
            class="pb-12 sm:pb-16 lg:pb-20 xl:pb-24"
          >
            <div class="mb-2 sm:mb-4 lg:mb-2 xl:mb-6">
              <div class="flex-1">
                <h2 class="text-lg lg:text-xl font-bold text-white leading-tight mb-3 bounce-in" style="animation-delay: 0.1s;">{questions[displayIndex].text}</h2>
                <p class="text-white/70 text-sm mt-2 italic">{questions[displayIndex].explanation}</p>
              </div>
            </div>
            
            <div class="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5">
              <label for="answer" class="block text-sm font-medium text-white/90 bounce-in" style="animation-delay: 0.4s;">{t(currentLanguage, 'questionnaire.reflectionLabel')}</label>
              <textarea 
                id="answer"
                bind:this={answerEl}
                value={dayAnswers[displayIndex] || ''} 
                on:input={updateAnswer}
                on:focus={() => answerEl?.classList.add('textarea-focus')}
                on:blur={() => answerEl?.classList.remove('textarea-focus')}
                on:keydown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); next(); }
                  else if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); prev(); }
                }} 
                placeholder={t(currentLanguage, 'questionnaire.reflectionPlaceholder')} 
                rows="6"
                autocapitalize="sentences"
                inputmode="text"
                enterkeyhint="next"
                class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 resize-y shadow-inner backdrop-blur-sm text-base min-h-[140px]"
              ></textarea>
              
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm bounce-in" style="animation-delay: 0.6s;">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <span class="text-white/60 text-sm transition-all duration-300">{t(currentLanguage, 'questionnaire.characters', { count: (dayAnswers[displayIndex] || '').length })}</span>
                  <span class="text-white/40 text-xs">{t(currentLanguage, 'questionnaire.aimForDetail')}</span>
                </div>
                <div class="text-white/50 text-sm">
                  {#if isSaving}
                    <span class="inline-flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 animate-spin text-white/70" viewBox="0 0 24 24" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Saving{saveSlow ? ' — taking longer…' : '…'}
                    </span>
                  {:else}
                    {saveError ? saveError : t(currentLanguage, 'questionnaire.autoSaved')}
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {:else}
          <!-- Transitioning state - show outgoing content -->
          <div 
            out:fly={{ 
              x: direction === 'forward' ? -300 : 300, 
              duration: 350, 
              easing: cubicInOut
            }}
            class="pb-12 sm:pb-16 lg:pb-20 xl:pb-24"
          >
            <div class="mb-2 sm:mb-4 lg:mb-5 xl:mb-6">
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                <div class="flex-1 order-2 sm:order-1">
                  <div class="mb-1">
                    <span class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">{currentDay.subtitle}</span>
                  </div>
                  <h2 class="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white leading-tight mb-2 sm:mb-3 lg:mb-4">{questions[displayIndex].text}</h2>
                </div>
                <button 
                  type="button" 
                  class="flex-shrink-0 order-1 sm:order-2 self-center sm:self-start w-12 h-12 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary/10 hover:bg-primary/20 dark:bg-primary-light/10 dark:hover:bg-primary-light/20 text-primary dark:text-primary-light rounded-full flex items-center justify-center text-lg sm:text-base lg:text-lg xl:text-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-secondary-dark" 
                  disabled
                >
                  ?
                </button>
              </div>
            </div>
            
            <div class="space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6">
              <label for="answer-transitioning" class="block text-sm sm:text-sm lg:text-base xl:text-base font-medium text-white/90">{t(currentLanguage, 'questionnaire.reflectionLabel')}</label>
              <textarea 
                id="answer-transitioning"
                value={dayAnswers[displayIndex] || ''} 
                placeholder={t(currentLanguage, 'questionnaire.reflectionPlaceholder')} 
                rows="6"
                disabled
                class="w-full px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3 lg:py-4 xl:py-5 text-gray-800 placeholder-gray-400 bg-gray-200 border-2 border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-primary transition-all duration-200 resize-y shadow-inner opacity-75 text-sm sm:text-base lg:text-lg xl:text-lg min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]"
              ></textarea>
              
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm lg:text-base xl:text-base">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-5 xl:gap-6">
                  <span class="text-white/60 text-xs sm:text-sm lg:text-base xl:text-base">{t(currentLanguage, 'questionnaire.characters', { count: (dayAnswers[displayIndex] || '').length })}</span>
                </div>
                <div class="text-white/50 text-xs sm:text-xs lg:text-sm xl:text-base">
                  {#if isSaving}
                    <span class="inline-flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 animate-spin text-white/70" viewBox="0 0 24 24" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Saving{saveSlow ? ' — taking longer…' : '…'}
                    </span>
                  {:else}
                    {saveError ? saveError : t(currentLanguage, 'questionnaire.autoSaved')}
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Fixed Navigation Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <div class="flex flex-row justify-between items-center gap-4">
          <button 
            on:click={prev} 
            disabled={currentIndex === 0 || isTransitioning}
            class="order-1 w-auto flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 rounded-lg backdrop-blur-sm border border-white/30"
          >
            ← Previous
          </button>
          
          <div class="hidden sm:flex items-center space-x-3 order-2">
            {#each questions as _, i}
              {@const isAnswered = dayAnswers[i] && dayAnswers[i].trim().length > 0}
              <div class="relative group">
                <button
                  class="w-4 h-4 rounded border cursor-pointer transition-all duration-200 flex items-center justify-center hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 {i === currentIndex ? 'border-white/60 bg-white/20 shadow-lg' : isAnswered ? 'border-white/40 bg-white/10' : 'border-white/20 bg-transparent'}"
                  on:click={() => { if (!isTransitioning) { currentIndex = i; } }}
                  aria-label="Go to question {i + 1}"
                >
                  {#if isAnswered}
                    <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  {/if}
                </button>
                <div class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-white text-xs font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 whitespace-nowrap" style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);">
                  {i + 1} {isAnswered ? '✓' : ''}
                </div>
              </div>
            {/each}
          </div>
          
          <button 
            on:click={next} 
            disabled={isTransitioning}
            class="order-2 w-auto flex-1 sm:flex-none px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base font-bold text-white rounded-xl shadow-lg transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background-color: #0C6E78;"
          >
            <span class="flex items-center justify-center gap-2">
              {currentIndex === questions.length - 1 ? `Complete ${currentDay.title}` : 'Next'}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
{#if showConfirmModal}
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
    transition:fade={{ duration: 300 }}
    on:click={cancelComplete}
    on:keydown={(e) => { if (e.key === 'Escape') cancelComplete(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions a11y_click_events_have_key_events -->
    <div 
      class="bg-gradient-to-br from-white/25 via-white/20 to-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 max-w-lg w-full mx-4 relative overflow-hidden"
      transition:fly={{ y: 30, duration: 400, easing: cubicInOut }}
      on:click|stopPropagation
      role="document"
    >
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-50"></div>
      
      <!-- Modal Header -->
      <div class="text-center mb-8 relative z-10">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden group" 
             style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
          <svg class="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 id="modal-title" class="text-2xl font-bold text-white mb-3 drop-shadow-sm">Complete this day?</h3>
        <p class="text-white/90 text-base leading-relaxed">
          You have <span class="font-bold text-white bg-white/20 px-2 py-1 rounded-lg">{unansweredCount}</span> unanswered {unansweredCount === 1 ? 'question' : 'questions'}. Do you want to finish this day?
        </p>
      </div>

      <!-- Modal Actions -->
      <div class="flex gap-4 justify-center relative z-10">
        <button
          on:click={cancelComplete}
          class="px-8 py-3 text-base font-semibold text-white/90 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 border border-white/40 hover:border-white/60 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
        >
          Cancel
        </button>
        <button
          on:click={confirmComplete}
          class="px-8 py-3 text-base font-bold text-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:brightness-110 relative overflow-hidden group"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
          <span class="relative z-10">OK</span>
        </button>
      </div>
    </div>
  </div>
{/if}