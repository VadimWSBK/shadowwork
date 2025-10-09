<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let searchTerm = '';
  let filteredFAQs = [];
  
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'What is Shadow Work Course?',
          a: 'Shadow Work Course is a 7-day self-guided journaling program designed to help you explore your inner world through reflective questions and exercises. It\'s based on the psychological concept of shadow work, which involves examining the parts of yourself you may have hidden or ignored.'
        },
        {
          q: 'How long does the course take to complete?',
          a: 'The course is designed to be completed over 7 days, with one day\'s worth of content per day. However, you can go at your own pace - take longer if needed, or skip days if necessary. The important thing is to engage meaningfully with the questions.'
        },
        {
          q: 'Do I need any prior experience with journaling?',
          a: 'No prior experience is required. The course is designed for beginners and experienced journalers alike. Each day includes guidance and questions that will help you reflect, regardless of your journaling experience.'
        },
        {
          q: 'Is this course suitable for me?',
          a: 'This course is designed for adults (18+) who want to engage in self-reflection and personal growth. If you\'re experiencing severe mental health issues, are in crisis, or feel overwhelmed by introspection, please consult with a mental health professional before starting.'
        }
      ]
    },
    {
      category: 'Account & Data',
      questions: [
        {
          q: 'Is my data secure and private?',
          a: 'Yes. All your journal entries and personal data are encrypted end-to-end. Only you can access your answers. We do not share, sell, or use your personal reflections for any purpose other than providing the course to you.'
        },
        {
          q: 'Can I delete my account and data?',
          a: 'Absolutely. You can delete your account at any time through the Settings page. When you delete your account, all your data is immediately and permanently removed with no backup copies. This action cannot be reversed.'
        },
        {
          q: 'What happens to my data if I don\'t finish the course?',
          a: 'Your data remains secure in your account until you choose to delete it. You can return to the course at any time and continue from where you left off. There\'s no time limit on completing the course.'
        },
        {
          q: 'Can I export my journal entries?',
          a: 'Yes, you can export your answers at any time. Use the export feature in Settings to download your journal entries in a readable format before deleting your account if you wish to keep them.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'What devices and browsers are supported?',
          a: 'The course works on all modern devices - desktop computers, tablets, and smartphones. It\'s optimized for Chrome, Firefox, Safari, and Edge browsers. For the best experience, ensure your browser is up to date.'
        },
        {
          q: 'Can I access the course offline?',
          a: 'The course requires an internet connection to save your progress and access your journal entries. However, you can write your answers in a separate document and copy them into the course when you\'re back online.'
        },
        {
          q: 'What if I forget my password?',
          a: 'Use the "Forgot Password" link on the login page to reset your password. You\'ll receive an email with instructions to create a new password.'
        },
        {
          q: 'I\'m having trouble logging in. What should I do?',
          a: 'First, try clearing your browser cache and cookies. If that doesn\'t work, try using an incognito/private browsing window. If you\'re still having issues, contact support and we\'ll help you resolve the problem.'
        }
      ]
    },
    {
      category: 'Course Content',
      questions: [
        {
          q: 'What topics does the course cover?',
          a: 'The course covers various aspects of self-reflection including relationships, emotions, past experiences, fears, desires, and patterns in your life. Each day focuses on a different theme to help you explore different aspects of yourself.'
        },
        {
          q: 'Are the questions the same for everyone?',
          a: 'Yes, all participants receive the same set of questions. However, your personal answers and insights will be unique to your own experiences and perspective.'
        },
        {
          q: 'What if I don\'t want to answer certain questions?',
          a: 'You can skip any questions that feel too uncomfortable or personal. The course is designed to be flexible - answer what feels right for you. You can always return to skipped questions later if you change your mind.'
        },
        {
          q: 'Can I retake the course?',
          a: 'Yes, you can go through the course multiple times. Many people find that their answers change as they grow and develop, making repeat experiences valuable.'
        }
      ]
    },
    {
      category: 'Billing & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, PayPal, and other secure payment methods. All transactions are processed securely through our payment partners.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied with the course and have completed less than 2 days of content, contact us for a full refund.'
        },
        {
          q: 'Will I be charged automatically for anything?',
          a: 'No. This is a one-time purchase with no recurring charges or subscriptions. You pay once and have lifetime access to the course.'
        },
        {
          q: 'Can I share my account with family or friends?',
          a: 'No, accounts are for individual use only. Each person should create their own account to ensure privacy and proper progress tracking. Sharing accounts violates our terms of service.'
        }
      ]
    }
  ];
  
  onMount(() => {
    filteredFAQs = faqs;
  });
  
  function filterFAQs() {
    if (!searchTerm.trim()) {
      filteredFAQs = faqs;
      return;
    }
    
    const term = searchTerm.toLowerCase();
    filteredFAQs = faqs.map(category => ({
      ...category,
      questions: category.questions.filter(faq => 
        faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term)
      )
    })).filter(category => category.questions.length > 0);
  }
  
  $: if (searchTerm !== undefined) {
    filterFAQs();
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-[#004D56] via-[#00444B] to-[#003B41] p-4 sm:p-6 lg:p-8">
  <div class="max-w-4xl mx-auto">
    
    <!-- Back Button -->
    <button 
      on:click={() => goto('/dashboard')}
      class="mb-6 text-white/80 hover:text-white flex items-center gap-2 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back to Dashboard
    </button>
    
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h1>
      <p class="text-white/70 max-w-2xl mx-auto leading-relaxed">
        Find answers to common questions about Shadow Work Course. Can't find what you're looking for? 
        <a href="/contact" class="text-[#0C6E78] hover:text-white underline">Contact our support team</a>.
      </p>
    </div>
    
    <!-- Search Bar -->
    <div class="mb-8">
      <div class="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search FAQ..."
          bind:value={searchTerm}
          class="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-transparent transition-colors"
        />
        <svg class="w-5 h-5 text-white/50 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        {#if searchTerm}
          <button
            on:click={() => searchTerm = ''}
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {/if}
      </div>
    </div>
    
    <!-- FAQ Content -->
    <div class="space-y-6">
      {#each filteredFAQs as category, categoryIndex}
        <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl overflow-hidden">
          <div class="bg-white/10 px-6 py-4 border-b border-white/20">
            <h2 class="text-xl font-bold text-white">{category.category}</h2>
          </div>
          
          <div class="divide-y divide-white/10">
            {#each category.questions as faq, index}
              <details class="group">
                <summary class="px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between">
                  <h3 class="text-white font-medium pr-4">{faq.q}</h3>
                  <svg class="w-5 h-5 text-white/60 transform transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </summary>
                <div class="px-6 pb-4">
                  <p class="text-white/80 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- No Results -->
    {#if filteredFAQs.length === 0}
      <div class="text-center py-12">
        <svg class="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">No results found</h3>
        <p class="text-white/60 mb-4">Try searching with different keywords or <a href="/contact" class="text-[#0C6E78] hover:text-white underline">contact support</a> for help.</p>
        <button 
          on:click={() => searchTerm = ''}
          class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
        >
          Clear Search
        </button>
      </div>
    {/if}
    
    <!-- Contact CTA -->
    <div class="mt-12 text-center">
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-8">
        <h3 class="text-2xl font-bold text-white mb-4">Still have questions?</h3>
        <p class="text-white/70 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
        <a 
          href="/contact" 
          class="inline-flex items-center gap-2 bg-[#0C6E78] hover:bg-[#0a5a61] text-white px-6 py-3 rounded font-medium transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Contact Support
        </a>
      </div>
    </div>
    
  </div>
</div>
