<script lang="ts">
  import { t, getDaySummary, type Language } from './i18n';
  import { getCourseData, type DayData } from './questions';
  import type { Writable } from 'svelte/store';
  import Footer from './Footer.svelte';
  import logo from '../assets/LOGO_SELF_COACHING_TOOLS.svg';
  
  export let courseData: DayData[];
  export let answersStore: Writable<Record<string, string[]>>;
  export let username: string;
  export let currentLanguage: Language;
  export let onDayChange: (day: DayData) => void;
  export let onStartIntro: () => void;
  
  $: answers = $answersStore;
  
  // Check if answers are loaded
  $: answersLoaded = answers && Object.keys(answers).length > 0;
  
  // Calculate overall statistics
  $: totalQuestions = courseData.slice(1).reduce((sum, day) => sum + day.questions.length, 0);
  $: totalAnswered = answers ? courseData.slice(1).reduce((sum, day) => {
    const dayAnswers = answers[day.id] || [];
    return sum + dayAnswers.filter(a => a && a.trim().length > 0).length;
  }, 0) : 0;
  $: overallCompletion = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
  $: totalWords = answers ? courseData.slice(1).reduce((sum, day) => {
    const dayAnswers = answers[day.id] || [];
    return sum + dayAnswers.reduce((wordSum, a) => {
      if (!a || a.trim().length === 0) return wordSum;
      return wordSum + a.trim().split(/\s+/).length;
    }, 0);
  }, 0) : 0;
  
  // Days completed (100% answered)
  $: daysCompleted = answers ? courseData.slice(1).filter(day => {
    const dayAnswers = answers[day.id] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return answered === day.questions.length;
  }).length : 0;
  
  // Current day (first day with incomplete answers or last day)
  $: currentDay = answers ? (courseData.slice(1).find(day => {
    const dayAnswers = answers[day.id] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return answered < day.questions.length;
  }) || courseData[courseData.length - 1]) : courseData[courseData.length - 1];
  
  // Get completion rate for a specific day
  function getDayCompletion(dayId: string): number {
    const day = courseData.find(d => d.id === dayId);
    if (!day || day.questions.length === 0 || !answers) return 0;
    const dayAnswers = answers[dayId] || [];
    const answered = dayAnswers.filter(a => a && a.trim().length > 0).length;
    return Math.round((answered / day.questions.length) * 100);
  }
  
  // Get character count for a day
  function getDayCharacters(dayId: string): number {
    if (!answers) return 0;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.reduce((sum, a) => sum + (a?.length || 0), 0);
  }

  // Get word count for a day
  function getDayWords(dayId: string): number {
    if (!answers) return 0;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.reduce((sum, a) => {
      if (!a || a.trim().length === 0) return sum;
      return sum + a.trim().split(/\s+/).length;
    }, 0);
  }
  
  // Check if day is started
  function isDayStarted(dayId: string): boolean {
    if (!answers) return false;
    const dayAnswers = answers[dayId] || [];
    return dayAnswers.some(a => a && a.trim().length > 0);
  }

  // Download PDF for a specific day
  async function downloadDayPDF(day: DayData, event: Event) {
    event.stopPropagation(); // Prevent day selection when clicking download
    
    try {
      // Dynamic import of pdfmake
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      
      // Access the default export
      const pdfMake = pdfMakeModule.default;
      
      // Set up fonts - pdfmake comes with default fonts
      pdfMake.fonts = {
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
      };
      
      // Get answers for this day
      const dayAnswers = answers[day.id] || [];
      const dayIndex = courseData.findIndex(d => d.id === day.id);
      
      // Get localized date format
      const dateFormat = currentLanguage === 'en' ? 'en-US' : currentLanguage === 'de' ? 'de-DE' : 'pl-PL';
      const formattedDate = new Date().toLocaleDateString(dateFormat, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Get the translated course data for the current language
      const translatedCourseData = getCourseData(currentLanguage);
      const translatedDay = translatedCourseData.find(d => d.id === day.id);
      const questionsToUse = translatedDay ? translatedDay.questions : day.questions;
      
      // Get the translated theme from dayIntros
      const translatedTheme = translatedDay?.subtitle || day.subtitle;
      
      const answeredCount = dayAnswers.filter(answer => answer && answer.trim().length > 0).length;
      const totalWords = dayAnswers.reduce((sum, answer) => {
        if (!answer || answer.trim().length === 0) return sum;
        return sum + answer.trim().split(/\s+/).length;
      }, 0);
      
      // Build the document content
      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        defaultStyle: {
          font: 'Roboto',
          fontSize: 11,
          lineHeight: 1.3
        },
        content: [
          // Title
          {
            text: t(currentLanguage, 'pdf.title'),
            style: 'header',
            margin: [0, 0, 0, 20]
          },
          
          // Day title
          {
            text: t(currentLanguage, 'pdf.dayTitle', { day: dayIndex, theme: translatedTheme }),
            style: 'subheader',
            margin: [0, 0, 0, 15]
          },
          
          // Completion info
          {
            columns: [
              {
                text: t(currentLanguage, 'pdf.completedOn', { date: formattedDate }).replace(':', ':\n'),
                style: 'info'
              },
              {
                text: t(currentLanguage, 'pdf.progress', { answered: answeredCount, total: questionsToUse.length }).replace(':', ':\n'),
                style: 'info'
              },
              {
                text: t(currentLanguage, 'pdf.totalWords', { words: totalWords }).replace(':', ':\n'),
                style: 'info'
              }
            ],
            margin: [0, 0, 0, 20]
          },
          
          // Questions and answers
          ...questionsToUse.map((question, index) => {
            const answer = dayAnswers[index] || t(currentLanguage, 'answers.noResponse');
            
            return [
              // Question separator line (except for first question)
              ...(index > 0 ? [{
                canvas: [{
                  type: 'line',
                  x1: 0, y1: 0,
                  x2: 515, y2: 0,
                  lineWidth: 0.5,
                  lineColor: '#cccccc'
                }],
                margin: [0, 20, 0, 20]
              }] : []),
              
              // Question number and text
              {
                text: t(currentLanguage, 'questionnaire.questionNumber', { number: index + 1 }),
                style: 'questionNumber',
                margin: [0, index > 0 ? 0 : 10, 0, 5]
              },
              {
                text: question.text,
                style: 'questionText',
                margin: [0, 0, 0, 8]
              },
              
              // Question explanation (if available)
              ...(question.explanation ? [{
                text: question.explanation,
                style: 'explanation',
                margin: [0, 0, 0, 10]
              }] : []),
              
              // Answer
              {
                text: t(currentLanguage, 'pdf.answer'),
                style: 'answerLabel',
                margin: [0, 5, 0, 3]
              },
              {
                text: answer,
                style: 'answerText',
                margin: [0, 0, 0, 15]
              }
            ];
          }).flat()
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            color: '#0c6e78',
            alignment: 'center'
          },
          subheader: {
            fontSize: 18,
            bold: true,
            color: '#3c3c3c'
          },
          info: {
            fontSize: 12,
            color: '#646464'
          },
          questionNumber: {
            fontSize: 13,
            bold: true,
            color: '#0c6e78'
          },
          questionText: {
            fontSize: 11,
            color: '#282828'
          },
          explanation: {
            fontSize: 9,
            italics: true,
            color: '#646464'
          },
          answerLabel: {
            fontSize: 10,
            bold: true,
            color: '#3c3c3c'
          },
          answerText: {
            fontSize: 10,
            color: '#282828'
          }
        }
      };
      
      // Generate and download PDF
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      const fileName = t(currentLanguage, 'pdf.fileName', { 
        day: dayIndex, 
        date: new Date().toISOString().split('T')[0] 
      });
      
      pdfDocGenerator.download(fileName);
      
    } catch (error) {
      console.error('Error downloading day summary:', error);
      alert(t(currentLanguage, 'errors.pdfDownloadFailed') || 'Error downloading your day summary. Please try again.');
    }
  }
</script>

<div class="min-h-screen p-4 sm:p-6 lg:p-10">
  <div class="max-w-7xl mx-auto space-y-8">
    
    {#if !answersLoaded}
      <!-- Loading state -->
      <div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white/70 font-secondary">Loading your journey...</p>
        </div>
      </div>
    {:else}
    
    <!-- Welcome Header -->
    <div class="relative overflow-hidden rounded bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 p-8 shadow-2xl">
      <div class="relative z-10 flex items-center gap-6">
        <!-- Logo -->
        <img src={logo} alt="Self Coaching Tools Logo" class="w-20 h-20 lg:w-24 lg:h-24 object-contain flex-shrink-0" />
        
        <!-- Text Content -->
        <div>
          <h1 class="text-3xl lg:text-4xl font-bold mb-2 font-primary">
            <span class="golden-shimmer">
              {t(currentLanguage, 'dashboard.welcomeBack', { username })}
            </span>
          </h1>
          <p class="text-white/80 text-lg font-secondary">
            {#if overallCompletion === 100}
              {t(currentLanguage, 'dashboard.congratulationsComplete')}
            {:else if overallCompletion === 0}
              {t(currentLanguage, 'dashboard.readyToBegin')}
            {:else if overallCompletion < 30}
              {t(currentLanguage, 'dashboard.justGettingStarted')}
            {:else if overallCompletion < 70}
              {t(currentLanguage, 'dashboard.greatProgress')}
            {:else}
              {t(currentLanguage, 'dashboard.almostThere')}
            {/if}
          </p>
        </div>
      </div>
      
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-50"></div>
    </div>

    <!-- SVG Gradient Definition (hidden, reusable) -->
    <svg class="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <linearGradient id="golden-gradient-svg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FBCA29;stop-opacity:1" />
          <stop offset="1%" style="stop-color:#EBD27B;stop-opacity:1" />
          <stop offset="15%" style="stop-color:#D7B860;stop-opacity:1" />
          <stop offset="25%" style="stop-color:#E7CE77;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#EBD27B;stop-opacity:1" />
          <stop offset="60%" style="stop-color:#C2922E;stop-opacity:1" />
          <stop offset="87%" style="stop-color:#D0B057;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#AB7B2A;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Overall Progress -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide font-secondary">{t(currentLanguage, 'dashboard.overallProgress')}</h3>
          <svg class="w-6 h-6 golden-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-2 font-primary">{overallCompletion}%</div>
        <div class="w-full bg-white/20 rounded-full h-2">
          <div 
            class="bg-green-500 h-2 rounded-full"
            style="width: {overallCompletion}%"
          ></div>
        </div>
      </div>

      <!-- Questions Answered -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide font-secondary">{t(currentLanguage, 'dashboard.questions')}</h3>
          <svg class="w-6 h-6 golden-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1 font-primary">{totalAnswered}/{totalQuestions}</div>
        <p class="text-white/60 text-sm font-secondary">{t(currentLanguage, 'dashboard.questionsAnswered')}</p>
      </div>

      <!-- Days Completed -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide font-secondary">{t(currentLanguage, 'dashboard.daysDone')}</h3>
          <svg class="w-6 h-6 golden-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1 font-primary">{daysCompleted}/7</div>
        <p class="text-white/60 text-sm font-secondary">{t(currentLanguage, 'dashboard.daysCompleted')}</p>
      </div>

      <!-- Total Words -->
      <div class="bg-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wide font-secondary">{t(currentLanguage, 'dashboard.written')}</h3>
          <svg class="w-6 h-6 golden-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </div>
        <div class="text-4xl font-bold text-white mb-1 font-primary">{totalWords}</div>
        <p class="text-white/60 text-sm font-secondary">{t(currentLanguage, 'dashboard.wordsWritten')}</p>
      </div>
    </div>

    <!-- Continue Journey / Getting Started -->
    {#if overallCompletion > 0 && overallCompletion < 100}
      <div class="bg-gradient-to-br from-[#0C6E78]/30 to-[#0A5A63]/30 backdrop-blur-xl border border-[#0C6E78]/50 rounded p-6 shadow-lg mt-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'app.continueJourneyButton')}</h2>
            <p class="text-white/80 text-sm font-secondary">
              {currentDay.title}: {currentDay.subtitle}
            </p>
            <p class="text-white/60 text-sm mt-1 font-secondary">
              {getDayCompletion(currentDay.id)}% {t(currentLanguage, 'dashboard.percentComplete')}
            </p>
          </div>
          <button
            on:click={() => onDayChange(currentDay)}
            class="btn-primary golden-border px-6 py-3 text-base font-bold whitespace-nowrap font-primary"
          >
            <span class="relative z-10 flex items-center gap-2">
              {t(currentLanguage, 'app.continue')}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    {:else if overallCompletion === 0}
      <div class="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded p-6 shadow-lg">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold text-white mb-2 font-primary">{t(currentLanguage, 'dashboard.readyToBeginTitle')}</h2>
            <p class="text-white/80 text-sm font-secondary">
              {t(currentLanguage, 'dashboard.readyToBeginDescription')}
            </p>
          </div>
          <button
            on:click={onStartIntro}
            class="btn-primary golden-border px-6 py-3 text-base shadow-lg hover:shadow-xl whitespace-nowrap font-primary"
          >
            <span class="flex items-center gap-2">
              {t(currentLanguage, 'dashboard.viewIntroduction')}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    {:else}
      <div class="bg-gradient-to-br from-green-500/30 to-green-600/30 backdrop-blur-xl border border-green-400/50 rounded p-6 shadow-lg">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white mb-1 font-primary">{t(currentLanguage, 'dashboard.journeyComplete')}</h2>
            <p class="text-white/80 text-sm font-secondary">
              {t(currentLanguage, 'dashboard.journeyCompleteDescription')}
            </p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Days Overview -->
    <div class="mt-6">
      <div class="flex items-start justify-between mb-4">
        <h2 class="text-2xl font-bold text-white font-primary">{t(currentLanguage, 'dashboard.yourJourney')}</h2>
        <button
          on:click={onStartIntro}
          class="text-white/70 hover:text-white text-sm flex items-center gap-2 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {t(currentLanguage, 'dashboard.viewIntroduction')}
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {#each courseData.slice(1) as day, index}
          {@const completion = getDayCompletion(day.id)}
          {@const isComplete = completion === 100}
          {@const isStarted = isDayStarted(day.id)}
          {@const isCurrent = currentDay?.id === day.id}
          {@const words = getDayWords(day.id)}
          
          <div class="group relative w-full">
            <button
              on:click={() => onDayChange(day)}
              class="btn-primary w-full min-h-[16rem] p-6 text-left flex flex-col items-start"
              class:golden-border={isCurrent}
              class:ring-2={isCurrent}
              class:ring-[#0C6E78]={isCurrent}
            >
              <div class="shimmer-effect"></div>
            {#if isCurrent}
              <div class="absolute top-3 right-3 px-2 py-1 bg-[#0C6E78] text-white text-xs font-bold golden-border border">
                {t(currentLanguage, 'dashboard.current')}
              </div>
            {/if}
            
            <!-- Header Section -->
            <div class="flex items-start justify-between mb-3 w-full">
              <div class="text-left">
                <div class="text-white text-sm font-semibold uppercase tracking-wide mb-1 text-left">
                  Day {index + 1}
                </div>
                <h3 class="text-lg font-bold text-white mb-1 font-primary text-left">{day.subtitle}</h3>
              </div>
              
              {#if isComplete}
                <div class="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              {:else if isStarted}
                <div class="w-10 h-10 bg-[#0C6E78]/30 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              {:else}
                <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              {/if}
            </div>
            
            <!-- Description Section - Takes up available space -->
            <div class="flex-1 mb-4 w-full">
              <p class="text-white/70 text-sm line-clamp-3 text-left">
                {getDaySummary(currentLanguage, day.id)}
              </p>
            </div>
            
            <!-- Progress Bar Section -->
            <div class="space-y-2 w-full">
              <div class="flex items-center justify-between text-xs">
                <span class="text-white/60">{completion}% {t(currentLanguage, 'dashboard.percentComplete')}</span>
                <span class="text-white/60">{day.questions.length} questions</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-1.5">
                <div 
                  class="h-1.5 rounded-full bg-green-500"
                  style="width: {completion}%"
                ></div>
              </div>
              
                <div class="text-xs text-white/50">
                  {words} words written
                </div>
            
            </div>
            
              <!-- Hover effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded pointer-events-none"></div>
            </button>
            
            <!-- Download PDF Button - Bottom Right -->
            {#if isDayStarted(day.id)}
              <button
                on:click={(e) => downloadDayPDF(day, e)}
                class="absolute bottom-3 right-3 px-2 py-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs rounded transition-all duration-200 flex items-center gap-1 opacity-0 group-hover:opacity-100"
                title="Download Day {courseData.findIndex(d => d.id === day.id)} Summary"
                aria-label="Download Day {courseData.findIndex(d => d.id === day.id)} Summary PDF"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Day {courseData.findIndex(d => d.id === day.id)} PDF</span>
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Footer -->
    <Footer {currentLanguage} />
    
    {/if}
  </div>
</div>

<style>
  /* Animated gradient for headline */
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-x {
    background: linear-gradient(-45deg, #ffffff, #D4AF37, #ffffff, #D4AF37);
    background-size: 300% 300%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-x 6s ease-in-out infinite;
  }
</style>

