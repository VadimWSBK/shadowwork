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
        <strong>{t(currentLanguage, 'footer.disclaimerTitle')}</strong> {t(currentLanguage, 'footer.disclaimerText')}
      </p>
      <p class="text-white/50 text-xs leading-relaxed mt-2">
        <strong>{t(currentLanguage, 'footer.dataDeletionTitle')}</strong> {t(currentLanguage, 'footer.dataDeletionText')}
      </p>
    </div>
    
    <!-- Links Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      
      <!-- About -->
      <div>
        <h3 class="text-white font-semibold mb-3">{t(currentLanguage, 'footer.aboutTitle')}</h3>
        <p class="text-white/70 text-sm leading-relaxed">
          {t(currentLanguage, 'footer.aboutText')}
        </p>
      </div>
      
      <!-- Legal -->
      <div>
        <h3 class="text-white font-semibold mb-3">{t(currentLanguage, 'footer.legalTitle')}</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/privacy" class="text-white/70 hover:text-white transition-colors">
              {t(currentLanguage, 'footer.privacyPolicy')}
            </a>
          </li>
          <li>
            <a href="/terms" class="text-white/70 hover:text-white transition-colors">
              {t(currentLanguage, 'footer.termsOfService')}
            </a>
          </li>
          <li>
            <a href="/disclaimer" class="text-white/70 hover:text-white transition-colors">
              {t(currentLanguage, 'footer.disclaimer')}
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Support -->
      <div>
        <h3 class="text-white font-semibold mb-3">{t(currentLanguage, 'footer.supportTitle')}</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="/contact" class="text-white/70 hover:text-white transition-colors">
              {t(currentLanguage, 'footer.contactSupport')}
            </a>
          </li>
          <li>
            <a href="/faq" class="text-white/70 hover:text-white transition-colors">
              {t(currentLanguage, 'footer.faq')}
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="pt-6 border-t border-white/10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
        <p>{t(currentLanguage, 'footer.copyright', { year: currentYear })}</p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            {t(currentLanguage, 'footer.encrypted')}
          </span>
          <span>•</span>
          <span>{t(currentLanguage, 'footer.gdprCompliant')}</span>
        </div>
      </div>
    </div>
  </div>
</footer>

