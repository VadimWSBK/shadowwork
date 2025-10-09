<script lang="ts">
  import { t, type Language } from './i18n';
  
  export let currentLanguage: Language = 'en';
  
  const currentYear = new Date().getFullYear();
</script>

<footer class="mt-16 border-t border-white/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Disclaimer Notice -->
    <div class="border-t border-white/10 pt-6 mb-8">
      <p class="text-white/60 text-xs leading-relaxed">
        <strong>Disclaimer:</strong> This journaling course is designed for self-reflection and personal growth. 
        It is not intended as a substitute for professional therapy, counseling, or medical advice. 
        If you're experiencing mental health concerns, please consult with a qualified healthcare professional.
      </p>
      <p class="text-white/50 text-xs leading-relaxed mt-2">
        <strong>Data Deletion:</strong> Account deletion is immediate and irreversible. All data is permanently removed with no backup copies.
      </p>
    </div>
    
    <!-- Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      
      <!-- About -->
      <div>
        <h3 class="text-white font-semibold mb-3">About</h3>
        <p class="text-white/70 text-sm leading-relaxed">
          Shadow Work Course is a 7-day guided journey for self-discovery and emotional awareness. 
          Explore your inner world with compassion and honesty.
        </p>
      </div>
      
      <!-- Legal -->
      <div>
        <h3 class="text-white font-semibold mb-3">Legal</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/privacy" class="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" class="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/disclaimer" class="text-white/70 hover:text-white transition-colors">
              Disclaimer
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Support -->
      <div>
        <h3 class="text-white font-semibold mb-3">Support</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/contact" class="text-white/70 hover:text-white transition-colors">
              Contact Support
            </a>
          </li>
          <li>
            <a href="/faq" class="text-white/70 hover:text-white transition-colors">
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="pt-6 border-t border-white/10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
        <p>© {currentYear} Shadow Work Course. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            End-to-end encrypted
          </span>
          <span>•</span>
          <span>GDPR Compliant</span>
        </div>
      </div>
    </div>
  </div>
</footer>

