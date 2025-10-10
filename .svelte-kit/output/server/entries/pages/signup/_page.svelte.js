import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import "../../../chunks/supabaseClient.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { t } from "../../../chunks/i18n.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let unsub = null;
    let currentLanguage = "en";
    let languageMenuOpen = false;
    onDestroy(() => {
      try {
        unsub?.data?.subscription?.unsubscribe?.();
      } catch {
      }
    });
    $$renderer2.push(`<div class="signup-page min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"><div class="fixed top-4 right-4 z-50"><div class="relative"><button class="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded bg-white/15 text-white/90 hover:bg-white/20 transition-colors focus:outline-none" aria-haspopup="menu"${attr("aria-expanded", languageMenuOpen)} title="Change language"><span class="text-xs font-semibold tracking-wide">${escape_html(currentLanguage.toUpperCase())}</span></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="w-full max-w-md"><div class="p-8"><div class="text-center mb-8"><div class="w-16 h-16 bg-white/20 border border-white/30 rounded mx-auto mb-4 flex items-center justify-center shadow-md backdrop-blur-sm"><svg class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div> <h1 class="text-2xl font-bold text-white mb-1">${escape_html(t(currentLanguage, "login.title"))}</h1> <h2 class="text-3xl font-bold text-white mb-2">${escape_html(t(currentLanguage, "signup.title"))}</h2> <p class="text-white/80">${escape_html(t(currentLanguage, "signup.subtitle"))}</p></div> <form class="space-y-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-white/80 text-sm">Validating invite link…</div>`);
    }
    $$renderer2.push(`<!--]--></form> <div class="mt-8 pt-6 border-t border-white/20"><p class="text-xs text-white/70 text-center leading-relaxed">${escape_html(t(currentLanguage, "signup.disclaimer"))}</p></div></div></div></div>`);
  });
}
export {
  _page as default
};
