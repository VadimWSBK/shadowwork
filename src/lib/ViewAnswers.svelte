<script lang="ts">
  import type { DayData } from './questions';
  import { t, type Language, getDayIntro } from './i18n';
  
  export let answers: string[];
  export let username: string;
  export let currentDay: DayData;
  export let onBack = () => {};
  export let onUpdateAnswer: (index: number, answer: string) => Promise<{ success: boolean; error?: any }> = async () => ({ success: false });
  export let currentLanguage: Language = 'en';

  let editingIndex: number | null = null;
  let editingText = '';
  let isSaving = false;
  let saveError = '';

  // Use currentDay.questions instead of importing questions
  $: questions = currentDay.questions;

  function startEditing(index: number) {
    editingIndex = index;
    editingText = answers[index] || '';
    saveError = '';
  }

  async function saveEdit() {
    if (editingIndex === null) return;
    
    // Prevent double-clicking the save button
    if (isSaving) {
      console.log('⚠️ Save already in progress, ignoring duplicate request');
      return;
    }
    
    isSaving = true;
    saveError = '';
    
    try {
      console.log('💾 Starting save operation for index:', editingIndex);
      const result = await onUpdateAnswer(editingIndex, editingText);
      
      if (result.success) {
        console.log('✅ Save successful, closing editor');
        // Update the local answers array to reflect the change immediately in the UI
        answers[editingIndex] = editingText;
        editingIndex = null;
        editingText = '';
      } else {
        console.error('❌ Save failed:', result.error);
        saveError = result.error?.message || 'Save failed. Please try again.';
      }
    } catch (error) {
      console.error('💥 Save threw exception:', error);
      saveError = 'An unexpected error occurred. Please try again.';
    } finally {
      isSaving = false;
    }
  }

  function cancelEdit() {
    editingIndex = null;
    editingText = '';
    saveError = '';
  }
</script>

<div class="bg-gradient-to-br from-primary-light via-primary to-secondary-dark p-2 sm:py-6 sm:px-4 lg:py-8 lg:px-8">
  <div class="max-w-3xl mx-auto">
<!-- Header -->
<div class="mb-6 sm:mb-8">
  <!-- Day Title and Description -->
  <div class="mb-4">
    <h1 class="text-2xl lg:text-3xl font-bold text-white mb-1">{getDayIntro(currentLanguage, currentDay.id)?.title ?? currentDay.title}</h1>
    <p class="text-white/80 text-sm lg:text-base">{getDayIntro(currentLanguage, currentDay.id)?.theme ?? currentDay.subtitle}</p>
  </div>
  
  <div class="flex justify-between items-center">
    <div>
      <p class="text-white/80">{t(currentLanguage, 'answers.byUser', { username })}</p>
    </div>
    <button
      on:click={onBack}
      class="px-6 py-3 text-sm font-medium text-white rounded shadow-lg transition-all duration-200 hover:opacity-90"
      style="background-color: #0C6E78;"
    >
      <span class="relative z-10 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        {t(currentLanguage, 'answers.backToQuestionnaire')}
      </span>
    </button>
  </div>
</div>

<!-- Content -->
<div class="space-y-4 sm:space-y-5 lg:space-y-6">
  {#each questions as question, i}
    <div class="bg-gradient-to-r from-white/10 to-white/20 rounded border border-white/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden backdrop-blur-sm">
      <!-- Question Header -->
      <div class="p-4 sm:p-5 lg:p-6 border-b border-white/20">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 text-white/80 font-bold text-lg">
            {i + 1}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-white leading-relaxed mb-2">
              {question.text}
            </h3>
            <p class="text-sm text-white/70 italic leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>
      </div>
      <!-- Answer Section -->
      <div class="p-4 sm:p-5 lg:p-6">
        {#if editingIndex === i}
          <!-- Edit Mode -->
          <div class="space-y-4">
            <textarea 
              bind:value={editingText}
              placeholder={t(currentLanguage, 'answers.shareReflection')}
              rows="6"
              class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 resize-y shadow-inner backdrop-blur-sm text-base min-h-[140px]"
            ></textarea>
            
            <div class="flex justify-end gap-3">
              <button
                on:click={cancelEdit}
                class="px-4 py-2 text-sm font-medium text-white/80 bg-white/20 hover:bg-white/30 rounded transition-all duration-200 border border-white/30"
              >
                {t(currentLanguage, 'answers.cancel')}
              </button>
              <button
                on:click={saveEdit}
                disabled={isSaving}
                class="px-6 py-2 text-sm font-bold text-white rounded shadow-md transition-all duration-200 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative z-10 flex items-center gap-2">
                  {#if isSaving}
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  {/if}
                  {isSaving ? 'Saving...' : t(currentLanguage, 'answers.saveChanges')}
                </span>
              </button>
            </div>
            {#if saveError}
              <p class="text-red-300 text-sm mt-2">{saveError}</p>
            {/if}
          </div>
        {:else}
          <!-- View Mode -->
          <div class="group">
            {#if answers[i] && answers[i].trim()}
              <div class="relative">
                <div class="bg-white/20 rounded p-6 border border-white/30 shadow-inner min-h-[120px] relative group-hover:border-white/50 transition-all duration-200 backdrop-blur-sm">
                  <p class="text-white/90 leading-relaxed whitespace-pre-wrap text-base">
                    {answers[i]}
                  </p>
                  
                  <!-- Edit Button - Always visible -->
                  <button
                    on:click={() => startEditing(i)}
                    class="absolute top-4 right-4 w-10 h-10 sm:w-8 sm:h-8 bg-white/20 hover:bg-[#0C6E78] text-white/70 hover:text-white rounded flex items-center justify-center transition-all duration-200 opacity-100 border border-white/30"
                    title={t(currentLanguage, 'answers.editAnswer')}
                    aria-label={t(currentLanguage, 'answers.editAnswer')}
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Character Count -->
                <div class="mt-2 text-xs text-white/60 text-right">
                  {t(currentLanguage, 'questionnaire.characters', { count: answers[i].length })}
                </div>
              </div>
            {:else}
              <div class="bg-white/10 rounded p-6 border-2 border-dashed border-white/30 text-center min-h-[120px] flex items-center justify-center relative group-hover:border-white/50 transition-all duration-200 backdrop-blur-sm">
                <div>
                  <p class="text-white/70 italic mb-3">{t(currentLanguage, 'answers.noResponse')}</p>
                  <button
                    on:click={() => startEditing(i)}
                    class="px-4 py-2 text-sm font-medium text-white rounded shadow-md transition-all duration-200"
                    style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
                  >
                    {t(currentLanguage, 'answers.addResponse')}
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
<!-- Summary Stats -->
<div class="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-7 lg:pt-8 border-t border-white/30">
  <h2 class="text-xl font-semibold text-white mb-4 sm:mb-5 lg:mb-6 text-center">{t(currentLanguage, 'answers.daySummary')}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
    <div class="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-white/10 to-white/20 rounded border border-white/30 shadow-sm backdrop-blur-sm">
      <div class="text-3xl font-bold text-white mb-2">
        {answers.filter(a => a && a.trim()).length}
      </div>
      <div class="text-sm text-white/90 font-medium">
        {t(currentLanguage, 'answers.questionsAnswered')}
      </div>
    </div>
    
    <div class="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-white/10 to-white/20 rounded border border-white/30 shadow-sm backdrop-blur-sm">
      <div class="text-3xl font-bold text-white mb-2">
        {answers.filter(a => a && a.trim()).reduce((total, answer) => total + answer.length, 0).toLocaleString()}
      </div>
      <div class="text-sm text-white/90 font-medium">
        {t(currentLanguage, 'answers.totalCharacters')}
      </div>
    </div>
    
    <div class="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-white/10 to-white/20 rounded border border-white/30 shadow-sm backdrop-blur-sm">
      <div class="text-3xl font-bold text-white mb-2">
        {Math.round((answers.filter(a => a && a.trim()).length / questions.length) * 100)}%
      </div>
      <div class="text-sm text-white/90 font-medium">
        {t(currentLanguage, 'answers.completionRate')}
      </div>
    </div>
  </div>
        
        <div class="mt-6 sm:mt-7 lg:mt-8 text-center">
          <div class="bg-gradient-to-r from-white/10 to-white/20 rounded p-4 sm:p-5 lg:p-6 border border-white/30">
            <p class="text-white/90 text-base leading-relaxed max-w-3xl mx-auto">
              {t(currentLanguage, 'answers.summaryParagraph')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>