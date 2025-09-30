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
    <!-- Removed box background, border and heavy shadow to fit app layout -->
    <div class="p-8">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-white/20 border border-white/30 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md backdrop-blur-sm">
          <svg class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Shadow Work Course</h1>
        <p class="text-white/80">7-Day Journey of Self-Discovery</p>
      </div>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-white/80 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            bind:value={username}
            placeholder="Enter your name to begin..."
            required
            class="w-full px-4 py-3 leading-relaxed text-white placeholder-white/60 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200 shadow-inner backdrop-blur-sm"
          />
        </div>
        
        <button
          type="submit"
          disabled={!username.trim()}
          class="w-full px-6 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%);"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="relative z-10">Start Your Journey</span>
        </button>
      </form>
      
      <div class="mt-8 pt-6 border-t border-white/20">
        <p class="text-xs text-white/70 text-center leading-relaxed">
          This is a safe space for self-reflection. Your responses are private and stored locally on your device.
        </p>
      </div>
    </div>
  </div>
</div>