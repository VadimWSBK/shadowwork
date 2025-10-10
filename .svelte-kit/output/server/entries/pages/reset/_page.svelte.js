import "clsx";
import { o as onDestroy } from "../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/supabaseClient.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let unsub;
    onDestroy(() => {
      try {
        unsub?.data?.subscription?.unsubscribe?.();
      } catch {
      }
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"><div class="w-full max-w-md"><div class="p-8"><h1 class="text-2xl font-bold text-white mb-4">Reset your password</h1> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
export {
  _page as default
};
