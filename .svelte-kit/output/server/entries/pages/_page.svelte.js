import { y as head, z as attr_class, F as ensure_array_like, G as stringify } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { a as attr } from "../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { i as introBg, d as day2Img, a as day3Img } from "../../chunks/shadow_work_day_3.js";
import { e as escape_html } from "../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const courses = [
      {
        id: "shadowwork",
        title: "Shadow Work Journey",
        description: "A 7-day guided journey into self-awareness, emotional healing, and personal transformation through shadow work.",
        status: "available",
        duration: "7 days",
        difficulty: "Beginner to Advanced",
        features: [
          "Daily guided exercises",
          "Personal reflection prompts",
          "Progress tracking",
          "Secure data storage"
        ],
        image: introBg,
        color: "from-primary to-secondary"
      },
      {
        id: "limiting-beliefs",
        title: "Limiting Beliefs Transformation",
        description: "Identify, challenge, and transform the limiting beliefs that hold you back from reaching your full potential.",
        status: "coming-soon",
        duration: "5 days",
        difficulty: "Intermediate",
        features: [
          "Belief identification exercises",
          "Reframing techniques",
          "Action planning tools",
          "Progress monitoring"
        ],
        image: day2Img,
        color: "from-secondary to-frame"
      },
      {
        id: "relationships",
        title: "Healthy Relationships Mastery",
        description: "Build stronger, more authentic connections through understanding communication patterns, boundaries, and emotional intimacy.",
        status: "coming-soon",
        duration: "6 days",
        difficulty: "Beginner to Intermediate",
        features: [
          "Communication assessment",
          "Boundary setting guides",
          "Conflict resolution tools",
          "Relationship check-ins"
        ],
        image: day3Img,
        color: "from-frame to-primary-dark"
      }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Self Coaching Tools - Transform Your Life Through Guided Courses</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Discover powerful self-coaching tools and courses designed to help you overcome limiting beliefs, improve relationships, and achieve personal transformation."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen"><header class="relative bg-gradient-to-r from-primary via-secondary to-primary-dark"><div class="absolute inset-0 bg-black/20"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-4"><h1 class="text-3xl font-bold text-white font-primary">Self Coaching Tools</h1> <span class="text-white/70 text-sm">selfcoachingtools.com</span></div> <div class="relative" role="button" tabindex="0"><button class="flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-200"><span class="text-sm font-medium">${escape_html(
      "English"
    )}</span> <svg${attr_class(`w-4 h-4 transition-transform duration-200 ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="mt-8 text-center"><h2 class="text-4xl md:text-5xl font-bold text-white font-primary mb-4">Transform Your Life Through Self-Coaching</h2> <p class="text-xl text-white/90 max-w-3xl mx-auto">Discover powerful tools and guided courses designed to help you overcome limiting beliefs, improve relationships, and achieve lasting personal transformation.</p></div></div></header> <main class="bg-gradient-to-br from-primary-light via-primary to-secondary-dark py-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h3 class="text-3xl font-bold text-white font-primary mb-4">Available Courses</h3> <p class="text-lg text-white/90 max-w-2xl mx-auto">Choose from our carefully crafted self-coaching programs, each designed to address specific areas of personal development.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
    const each_array = ensure_array_like(courses);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let course = each_array[$$index_1];
      $$renderer2.push(`<div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group cursor-pointer" role="button" tabindex="0"><div class="h-48 relative overflow-hidden"><img${attr("src", course.image)}${attr("alt", course.title)} class="w-full h-full object-cover"/> <div${attr_class(`absolute inset-0 bg-gradient-to-br ${stringify(course.color)} opacity-70`)}></div> <div class="absolute top-4 right-4">`);
      if (course.status === "available") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-500/90 text-white backdrop-blur-sm">Available</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-500/90 text-white backdrop-blur-sm">Coming Soon</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="absolute bottom-4 left-4 text-white"><h4 class="text-2xl font-bold font-primary">${escape_html(course.title)}</h4> <p class="text-sm text-white/90">${escape_html(course.duration)} • ${escape_html(course.difficulty)}</p></div></div> <div class="p-6"><p class="text-white/90 mb-4 leading-relaxed">${escape_html(course.description)}</p> <div class="mb-6"><h5 class="text-sm font-semibold text-white mb-2">What's Included:</h5> <ul class="space-y-1"><!--[-->`);
      const each_array_1 = ensure_array_like(course.features);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let feature = each_array_1[$$index];
        $$renderer2.push(`<li class="text-sm text-white/80 flex items-center"><svg class="w-4 h-4 text-accent mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${escape_html(feature)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div> <button${attr_class(`w-full py-3 px-4 font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 relative overflow-hidden group border-2 ${stringify(course.status === "available" ? "text-white shadow-2xl hover:shadow-3xl" : "bg-white/20 text-white/70 cursor-not-allowed border-white/20")}`)}>`);
      if (course.status === "available") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90 group-hover:opacity-100"></div> <div class="absolute inset-0" style="border-color: #D4AF37; box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);"></div> <span class="relative z-10">Start Course</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Coming Soon`);
      }
      $$renderer2.push(`<!--]--></button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-16 text-center"><div class="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-8 max-w-4xl mx-auto"><h3 class="text-2xl font-bold text-white font-primary mb-4">Ready to Begin Your Journey?</h3> <p class="text-lg text-white/90 mb-6">Join thousands of people who have transformed their lives through our self-coaching tools. 
            Start with the Shadow Work Journey and unlock your potential today.</p> <button class="inline-flex items-center px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 relative overflow-hidden group border-2 shadow-2xl hover:shadow-3xl"><div class="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90 group-hover:opacity-100"></div> <div class="absolute inset-0" style="border-color: #D4AF37; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);"></div> <span class="relative z-10 flex items-center gap-2">Get Started Now <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></span></button></div></div></div></main> <footer class="bg-primary-dark text-white py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><h4 class="text-xl font-bold font-primary mb-4">Self Coaching Tools</h4> <p class="text-white/70 mb-6">Empowering personal transformation through guided self-coaching</p> <div class="flex justify-center space-x-6 text-sm text-white/70"><a href="/privacy" class="hover:text-white transition-colors duration-200">Privacy Policy</a> <a href="/terms" class="hover:text-white transition-colors duration-200">Terms of Service</a> <a href="/contact" class="hover:text-white transition-colors duration-200">Contact</a></div> <p class="text-xs text-white/50 mt-6">© 2024 Self Coaching Tools. All rights reserved.</p></div></div></footer></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
