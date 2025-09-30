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
      currentIndex++;
      showInfo = false;
      tick().then(() => answerEl?.focus());
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
      currentIndex--;
      showInfo = false;
      tick().then(() => answerEl?.focus());
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
  
  .shimmer-effect {
    position: relative;
    overflow: hidden;
  }
  
  .shimmer-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }
  
  .pulse-glow {
    animation: pulse-glow 2s infinite;
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
  
  .button-press {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .textarea-focus {
    transform: scale(1.01);
    box-shadow: 0 8px 25px rgba(12, 110, 120, 0.15);
  }
  
  .card-hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-2 sm:py-4 lg:py-8 xl:py-12 px-2 sm:px-4 lg:px-8 xl:px-12">
  <div class="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
    <!-- Header Card -->
    <div class="bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-xl border-b-4 border-frame p-3 sm:p-4 lg:p-6 xl:p-8 transition-all duration-300 hover:card-hover">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 lg:gap-6">
        <div class="text-center sm:text-left">
          <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-800 mb-2 sm:mb-2 lg:mb-3 bounce-in">Discover your shadows</h1>
          <p class="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-lg transition-all duration-300">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <div class="text-center sm:text-right">
          <div class="text-lg sm:text-xl lg:text-2xl xl:text-2xl font-bold text-gray-800 transition-all duration-500 bounce-in" style="animation-delay: 0.2s;">{Math.round((currentIndex / (questions.length - 1)) * 100)}%</div>
          <div class="text-xs sm:text-sm lg:text-base xl:text-base text-gray-600">Complete</div>
        </div>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-2 sm:h-3 lg:h-4 xl:h-5 mt-3 sm:mt-4 lg:mt-5 shadow-inner" role="progressbar" aria-valuenow={Math.round((currentIndex / (questions.length - 1)) * 100)} aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
        <div class="h-2 sm:h-3 lg:h-4 xl:h-5 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden progress-bar-animated" style="width: {Math.round((currentIndex / (questions.length - 1)) * 100)}%; background: linear-gradient(90deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-xl p-2 sm:p-4 lg:p-5 xl:p-6 relative transition-all duration-300 hover:card-hover">
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
                <h2 class="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3 lg:mb-4 bounce-in bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style="animation-delay: 0.1s;">{questions[displayIndex].text}</h2>
                <p class="text-sm text-gray-600 italic leading-relaxed bounce-in" style="animation-delay: 0.2s;">
                  {questions[displayIndex].explanation}
                </p>
              </div>
            </div>
            
            <div class="space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-5">
              <label for="answer" class="block text-sm sm:text-sm lg:text-base xl:text-base font-medium text-gray-600 bounce-in" style="animation-delay: 0.4s;">Your reflection:</label>
              <textarea 
                id="answer"
                bind:this={answerEl}
                value={$answersStore[displayIndex] || ''} 
                on:input={updateAnswer}
                on:focus={() => answerEl?.classList.add('textarea-focus')}
                on:blur={() => answerEl?.classList.remove('textarea-focus')}
                on:keydown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); next(); }
                  else if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); prev(); }
                }} 
                placeholder="Take your time to reflect deeply on this question..." 
                rows="6"
                autocapitalize="sentences"
                inputmode="text"
                enterkeyhint="next"
                class="w-full px-2 sm:px-3 lg:px-4 xl:px-5 py-2 sm:py-3 lg:py-3 xl:py-4 leading-relaxed text-gray-800 placeholder-gray-500 bg-white border-2 border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-y shadow-inner text-sm sm:text-base lg:text-lg xl:text-lg min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px] bounce-in"
                style="animation-delay: 0.5s;"
              ></textarea>
              
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm lg:text-base xl:text-base bounce-in" style="animation-delay: 0.6s;">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                  <span class="text-gray-500 text-xs sm:text-sm lg:text-base xl:text-base transition-all duration-300">{($answersStore[displayIndex] || '').length} characters</span>
                  <div class="hidden sm:flex items-center gap-2 text-gray-400 text-xs sm:text-sm lg:text-base xl:text-base">
                    <kbd class="px-2 py-1 bg-gray-100 rounded text-xs lg:text-sm xl:text-sm shimmer-effect">⌘ + Enter</kbd>
                    <span>to continue</span>
                  </div>
                </div>
                <div class="text-gray-400 text-xs sm:text-xs lg:text-sm xl:text-sm">
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
            class="pb-12 sm:pb-16 lg:pb-20 xl:pb-24"
          >
            <div class="mb-2 sm:mb-4 lg:mb-5 xl:mb-6">
              <div class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                <div class="flex-1 order-2 sm:order-1">
                  <h2 class="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{questions[displayIndex].text}</h2>
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
              <label for="answer-transitioning" class="block text-sm sm:text-sm lg:text-base xl:text-base font-medium text-gray-600">Your reflection:</label>
              <textarea 
                id="answer-transitioning"
                value={$answersStore[displayIndex] || ''} 
                placeholder="Take your time to reflect deeply on this question..." 
                rows="6"
                disabled
                class="w-full px-3 sm:px-4 lg:px-5 xl:px-6 py-3 sm:py-3 lg:py-4 xl:py-5 text-gray-800 placeholder-gray-500 bg-white border-2 border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-y shadow-inner opacity-75 text-sm sm:text-base lg:text-lg xl:text-lg min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]"
              ></textarea>
              
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm lg:text-base xl:text-base">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-5 xl:gap-6">
                  <span class="text-gray-500 text-xs sm:text-sm lg:text-base xl:text-base">{($answersStore[displayIndex] || '').length} characters</span>
                  <div class="flex items-center gap-2 text-gray-400 text-xs sm:text-sm lg:text-base xl:text-base">
                    <kbd class="px-2 py-1 bg-gray-100 rounded text-xs lg:text-sm xl:text-sm">⌘ + Enter</kbd>
                    <span>to continue</span>
                  </div>
                </div>
                <div class="text-gray-400 text-xs sm:text-xs lg:text-sm xl:text-base">
                  Auto-saved
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Fixed Navigation Section -->
      <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-secondary/10 p-2 sm:p-3 lg:p-4 xl:p-5 rounded-b-2xl">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
          <button 
            on:click={prev} 
            disabled={currentIndex === 0 || isTransitioning}
            class="order-2 sm:order-1 w-full sm:w-auto px-2 sm:px-3 lg:px-4 xl:px-5 py-2 sm:py-2 lg:py-2 xl:py-3 text-sm sm:text-sm lg:text-base xl:text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 rounded-xl shadow-sm"
          >
            ← Previous
          </button>
          
          <div class="flex sm:hidden items-center justify-center space-x-2">
            {#each questions as _, i}
              <div class="w-1.5 h-1.5 rounded-full cursor-pointer {i === currentIndex ? '' : i < currentIndex ? 'bg-gray-400' : 'bg-gray-300'}" style="{i === currentIndex ? 'background-color: #0C6E78;' : ''}" on:click={() => { if (!isTransitioning) { currentIndex = i; } }}></div>
            {/each}
          </div>
          
          <div class="hidden sm:flex items-center space-x-1 lg:space-x-2 xl:space-x-2 order-2">
            {#each questions as _, i}
              <div class="w-1.5 h-1.5 lg:w-2 lg:h-2 xl:w-2 xl:h-2 rounded-full cursor-pointer {i === currentIndex ? '' : i < currentIndex ? 'bg-gray-400' : 'bg-gray-300'}" style="{i === currentIndex ? 'background-color: #0C6E78;' : ''}" on:click={() => { if (!isTransitioning) { currentIndex = i; } }}></div>
            {/each}
          </div>
          
          <button 
            on:click={next} 
            disabled={isTransitioning}
            class="order-1 sm:order-3 w-full sm:w-auto px-3 sm:px-4 lg:px-5 xl:px-6 py-2 sm:py-3 lg:py-3 xl:py-4 text-sm sm:text-sm lg:text-base xl:text-base font-bold text-white rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
            style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);"
          >
            <span class="flex items-center justify-center gap-2 lg:gap-3">
              {currentIndex === questions.length - 1 ? 'Complete Journey' : 'Continue'}
              <svg class="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>