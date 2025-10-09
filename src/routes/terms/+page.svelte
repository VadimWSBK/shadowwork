<script lang="ts">
  import { goto } from '$app/navigation';
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
    
    <!-- Content Card -->
    <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded shadow-2xl p-8">
      <h1 class="text-4xl font-bold text-white mb-2">Terms of Service</h1>
      <p class="text-white/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p class="leading-relaxed">
            By accessing and using Shadow Work Course ("the Service"), you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">2. Description of Service</h2>
          <p class="leading-relaxed">
            Shadow Work Course is a self-guided, online personal development course designed to facilitate self-reflection and emotional awareness. 
            The course consists of 7 days of guided questions and exercises.
          </p>
          <p class="leading-relaxed mt-2">
            <strong>Important:</strong> This is a self-help educational tool, not a substitute for professional mental health services.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
          <p class="leading-relaxed">To use the Service, you must:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Be at least 18 years of age</li>
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          <p class="leading-relaxed mt-2">
            You are responsible for all activities that occur under your account.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">4. Payment & Refunds</h2>
          <p class="leading-relaxed">
            Access to Shadow Work Course requires payment as specified at the time of purchase. All fees are non-refundable except as required by law or as specified in our refund policy.
          </p>
          <p class="leading-relaxed mt-2">
            <strong>Refund Policy:</strong> If you're not satisfied within the first 7 days of purchase and have completed less than 2 days of the course, 
            contact us for a full refund.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">5. Intellectual Property</h2>
          <p class="leading-relaxed">
            All content provided through Shadow Work Course, including text, graphics, questions, and exercises, is owned by us or our licensors 
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p class="leading-relaxed mt-2">You may not:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Reproduce, distribute, or share course materials without permission</li>
            <li>Create derivative works based on course content</li>
            <li>Use course content for commercial purposes</li>
            <li>Reverse engineer or attempt to extract source code</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">6. User Content & Privacy</h2>
          <p class="leading-relaxed">
            Your responses to course questions ("User Content") remain your property. By using the Service, you grant us a limited license 
            to store and process your User Content solely to provide the Service.
          </p>
          <p class="leading-relaxed mt-2">
            We will not share, sell, or use your User Content for any purpose other than providing the Service to you. 
            See our <a href="/privacy" class="text-[#0C6E78] hover:text-white underline">Privacy Policy</a> for details.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">7. Prohibited Conduct</h2>
          <p class="leading-relaxed">You agree not to:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use automated systems (bots) to access the Service</li>
            <li>Impersonate any person or entity</li>
            <li>Upload or transmit viruses or malicious code</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">8. Medical Disclaimer</h2>
          <p class="leading-relaxed font-semibold">
            Shadow Work Course is NOT a substitute for professional mental health treatment, therapy, or medical advice.
          </p>
          <p class="leading-relaxed mt-2">
            The course is designed for educational and self-reflection purposes only. If you are experiencing mental health issues, 
            suicidal thoughts, or any medical emergency, please contact a qualified healthcare professional immediately.
          </p>
          <p class="leading-relaxed mt-2">
            Emergency resources:
          </p>
          <ul class="list-disc pl-6 space-y-1 mt-2">
            <li>US: 988 Suicide & Crisis Lifeline</li>
            <li>International: <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" class="text-[#0C6E78] hover:text-white underline">findahelpline.com</a></li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">9. Limitation of Liability</h2>
          <p class="leading-relaxed">
            To the maximum extent permitted by law, Shadow Work Course and its creators shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use or inability to use the Service.
          </p>
          <p class="leading-relaxed mt-2">
            Our total liability shall not exceed the amount you paid for access to the Service.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">10. Disclaimer of Warranties</h2>
          <p class="leading-relaxed">
            The Service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>The Service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The Service is free of viruses or harmful components</li>
            <li>Any specific results will be achieved</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">11. Termination</h2>
          <p class="leading-relaxed">
            We reserve the right to suspend or terminate your access to the Service at any time, with or without cause or notice, 
            for violation of these Terms or for any other reason.
          </p>
          <p class="leading-relaxed mt-2">
            You may terminate your account at any time through the Settings page. Upon termination, your right to use the Service will immediately cease.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">12. Changes to Terms</h2>
          <p class="leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms 
            with a new "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the new Terms.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">13. Governing Law</h2>
          <p class="leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">14. Contact Information</h2>
          <p class="leading-relaxed">
            For questions about these Terms of Service, please contact:
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>Email:</strong> <a href="mailto:support@shadowwork.com" class="text-[#0C6E78] hover:text-white underline">support@shadowwork.com</a></li>
            <li><strong>Address:</strong> [Your Business Address]</li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

