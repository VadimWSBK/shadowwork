import { J as bind_props } from "./index2.js";
import { o as onDestroy } from "./index-server.js";
import { t } from "./i18n.js";
import "./supabaseClient.js";
import { j as fallback } from "./utils2.js";
import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function Login($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentLanguage = fallback($$props["currentLanguage"], "en");
    let languageMenuOpen = false;
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative"><div class="fixed top-4 right-4 z-50"><div class="relative"><button class="inline-flex items-center justify-center w-10 h-10 rounded bg-white/15 border text-white/90 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50" style="border-image: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%) 1;" aria-haspopup="menu"${attr("aria-expanded", languageMenuOpen)} title="Change language"><span class="sr-only">Change language</span> <span class="text-sm font-medium">${escape_html(currentLanguage.toUpperCase())}</span></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="w-full max-w-md"><div class="p-8"><div class="text-center mb-8"><div class="w-16 h-16 bg-white/20 border border-white/30 rounded mx-auto mb-4 flex items-center justify-center shadow-md backdrop-blur-sm"><svg class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div> <h1 class="text-3xl font-bold text-white mb-2 font-primary">${escape_html(t(currentLanguage, "login.title"))}</h1> <p class="text-white/80 font-secondary">${escape_html(t(currentLanguage, "login.subtitle"))}</p></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-8 pt-6 border-t border-white/20"><p class="text-xs text-white/70 text-center leading-relaxed">${escape_html(t(currentLanguage, "login.disclaimer"))}</p></div></div></div></div>`);
    bind_props($$props, { currentLanguage });
  });
}
export {
  Login as L
};
