export interface Question {
  text: string;
  explanation: string;
}

export interface DayData {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export const courseData: DayData[] = [
  {
    id: 'intro',
    title: 'Introduction',
    subtitle: 'Welcome to Your Shadow Work Journey',
    questions: []
  },
  {
    id: 'day1',
    title: 'Day 1',
    subtitle: 'Grounding & Emotional Awareness',
    questions: [
      { text: "What emotion is easiest for you to feel?", explanation: "Identifies your emotional comfort zone and natural emotional tendencies." },
      { text: "What emotion is hardest for you to feel? Why?", explanation: "Reveals emotional blocks and areas needing attention and integration." },
      { text: "When did you last say \"I'm fine\" but weren't? Describe briefly.", explanation: "Explores masking habits and discomfort with vulnerability." },
      { text: "Which feelings do you judge in yourself?", explanation: "Surfaces self-judgment patterns around emotional expression." },
      { text: "Which feelings do you tolerate in others but not in yourself?", explanation: "Highlights double standards and self-compassion gaps." },
      { text: "When you're quiet, what feeling sits just beneath the surface?", explanation: "Connects with underlying emotional states often ignored." },
      { text: "What physical sensations show up when you feel shame?", explanation: "Builds somatic awareness of shame responses in the body." },
      { text: "What physical sensations show up when you feel anger?", explanation: "Develops body awareness of anger and its physical manifestations." },
      { text: "What thought runs most often in your head when you feel anxious?", explanation: "Identifies anxiety thought patterns and mental loops." },
      { text: "What do you tell yourself when you make a mistake?", explanation: "Reveals inner critic patterns and self-talk after errors." },
      { text: "Name one small feeling you've been denying recently.", explanation: "Brings awareness to subtle emotional avoidance patterns." },
      { text: "What mood do you default to after a hard day?", explanation: "Identifies emotional default states and coping patterns." },
      { text: "What helps you release tension quickly? Does it actually help?", explanation: "Examines current coping strategies and their effectiveness." },
      { text: "Which emotion would you like to be able to express more easily?", explanation: "Clarifies emotional growth goals and expression desires." },
      { text: "What safety strategy do you use when emotions feel too big?", explanation: "Identifies protective mechanisms when overwhelmed emotionally." }
    ]
  },
  {
    id: 'day2',
    title: 'Day 2',
    subtitle: 'Triggers, Projection & Relationships',
    questions: [
      { text: "Who triggers you most often and what exactly do they do?", explanation: "Identifies specific trigger patterns and relationship dynamics." },
      { text: "Describe one recent argument — what part of you was pushed?", explanation: "Explores what aspects of self feel threatened in conflict." },
      { text: "What trait in others makes you instantly dislike them?", explanation: "Points to projected traits you may disown in yourself." },
      { text: "What do you assume about others that might be projection?", explanation: "Brings awareness to unconscious projections onto others." },
      { text: "When someone succeeds where you failed, what do you feel first?", explanation: "Examines responses to others' success and personal triggers." },
      { text: "Who in your life is hardest to forgive and why?", explanation: "Explores forgiveness blocks and unresolved relationship wounds." },
      { text: "What pattern repeats in your romantic relationships?", explanation: "Identifies recurring dynamics in intimate partnerships." },
      { text: "What pattern repeats in your friendships?", explanation: "Reveals consistent themes across platonic relationships." },
      { text: "Where do you give too much and where do you take too much?", explanation: "Examines balance and reciprocity in relationships." },
      { text: "When you withdraw, what story do you tell yourself?", explanation: "Identifies narratives that justify emotional withdrawal." },
      { text: "Which relationship role (caretaker, rescuer, critic, etc.) feels familiar?", explanation: "Names habitual roles played in relationships." },
      { text: "When people ask for help, what is your immediate impulse?", explanation: "Explores automatic responses to others' needs." },
      { text: "When someone criticizes you, what do you do first?", explanation: "Maps defensive patterns and criticism responses." },
      { text: "What boundary do you struggle to keep and why?", explanation: "Identifies boundary challenges and underlying fears." },
      { text: "Who do you envy and what part of them do you secretly want?", explanation: "Uses envy to reveal disowned desires and potentials." }
    ]
  },
  {
    id: 'day3',
    title: 'Day 3',
    subtitle: 'Shame, Guilt & Self-Beliefs',
    questions: [
      { text: "When were you first shamed? Briefly describe.", explanation: "Traces early shame experiences and their lasting impact." },
      { text: "What do you carry that you've never told anyone?", explanation: "Explores hidden shame and secrets that isolate you." },
      { text: "What private mistake still haunts you?", explanation: "Identifies unresolved guilt and self-punishment patterns." },
      { text: "What label do you fear others might pin on you?", explanation: "Reveals core identity fears and shame-based beliefs." },
      { text: "What belief about yourself came from childhood?", explanation: "Traces limiting beliefs to their childhood origins." },
      { text: "Which voice inside you is harshest? Quote it.", explanation: "Gives voice to the inner critic and its specific messages." },
      { text: "When you imagine being fully loved, what changes in you?", explanation: "Explores the transformative power of unconditional acceptance." },
      { text: "What do you think you must do to be worthy?", explanation: "Identifies conditional worth scripts and earning patterns." },
      { text: "What would you never admit aloud about your desires?", explanation: "Uncovers shame around authentic wants and needs." },
      { text: "Where do you feel fundamentally \"not enough\"?", explanation: "Locates core inadequacy beliefs and their manifestations." },
      { text: "What would you hide if your deepest fear came true?", explanation: "Explores shame-based hiding and protection strategies." },
      { text: "What is your story for when things go wrong?", explanation: "Identifies blame patterns and responsibility narratives." },
      { text: "What do you punish yourself for most often?", explanation: "Reveals self-punishment patterns and guilt triggers." },
      { text: "When you fail, what is the inner narrative?", explanation: "Examines failure stories and self-talk after setbacks." },
      { text: "How does shame show up in your behavior?", explanation: "Connects shame feelings to behavioral patterns and choices." }
    ]
  },
  {
    id: 'day4',
    title: 'Day 4',
    subtitle: 'Childhood Patterns & Family Conditioning',
    questions: [
      { text: "What role were you assigned in your family? (e.g., peacemaker, achiever)", explanation: "Identifies childhood family roles that still influence identity." },
      { text: "What message did your caregivers most repeat to you?", explanation: "Reveals internalized parental messages and their ongoing impact." },
      { text: "What was not allowed to be said in your home?", explanation: "Explores family taboos and communication restrictions." },
      { text: "What family belief about money or success stuck with you?", explanation: "Identifies inherited beliefs about worth and achievement." },
      { text: "Who in your childhood did you try to please the most?", explanation: "Reveals early people-pleasing patterns and approval seeking." },
      { text: "When did you first learn to hide part of yourself?", explanation: "Traces the origins of self-concealment and authenticity loss." },
      { text: "What childhood wound still affects your choices?", explanation: "Connects past hurts to current decision-making patterns." },
      { text: "What childhood rule do you still follow unconsciously?", explanation: "Identifies unconscious family rules governing behavior." },
      { text: "Which family member's patterns do you now repeat?", explanation: "Explores inherited behavioral and emotional patterns." },
      { text: "What secrecy or silence lived in your family?", explanation: "Examines family secrets and their impact on openness." },
      { text: "Which childhood dream did you quietly abandon?", explanation: "Recovers lost dreams and explores abandonment reasons." },
      { text: "What safety strategy did you develop as a kid that still feels automatic?", explanation: "Identifies childhood survival strategies still active today." },
      { text: "Who were you allowed to be as a child, and who were you not?", explanation: "Explores childhood identity permissions and restrictions." },
      { text: "What early loss or rejection shaped you most?", explanation: "Identifies formative losses and their lasting influence." },
      { text: "What would your younger self want you to know?", explanation: "Connects with inner child wisdom and unmet needs." }
    ]
  },
  {
    id: 'day5',
    title: 'Day 5',
    subtitle: 'Anger, Boundaries, Money & Power',
    questions: [
      { text: "How do you express anger (if at all)?", explanation: "Examines anger expression patterns and comfort levels." },
      { text: "When angry, what do you fear will happen if you speak up?", explanation: "Identifies fears that block healthy anger expression." },
      { text: "What should you have said in a past situation but never did?", explanation: "Explores unexpressed communications and their impact." },
      { text: "Who takes your energy and how do you let them?", explanation: "Identifies energy drains and boundary violations." },
      { text: "What does money mean to you at your core?", explanation: "Explores deep beliefs and emotions around money." },
      { text: "What money beliefs stop you from asking for what you're worth?", explanation: "Identifies limiting beliefs affecting financial self-advocacy." },
      { text: "Where do you feel powerless in life right now?", explanation: "Locates areas of perceived helplessness and disempowerment." },
      { text: "What is one boundary you let others cross and why?", explanation: "Examines specific boundary challenges and their reasons." },
      { text: "What would it take for you to feel more powerful?", explanation: "Explores pathways to personal empowerment and agency." },
      { text: "Where do you use people-pleasing to avoid conflict?", explanation: "Identifies conflict avoidance through people-pleasing patterns." },
      { text: "When someone violates your boundary, what do you feel inside?", explanation: "Connects with internal responses to boundary violations." },
      { text: "What entitlement or resentment do you secretly hold?", explanation: "Explores hidden resentments and entitlement feelings." },
      { text: "What do you hide about your financial fears?", explanation: "Uncovers shame and secrecy around money anxieties." },
      { text: "When given authority, what part of you shrinks or reacts?", explanation: "Examines responses to power and leadership opportunities." },
      { text: "What would you do differently if you weren't afraid of others' reactions?", explanation: "Explores how fear of judgment limits authentic action." }
    ]
  },
  {
    id: 'day6',
    title: 'Day 6',
    subtitle: 'Desires, Authenticity & the Golden Shadow',
    questions: [
      { text: "What do you secretly want that feels \"too much\"?", explanation: "Uncovers desires deemed excessive or inappropriate." },
      { text: "What dream have you minimized to keep peace?", explanation: "Explores dreams sacrificed for harmony or acceptance." },
      { text: "What would you try if no one could judge you?", explanation: "Identifies authentic desires constrained by judgment fears." },
      { text: "Which admired qualities in others do you refuse in yourself?", explanation: "Reveals disowned positive traits - the golden shadow." },
      { text: "What joy or pleasure do you deny as \"selfish\"?", explanation: "Examines pleasure denial and self-deprivation patterns." },
      { text: "What gift or talent do you downplay?", explanation: "Identifies minimized strengths and talents." },
      { text: "What would your life look like if you followed one true desire?", explanation: "Visualizes life aligned with authentic desires." },
      { text: "What do you long to say but habit stops you?", explanation: "Explores unexpressed truths and communication blocks." },
      { text: "Where do you act small to remain safe?", explanation: "Identifies self-diminishing behaviors for safety." },
      { text: "What fantasy have you never shared with anyone?", explanation: "Uncovers private dreams and secret aspirations." },
      { text: "What small indulgence would dramatically improve your well-being?", explanation: "Identifies simple pleasures that could enhance life quality." },
      { text: "What part of your personality do you edit for public view?", explanation: "Explores authentic self vs. public persona differences." },
      { text: "What aspect of success scares you the most?", explanation: "Examines fears around achievement and visibility." },
      { text: "How do you sabotage potential joy or abundance?", explanation: "Identifies self-sabotage patterns around positive experiences." },
      { text: "What would radical self-acceptance allow you to try?", explanation: "Explores possibilities opened by complete self-acceptance." }
    ]
  },
  {
    id: 'day7',
    title: 'Day 7',
    subtitle: 'Integration, Forgiveness & Next Steps',
    questions: [
      { text: "What do you need to forgive yourself for today?", explanation: "Facilitates self-compassion and release of self-punishment." },
      { text: "What pattern are you committed to changing (one you can act on)?", explanation: "Identifies specific, actionable change commitments." },
      { text: "What small boundary will you set this week to protect your energy?", explanation: "Creates concrete boundary-setting intentions." },
      { text: "What mini-experiment will help you test a new way of being?", explanation: "Designs small experiments for trying new behaviors." },
      { text: "What support do you need (therapy, coach, friend) to move forward?", explanation: "Identifies support needs for continued growth." },
      { text: "What daily practice will help you stay honest with yourself?", explanation: "Establishes ongoing self-awareness practices." },
      { text: "If your shadow could speak, what is its kindest message?", explanation: "Invites compassionate dialogue with disowned parts." },
      { text: "What would you like your shadow profile to highlight as strength?", explanation: "Reframes shadow material as potential strengths." },
      { text: "What one sentence would you like to carry into the next month?", explanation: "Distills key insights into a guiding principle." },
      { text: "How will you celebrate honest self-work once you finish this journey?", explanation: "Plans celebration and acknowledgment of growth work." }
    ]
  }
];

// Legacy export for backward compatibility
export const questions = courseData.flatMap(day => 
  day.questions.map(q => ({
    section: day.subtitle,
    text: q.text,
    explanation: q.explanation
  }))
);