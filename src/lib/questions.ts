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
      { text: "Which emotion do you find the easiest to experience and express?", explanation: "This question helps identify your emotional comfort zone and natural emotional tendencies. For example, you might find joy easy to feel when spending time with friends. Ideas: Reflect on situations where this emotion arises naturally, such as during hobbies or social interactions, and note why it feels accessible." },
      { text: "Which emotion do you find the hardest to experience or express, and why?", explanation: "This question reveals emotional blocks and areas needing attention and integration. For example, anger might be hard if you were taught it's 'bad'. Ideas: Consider childhood experiences or cultural influences that might make this emotion difficult, and think about how it affects your daily life." },
      { text: "When was the last time you said 'I'm fine' but actually weren't? Describe the situation briefly.", explanation: "This question explores masking habits and discomfort with vulnerability. For example, you might say it at work to avoid showing stress. Ideas: Think about why you masked your feelings - was it to protect yourself or others? Consider what would happen if you were more honest." },
      { text: "Which feelings do you tend to judge in yourself?", explanation: "This question surfaces self-judgment patterns around emotional expression. For example, you might judge yourself for feeling jealous. Ideas: Explore where this judgment comes from, like societal norms, and consider how accepting these feelings could lead to better self-understanding." },
      { text: "Which feelings do you tolerate in others but not in yourself?", explanation: "This question highlights double standards and self-compassion gaps. For example, you might accept a friend's anger but not your own. Ideas: Reflect on why you're harder on yourself - perhaps perfectionism - and practice extending the same compassion to yourself." },
      { text: "When you're quiet or alone, what feeling often sits just beneath the surface?", explanation: "This question connects with underlying emotional states often ignored. For example, a subtle sadness might emerge in quiet moments. Ideas: Pay attention to these moments during your day; journal about them to understand recurring patterns and triggers." },
      { text: "What physical sensations do you notice in your body when you feel shame?", explanation: "This question builds somatic awareness of shame responses in the body. For example, a sinking feeling in the stomach or hot cheeks. Ideas: Scan your body during shameful moments; use this awareness to ground yourself and process the emotion more effectively." },
      { text: "What physical sensations do you notice in your body when you feel anger?", explanation: "This question develops body awareness of anger and its physical manifestations. For example, clenched jaw or racing heart. Ideas: Notice these signals early to manage anger better; try breathing exercises to calm the physical response." },
      { text: "What thought most often runs through your head when you feel anxious?", explanation: "This question identifies anxiety thought patterns and mental loops. For example, 'What if everything goes wrong?'. Ideas: Challenge these thoughts by writing them down and finding evidence against them to break the anxiety cycle." },
      { text: "What do you typically tell yourself when you make a mistake?", explanation: "This question reveals inner critic patterns and self-talk after errors. For example, 'I'm such an idiot'. Ideas: Practice replacing harsh self-talk with kinder alternatives, like 'Everyone makes mistakes, what can I learn?'" },
      { text: "Name one small feeling you've been denying or ignoring recently.", explanation: "This question brings awareness to subtle emotional avoidance patterns. For example, a slight disappointment in a friendship. Ideas: Acknowledge it without judgment; consider small actions to address it, like expressing it gently." },
      { text: "What mood do you usually default to after a hard day?", explanation: "This question identifies emotional default states and coping patterns. For example, withdrawing into numbness. Ideas: Notice if this mood serves you; experiment with alternative responses like a relaxing activity." },
      { text: "What helps you release tension quickly, and does it truly help in the long term?", explanation: "This question examines current coping strategies and their effectiveness. For example, scrolling social media might provide short-term relief but increase stress. Ideas: Evaluate if it's sustainable; try healthier alternatives like walking or meditation." },
      { text: "Which emotion would you like to be able to express more easily, and why?", explanation: "This question clarifies emotional growth goals and expression desires. For example, expressing vulnerability to build closer relationships. Ideas: Start small, like sharing with a trusted friend, and note the benefits." },
      { text: "What safety strategy do you use when emotions feel overwhelming?", explanation: "This question identifies protective mechanisms when overwhelmed emotionally. For example, distracting yourself with work. Ideas: Assess if it's helpful or avoidance; consider healthier strategies like journaling or talking to someone." }
    ]
  },
  {
    id: 'day2',
    title: 'Day 2',
    subtitle: 'Triggers, Projection & Relationships',
    questions: [
      { text: "Who triggers you most often, and what specific behavior of theirs sets you off?", explanation: "This question identifies specific trigger patterns and relationship dynamics. For example, a coworker's criticism might trigger insecurity. Ideas: Track triggers in a journal to see patterns and underlying reasons." },
      { text: "Describe one recent argument — what part of you felt most threatened or pushed?", explanation: "This question explores what aspects of self feel threatened in conflict. For example, your sense of competence might feel attacked. Ideas: Reflect on the core fear behind the reaction, like fear of failure." },
      { text: "What trait in others makes you instantly dislike or judge them?", explanation: "This question points to projected traits you may disown in yourself. For example, disliking arrogance might reflect your own suppressed confidence. Ideas: Ask yourself if you have that trait in some form and why you reject it." },
      { text: "What assumptions do you make about others that might actually be projections of your own issues?", explanation: "This question brings awareness to unconscious projections onto others. For example, assuming someone is lazy might reflect your own burnout. Ideas: Flip the assumption and see if it applies to you; this can reveal hidden self-judgments." },
      { text: "When someone succeeds in an area where you failed, what is your initial emotional response?", explanation: "This question examines responses to others' success and personal triggers. For example, feeling bitter might indicate unresolved failure. Ideas: Practice celebrating their success to build resilience and self-compassion." },
      { text: "Who in your life is the hardest to forgive, and what makes it so difficult?", explanation: "This question explores forgiveness blocks and unresolved relationship wounds. For example, a parent's neglect might be hard to forgive due to deep hurt. Ideas: Write a letter (not sent) expressing your feelings to process the pain." },
      { text: "What pattern keeps repeating in your romantic relationships?", explanation: "This question identifies recurring dynamics in intimate partnerships. For example, always choosing unavailable partners. Ideas: Look for common themes and consider how your choices contribute to the pattern." },
      { text: "What pattern keeps repeating in your friendships?", explanation: "This question reveals consistent themes across platonic relationships. For example, feeling used or overlooked. Ideas: Examine your role in these patterns and set new boundaries." },
      { text: "In relationships, where do you tend to give too much, and where do you take too much?", explanation: "This question examines balance and reciprocity in relationships. For example, giving emotional support but taking material help. Ideas: Aim for balance by communicating needs and limits clearly." },
      { text: "When you withdraw from a relationship, what story do you tell yourself to justify it?", explanation: "This question identifies narratives that justify emotional withdrawal. For example, 'They don't care anyway'. Ideas: Challenge the story by checking facts and communicating openly." },
      { text: "Which relationship role (like caretaker, rescuer, or critic) feels most familiar to you?", explanation: "This question names habitual roles played in relationships. For example, always being the caretaker. Ideas: Consider if this role serves you or if it's time to try new dynamics." },
      { text: "When people ask for help, what is your immediate impulse or response?", explanation: "This question explores automatic responses to others' needs. For example, dropping everything to help. Ideas: Notice if it's healthy or codependent, and practice balanced responses." },
      { text: "When someone criticizes you, what is your first reaction or action?", explanation: "This question maps defensive patterns and criticism responses. For example, becoming defensive or withdrawing. Ideas: Pause and ask if there's truth in the criticism before reacting." },
      { text: "What boundary do you struggle to maintain, and why is it challenging?", explanation: "This question identifies boundary challenges and underlying fears. For example, saying no to family requests due to guilt. Ideas: Practice small 'no's to build confidence in boundary-setting." },
      { text: "Who do you envy, and what specific quality of theirs do you secretly desire for yourself?", explanation: "This question uses envy to reveal disowned desires and potentials. For example, envying a friend's confidence. Ideas: Use envy as motivation to develop that quality in yourself." }
    ]
  },
  {
    id: 'day3',
    title: 'Day 3',
    subtitle: 'Shame, Guilt & Self-Beliefs',
    questions: [
      { text: "When were you first made to feel ashamed? Describe the situation briefly.", explanation: "This question traces early shame experiences and their lasting impact. For example, being scolded in front of others as a child. Ideas: Reflect on how this memory still influences your self-view today." },
      { text: "What do you carry with you that you've never shared with anyone?", explanation: "This question explores hidden shame and secrets that isolate you. For example, a past failure you keep secret. Ideas: Consider the relief of sharing with a trusted person or journal." },
      { text: "What private mistake from your past still haunts you?", explanation: "This question identifies unresolved guilt and self-punishment patterns. For example, hurting a friend unintentionally. Ideas: Practice self-forgiveness by writing what you've learned from it." },
      { text: "What label do you fear others might assign to you?", explanation: "This question reveals core identity fears and shame-based beliefs. For example, being seen as 'weak'. Ideas: Examine where this fear comes from and challenge its validity." },
      { text: "What limiting belief about yourself originated from your childhood?", explanation: "This question traces limiting beliefs to their childhood origins. For example, 'I'm not smart enough' from school experiences. Ideas: Rewrite the belief with evidence from your adult life." },
      { text: "Which inner voice is the harshest toward you? What does it typically say?", explanation: "This question gives voice to the inner critic and its specific messages. For example, 'You always mess up'. Ideas: Counter it with compassionate self-talk, like a kind friend would say." },
      { text: "When you imagine being fully loved and accepted, what changes in how you feel or behave?", explanation: "This question explores the transformative power of unconditional acceptance. For example, you might feel freer to take risks. Ideas: Practice self-acceptance to bring this feeling into reality." },
      { text: "What do you believe you must do or achieve to be worthy of love or success?", explanation: "This question identifies conditional worth scripts and earning patterns. For example, 'I must be perfect'. Ideas: Challenge this by listing your inherent worth without achievements." },
      { text: "What desire do you have that you would never admit aloud due to shame?", explanation: "This question uncovers shame around authentic wants and needs. For example, wanting more attention. Ideas: Acknowledge the desire without judgment to reduce its power." },
      { text: "In what area of life do you feel fundamentally 'not enough'?", explanation: "This question locates core inadequacy beliefs and their manifestations. For example, not good enough in relationships. Ideas: Collect evidence of your sufficiency in that area." },
      { text: "If your deepest fear came true, what would you try to hide from others?", explanation: "This question explores shame-based hiding and protection strategies. For example, hiding failure from family. Ideas: Consider the cost of hiding and benefits of vulnerability." },
      { text: "What is your go-to story or explanation when things go wrong?", explanation: "This question identifies blame patterns and responsibility narratives. For example, 'It's always my fault'. Ideas: Balance it with realistic assessment of situations." },
      { text: "What do you punish yourself for most often, and how?", explanation: "This question reveals self-punishment patterns and guilt triggers. For example, overworking after a mistake. Ideas: Replace punishment with learning and self-care." },
      { text: "When you fail at something, what is the inner narrative or story you tell yourself?", explanation: "This question examines failure stories and self-talk after setbacks. For example, 'I'm a failure'. Ideas: Reframe to 'This is a learning opportunity'." },
      { text: "How does shame manifest in your behavior or choices?", explanation: "This question connects shame feelings to behavioral patterns and choices. For example, avoiding social events. Ideas: Notice and gently challenge shame-driven behaviors." }
    ]
  },
  {
    id: 'day4',
    title: 'Day 4',
    subtitle: 'Childhood Patterns & Family Conditioning',
    questions: [
      { text: "What role were you assigned or took on in your family (e.g., peacemaker, achiever)?", explanation: "This question identifies childhood family roles that still influence identity. For example, being the 'responsible one'. Ideas: Reflect on how this role serves or limits you now." },
      { text: "What message did your caregivers most often repeat to you?", explanation: "This question reveals internalized parental messages and their ongoing impact. For example, 'Be nice to everyone'. Ideas: Decide if this message still serves you or needs updating." },
      { text: "What topics or emotions were not allowed to be discussed in your home?", explanation: "This question explores family taboos and communication restrictions. For example, money problems. Ideas: Practice expressing these in safe spaces now." },
      { text: "What family belief about money or success has stuck with you?", explanation: "This question identifies inherited beliefs about worth and achievement. For example, 'Money is the root of evil'. Ideas: Examine if it aligns with your values or needs revision." },
      { text: "Who in your childhood did you try hardest to please, and why?", explanation: "This question reveals early people-pleasing patterns and approval seeking. For example, a strict parent. Ideas: Notice if this pattern continues in adult relationships." },
      { text: "When did you first learn to hide a part of yourself, and what was it?", explanation: "This question traces the origins of self-concealment and authenticity loss. For example, hiding emotions to avoid conflict. Ideas: Practice showing that part in small, safe ways." },
      { text: "What childhood wound still influences your choices today?", explanation: "This question connects past hurts to current decision-making patterns. For example, abandonment fear leading to clingy behavior. Ideas: Seek healing through therapy or self-reflection." },
      { text: "What childhood rule do you still follow unconsciously?", explanation: "This question identifies unconscious family rules governing behavior. For example, 'Don't show weakness'. Ideas: Consciously choose which rules to keep or discard." },
      { text: "Which family member's patterns or behaviors do you now repeat?", explanation: "This question explores inherited behavioral and emotional patterns. For example, a parent's workaholism. Ideas: Break the cycle by choosing different responses." },
      { text: "What secrecy or silence existed in your family?", explanation: "This question examines family secrets and their impact on openness. For example, not talking about a relative's illness. Ideas: Consider how this affects your current communication style." },
      { text: "Which childhood dream did you quietly abandon, and why?", explanation: "This question recovers lost dreams and explores abandonment reasons. For example, giving up art for a 'practical' career. Ideas: Revive it in small ways to reconnect with your passions." },
      { text: "What safety strategy did you develop as a child that still feels automatic?", explanation: "This question identifies childhood survival strategies still active today. For example, people-pleasing to avoid anger. Ideas: Update it to better suit your adult life." },
      { text: "Who were you allowed to be as a child, and who were you not allowed to be?", explanation: "This question explores childhood identity permissions and restrictions. For example, allowed to be smart but not emotional. Ideas: Give yourself permission now to be your full self." },
      { text: "What early loss or rejection shaped you the most?", explanation: "This question identifies formative losses and their lasting influence. For example, a parent's divorce. Ideas: Process the grief to reduce its hold on you." },
      { text: "What would your younger self want you to know or do now?", explanation: "This question connects with inner child wisdom and unmet needs. For example, 'It's okay to play'. Ideas: Act on this message to heal inner child wounds." }
    ]
  },
  {
    id: 'day5',
    title: 'Day 5',
    subtitle: 'Anger, Boundaries, Money & Power',
    questions: [
      { text: "How do you typically express anger, if at all?", explanation: "This question examines anger expression patterns and comfort levels. For example, suppressing it until it explodes. Ideas: Practice healthy expression like assertive communication." },
      { text: "When angry, what do you fear will happen if you speak up?", explanation: "This question identifies fears that block healthy anger expression. For example, fear of rejection. Ideas: Test small expressions to build confidence." },
      { text: "What should you have said in a past situation but held back?", explanation: "This question explores unexpressed communications and their impact. For example, setting a boundary with a friend. Ideas: Role-play what you would say now." },
      { text: "Who or what drains your energy, and how do you allow it to happen?", explanation: "This question identifies energy drains and boundary violations. For example, overcommitting to work. Ideas: Set limits to protect your energy." },
      { text: "What does money represent to you at your core?", explanation: "This question explores deep beliefs and emotions around money. For example, security or freedom. Ideas: Examine if this belief helps or hinders you." },
      { text: "What beliefs about money prevent you from asking for what you're worth?", explanation: "This question identifies limiting beliefs affecting financial self-advocacy. For example, 'Asking for more is greedy'. Ideas: Research market rates to build confidence." },
      { text: "In what area of life do you currently feel powerless?", explanation: "This question locates areas of perceived helplessness and disempowerment. For example, in your career. Ideas: Take small actions to reclaim power." },
      { text: "What boundary do you struggle to enforce, and why?", explanation: "This question examines specific boundary challenges and their reasons. For example, saying no to extra work. Ideas: Practice with low-stakes situations." },
      { text: "What would it take for you to feel more powerful in your life?", explanation: "This question explores pathways to personal empowerment and agency. For example, learning new skills. Ideas: Create a plan with actionable steps." },
      { text: "Where do you use people-pleasing to avoid conflict?", explanation: "This question identifies conflict avoidance through people-pleasing patterns. For example, agreeing when you disagree. Ideas: Practice honest but kind communication." },
      { text: "When someone violates your boundary, what do you feel inside?", explanation: "This question connects with internal responses to boundary violations. For example, resentment or anxiety. Ideas: Use this feeling as a signal to speak up." },
      { text: "What entitlement or resentment do you secretly hold onto?", explanation: "This question explores hidden resentments and entitlement feelings. For example, resenting a sibling's success. Ideas: Express it in writing to release it." },
      { text: "What financial fears do you keep hidden?", explanation: "This question uncovers shame and secrecy around money anxieties. For example, fear of poverty. Ideas: Share with a trusted advisor for perspective." },
      { text: "When given authority or power, what part of you shrinks or reacts negatively?", explanation: "This question examines responses to power and leadership opportunities. For example, imposter syndrome. Ideas: Build confidence through small leadership roles." },
      { text: "What would you do differently if you weren't afraid of others' reactions or judgments?", explanation: "This question explores how fear of judgment limits authentic action. For example, pursuing a passion project. Ideas: Start with actions where judgment is minimal." }
    ]
  },
  {
    id: 'day6',
    title: 'Day 6',
    subtitle: 'Desires, Authenticity & the Golden Shadow',
    questions: [
      { text: "What do you secretly want that feels 'too much' or excessive?", explanation: "This question uncovers desires deemed excessive or inappropriate. For example, wanting more recognition. Ideas: Examine why it feels 'too much' and if it's truly unreasonable." },
      { text: "What dream have you minimized or downplayed to keep the peace?", explanation: "This question explores dreams sacrificed for harmony or acceptance. For example, a career change. Ideas: Take small steps toward it without disrupting everything." },
      { text: "What would you try or do if no one could judge you?", explanation: "This question identifies authentic desires constrained by judgment fears. For example, starting a blog. Ideas: Find supportive communities to express yourself." },
      { text: "Which qualities you admire in others do you refuse or deny in yourself?", explanation: "This question reveals disowned positive traits - the golden shadow. For example, admiring creativity but claiming you're not creative. Ideas: Experiment with that quality in small ways." },
      { text: "What joy or pleasure do you deny yourself as 'selfish'?", explanation: "This question examines pleasure denial and self-deprivation patterns. For example, taking time for hobbies. Ideas: Allow small indulgences to build self-care habits." },
      { text: "What gift or talent do you downplay or minimize?", explanation: "This question identifies minimized strengths and talents. For example, artistic abilities. Ideas: Share it with others to receive positive feedback." },
      { text: "What would your life look like if you followed one true desire fully?", explanation: "This question visualizes life aligned with authentic desires. For example, living in a different city. Ideas: Create a vision board or plan steps toward it." },
      { text: "What do you long to say or express but habit or fear stops you?", explanation: "This question explores unexpressed truths and communication blocks. For example, telling someone you love them. Ideas: Practice in low-risk situations first." },
      { text: "Where do you act small or diminish yourself to remain safe?", explanation: "This question identifies self-diminishing behaviors for safety. For example, not speaking up in meetings. Ideas: Build safety through self-affirmation." },
      { text: "What fantasy or dream have you never shared with anyone?", explanation: "This question uncovers private dreams and secret aspirations. For example, writing a book. Ideas: Write it down and consider first steps." },
      { text: "What small indulgence would dramatically improve your well-being?", explanation: "This question identifies simple pleasures that could enhance life quality. For example, a weekly massage. Ideas: Schedule it regularly to prioritize self-care." },
      { text: "What part of your personality do you edit or hide in public?", explanation: "This question explores authentic self vs. public persona differences. For example, your quirky humor. Ideas: Show it in safe social settings." },
      { text: "What aspect of success scares you the most?", explanation: "This question examines fears around achievement and visibility. For example, fear of envy from others. Ideas: Address the fear through preparation or support." },
      { text: "How do you sabotage potential joy or abundance in your life?", explanation: "This question identifies self-sabotage patterns around positive experiences. For example, procrastinating on opportunities. Ideas: Notice the pattern and choose differently." },
      { text: "What would radical self-acceptance allow you to try or achieve?", explanation: "This question explores possibilities opened by complete self-acceptance. For example, pursuing a new career. Ideas: Practice daily affirmations to build acceptance." }
    ]
  },
  {
    id: 'day7',
    title: 'Day 7',
    subtitle: 'Integration, Forgiveness & Next Steps',
    questions: [
      { text: "What do you need to forgive yourself for today?", explanation: "This question facilitates self-compassion and release of self-punishment. For example, a recent mistake. Ideas: Write a forgiveness letter to yourself." },
      { text: "What pattern are you committed to changing, and how can you act on it?", explanation: "This question identifies specific, actionable change commitments. For example, people-pleasing. Ideas: Set a small goal like saying no once a week." },
      { text: "What small boundary will you set this week to protect your energy?", explanation: "This question creates concrete boundary-setting intentions. For example, limiting social media time. Ideas: Communicate it clearly to involved parties." },
      { text: "What mini-experiment will help you test a new way of being?", explanation: "This question designs small experiments for trying new behaviors. For example, expressing emotions daily. Ideas: Track the results in a journal." },
      { text: "What support (like therapy, coach, or friend) do you need to move forward?", explanation: "This question identifies support needs for continued growth. For example, a therapist for deep work. Ideas: Research and reach out to potential supports." },
      { text: "What daily practice will help you stay honest with yourself?", explanation: "This question establishes ongoing self-awareness practices. For example, evening reflection. Ideas: Set a reminder and make it a habit." },
      { text: "If your shadow could speak, what is its kindest message to you?", explanation: "This question invites compassionate dialogue with disowned parts. For example, 'You are worthy as you are'. Ideas: Listen and integrate this message." },
      { text: "What would you like your shadow profile to highlight as a strength?", explanation: "This question reframes shadow material as potential strengths. For example, sensitivity as empathy. Ideas: Embrace and develop this strength." },
      { text: "What one sentence or mantra would you like to carry into the next month?", explanation: "This question distills key insights into a guiding principle. For example, 'I am enough'. Ideas: Repeat it daily for reinforcement." },
      { text: "How will you celebrate completing this shadow work journey?", explanation: "This question plans celebration and acknowledgment of growth work. For example, a special outing. Ideas: Make it meaningful and self-honoring." }
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