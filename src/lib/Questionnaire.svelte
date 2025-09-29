<script lang="ts">
  import { questions } from './questions';
  import { type Writable } from 'svelte/store';
  import { tick } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { cubicInOut, quintOut } from 'svelte/easing';

  export let answersStore: Writable<string[]>;
  export let onComplete = () => {};
  export let username = '';

  let currentIndex = 0;
  let showInfo = false;
  let answerEl: HTMLTextAreaElement;
  let saveTimer: number;
  let isTransitioning = false;
  let direction: 'forward' | 'backward' = 'forward';
  let displayIndex = 0; // Separate display index for smoother transitions

  $: current = questions[currentIndex];
  $: currentQuestion = current.text;
  $: explanation = current.explanation;
  $: charCount = ($answersStore[currentIndex] || '').length;

  // Update display index after transition completes
  $: if (!isTransitioning) {
    displayIndex = currentIndex;
  }

  async function next() {
    if (isTransitioning) return;
    
    if (currentIndex < questions.length - 1) {
      isTransitioning = true;
      direction = 'forward';
      
      // Wait for exit animation to complete before updating
      setTimeout(() => {
        currentIndex++;
        showInfo = false;
        
        // Wait for enter animation to complete
        setTimeout(() => {
          isTransitioning = false;
          tick().then(() => answerEl?.focus());
        }, 450);
      }, 350);
    } else {
      const unanswered = $answersStore.filter((a) => !a || a.trim().length === 0).length;
      if (unanswered > 0) {
        const proceed = confirm(`You have ${unanswered} unanswered ${unanswered === 1 ? 'question' : 'questions'}. Do you want to finish?`);
        if (!proceed) return;
      }
      onComplete();
    }
  }

  async function prev() {
    if (isTransitioning) return;
    
    if (currentIndex > 0) {
      isTransitioning = true;
      direction = 'backward';
      
      // Wait for exit animation to complete before updating
      setTimeout(() => {
        currentIndex--;
        showInfo = false;
        
        // Wait for enter animation to complete
        setTimeout(() => {
          isTransitioning = false;
          tick().then(() => answerEl?.focus());
        }, 450);
      }, 350);
    }
  }

  function updateAnswer(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    answersStore.update((a: string[]) => {
      a[currentIndex] = value;
      return a;
    });
    if (typeof window !== 'undefined' && username) {
      clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        localStorage.setItem(`answers_${username}`, JSON.stringify($answersStore));
      }, 300);
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-4xl mx-auto">
    <!-- Header Card -->
    <div class="bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-xl border-b-4 border-frame p-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Discover your shadows</h1>
          <p class="text-gray-600">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-gray-800">{Math.round((currentIndex / (questions.length - 1)) * 100)}%</div>
          <div class="text-sm text-gray-600">Complete</div>
        </div>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-4 mt-4 shadow-inner" role="progressbar" aria-valuenow={Math.round((currentIndex / (questions.length - 1)) * 100)} aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
        <div class="h-4 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden" style="width: {Math.round((currentIndex / (questions.length - 1)) * 100)}%; background: linear-gradient(90deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-xl p-8 relative overflow-hidden">
      <div class="relative min-h-[400px]">
        {#if !isTransitioning}
          <div 
            in:fly={{ 
              x: direction === 'forward' ? 300 : -300, 
              duration: 450, 
              easing: quintOut
            }}
            class="absolute inset-0"
          >
            <div class="mb-8">
              <div class="flex items-start gap-4">
                <div class="flex-1">
                  <h2 class="text-xl font-semibold text-gray-800 leading-relaxed mb-4">{questions[displayIndex].text}</h2>
                </div>
                <button 
                  type="button" 
                  class="flex-shrink-0 w-10 h-10 bg-primary/10 hover:bg-primary/20 dark:bg-primary-light/10 dark:hover:bg-primary-light/20 text-primary dark:text-primary-light rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-secondary-dark" 
                  aria-expanded={showInfo} 
                  aria-controls="explanation" 
                  on:click={() => (showInfo = !showInfo)} 
                  title="Show explanation"
                >
                  ?
                </button>
              </div>
              
              {#if showInfo}
                <div id="explanation" class="mt-4 bg-frame/10 border-l-4 border-frame p-4 rounded-r-lg" 
                     in:slide={{ duration: 300, easing: quintOut }} 
                     out:slide={{ duration: 200, easing: cubicInOut }}>
                  <p class="text-gray-700 text-sm leading-relaxed">{questions[displayIndex].explanation}</p>
                </div>
              {/if}
            </div>
            
            <div class="space-y-4">
              <label for="answer" class="block text-sm font-medium text-gray-600">Your reflection:</label>
              <textarea 
                id="answer"
                bind:this={answerEl}
                value={$answersStore[displayIndex] || ''} 
                on:input={updateAnswer}
                on:keydown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); next(); }
                  else if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); prev(); }
                }} 
                placeholder="Take your time to reflect deeply on this question..." 
                rows="8"
                class="w-full px-4 py-3 text-gray-800 placeholder-gray-500 bg-white border-2 border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none shadow-inner"
              ></textarea>
              
              <div class="flex justify-between items-center text-sm">
                <div class="flex items-center gap-4">
                  <span class="text-gray-500">{($answersStore[displayIndex] || '').length} characters</span>
                  <div class="flex items-center gap-2 text-gray-400">
                    <kbd class="px-2 py-1 bg-gray-100 rounded text-xs">⌘ + Enter</kbd>
                    <span>to continue</span>
                  </div>
                </div>
                <div class="text-gray-400 text-xs">
                  Auto-saved
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
            class="absolute inset-0"
          >
            <div class="mb-8">
              <div class="flex items-start gap-4">
                <div class="flex-1">
                  <h2 class="text-xl font-semibold text-gray-800 leading-relaxed mb-4">{questions[displayIndex].text}</h2>
                </div>
                <button 
                  type="button" 
                  class="flex-shrink-0 w-10 h-10 bg-primary/10 hover:bg-primary/20 dark:bg-primary-light/10 dark:hover:bg-primary-light/20 text-primary dark:text-primary-light rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-secondary-dark" 
                  disabled
                  title="Show explanation"
                >
                  ?
                </button>
              </div>
            </div>
            
            <div class="space-y-4">
              <label for="answer-transitioning" class="block text-sm font-medium text-gray-600">Your reflection:</label>
              <textarea 
                id="answer-transitioning"
                value={$answersStore[displayIndex] || ''} 
                placeholder="Take your time to reflect deeply on this question..." 
                rows="8"
                disabled
                class="w-full px-4 py-3 text-gray-800 placeholder-gray-500 bg-white border-2 border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none shadow-inner opacity-75"
              ></textarea>
              
              <div class="flex justify-between items-center text-sm">
                <div class="flex items-center gap-4">
                  <span class="text-gray-500">{($answersStore[displayIndex] || '').length} characters</span>
                  <div class="flex items-center gap-2 text-gray-400">
                    <kbd class="px-2 py-1 bg-gray-100 rounded text-xs">⌘ + Enter</kbd>
                    <span>to continue</span>
                  </div>
                </div>
                <div class="text-gray-400 text-xs">
                  Auto-saved
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <div class="flex justify-between items-center mt-8 pt-6 border-t border-secondary/10">
        <button 
          on:click={prev} 
          disabled={currentIndex === 0 || isTransitioning}
          class="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl shadow-sm"
        >
          ← Previous
        </button>
        
        <div class="hidden sm:flex items-center space-x-2">
          {#each questions as _, i}
            <div class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex ? 'scale-125' : i < currentIndex ? 'bg-gray-400' : 'bg-gray-300'}" style="{i === currentIndex ? 'background-color: #0C6E78;' : ''}"></div>
          {/each}
        </div>
        
        <button 
          on:click={next} 
          disabled={isTransitioning}
          class="px-8 py-4 text-sm font-bold text-white rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
          <span class="relative z-10 flex items-center gap-2">
            {currentIndex === questions.length - 1 ? 'Complete Journey' : 'Continue'}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>