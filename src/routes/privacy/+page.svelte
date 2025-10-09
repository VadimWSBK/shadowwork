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
      <h1 class="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p class="text-white/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
          <p class="leading-relaxed">
            When you use Shadow Work Course, we collect only the minimum information necessary to provide our services:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Account Information:</strong> Email address, username, and password (encrypted)</li>
            <li><strong>Course Data:</strong> Your answers to course questions, progress tracking, and completion status</li>
            <li><strong>Technical Data:</strong> Browser type, device information, and IP address for security purposes</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
          <p class="leading-relaxed">Your information is used solely to:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Provide and maintain the Shadow Work Course platform</li>
            <li>Save your progress and course answers</li>
            <li>Send important service notifications (if enabled)</li>
            <li>Improve our services and user experience</li>
            <li>Ensure the security and integrity of our platform</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">3. Data Security & Encryption</h2>
          <p class="leading-relaxed">
            We take your privacy seriously. All course answers are <strong>end-to-end encrypted</strong> using industry-standard encryption protocols. 
            Your reflections are encrypted before being stored in our database, ensuring that only you can access your personal responses.
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>All data is encrypted at rest and in transit (TLS/SSL)</li>
            <li>Passwords are hashed using bcrypt</li>
            <li>We use Supabase for secure data storage</li>
            <li>Regular security audits and updates</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">4. Data Sharing & Third Parties</h2>
          <p class="leading-relaxed">
            <strong>We do not sell, rent, or share your personal information with third parties</strong> for marketing purposes.
          </p>
          <p class="leading-relaxed mt-2">
            Limited data may be shared only in these circumstances:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Service Providers:</strong> We use trusted third-party services (Supabase for database hosting) who are contractually obligated to protect your data</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety</li>
            <li><strong>With Your Consent:</strong> Any other disclosure will be made only with your explicit permission</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">5. Your Rights (GDPR & CCPA)</h2>
          <p class="leading-relaxed">You have the right to:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
            <li><strong>Rectification:</strong> Correct any inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request immediate and permanent deletion of your account and all associated data</li>
            <li><strong>Portability:</strong> Export your course answers in a readable format</li>
            <li><strong>Objection:</strong> Opt out of any data processing activities</li>
          </ul>
          <p class="leading-relaxed mt-3">
            To exercise these rights, use the account deletion feature in Settings or contact us at <a href="mailto:privacy@shadowwork.com" class="text-[#0C6E78] hover:text-white underline">privacy@shadowwork.com</a>.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">6. Data Deletion Policy</h2>
          <p class="leading-relaxed">
            We retain your data only as long as your account is active. When you delete your account:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Immediate Deletion:</strong> All course answers and account data are deleted immediately and permanently</li>
            <li><strong>No Recovery:</strong> Deleted data cannot be recovered or restored under any circumstances</li>
            <li><strong>No Backup Copies:</strong> We maintain no backup copies of your personal data</li>
            <li><strong>Complete Removal:</strong> All traces of your data are removed from our systems instantly</li>
            <li><strong>No Purging Periods:</strong> There are no waiting periods or gradual deletion processes</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>Important:</strong> Once you delete your account, all your course progress, answers, and personal information 
            will be permanently and irreversibly removed. Please ensure you have exported any data you wish to keep before deletion.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">7. Cookies & Tracking</h2>
          <p class="leading-relaxed">
            We use minimal cookies for essential functionality:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Authentication cookies:</strong> To keep you logged in</li>
            <li><strong>Preference cookies:</strong> To remember your language selection</li>
          </ul>
          <p class="leading-relaxed mt-2">
            We do not use third-party tracking or advertising cookies.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">8. Children's Privacy</h2>
          <p class="leading-relaxed">
            Shadow Work Course is intended for adults 18 years and older. We do not knowingly collect information from children under 18. 
            If we discover that a child under 18 has provided us with personal information, we will delete it immediately.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">9. International Data Transfers</h2>
          <p class="leading-relaxed">
            Your data may be stored on servers located in different countries. We ensure that all international data transfers comply with 
            applicable data protection laws and use appropriate safeguards.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">10. Changes to This Policy</h2>
          <p class="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page 
            and updating the "Last updated" date. Continued use of the service after changes constitutes acceptance of the updated policy.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">11. Contact Us</h2>
          <p class="leading-relaxed">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us:
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>Email:</strong> <a href="mailto:privacy@shadowwork.com" class="text-[#0C6E78] hover:text-white underline">privacy@shadowwork.com</a></li>
            <li><strong>Address:</strong> [Your Business Address]</li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

