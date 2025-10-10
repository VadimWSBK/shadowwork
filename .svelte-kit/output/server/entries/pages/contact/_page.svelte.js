import { z as attr_class, F as ensure_array_like, G as stringify } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { a as attr } from "../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { t } from "../../../chunks/i18n.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let formData = {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general"
    };
    let isSubmitting = false;
    let errors = {};
    let currentLanguage = "en";
    let categories = [];
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-[#004D56] via-[#00444B] to-[#003B41] p-4 sm:p-6 lg:p-8"><div class="max-w-4xl mx-auto"><button class="mb-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> ${escape_html(t(currentLanguage, "pages.backToDashboard"))}</button> <div class="text-center mb-8"><h1 class="text-4xl font-bold text-white mb-4 font-primary">${escape_html(t(currentLanguage, "contact.title"))}</h1> <p class="text-white/70 text-lg">${escape_html(t(currentLanguage, "contact.subtitle"))}</p></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl p-8">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form class="space-y-6"><div><label for="name" class="block text-white font-medium mb-2">${escape_html(t(currentLanguage, "contact.form.name"))} *</label> <input type="text" id="name"${attr("value", formData.name)}${attr_class(`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent ${stringify(errors.name ? "border-red-400" : "")}`)}${attr("placeholder", t(currentLanguage, "contact.form.placeholders.name"))}/> `);
    if (errors.name) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-400 text-sm mt-1">${escape_html(errors.name)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div><label for="email" class="block text-white font-medium mb-2">${escape_html(t(currentLanguage, "contact.form.email"))} *</label> <input type="email" id="email"${attr("value", formData.email)}${attr_class(`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent ${stringify(errors.email ? "border-red-400" : "")}`)}${attr("placeholder", t(currentLanguage, "contact.form.placeholders.email"))}/> `);
    if (errors.email) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-400 text-sm mt-1">${escape_html(errors.email)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div><label for="category" class="block text-white font-medium mb-2">${escape_html(t(currentLanguage, "contact.form.category"))}</label> `);
    $$renderer2.select(
      {
        id: "category",
        value: formData.category,
        class: "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(categories);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let category = each_array[$$index];
          $$renderer3.option({ value: category.value, class: "bg-[#004D56] text-white" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(category.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="subject" class="block text-white font-medium mb-2">${escape_html(t(currentLanguage, "contact.form.subject"))} *</label> <input type="text" id="subject"${attr("value", formData.subject)}${attr_class(`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent ${stringify(errors.subject ? "border-red-400" : "")}`)}${attr("placeholder", t(currentLanguage, "contact.form.placeholders.subject"))}/> `);
    if (errors.subject) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-400 text-sm mt-1">${escape_html(errors.subject)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div><label for="message" class="block text-white font-medium mb-2">${escape_html(t(currentLanguage, "contact.form.message"))} *</label> <textarea id="message" rows="6"${attr_class(`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent resize-vertical ${stringify(errors.message ? "border-red-400" : "")}`)}${attr("placeholder", t(currentLanguage, "contact.form.placeholders.message"))}>`);
    const $$body = escape_html(formData.message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> `);
    if (errors.message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-red-400 text-sm mt-1">${escape_html(errors.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <p class="text-white/50 text-sm mt-1">${escape_html(formData.message.length)} ${escape_html(t(currentLanguage, "contact.form.characters"))}</p></div> <div class="pt-4"><button type="submit"${attr("disabled", isSubmitting, true)} class="w-full bg-[#0C6E78] hover:bg-[#0a5a61] disabled:bg-white/20 disabled:cursor-not-allowed text-white px-6 py-4 rounded font-medium transition-colors flex items-center justify-center gap-2">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>${escape_html(t(currentLanguage, "contact.form.sendMessage"))}`);
    }
    $$renderer2.push(`<!--]--></button></div></form></div></div> <div class="space-y-6"><div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6"><h3 class="text-lg font-semibold text-white mb-3 font-primary">${escape_html(t(currentLanguage, "contact.info.responseTime.title"))}</h3> <p class="text-white/70 text-sm leading-relaxed">${escape_html(t(currentLanguage, "contact.info.responseTime.message"))}</p></div> <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6"><h3 class="text-lg font-semibold text-white mb-3 font-primary">${escape_html(t(currentLanguage, "contact.info.alternativeContact.title"))}</h3> <div class="space-y-3 text-sm"><div class="flex items-center gap-3 text-white/70"><svg class="w-4 h-4 text-[#0C6E78]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <a href="mailto:support@shadowwork.com" class="hover:text-white transition-colors">support@shadowwork.com</a></div></div></div> <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6"><h3 class="text-lg font-semibold text-white mb-3 font-primary">${escape_html(t(currentLanguage, "contact.info.quickHelp.title"))}</h3> <p class="text-white/70 text-sm mb-3">${escape_html(t(currentLanguage, "contact.info.quickHelp.message"))}</p> <a href="/faq" class="inline-flex items-center gap-2 text-[#0C6E78] hover:text-white transition-colors text-sm font-medium"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${escape_html(t(currentLanguage, "contact.info.quickHelp.browseFaq"))}</a></div> <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6"><h3 class="text-lg font-semibold text-white mb-3 font-primary">${escape_html(t(currentLanguage, "contact.info.privacy.title"))}</h3> <p class="text-white/70 text-sm leading-relaxed">${escape_html(t(currentLanguage, "contact.info.privacy.message"))}</p></div></div></div></div></div>`);
  });
}
export {
  _page as default
};
