import "clsx";
import { L as Login } from "../../../chunks/Login.js";
import "../../../chunks/supabaseClient.js";
import { o as onDestroy } from "../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let unsub = null;
    onDestroy(() => {
      try {
        unsub?.data?.subscription?.unsubscribe?.();
      } catch {
      }
    });
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="login-page">`);
      Login($$renderer2, {});
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
