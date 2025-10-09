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
      <h1 class="text-4xl font-bold text-white mb-2">Disclaimer</h1>
      <p class="text-white/60 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <div class="prose prose-invert max-w-none space-y-6 text-white/90">
        
        <!-- Important Notice -->
        <div class="bg-blue-500/10 border border-blue-400/30 rounded p-6 my-6">
          <div class="flex items-start gap-3">
            <svg class="w-8 h-8 text-blue-300 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Important Information</h3>
              <p class="text-white/90 leading-relaxed">
                Shadow Work Course is a <strong>self-guided journaling program</strong> designed for personal reflection and growth. 
                It is not intended as a substitute for professional therapy, counseling, or medical advice.
              </p>
            </div>
          </div>
        </div>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">1. Not Medical or Therapeutic Services</h2>
          <p class="leading-relaxed">
            Shadow Work Course is an educational self-help program designed for personal growth and self-reflection. 
            It does <strong>not</strong> provide:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Medical advice, diagnosis, or treatment</li>
            <li>Psychotherapy or psychological counseling</li>
            <li>Crisis intervention or emergency mental health services</li>
            <li>Professional mental health treatment of any kind</li>
          </ul>
          <p class="leading-relaxed mt-3">
            The course creators and operators are not licensed therapists, psychologists, psychiatrists, or medical professionals unless explicitly stated otherwise.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">2. Consult Healthcare Professionals</h2>
          <p class="leading-relaxed">
            <strong>Before starting this course, especially if you:</strong>
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Have been diagnosed with any mental health condition</li>
            <li>Are currently in therapy or taking psychiatric medication</li>
            <li>Have experienced trauma or PTSD</li>
            <li>Are experiencing suicidal thoughts or self-harm urges</li>
            <li>Have a history of severe depression, anxiety, or other mental health issues</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>Please consult with a qualified healthcare professional before proceeding.</strong> 
            Self-reflection work can bring up difficult emotions and memories that may require professional support.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">3. When to Seek Professional Help</h2>
          <p class="leading-relaxed">
            While this journaling course can be beneficial for self-reflection, please consider seeking professional support if you:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Are experiencing severe depression, anxiety, or other mental health conditions</li>
            <li>Have thoughts of self-harm or suicide</li>
            <li>Are currently in crisis or experiencing a mental health emergency</li>
            <li>Feel overwhelmed by difficult emotions during the course</li>
            <li>Would benefit from professional guidance alongside your journaling practice</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>Emergency:</strong> If you're in immediate danger, please call emergency services (911 in the US, 112 in Europe) or go to your nearest emergency room.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">4. What to Expect</h2>
          <p class="leading-relaxed">
            Self-reflection and journaling may bring up:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Various emotions as you explore your inner world</li>
            <li>Memories or insights you hadn't previously considered</li>
            <li>Moments of discomfort as you examine different aspects of yourself</li>
            <li>New awareness of patterns in your thoughts and behaviors</li>
          </ul>
          <p class="leading-relaxed mt-3">
            <strong>Take breaks when needed:</strong> You can pause, skip questions, or discontinue the course at any time. 
            Listen to your intuition about what feels right for you.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">5. No Guaranteed Results</h2>
          <p class="leading-relaxed">
            We make no guarantees or warranties regarding:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Specific outcomes or results from completing the course</li>
            <li>Improvement in mental health or well-being</li>
            <li>Resolution of personal issues or challenges</li>
            <li>Achievement of any particular goals</li>
          </ul>
          <p class="leading-relaxed mt-3">
            Individual results vary greatly depending on many factors including personal circumstances, commitment level, 
            existing mental health conditions, and external support systems.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">6. Educational Purpose Only</h2>
          <p class="leading-relaxed">
            All content provided through Shadow Work Course is for <strong>educational and informational purposes only</strong>. 
            The information is not intended to:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Replace professional mental health treatment</li>
            <li>Diagnose or treat any mental health condition</li>
            <li>Provide personalized advice for your specific situation</li>
            <li>Create a therapist-client or doctor-patient relationship</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">7. User Responsibility</h2>
          <p class="leading-relaxed">
            By using Shadow Work Course, you acknowledge and agree that:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>You are responsible for your own mental health and well-being</li>
            <li>You will seek professional help if needed</li>
            <li>You understand the limitations of this educational program</li>
            <li>You will not rely solely on this course for mental health support</li>
            <li>You will stop using the course if you experience significant distress</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">8. Age Requirement</h2>
          <p class="leading-relaxed">
            Shadow Work Course is designed for adults aged 18 and older. The content involves mature self-reflection 
            on personal experiences, relationships, and emotions that may not be appropriate for younger audiences.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">9. Limitation of Liability</h2>
          <p class="leading-relaxed">
            To the fullest extent permitted by law, Shadow Work Course and its creators, operators, and affiliates shall not be liable for:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Any emotional distress or mental health issues arising from course participation</li>
            <li>Actions taken or decisions made based on course content</li>
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Personal injury or harm of any kind</li>
          </ul>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">10. External Resources</h2>
          <p class="leading-relaxed">
            The course may contain links to third-party resources, therapists, or crisis lines. We do not control or endorse these resources 
            and are not responsible for their content, availability, or services. Always verify credentials and suitability before engaging with any external provider.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">11. Updates to Disclaimer</h2>
          <p class="leading-relaxed">
            We reserve the right to update this disclaimer at any time. Continued use of the Service after changes constitutes acceptance of the updated disclaimer.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">12. Acknowledgment</h2>
          <p class="leading-relaxed font-semibold">
            By using Shadow Work Course, you acknowledge that you have read, understood, and agree to this disclaimer. 
            You accept full responsibility for your participation and any outcomes resulting from your use of the course.
          </p>
        </section>
        
        <section>
          <h2 class="text-2xl font-bold text-white mb-3">Questions or Concerns?</h2>
          <p class="leading-relaxed">
            If you have questions about this disclaimer or need clarification, please contact us:
          </p>
          <ul class="list-none space-y-2 mt-3">
            <li><strong>Email:</strong> <a href="mailto:support@shadowwork.com" class="text-[#0C6E78] hover:text-white underline">support@shadowwork.com</a></li>
          </ul>
        </section>
        
      </div>
    </div>
  </div>
</div>

