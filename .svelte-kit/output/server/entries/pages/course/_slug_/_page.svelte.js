import { y as head } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import { a as attr } from "../../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html("Course")} - Self Coaching Tools</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", "Transform your life with our self-coaching courses")}/>`);
    });
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-primary-light via-primary to-secondary-dark flex items-center justify-center"><div class="text-center text-white"><h1 class="text-2xl font-bold mb-4">Course Not Found</h1> <p class="mb-6">The course you're looking for doesn't exist.</p> <button class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold transition-colors duration-200">Back to Courses</button></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
