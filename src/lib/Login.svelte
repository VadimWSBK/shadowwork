<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{ login: { username: string } }>();
  
  let username = '';
  
  function handleSubmit() {
    if (username.trim()) {
      dispatch('login', { username: username.trim() });
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md">
    <div class="bg-white/95 backdrop-blur-sm dark:bg-secondary-dark/95 rounded-2xl shadow-xl p-8 border-t-4 border-frame">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg class="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Shadow Work Course</h1>
        <p class="text-gray-600">7-Day Journey of Self-Discovery</p>
      </div>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-600 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            bind:value={username}
            placeholder="Enter your name to begin..."
            required
            class="w-full px-4 py-3 text-gray-800 placeholder-gray-500 bg-white border-2 border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-inner"
          />
        </div>
        
        <button
          type="submit"
          disabled={!username.trim()}
          class="w-full px-6 py-3 text-gray-900 font-semibold bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl shadow-sm"
        >
          Start Your Journey
        </button>
      </form>
      
      <div class="mt-8 pt-6 border-t border-secondary/10">
        <p class="text-xs text-gray-500 text-center leading-relaxed">
          This is a safe space for self-reflection. Your responses are private and stored locally on your device.
        </p>
      </div>
    </div>
  </div>
</div>