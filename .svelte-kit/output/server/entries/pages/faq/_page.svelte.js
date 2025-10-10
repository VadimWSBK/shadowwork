import { F as ensure_array_like } from "../../../chunks/index2.js";
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
    let searchTerm = "";
    let filteredFAQs = [];
    let currentLanguage = "en";
    let faqs = [];
    function loadFAQs() {
      faqs = [
        {
          category: t(currentLanguage, "faq.category.gettingStarted"),
          questions: [
            {
              q: t(currentLanguage, "faq.gettingStarted.q1"),
              a: t(currentLanguage, "faq.gettingStarted.a1")
            },
            {
              q: t(currentLanguage, "faq.gettingStarted.q2"),
              a: t(currentLanguage, "faq.gettingStarted.a2")
            },
            {
              q: t(currentLanguage, "faq.gettingStarted.q3"),
              a: t(currentLanguage, "faq.gettingStarted.a3")
            },
            {
              q: t(currentLanguage, "faq.gettingStarted.q4"),
              a: t(currentLanguage, "faq.gettingStarted.a4")
            }
          ]
        },
        {
          category: t(currentLanguage, "faq.category.accountData"),
          questions: [
            {
              q: t(currentLanguage, "faq.accountData.q1"),
              a: t(currentLanguage, "faq.accountData.a1")
            },
            {
              q: t(currentLanguage, "faq.accountData.q2"),
              a: t(currentLanguage, "faq.accountData.a2")
            },
            {
              q: t(currentLanguage, "faq.accountData.q3"),
              a: t(currentLanguage, "faq.accountData.a3")
            },
            {
              q: t(currentLanguage, "faq.accountData.q4"),
              a: t(currentLanguage, "faq.accountData.a4")
            }
          ]
        },
        {
          category: t(currentLanguage, "faq.category.technicalSupport"),
          questions: [
            {
              q: t(currentLanguage, "faq.technicalSupport.q1"),
              a: t(currentLanguage, "faq.technicalSupport.a1")
            },
            {
              q: t(currentLanguage, "faq.technicalSupport.q2"),
              a: t(currentLanguage, "faq.technicalSupport.a2")
            },
            {
              q: t(currentLanguage, "faq.technicalSupport.q3"),
              a: t(currentLanguage, "faq.technicalSupport.a3")
            },
            {
              q: t(currentLanguage, "faq.technicalSupport.q4"),
              a: t(currentLanguage, "faq.technicalSupport.a4")
            }
          ]
        },
        {
          category: t(currentLanguage, "faq.category.courseContent"),
          questions: [
            {
              q: t(currentLanguage, "faq.courseContent.q1"),
              a: t(currentLanguage, "faq.courseContent.a1")
            },
            {
              q: t(currentLanguage, "faq.courseContent.q2"),
              a: t(currentLanguage, "faq.courseContent.a2")
            },
            {
              q: t(currentLanguage, "faq.courseContent.q3"),
              a: t(currentLanguage, "faq.courseContent.a3")
            },
            {
              q: t(currentLanguage, "faq.courseContent.q4"),
              a: t(currentLanguage, "faq.courseContent.a4")
            }
          ]
        },
        {
          category: t(currentLanguage, "faq.category.billingRefunds"),
          questions: [
            {
              q: t(currentLanguage, "faq.billingRefunds.q1"),
              a: t(currentLanguage, "faq.billingRefunds.a1")
            },
            {
              q: t(currentLanguage, "faq.billingRefunds.q2"),
              a: t(currentLanguage, "faq.billingRefunds.a2")
            },
            {
              q: t(currentLanguage, "faq.billingRefunds.q3"),
              a: t(currentLanguage, "faq.billingRefunds.a3")
            },
            {
              q: t(currentLanguage, "faq.billingRefunds.q4"),
              a: t(currentLanguage, "faq.billingRefunds.a4")
            }
          ]
        }
      ];
    }
    function filterFAQs() {
      if (!searchTerm.trim()) {
        filteredFAQs = faqs;
        return;
      }
      const term = searchTerm.toLowerCase();
      filteredFAQs = faqs.map((category) => ({
        ...category,
        questions: category.questions.filter((faq) => faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term))
      })).filter((category) => category.questions.length > 0);
    }
    {
      filterFAQs();
    }
    {
      loadFAQs();
      filterFAQs();
    }
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-[#004D56] via-[#00444B] to-[#003B41] p-4 sm:p-6 lg:p-8"><div class="max-w-4xl mx-auto"><button class="mb-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> ${escape_html(t(currentLanguage, "faq.backToDashboard"))}</button> <div class="text-center mb-8"><h1 class="text-3xl font-bold text-white mb-3 font-primary">${escape_html(t(currentLanguage, "faq.title"))}</h1> <p class="text-white/70 max-w-2xl mx-auto leading-relaxed font-secondary">${escape_html(t(currentLanguage, "faq.subtitle"))} <a href="/contact" class="text-[#0C6E78] hover:text-white underline">${escape_html(t(currentLanguage, "faq.contactSupport"))}</a>.</p></div> <div class="mb-8"><div class="relative max-w-2xl mx-auto"><input type="text"${attr("placeholder", t(currentLanguage, "faq.searchPlaceholder"))}${attr("value", searchTerm)} class="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent transition-colors"/> <svg class="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="space-y-6"><!--[-->`);
    const each_array = ensure_array_like(filteredFAQs);
    for (let categoryIndex = 0, $$length = each_array.length; categoryIndex < $$length; categoryIndex++) {
      let category = each_array[categoryIndex];
      $$renderer2.push(`<div class="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden"><div class="bg-white/10 px-6 py-4 border-b border-white/20"><h2 class="text-xl font-bold text-white font-primary">${escape_html(category.category)}</h2></div> <div class="divide-y divide-white/10"><!--[-->`);
      const each_array_1 = ensure_array_like(category.questions);
      for (let index = 0, $$length2 = each_array_1.length; index < $$length2; index++) {
        let faq = each_array_1[index];
        $$renderer2.push(`<details class="group"><summary class="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"><h3 class="text-white font-medium pr-4 font-primary">${escape_html(faq.q)}</h3> <svg class="w-5 h-5 text-white/60 transform transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary> <div class="px-6 pb-4"><p class="text-white/80 leading-relaxed font-secondary">${escape_html(faq.a)}</p></div></details>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredFAQs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><svg class="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <h3 class="text-xl font-semibold text-white mb-2 font-primary">${escape_html(t(currentLanguage, "faq.noResults.title"))}</h3> <p class="text-white/60 mb-4 font-secondary">${escape_html(t(currentLanguage, "faq.noResults.message"))} <a href="/contact" class="text-[#0C6E78] hover:text-white underline">${escape_html(t(currentLanguage, "faq.noResults.contactLink"))}</a> ${escape_html(t(currentLanguage, "faq.noResults.forHelp"))}</p> <button class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors font-secondary">${escape_html(t(currentLanguage, "faq.noResults.clearButton"))}</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="mt-12 text-center"><div class="bg-white/10 backdrop-blur-xl border border-white/30 p-8"><h3 class="text-2xl font-bold text-white mb-4 font-primary">${escape_html(t(currentLanguage, "faq.stillQuestions.title"))}</h3> <p class="text-white/70 mb-6 font-secondary">${escape_html(t(currentLanguage, "faq.stillQuestions.message"))}</p> <a href="/contact" class="inline-flex items-center gap-2 bg-[#0C6E78] hover:bg-[#0a5a61] text-white px-6 py-3 font-medium transition-colors font-primary"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> ${escape_html(t(currentLanguage, "faq.stillQuestions.button"))}</a></div></div></div></div>`);
  });
}
export {
  _page as default
};
