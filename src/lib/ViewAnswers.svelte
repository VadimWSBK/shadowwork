<script lang="ts">
  import { questions } from './questions';
  
  export let answers: string[];
  export let username: string;
  export let onBack = () => {};
  export let onUpdateAnswer: (index: number, answer: string) => void = () => {};

  let editingIndex: number | null = null;
  let editingText = '';

  function startEditing(index: number) {
    editingIndex = index;
    editingText = answers[index] || '';
  }

  function saveEdit() {
    if (editingIndex !== null) {
      onUpdateAnswer(editingIndex, editingText);
      editingIndex = null;
      editingText = '';
    }
  }

  function cancelEdit() {
    editingIndex = null;
    editingText = '';
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-xl border-b-4 border-frame p-6 mb-0">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Discover your shadows</h1>
          <p class="text-gray-600">Reflections by <span class="font-semibold text-gray-800">{username}</span></p>
        </div>
        <button
          on:click={onBack}
          class="px-6 py-3 text-sm font-medium text-white rounded-xl shadow-lg transition-all duration-200 relative overflow-hidden group"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 50%, #0C6E78 100%);"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="relative z-10 flex items-center gap-2">
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Questions
          </span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-xl p-8">
      <div class="space-y-6">
        {#each questions as question, i}
          <div class="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <!-- Question Header -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                     style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);">
                  {i + 1}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-gray-800 leading-relaxed mb-2">
                    {question.text}
                  </h3>
                  <p class="text-sm text-gray-600 italic leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Answer Section -->
            <div class="p-6">
              {#if editingIndex === i}
                <!-- Edit Mode -->
                <div class="space-y-4">
                  <textarea 
                    bind:value={editingText}
                    placeholder="Share your reflection..."
                    rows="6"
                    class="w-full px-4 py-3 text-gray-800 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 resize-none shadow-inner"
                  ></textarea>
                  
                  <div class="flex justify-end gap-3">
                    <button
                      on:click={cancelEdit}
                      class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      on:click={saveEdit}
                      class="px-6 py-2 text-sm font-bold text-white rounded-lg shadow-md transition-all duration-200 relative overflow-hidden group"
                      style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span class="relative z-10">Save Changes</span>
                    </button>
                  </div>
                </div>
              {:else}
                <!-- View Mode -->
                <div class="group">
                  {#if answers[i] && answers[i].trim()}
                    <div class="relative">
                      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-inner min-h-[120px] relative group-hover:border-gray-300 transition-all duration-200">
                        <p class="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                          {answers[i]}
                        </p>
                        
                        <!-- Edit Button -->
                        <button
                          on:click={() => startEditing(i)}
                          class="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-[#0C6E78] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                          title="Edit answer"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <!-- Character Count -->
                      <div class="mt-2 text-xs text-gray-500 text-right">
                        {answers[i].length} characters
                      </div>
                    </div>
                  {:else}
                    <div class="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 text-center min-h-[120px] flex items-center justify-center relative group-hover:border-gray-400 transition-all duration-200">
                      <div>
                        <p class="text-gray-500 italic mb-3">No response provided</p>
                        <button
                          on:click={() => startEditing(i)}
                          class="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-md transition-all duration-200"
                          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
                        >
                          Add Response
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
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6 text-center">Journey Summary</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-[#0C6E78]/5 to-[#0C6E78]/10 rounded-xl border border-[#0C6E78]/20 shadow-sm">
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {answers.filter(a => a && a.trim()).length}
            </div>
            <div class="text-sm text-gray-600 font-medium">
              Questions Answered
            </div>
          </div>
          
          <div class="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 shadow-sm">
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {answers.filter(a => a && a.trim()).reduce((total, answer) => total + answer.length, 0).toLocaleString()}
            </div>
            <div class="text-sm text-gray-600 font-medium">
              Total Characters
            </div>
          </div>
          
          <div class="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 shadow-sm">
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {Math.round((answers.filter(a => a && a.trim()).length / questions.length) * 100)}%
            </div>
            <div class="text-sm text-gray-600 font-medium">
              Completion Rate
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <div class="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200">
            <p class="text-gray-700 text-base leading-relaxed max-w-3xl mx-auto">
              Your journey of self-discovery is ongoing. These reflections are stepping stones toward greater self-awareness and personal growth. 
              Consider revisiting these questions periodically as you continue to evolve.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>