import "clsx";
import { z as attr_class, G as stringify } from "../../../../chunks/index2.js";
import { L as Login } from "../../../../chunks/Login.js";
import "../../../../chunks/supabaseClient.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
const courseData_en = [
  {
    id: "intro",
    title: "Introduction",
    subtitle: "Welcome to Your Shadow Work Journey",
    questions: []
  },
  {
    id: "day1",
    title: "Day 1",
    subtitle: "Grounding & Emotional Awareness",
    questions: [
      { text: "Which emotion do you find the easiest to experience and express?", explanation: "This question helps identify your emotional comfort zone and natural tendencies. Example: joy might feel easy around friends or during hobbies.\n\nTipp: Notice where this emotion arises most naturally and why it feels accessible." },
      { text: "Which emotion do you find the hardest to experience or express, and why?", explanation: "This question reveals emotional blocks and areas needing attention and integration. For example, anger might be hard if you were taught it's 'bad'.\n\nTipp: Consider childhood experiences or cultural influences that might make this emotion difficult, and think about how it affects your daily life." },
      { text: "When was the last time you said 'I'm fine' but actually weren't? Describe the situation briefly.", explanation: "This question explores masking habits and discomfort with vulnerability. Example: saying 'I'm fine' at work to avoid showing stress.\n\nTipp: Note why you masked your feelings and what a safer, more honest alternative could have been." },
      { text: "Which feelings do you tend to judge in yourself?", explanation: "This question surfaces self-judgment patterns around emotional expression. For example, you might judge yourself for feeling jealous.\n\nTipp: Explore where this judgment comes from, like societal norms, and consider how accepting these feelings could lead to better self-understanding." },
      { text: "Which feelings do you tolerate in others but not in yourself?", explanation: "This question highlights double standards and self-compassion gaps. For example, you might accept a friend's anger but not your own.\n\nTipp: Practice extending the same compassion you offer others to yourself." },
      { text: "When you're quiet or alone, what feeling often sits just beneath the surface?", explanation: "This question connects with underlying emotional states often ignored. For example, a subtle sadness might emerge in quiet moments.\n\nTipp: Pay attention to these moments during your day; journal about them to understand recurring patterns and triggers." },
      { text: "What physical sensations do you notice in your body when you feel shame?", explanation: "This question builds somatic awareness of shame responses in the body. For example, a sinking feeling in the stomach or hot cheeks.\n\nTipp: Scan your body during shameful moments; use this awareness to ground yourself and process the emotion more effectively." },
      { text: "What physical sensations do you notice in your body when you feel anger?", explanation: "This question develops body awareness of anger and its physical manifestations. For example, clenched jaw or racing heart.\n\nTipp: Notice these signals early to manage anger better; try breathing exercises to calm the physical response." },
      { text: "What thought most often runs through your head when you feel anxious?", explanation: "This question identifies anxiety thought patterns and mental loops. For example, 'What if everything goes wrong?'.\n\nTipp: Challenge these thoughts by writing them down and finding evidence against them to break the anxiety cycle." },
      { text: "What do you typically tell yourself when you make a mistake?", explanation: "This question reveals inner critic patterns after errors. Example: 'I always mess things up.'\n\nTipp: Try a kinder reframe: 'Everyone makes mistakes—what can I learn from this?'" },
      { text: "Name one small feeling you've been denying or ignoring recently.", explanation: "This question brings awareness to subtle emotional avoidance. Example: quiet disappointment in a friendship.\n\nTipp: Acknowledge it without judgment and consider a small step to address it." },
      { text: "What mood do you usually default to after a hard day?", explanation: "This question identifies your default post-stress mood. Example: withdrawing into numbness.\n\nTipp: Notice whether this serves you; test one alternative (a short walk, a warm shower, or a calming check-in)." },
      { text: "What helps you release tension quickly, and does it truly help in the long term?", explanation: "This question examines your current tension-release strategies. Example: scrolling social media may soothe briefly but add stress later.\n\nTipp: Keep what genuinely helps and try one healthier option (movement, breathwork, brief journaling)." },
      { text: "Which emotion would you like to be able to express more easily, and why?", explanation: "This question clarifies emotional growth goals. Example: expressing vulnerability to deepen relationships.\n\nTipp: Take one small step—share a feeling with a trusted person and notice what happens." },
      { text: "What safety strategy do you use when emotions feel overwhelming?", explanation: "This question identifies protective strategies you use when overwhelmed. Example: distracting yourself with work.\n\nTipp: If it's more avoidant than helpful, test a gentler option (grounding, journaling, or reaching out)." }
    ]
  },
  {
    id: "day2",
    title: "Day 2",
    subtitle: "Triggers, Projection & Relationships",
    questions: [
      { text: "Who triggers you most often, and what specific behavior of theirs sets you off?", explanation: "This question identifies specific trigger patterns and relationship dynamics. For example, a coworker's criticism might trigger insecurity.\n\nTipp: Track triggers in a journal to see patterns and underlying reasons." },
      { text: "Describe one recent argument — what part of you felt most threatened or pushed?", explanation: "This question explores what aspects of self feel threatened in conflict. For example, your sense of competence might feel attacked.\n\nTipp: Reflect on the core fear behind the reaction, like fear of failure." },
      { text: "What trait in others makes you instantly dislike or judge them?", explanation: "This question points to projected traits you may disown in yourself. For example, disliking arrogance might reflect your own suppressed confidence.\n\nTipp: Ask yourself if you have that trait in some form and why you reject it." },
      { text: "What assumptions do you make about others that might actually be projections of your own issues?", explanation: "This question brings awareness to unconscious projections onto others. For example, assuming someone is lazy might reflect your own burnout.\n\nTipp: Flip the assumption and see if it applies to you; this can reveal hidden self-judgments." },
      { text: "When someone succeeds in an area where you failed, what is your initial emotional response?", explanation: "This question examines responses to others' success and personal triggers. For example, feeling bitter might indicate unresolved failure.\n\nTipp: Practice celebrating their success to build resilience and self-compassion." },
      { text: "Who in your life is the hardest to forgive, and what makes it so difficult?", explanation: "This question explores forgiveness blocks and unresolved relationship wounds. For example, a parent's neglect might be hard to forgive due to deep hurt.\n\nTipp: Write a letter (not sent) expressing your feelings to process the pain." },
      { text: "What pattern keeps repeating in your romantic relationships?", explanation: "This question identifies recurring dynamics in intimate partnerships. For example, always choosing unavailable partners.\n\nTipp: Look for common themes and consider how your choices contribute to the pattern." },
      { text: "What pattern keeps repeating in your friendships?", explanation: "This question reveals consistent themes across platonic relationships. For example, feeling used or overlooked.\n\nTipp: Examine your role in these patterns and set new boundaries." },
      { text: "In relationships, where do you tend to give too much, and where do you take too much?", explanation: "This question examines balance and reciprocity in relationships. For example, giving emotional support but taking material help.\n\nTipp: Aim for balance by communicating needs and limits clearly." },
      { text: "When you withdraw from a relationship, what story do you tell yourself to justify it?", explanation: "This question identifies narratives that justify emotional withdrawal. For example, 'They don't care anyway'.\n\nTipp: Challenge the story by checking facts and communicating openly." },
      { text: "Which relationship role (like caretaker, rescuer, or critic) feels most familiar to you?", explanation: "This question names habitual roles played in relationships. For example, always being the caretaker.\n\nTipp: Consider if this role serves you or if it's time to try new dynamics." },
      { text: "When people ask for help, what is your immediate impulse or response?", explanation: "This question explores automatic responses to others' needs. For example, dropping everything to help.\n\nTipp: Notice if it's healthy or codependent, and practice balanced responses." },
      { text: "When someone criticizes you, what is your first reaction or action?", explanation: "This question maps defensive patterns and criticism responses. For example, becoming defensive or withdrawing.\n\nTipp: Pause and ask if there's truth in the criticism before reacting." },
      { text: "What boundary do you struggle to maintain, and why is it challenging?", explanation: "This question identifies boundary challenges and underlying fears. For example, saying no to family requests due to guilt.\n\nTipp: Practice small 'no's to build confidence in boundary-setting." },
      { text: "Who do you envy, and what specific quality of theirs do you secretly desire for yourself?", explanation: "This question uses envy to reveal disowned desires and potentials. For example, envying a friend's confidence.\n\nTipp: Use envy as motivation to develop that quality in yourself." }
    ]
  },
  {
    id: "day3",
    title: "Day 3",
    subtitle: "Shame, Guilt & Self-Beliefs",
    questions: [
      { text: "When were you first made to feel ashamed? Describe the situation briefly.", explanation: "This question traces early shame experiences and their lasting impact. For example, being scolded in front of others as a child.\n\nTipp: Reflect on how this memory still influences your self-view today." },
      { text: "What do you carry with you that you've never shared with anyone?", explanation: "This question explores hidden shame and secrets that isolate you. For example, a past failure you keep secret.\n\nTipp: Consider the relief of sharing with a trusted person or journal." },
      { text: "What private mistake from your past still haunts you?", explanation: "This question identifies unresolved guilt and self-punishment patterns. For example, hurting a friend unintentionally.\n\nTipp: Practice self-forgiveness by writing what you've learned from it." },
      { text: "What label do you fear others might assign to you?", explanation: "This question reveals core identity fears and shame-based beliefs. For example, being seen as 'weak'.\n\nTipp: Examine where this fear comes from and challenge its validity." },
      { text: "What limiting belief about yourself originated from your childhood?", explanation: "This question traces limiting beliefs to their childhood origins. For example, 'I'm not smart enough' from school experiences.\n\nTipp: Rewrite the belief with evidence from your adult life." },
      { text: "Which inner voice is the harshest toward you? What does it typically say?", explanation: "This question gives voice to the inner critic and its specific messages. For example, 'You always mess up'.\n\nTipp: Counter it with compassionate self-talk, like a kind friend would say." },
      { text: "When you imagine being fully loved and accepted, what changes in how you feel or behave?", explanation: "This question explores the transformative power of unconditional acceptance. For example, you might feel freer to take risks.\n\nTipp: Practice self-acceptance to bring this feeling into reality." },
      { text: "What do you believe you must do or achieve to be worthy of love or success?", explanation: "This question identifies conditional worth scripts and earning patterns. For example, 'I must be perfect'.\n\nTipp: Challenge this by listing your inherent worth without achievements." },
      { text: "What desire do you have that you would never admit aloud due to shame?", explanation: "This question uncovers shame around authentic wants and needs. For example, wanting more attention.\n\nTipp: Acknowledge the desire without judgment to reduce its power." },
      { text: "In what area of life do you feel fundamentally 'not enough'?", explanation: "This question locates core inadequacy beliefs and their manifestations. For example, not good enough in relationships.\n\nTipp: Collect evidence of your sufficiency in that area." },
      { text: "If your deepest fear came true, what would you try to hide from others?", explanation: "This question explores shame-based hiding and protection strategies. For example, hiding failure from family.\n\nTipp: Consider the cost of hiding and benefits of vulnerability." },
      { text: "What is your go-to story or explanation when things go wrong?", explanation: "This question identifies blame patterns and responsibility narratives. For example, 'It's always my fault'.\n\nTipp: Balance it with realistic assessment of situations." },
      { text: "What do you punish yourself for most often, and how?", explanation: "This question reveals self-punishment patterns and guilt triggers. For example, overworking after a mistake.\n\nTipp: Replace punishment with learning and self-care." },
      { text: "When you fail at something, what is the inner narrative or story you tell yourself?", explanation: "This question examines failure stories and self-talk after setbacks. For example, 'I'm a failure'.\n\nTipp: Reframe to 'This is a learning opportunity'." },
      { text: "How does shame manifest in your behavior or choices?", explanation: "This question connects shame feelings to behavioral patterns and choices. For example, avoiding social events.\n\nTipp: Notice and gently challenge shame-driven behaviors." }
    ]
  },
  {
    id: "day4",
    title: "Day 4",
    subtitle: "Childhood Patterns & Family Conditioning",
    questions: [
      { text: "What role were you assigned or took on in your family (e.g., peacemaker, achiever)?", explanation: "This question identifies childhood family roles that still influence identity. For example, being the 'responsible one'.\n\nTipp: Reflect on how this role serves or limits you now." },
      { text: "What message did your caregivers most often repeat to you?", explanation: "This question reveals internalized parental messages and their ongoing impact. For example, 'Be nice to everyone'.\n\nTipp: Decide if this message still serves you or needs updating." },
      { text: "What topics or emotions were not allowed to be discussed in your home?", explanation: "This question explores family taboos and communication restrictions. For example, money problems.\n\nTipp: Practice expressing these in safe spaces now." },
      { text: "What family belief about money or success has stuck with you?", explanation: "This question identifies inherited beliefs about worth and achievement. For example, 'Money is the root of evil'.\n\nTipp: Examine if it aligns with your values or needs revision." },
      { text: "Who in your childhood did you try hardest to please, and why?", explanation: "This question reveals early people-pleasing patterns and approval seeking. For example, a strict parent.\n\nTipp: Notice if this pattern continues in adult relationships." },
      { text: "When did you first learn to hide a part of yourself, and what was it?", explanation: "This question traces the origins of self-concealment and authenticity loss. For example, hiding emotions to avoid conflict.\n\nTipp: Practice showing that part in small, safe ways." },
      { text: "What childhood wound still influences your choices today?", explanation: "This question connects past hurts to current decision-making patterns. For example, abandonment fear leading to clingy behavior.\n\nTipp: Seek healing through therapy or self-reflection." },
      { text: "What childhood rule do you still follow unconsciously?", explanation: "This question identifies unconscious family rules governing behavior. For example, 'Don't show weakness'.\n\nTipp: Consciously choose which rules to keep or discard." },
      { text: "Which family member's patterns or behaviors do you now repeat?", explanation: "This question explores inherited behavioral and emotional patterns. For example, a parent's workaholism.\n\nTipp: Break the cycle by choosing different responses." },
      { text: "What secrecy or silence existed in your family?", explanation: "This question examines family secrets and their impact on openness. For example, not talking about a relative's illness.\n\nTipp: Consider how this affects your current communication style." },
      { text: "Which childhood dream did you quietly abandon, and why?", explanation: "This question recovers lost dreams and explores abandonment reasons. For example, giving up art for a 'practical' career.\n\nTipp: Revive it in small ways to reconnect with your passions." },
      { text: "What safety strategy did you develop as a child that still feels automatic?", explanation: "This question identifies childhood survival strategies still active today. For example, people-pleasing to avoid anger.\n\nTipp: Update it to better suit your adult life." },
      { text: "Who were you allowed to be as a child, and who were you not allowed to be?", explanation: "This question explores childhood identity permissions and restrictions. For example, allowed to be smart but not emotional.\n\nTipp: Give yourself permission now to be your full self." },
      { text: "What early loss or rejection shaped you the most?", explanation: "This question identifies formative losses and their lasting influence. For example, a parent's divorce.\n\nTipp: Process the grief to reduce its hold on you." },
      { text: "What would your younger self want you to know or do now?", explanation: "This question connects with inner child wisdom and unmet needs. For example, 'It's okay to play'.\n\nTipp: Act on this message to heal inner child wounds." }
    ]
  },
  {
    id: "day5",
    title: "Day 5",
    subtitle: "Anger, Boundaries, Money & Power",
    questions: [
      { text: "How do you typically express anger, if at all?", explanation: "This question examines anger expression patterns and comfort levels. For example, suppressing it until it explodes.\n\nTipp: Practice healthy expression like assertive communication." },
      { text: "When angry, what do you fear will happen if you speak up?", explanation: "This question identifies fears that block healthy anger expression. For example, fear of rejection.\n\nTipp: Test small expressions to build confidence." },
      { text: "What should you have said in a past situation but held back?", explanation: "This question explores unexpressed communications and their impact. For example, setting a boundary with a friend.\n\nTipp: Role-play what you would say now." },
      { text: "Who or what drains your energy, and how do you allow it to happen?", explanation: "This question identifies energy drains and boundary violations. For example, overcommitting to work.\n\nTipp: Set limits to protect your energy." },
      { text: "What does money represent to you at your core?", explanation: "This question explores deep beliefs and emotions around money. For example, security or freedom.\n\nTipp: Examine if this belief helps or hinders you." },
      { text: "What beliefs about money prevent you from asking for what you're worth?", explanation: "This question identifies limiting beliefs affecting financial self-advocacy. For example, 'Asking for more is greedy'.\n\nTipp: Research market rates to build confidence." },
      { text: "In what area of life do you currently feel powerless?", explanation: "This question locates areas of perceived helplessness and disempowerment. For example, in your career.\n\nTipp: Take small actions to reclaim power." },
      { text: "What boundary do you struggle to enforce, and why?", explanation: "This question examines specific boundary challenges and their reasons. For example, saying no to extra work.\n\nTipp: Practice with low-stakes situations." },
      { text: "What would it take for you to feel more powerful in your life?", explanation: "This question explores pathways to personal empowerment and agency. For example, learning new skills.\n\nTipp: Create a plan with actionable steps." },
      { text: "Where do you use people-pleasing to avoid conflict?", explanation: "This question identifies conflict avoidance through people-pleasing patterns. For example, agreeing when you disagree.\n\nTipp: Practice honest but kind communication." },
      { text: "When someone violates your boundary, what do you feel inside?", explanation: "This question connects with internal responses to boundary violations. For example, resentment or anxiety.\n\nTipp: Use this feeling as a signal to speak up." },
      { text: "What entitlement or resentment do you secretly hold onto?", explanation: "This question explores hidden resentments and entitlement feelings. For example, resenting a sibling's success.\n\nTipp: Express it in writing to release it." },
      { text: "What financial fears do you keep hidden?", explanation: "This question uncovers shame and secrecy around money anxieties. For example, fear of poverty.\n\nTipp: Share with a trusted advisor for perspective." },
      { text: "When given authority or power, what part of you shrinks or reacts negatively?", explanation: "This question examines responses to power and leadership opportunities. For example, imposter syndrome.\n\nTipp: Build confidence through small leadership roles." },
      { text: "What would you do differently if you weren't afraid of others' reactions or judgments?", explanation: "This question explores how fear of judgment limits authentic action. For example, pursuing a passion project.\n\nTipp: Start with actions where judgment is minimal." }
    ]
  },
  {
    id: "day6",
    title: "Day 6",
    subtitle: "Desires, Authenticity & Golden Shadow",
    questions: [
      { text: "What do you secretly want that feels 'too much' or excessive?", explanation: "This question uncovers desires deemed excessive or inappropriate. For example, wanting more recognition.\n\nTipp: Examine why it feels 'too much' and if it's truly unreasonable." },
      { text: "What dream have you minimized or downplayed to keep the peace?", explanation: "This question explores dreams sacrificed for harmony or acceptance. For example, a career change.\n\nTipp: Take small steps toward it without disrupting everything." },
      { text: "What would you try or do if no one could judge you?", explanation: "This question identifies authentic desires constrained by judgment fears. For example, starting a blog.\n\nTipp: Find supportive communities to express yourself." },
      { text: "Which qualities you admire in others do you refuse or deny in yourself?", explanation: "This question reveals disowned positive traits - the golden shadow. For example, admiring creativity but claiming you're not creative.\n\nTipp: Experiment with that quality in small ways." },
      { text: "What joy or pleasure do you deny yourself as 'selfish'?", explanation: "This question examines pleasure denial and self-deprivation patterns. For example, taking time for hobbies.\n\nTipp: Allow small indulgences to build self-care habits." },
      { text: "What gift or talent do you downplay or minimize?", explanation: "This question identifies minimized strengths and talents. For example, artistic abilities.\n\nTipp: Share it with others to receive positive feedback." },
      { text: "What would your life look like if you followed one true desire fully?", explanation: "This question visualizes life aligned with authentic desires. For example, living in a different city.\n\nTipp: Create a vision board or plan steps toward it." },
      { text: "What do you long to say or express but habit or fear stops you?", explanation: "This question explores unexpressed truths and communication blocks. For example, telling someone you love them.\n\nTipp: Practice in low-risk situations first." },
      { text: "Where do you act small or diminish yourself to remain safe?", explanation: "This question identifies self-diminishing behaviors for safety. For example, not speaking up in meetings.\n\nTipp: Build safety through self-affirmation." },
      { text: "What fantasy or dream have you never shared with anyone?", explanation: "This question uncovers private dreams and secret aspirations. For example, writing a book.\n\nTipp: Write it down and consider first steps." },
      { text: "What small indulgence would dramatically improve your well-being?", explanation: "This question identifies simple pleasures that could enhance life quality.\n\nTipp: Schedule it regularly to prioritize self-care." },
      { text: "What part of your personality do you edit or hide in public?", explanation: "This question explores authentic self vs. public persona differences.\n\nTipp: Show it in safe social settings." },
      { text: "What aspect of success scares you the most?", explanation: "This question examines fears around achievement and visibility.\n\nTipp: Address the fear through preparation or support." },
      { text: "How do you sabotage potential joy or abundance in your life?", explanation: "This question identifies self-sabotage patterns around positive experiences.\n\nTipp: Notice the pattern and choose differently." },
      { text: "What would radical self-acceptance allow you to try or achieve?", explanation: "This question explores possibilities opened by complete self-acceptance.\n\nTipp: Practice daily affirmations to build acceptance." }
    ]
  },
  {
    id: "day7",
    title: "Day 7",
    subtitle: "Integration, Forgiveness & Next Steps",
    questions: [
      { text: "What insight from this journey feels most important to remember?", explanation: "This question consolidates learning and key themes. For example, 'My feelings are valid'.\n\nTipp: Write it somewhere visible." },
      { text: "What do you forgive yourself for today, and what changes with that?", explanation: "This question invites self-forgiveness and release. For example, a past mistake.\n\nTipp: Note how your body feels after forgiving." },
      { text: "What pattern are you committed to changing, and how can you act on it?", explanation: "This question identifies specific, actionable change commitments. For example, people-pleasing.\n\nTipp: Set a small goal like saying no once a week." },
      { text: "What small boundary will you set this week to protect your energy?", explanation: "This question creates concrete boundary-setting intentions. For example, limiting social media time.\n\nTipp: Communicate it clearly to involved parties." },
      { text: "What mini-experiment will help you test a new way of being?", explanation: "This question designs small experiments for trying new behaviors. For example, expressing emotions daily.\n\nTipp: Track the results in a journal." },
      { text: "What support (like therapy, coach, or friend) do you need to move forward?", explanation: "This question identifies support needs for continued growth. For example, a therapist for deep work.\n\nTipp: Research and reach out to potential supports." },
      { text: "If your shadow could speak, what is its kindest message to you?", explanation: "This question invites compassionate dialogue with disowned parts. For example, 'You are worthy as you are'.\n\nTipp: Listen and integrate this message." },
      { text: "What would you like your shadow profile to highlight as a strength?", explanation: "This question reframes shadow material as potential strengths.\n\nTipp: Embrace and develop this strength." },
      { text: "What one sentence or mantra would you like to carry into the next month?", explanation: "This question distills key insights into a guiding principle.\n\nTipp: Repeat it daily for reinforcement." },
      { text: "How will you celebrate completing this shadow work journey?", explanation: "This question plans celebration and acknowledgment of growth work.\n\nTipp: Make it meaningful and self-honoring." }
    ]
  }
];
const courseData_de = [
  {
    id: "intro",
    title: "Einführung",
    subtitle: "Willkommen auf deiner Schattenarbeitsreise",
    questions: []
  },
  {
    id: "day1",
    title: "Tag 1",
    subtitle: "Erdung & Emotionale Bewusstheit",
    questions: [
      { text: "Welche Emotion fällt dir am leichtesten zu fühlen und auszudrücken?", explanation: "Diese Frage hilft, deine emotionale Komfortzone und natürliche Tendenzen zu erkennen. Beispiel: Freude fällt dir leicht mit Freunden oder bei Hobbys.\n\nTipp: Achte darauf, wo diese Emotion am natürlichsten auftaucht und warum sie zugänglich ist." },
      { text: "Welche Emotion fällt dir am schwersten zu fühlen oder auszudrücken – und warum?", explanation: "Diese Frage zeigt emotionale Blockaden und Bereiche, die Aufmerksamkeit und Integration brauchen. Beispiel: Wut ist schwer, wenn du gelernt hast, sie sei ‚schlecht‘.\n\nTipp: Denke an Kindheitserfahrungen oder kulturelle Einflüsse, die diese Emotion erschweren, und wie sie deinen Alltag prägen." },
      { text: "Wann hast du zuletzt gesagt: ‚Mir geht’s gut‘, obwohl es nicht stimmte? Beschreibe die Situation kurz.", explanation: "Diese Frage erkundet Maskierungsgewohnheiten und Unbehagen mit Verletzlichkeit. Beispiel: Im Job ‚Alles gut‘ sagen, um Stress nicht zu zeigen.\n\nTipp: Notiere, warum du deine Gefühle versteckt hast und welche sicherere, ehrlichere Alternative möglich gewesen wäre." },
      { text: "Welche Gefühle neigst du dazu, bei dir selbst zu verurteilen?", explanation: "Diese Frage macht Selbstverurteilung rund um Gefühlsausdruck sichtbar. Beispiel: dich für Eifersucht verurteilen.\n\nTipp: Erkunde, woher dieses Urteil kommt – z. B. gesellschaftliche Normen – und wie Akzeptanz zu besserem Selbstverständnis führen kann." },
      { text: "Welche Gefühle tolerierst du bei anderen, aber nicht bei dir selbst?", explanation: "Diese Frage beleuchtet Doppelmoral und Lücken im Selbstmitgefühl. Beispiel: du akzeptierst die Wut eines Freundes, aber nicht deine eigene.\n\nTipp: Übe, dir dieselbe Freundlichkeit zu schenken, die du anderen gibst." },
      { text: "Wenn du still bist oder allein, welches Gefühl liegt oft knapp unter der Oberfläche?", explanation: "Diese Frage verbindet dich mit zugrunde liegenden emotionalen Zuständen, die oft ignoriert werden. Beispiel: feine Traurigkeit in ruhigen Momenten.\n\nTipp: Achte tagsüber auf diese Momente; halte sie im Tagebuch fest, um Muster und Trigger zu verstehen." },
      { text: "Welche körperlichen Empfindungen bemerkst du in deinem Körper, wenn du Scham fühlst?", explanation: "Diese Frage fördert somatische Bewusstheit über Schamreaktionen im Körper. Beispiel: flaues Gefühl im Bauch oder heiße Wangen.\n\nTipp: Scanne deinen Körper in Schammomenten; nutze diese Bewusstheit zum Erden und effektiveren Verarbeiten." },
      { text: "Welche körperlichen Empfindungen bemerkst du in deinem Körper, wenn du Wut fühlst?", explanation: "Diese Frage entwickelt Körperbewusstheit für Wut und ihre physischen Ausdrucksformen. Beispiel: angespannter Kiefer oder rasendes Herz.\n\nTipp: Erkenne diese Signale früh, um Wut besser zu regulieren; probiere Atemübungen zur Beruhigung." },
      { text: "Welcher Gedanke läuft dir am häufigsten durch den Kopf, wenn du Angst fühlst?", explanation: "Diese Frage identifiziert Gedankenmuster und mentale Schleifen bei Angst. Beispiel: ‚Was, wenn alles schiefgeht?‘\n\nTipp: Hinterfrage die Gedanken – schreibe sie auf und suche Gegenbeweise, um den Angstkreislauf zu durchbrechen." },
      { text: "Was sagst du dir typischerweise, wenn dir ein Fehler passiert?", explanation: "Diese Frage zeigt Muster des inneren Kritikers nach Fehlern. Beispiel: ‚Ich mache immer alles falsch.‘\n\nTipp: Versuche einen freundlicheren Reframe: ‚Jeder macht Fehler – was kann ich daraus lernen?‘" },
      { text: "Benenne ein kleines Gefühl, das du in letzter Zeit geleugnet oder ignoriert hast.", explanation: "Diese Frage bringt Bewusstheit für subtile emotionale Vermeidung. Beispiel: leise Enttäuschung in einer Freundschaft.\n\nTipp: Anerkenne es ohne Urteil und erwäge einen kleinen Schritt, um damit umzugehen." },
      { text: "In welche Stimmung fällst du üblicherweise nach einem harten Tag?", explanation: "Diese Frage identifiziert deine Standard‑Stimmung nach Stress. Beispiel: Rückzug in Betäubung.\n\nTipp: Beobachte, ob sie dir dient; teste eine Alternative (kurzer Spaziergang, warme Dusche oder beruhigender Check‑in)." },
      { text: "Was hilft dir, Spannung schnell abzubauen – und hilft es wirklich langfristig?", explanation: "Diese Frage untersucht deine aktuellen Strategien zur Spannungsreduktion. Beispiel: Social‑Media‑Scrollen beruhigt kurz, erhöht später aber den Stress.\n\nTipp: Behalte, was wirklich hilft, und probiere eine gesündere Option (Bewegung, Atem, kurzes Schreiben)." },
      { text: "Welche Emotion würdest du gern leichter ausdrücken – und warum?", explanation: "Diese Frage klärt Ziele für emotionales Wachstum. Beispiel: Verletzlichkeit zeigen, um Beziehungen zu vertiefen.\n\nTipp: Mache einen kleinen Schritt – teile ein Gefühl mit einer vertrauten Person und beobachte, was passiert." },
      { text: "Welche Sicherheitsstrategie nutzt du, wenn Gefühle überwältigend sind?", explanation: "Diese Frage identifiziert Schutzstrategien bei Überforderung. Beispiel: mit Arbeit ablenken.\n\nTipp: Wenn sie eher vermeidend als hilfreich ist, teste eine sanftere Option (Erdung, Journaling oder Kontakt)." }
    ]
  },
  {
    id: "day2",
    title: "Tag 2",
    subtitle: "Trigger, Projektion & Beziehungen",
    questions: [
      { text: "Wer triggert dich am häufigsten, und welches konkrete Verhalten löst dich aus?", explanation: "Diese Frage identifiziert spezifische Trigger‑Muster und Beziehungsdynamiken. Beispiel: Kritik eines Kollegen triggert Unsicherheit.\n\nTipp: Führe ein Trigger‑Journal, um Muster und zugrunde liegende Gründe zu erkennen." },
      { text: "Beschreibe einen jüngsten Streit – welcher Teil von dir fühlte sich am stärksten bedroht oder gedrängt?", explanation: "Diese Frage beleuchtet, welche Anteile im Konflikt bedroht sind. Beispiel: dein Kompetenzgefühl wurde angekratzt.\n\nTipp: Suche nach dem zugrunde liegenden Angstthema, z. B. Angst vor Versagen." },
      { text: "Welche Eigenschaft bei anderen lässt dich sofort ablehnen oder urteilen?", explanation: "Diese Frage weist auf Eigenschaften hin, die du in dir verdrängst und auf andere projizierst. Beispiel: Abneigung gegen Arroganz spiegelt unterdrücktes Selbstvertrauen.\n\nTipp: Frage dich, ob diese Eigenschaft in irgendeiner Form auch in dir lebt und warum du sie abweist." },
      { text: "Welche Annahmen über andere könnten in Wahrheit Projektionen deiner eigenen Schwierigkeiten sein?", explanation: "Diese Frage macht unbewusste Projektionen sichtbar. Beispiel: jemanden als ‚faul‘ zu sehen, spiegelt dein eigenes Ausgebranntsein.\n\nTipp: Drehe die Annahme um und prüfe, ob sie auf dich zutrifft – das deckt verborgene Selbstbewertungen auf." },
      { text: "Wenn jemand Erfolg hat, wo du gescheitert bist – was ist deine erste emotionale Reaktion?", explanation: "Diese Frage untersucht Reaktionen auf den Erfolg anderer und eigene Trigger. Beispiel: Bitterkeit zeigt unverarbeitete Niederlagen.\n\nTipp: Übe, ihren Erfolg zu feiern, um Resilienz und Selbstmitgefühl zu stärken." },
      { text: "Wem fällt dir am schwersten zu vergeben – und warum ist es so schwierig?", explanation: "Diese Frage erkundet Blockaden gegenüber Vergebung und ungelöste Beziehungswunden. Beispiel: Vernachlässigung durch einen Elternteil.\n\nTipp: Schreibe einen Brief (ohne ihn zu senden), um Gefühle auszudrücken und Schmerz zu verarbeiten." },
      { text: "Welches Muster wiederholt sich in deinen romantischen Beziehungen?", explanation: "Diese Frage identifiziert wiederkehrende Dynamiken in Partnerschaften. Beispiel: Wahl emotional nicht verfügbarer Partner.\n\nTipp: Suche gemeinsame Themen und reflektiere, wie deine Entscheidungen zum Muster beitragen." },
      { text: "Welches Muster kehrt in deinen Freundschaften immer wieder?", explanation: "Diese Frage zeigt konsistente Motive in platonischen Beziehungen. Beispiel: dich ausgenutzt oder übersehen fühlen.\n\nTipp: Untersuche deine Rolle in diesen Mustern und setze neue Grenzen." },
      { text: "In Beziehungen – wo gibst du zu viel und wo nimmst du zu viel?", explanation: "Diese Frage beleuchtet Balance und Gegenseitigkeit. Beispiel: du gibst emotionalen Support, nimmst aber materielle Hilfe.\n\nTipp: Strebe nach Ausgewogenheit, indem du Bedürfnisse und Grenzen klar kommunizierst." },
      { text: "Wenn du dich aus einer Beziehung zurückziehst – welche Geschichte erzählst du dir zur Rechtfertigung?", explanation: "Diese Frage identifiziert Narrative, die emotionalen Rückzug rechtfertigen. Beispiel: ‚Ihnen ist sowieso egal‘.\n\nTipp: Hinterfrage die Erzählung, prüfe Fakten und kommuniziere offen." },
      { text: "Welche Beziehungsrolle (z. B. Versorger, Retter, Kritiker) ist dir am vertrautesten?", explanation: "Diese Frage benennt gewohnte Rollen in Beziehungen. Beispiel: immer der/die Versorger(in) sein.\n\nTipp: Überlege, ob die Rolle dir dient oder ob es Zeit für neue Dynamiken ist." },
      { text: "Wenn dich jemand um Hilfe bittet – was ist deine unmittelbare Reaktion oder dein Impuls?", explanation: "Diese Frage untersucht automatische Antworten auf die Bedürfnisse anderer. Beispiel: alles stehen und liegen lassen, um zu helfen.\n\nTipp: Bemerke, ob das gesund oder co‑abhängig ist, und übe ausgewogenere Reaktionen." },
      { text: "Wenn dich jemand kritisiert – wie reagierst du als Erstes?", explanation: "Diese Frage kartiert Abwehrmuster und Reaktionen auf Kritik. Beispiel: sofortige Verteidigung oder Rückzug.\n\nTipp: Halte inne und frage dich, ob ein Körnchen Wahrheit in der Kritik steckt, bevor du reagierst." },
      { text: "Mit welcher Grenze hast du am meisten Mühe – und warum fällt es schwer, sie zu halten?", explanation: "Diese Frage identifiziert Grenzherausforderungen und zugrunde liegende Ängste. Beispiel: ‚Nein‘ zu Familienbitten aus Schuldgefühl.\n\nTipp: Übe kleine ‚Neins‘, um Sicherheit im Grenzen‑Setzen aufzubauen." },
      { text: "Wem bist du neidisch – und welche konkrete Qualität wünschst du dir heimlich für dich?", explanation: "Diese Frage nutzt Neid, um verdrängte Wünsche und Potenziale aufzudecken. Beispiel: Neid auf die Selbstsicherheit eines Freundes.\n\nTipp: Nutze Neid als Motivation, diese Qualität in dir zu kultivieren." }
    ]
  },
  {
    id: "day3",
    title: "Tag 3",
    subtitle: "Scham, Schuld & Selbstüberzeugungen",
    questions: [
      { text: "Wann hast du zum ersten Mal Scham gefühlt? Beschreibe die Situation kurz.", explanation: "Diese Frage verfolgt frühe Schamerfahrungen und ihren anhaltenden Einfluss. Beispiel: öffentliches Ausschimpfen in der Kindheit.\n\nTipp: Reflektiere, wie diese Erinnerung dein Selbstbild weiterhin prägt." },
      { text: "Was trägst du in dir und hast es nie jemandem erzählt?", explanation: "Diese Frage erkundet verborgene Scham und Geheimnisse, die isolieren. Beispiel: eine vergangene Niederlage, die du geheim hältst.\n\nTipp: Erwäge die Erleichterung, es mit einer Vertrauensperson oder im Tagebuch zu teilen." },
      { text: "Welcher private Fehler aus der Vergangenheit verfolgt dich bis heute?", explanation: "Diese Frage identifiziert unverarbeitete Schuld und Muster der Selbstbestrafung. Beispiel: jemanden unbeabsichtigt verletzt haben.\n\nTipp: Übe Selbstvergebung, indem du aufschreibst, was dich das gelehrt hat." },
      { text: "Vor welcher Etikettierung durch andere hast du am meisten Angst?", explanation: "Diese Frage legt identitätsbasierte Ängste und schamgetriebene Überzeugungen frei. Beispiel: als ‚schwach‘ gesehen zu werden.\n\nTipp: Erforsche die Quelle der Angst und stelle ihre Berechtigung in Frage." },
      { text: "Welche limitierende Selbstüberzeugung stammt aus deiner Kindheit?", explanation: "Diese Frage verfolgt begrenzende Glaubenssätze zu ihren kindlichen Ursprüngen. Beispiel: ‚Ich bin nicht klug genug‘.\n\nTipp: Schreibe die Überzeugung neu, gestützt auf Belege aus deinem Erwachsenenleben." },
      { text: "Welche innere Stimme ist dir gegenüber am strengsten – was sagt sie gewöhnlich?", explanation: "Diese Frage gibt dem inneren Kritiker und seinen Botschaften Raum. Beispiel: ‚Du verhaust immer alles‘.\n\nTipp: Antworte mit einem freundlichen, unterstützenden Ton – wie ein guter Freund." },
      { text: "Wenn du dir vollständige Akzeptanz und Liebe vorstellst – was verändert sich in deinem Verhalten oder Empfinden?", explanation: "Diese Frage erkundet die transformierende Kraft bedingungsloser Annahme. Beispiel: größere Risikobereitschaft.\n\nTipp: Übe Selbstakzeptanz, um dieses Gefühl dem Alltag näherzubringen." },
      { text: "Was glaubst du, musst du tun oder erreichen, um Liebe oder Erfolg zu verdienen?", explanation: "Diese Frage identifiziert Skripte bedingter Wertigkeit und Muster des ‚Sich‑Beweisen‑Müssens‘. Beispiel: ‚Ich muss perfekt sein‘.\n\nTipp: Unterminiere das, indem du deinen angeborenen Wert unabhängig von Leistungen aufschreibst." },
      { text: "Welches Verlangen würdest du nie laut zugeben – aus Scham?", explanation: "Diese Frage deckt Scham um authentische Bedürfnisse auf. Beispiel: Wunsch nach mehr Aufmerksamkeit.\n\nTipp: Anerkenne das Verlangen ohne Urteil, um seinen Einfluss zu verringern." },
      { text: "In welchem Lebensbereich fühlst du dich grundsätzlich ‚nicht genug‘?", explanation: "Diese Frage verortet Mangelüberzeugungen und ihre Erscheinungen. Beispiel: ‚nicht gut genug‘ in Beziehungen.\n\nTipp: Sammle Belege für deine Genügsamkeit in diesem Bereich." },
      { text: "Wenn sich deine tiefste Angst erfüllen würde – was würdest du vor anderen zu verbergen versuchen?", explanation: "Diese Frage erkundet schambasierte Verbergungsstrategien. Beispiel: Misserfolg vor der Familie verheimlichen.\n\nTipp: Betrachte die Kosten des Verbergens und die Vorteile von Verletzlichkeit." },
      { text: "Was ist deine ‚Erklärungsgeschichte‘, wenn etwas nicht nach deinem Plan läuft?", explanation: "Diese Frage identifiziert Muster des Schuldgebens und Verantwortungsnarrative. Beispiel: ‚Es ist immer meine Schuld‘.\n\nTipp: Balanciere sie mit einer realistischen Einschätzung der Lage." },
      { text: "Wofür bestrafst du dich am häufigsten – und wie?", explanation: "Diese Frage macht Selbstbestrafungsmuster und Schuld‑Trigger sichtbar. Beispiel: Überarbeiten nach einem Fehler.\n\nTipp: Ersetze Bestrafung durch Lernen und Selbstfürsorge." },
      { text: "Wenn du scheiterst – welche Erzählung taucht in deinem Kopf auf?", explanation: "Diese Frage untersucht Niederlagen‑Narrative und inneren Dialog. Beispiel: ‚Ich bin ein Versager‘.\n\nTipp: Reframing: ‚Das ist eine Lerngelegenheit.‘" },
      { text: "Wie zeigt sich Scham in deinen Handlungen oder Entscheidungen?", explanation: "Diese Frage verbindet Scham mit Verhaltens‑ und Entscheidungsmustern. Beispiel: soziale Ereignisse vermeiden.\n\nTipp: Bemerke und hinterfrage sanft schamgetriebene Handlungen." }
    ]
  },
  {
    id: "day4",
    title: "Tag 4",
    subtitle: "Kindheitsmuster & familiäre Prägung",
    questions: [
      { text: "Welche Rolle wurde dir in der Familie zugewiesen oder hast du übernommen (z. B. Friedensstifter, Musterschüler)?", explanation: "Diese Frage identifiziert kindliche Familienrollen, die weiterhin Identität prägen. Beispiel: ‚verantwortlich sein‘.\n\nTipp: Überlege, ob die Rolle dir heute dient oder begrenzt." },
      { text: "Welche Botschaft haben dir deine Bezugspersonen am häufigsten wiederholt?", explanation: "Diese Frage zeigt internalisierte elterliche Botschaften und ihre Wirkung. Beispiel: ‚Sei nett zu allen‘.\n\nTipp: Entscheide, ob die Botschaft noch dienlich ist oder ein Update braucht." },
      { text: "Welche Themen oder Gefühle durften zu Hause nicht besprochen werden?", explanation: "Diese Frage erkundet familiäre Tabus und Kommunikationsbeschränkungen. Beispiel: Geldprobleme.\n\nTipp: Übe, sie heute in sicheren Räumen auszudrücken." },
      { text: "Welche familiäre Überzeugung über Geld oder Erfolg ist in dir hängen geblieben?", explanation: "Diese Frage identifiziert übernommene Glaubenssätze über Wert und Leistung. Beispiel: ‚Geld ist schlecht‘.\n\nTipp: Prüfe, ob sie mit deinen Werten übereinstimmt oder angepasst werden sollte." },
      { text: "Wen wolltest du in der Kindheit am meisten zufriedenstellen – und warum?", explanation: "Diese Frage zeigt frühe Muster des Gefallenwollens und des Suchens nach Anerkennung. Beispiel: strenger Elternteil.\n\nTipp: Bemerke, ob das Muster in Erwachsenenbeziehungen weitergeht." },
      { text: "Wann hast du erstmals gelernt, einen Teil von dir zu verbergen – und welcher war das?", explanation: "Diese Frage verfolgt die Ursprünge von Selbstverbergung und Authentizitätsverlust. Beispiel: Gefühle verstecken, um Konflikte zu vermeiden.\n\nTipp: Zeige diesen Teil in kleinen, sicheren Schritten." },
      { text: "Welche Kindheitswunde beeinflusst deine Entscheidungen bis heute?", explanation: "Diese Frage verbindet frühere Verletzungen mit aktuellen Mustern. Beispiel: Verlassenheitsangst führt zu klammerndem Verhalten.\n\nTipp: Suche Heilung in Therapie oder Reflexion." },
      { text: "Welche Regel aus dem Elternhaus befolgst du heute noch unbewusst?", explanation: "Diese Frage identifiziert unbewusste Familienregeln. Beispiel: ‚Zeige keine Schwäche‘.\n\nTipp: Wähle bewusst, welche Regeln du behalten oder loslassen willst." },
      { text: "Wessen Muster oder Verhaltensweisen aus der Familie wiederholst du heute?", explanation: "Diese Frage erkundet vererbte Verhaltens‑ und Emotionsmuster. Beispiel: Arbeitssucht eines Elternteils.\n\nTipp: Durchbrich den Kreislauf, indem du anders reagierst." },
      { text: "Welche Geheimnisse oder welches Schweigen gab es in deiner Familie?", explanation: "Diese Frage untersucht Familiengeheimnisse und deren Einfluss auf Offenheit. Beispiel: nicht über die Krankheit eines Verwandten sprechen.\n\nTipp: Reflektiere, wie das deinen heutigen Kommunikationsstil beeinflusst." },
      { text: "Welchen Kindheitstraum hast du still aufgegeben – und warum?", explanation: "Diese Frage belebt verlorene Träume und erkundet Gründe für den Verzicht. Beispiel: Kunst für eine ‚praktische‘ Karriere aufgeben.\n\nTipp: Belebe ihn in kleinen Schritten, um die Verbindung zur Leidenschaft zu erneuern." },
      { text: "Welche Sicherheitsstrategie hast du als Kind entwickelt, die heute noch automatisch läuft?", explanation: "Diese Frage identifiziert kindliche Überlebensstrategien in der Erwachsenenzeit. Beispiel: Gefallenwollen, um Wut zu vermeiden.\n\nTipp: Aktualisiere sie, sodass sie deinem Erwachsenenleben besser dient." },
      { text: "Wer durftest du als Kind sein – und wer nicht?", explanation: "Diese Frage erkundet Identitätserlaubnisse und ‑verbote aus der Kindheit. Beispiel: klug sein war erlaubt, emotional sein nicht.\n\nTipp: Gib dir heute die Erlaubnis, ganz du selbst zu sein." },
      { text: "Welcher frühe Verlust oder welche Zurückweisung hat dich am stärksten geprägt?", explanation: "Diese Frage identifiziert prägende Verluste und ihren dauerhaften Einfluss. Beispiel: Scheidung der Eltern.\n\nTipp: Verarbeite die Trauer, um ihre Wirkung zu verringern." },
      { text: "Was möchte dein jüngeres Ich, dass du jetzt weißt oder tust?", explanation: "Diese Frage verbindet mit der Weisheit des inneren Kindes und unerfüllten Bedürfnissen. Beispiel: ‚Du darfst spielen‘.\n\nTipp: Handle entsprechend dieser Botschaft, um innere Wunden zu heilen." }
    ]
  },
  {
    id: "day5",
    title: "Tag 5",
    subtitle: "Wut, Grenzen, Geld & Macht",
    questions: [
      { text: "Wie drückst du Wut typischerweise aus – wenn überhaupt?", explanation: "Diese Frage untersucht Muster des Wutausdrucks und dein Komfortniveau. Beispiel: unterdrücken, bis es explodiert.\n\nTipp: Übe gesunden Ausdruck, etwa durch klare, respektvolle Kommunikation." },
      { text: "Wenn du wütend bist – wovor fürchtest du dich, wenn du dich äußerst?", explanation: "Diese Frage identifiziert Ängste, die gesunden Wutausdruck blockieren. Beispiel: Angst vor Zurückweisung.\n\nTipp: Teste kleine Äußerungen, um Vertrauen aufzubauen." },
      { text: "Was hättest du in einer vergangenen Situation sagen sollen, hast es aber zurückgehalten?", explanation: "Diese Frage erkundet unausgesprochene Botschaften und deren Wirkung. Beispiel: eine Grenze gegenüber einem Freund setzen.\n\nTipp: Spiele durch, was du heute sagen würdest." },
      { text: "Wer oder was saugt am meisten deine Energie – und wie ermöglichst du es?", explanation: "Diese Frage identifiziert Energieräuber und Grenzverletzungen. Beispiel: zu viele Verpflichtungen im Job.\n\nTipp: Setze Limits, um deine Energie zu schützen." },
      { text: "Was bedeutet Geld für dich im Kern?", explanation: "Diese Frage erkundet tiefe Überzeugungen und Emotionen rund um Geld. Beispiel: Sicherheit oder Freiheit.\n\nTipp: Prüfe, ob diese Überzeugung hilfreich oder hinderlich ist." },
      { text: "Welche Überzeugungen über Geld hindern dich daran, für deinen Wert einzustehen?", explanation: "Diese Frage identifiziert begrenzende Glaubenssätze, die finanzielle Selbstvertretung beeinträchtigen. Beispiel: ‚Mehr zu verlangen ist gierig‘.\n\nTipp: Recherchiere Marktpreise, um Selbstvertrauen zu gewinnen." },
      { text: "In welchem Lebensbereich fühlst du dich derzeit machtlos?", explanation: "Diese Frage lokalisiert Bereiche von Hilflosigkeit und fehlender Selbstwirksamkeit. Beispiel: Karriere.\n\nTipp: Mache kleine Schritte, um deine Macht zurückzugewinnen." },
      { text: "Mit welcher Grenze hast du Schwierigkeiten, sie durchzusetzen – und warum?", explanation: "Diese Frage beleuchtet spezifische Grenzherausforderungen und ihre Gründe. Beispiel: ‚Nein‘ zu zusätzlicher Arbeit.\n\nTipp: Übe an Situationen mit geringem Risiko." },
      { text: "Was bräuchtest du, um dich in deinem Leben einflussreicher zu fühlen?", explanation: "Diese Frage erkundet Wege zu persönlicher Selbstwirksamkeit. Beispiel: neue Fähigkeiten lernen.\n\nTipp: Erstelle einen Plan mit kleinen, machbaren Schritten." },
      { text: "Wo nutzt du Gefallenwollen, um Konflikt zu vermeiden?", explanation: "Diese Frage identifiziert Konfliktvermeidung durch Gefallenwollen. Beispiel: zustimmen, obwohl du nicht einverstanden bist.\n\nTipp: Übe ehrliche, aber freundliche Kommunikation." },
      { text: "Was fühlst du innerlich, wenn jemand deine Grenze überschreitet?", explanation: "Diese Frage verbindet dich mit inneren Reaktionen auf Grenzverletzungen. Beispiel: Groll oder Angst.\n\nTipp: Nutze die Information als Signal, dich zu äußern." },
      { text: "Welches Anspruchsdenken oder welchen Groll trägst du heimlich in dir?", explanation: "Diese Frage erkundet verborgene Ressentiments und ein Gefühl von ‚Anspruch haben‘. Beispiel: Groll gegenüber dem Erfolg eines Geschwisters.\n\nTipp: Schreibe es nieder, um Spannung zu lösen." },
      { text: "Welche finanziellen Ängste bewahrst du im Geheimen?", explanation: "Diese Frage offenbart Scham und Geheimhaltung rund um Geldängste. Beispiel: Angst vor Armut.\n\nTipp: Teile dich einer vertrauenswürdigen Person mit, um Perspektive zu gewinnen." },
      { text: "Wenn du Macht oder Autorität erhältst – welcher Teil von dir schrumpft oder reagiert negativ?", explanation: "Diese Frage untersucht Reaktionen auf Macht und Führungschancen. Beispiel: Hochstapler‑Syndrom.\n\nTipp: Baue Selbstvertrauen durch kleine Führungsrollen auf." },
      { text: "Was würdest du anders tun, wenn du keine Angst vor Reaktionen oder Bewertungen hättest?", explanation: "Diese Frage erkundet, wie Bewertungsangst authentisches Handeln einschränkt. Beispiel: Herzensprojekt.\n\nTipp: Beginne dort, wo das Bewertungsrisiko geringer ist." }
    ]
  },
  {
    id: "day6",
    title: "Tag 6",
    subtitle: "Wünsche, Authentizität & Goldener Schatten",
    questions: [
      { text: "Wonach sehnst du dich heimlich, das ‚zu viel‘ oder übertrieben wirkt?", explanation: "Diese Frage deckt Wünsche auf, die als übermäßig oder unangemessen gelten. Beispiel: Wunsch nach mehr Anerkennung.\n\nTipp: Erkunde, warum es ‚zu viel‘ scheint und ob es wirklich unangebracht ist." },
      { text: "Welchen Traum hast du klein gemacht oder minimiert, um Frieden zu bewahren?", explanation: "Diese Frage erkundet Träume, die für Harmonie oder Akzeptanz geopfert wurden. Beispiel: Berufswechsel.\n\nTipp: Gehe kleine Schritte darauf zu, ohne alles umzuwerfen." },
      { text: "Was würdest du versuchen oder tun, wenn dich niemand beurteilen könnte?", explanation: "Diese Frage identifiziert authentische Wünsche, die von Bewertungsangst begrenzt werden. Beispiel: einen Blog starten.\n\nTipp: Suche unterstützende Gemeinschaften, um dich auszudrücken." },
      { text: "Welche Qualitäten bewunderst du bei anderen, die du bei dir ablehnst oder leugnest?", explanation: "Diese Frage bringt verdrängte positive Eigenschaften ans Licht – den goldenen Schatten. Beispiel: Kreativität bewundern, aber glauben, sie selbst nicht zu haben.\n\nTipp: Experimentiere mit der Qualität in kleinen Schritten." },
      { text: "Welche Freude oder welchen Genuss verweigerst du dir als ‚egoistisch‘?", explanation: "Diese Frage untersucht Muster der Selbstverweigerung und des Verzichts auf Freude. Beispiel: keine Zeit für Hobbys.\n\nTipp: Erlaube dir kleine Freuden, um Selbstfürsorge als Gewohnheit zu stärken." },
      { text: "Welches Geschenk oder Talent machst du klein oder minimierst du?", explanation: "Diese Frage identifiziert geschmälerte Stärken und Talente. Beispiel: künstlerische Fähigkeiten.\n\nTipp: Teile sie, um positives Feedback zu erhalten." },
      { text: "Wie sähe dein Leben aus, wenn du einem echten Wunsch vollständig folgen würdest?", explanation: "Diese Frage visualisiert ein Leben im Einklang mit authentischen Wünschen. Beispiel: in einer anderen Stadt wohnen.\n\nTipp: Erstelle eine Vision‑Collage oder Schritte in diese Richtung." },
      { text: "Was möchtest du sagen oder ausdrücken, aber Gewohnheit oder Angst hält dich zurück?", explanation: "Diese Frage erkundet unausgesprochene Wahrheiten und Kommunikationsblockaden. Beispiel: jemandem sagen, dass du ihn liebst.\n\nTipp: Übe zuerst in Situationen mit geringem Risiko." },
      { text: "Wo spielst du dich klein oder machst dich kleiner, um dich sicher zu fühlen?", explanation: "Diese Frage identifiziert selbst‑kleinmachende Verhaltensweisen aus Sicherheitsgründen. Beispiel: in Meetings schweigen.\n\nTipp: Baue Sicherheit über Selbst‑Affirmation auf." },
      { text: "Welche Fantasie oder welcher Traum wurde nie mit jemandem geteilt?", explanation: "Diese Frage offenbart private Träume und geheime Aspirationen. Beispiel: ein Buch schreiben.\n\nTipp: Schreibe es auf und erwäge erste Schritte." },
      { text: "Welche kleine Wohlfühl‑Gewohnheit würde dein Befinden deutlich verbessern?", explanation: "Diese Frage identifiziert einfache Freuden, die die Lebensqualität erhöhen können.\n\nTipp: Plane sie regelmäßig, um Selbstfürsorge zu priorisieren." },
      { text: "Welchen Teil deiner Persönlichkeit bearbeitest oder versteckst du öffentlich?", explanation: "Diese Frage erkundet Unterschiede zwischen authentischem Selbst und öffentlicher Persona.\n\nTipp: Zeige ihn in sicheren sozialen Kontexten." },
      { text: "Welcher Aspekt von Erfolg macht dir am meisten Angst?", explanation: "Diese Frage untersucht Ängste rund um Leistung und Sichtbarkeit.\n\nTipp: Begegne der Angst mit Vorbereitung oder Unterstützung." },
      { text: "Wie sabotierst du potenzielle Freude oder Fülle in deinem Leben?", explanation: "Diese Frage identifiziert Selbstsabotage‑Muster rund um positive Erfahrungen.\n\nTipp: Erkenne das Muster und wähle anders." },
      { text: "Was würde dir radikale Selbstakzeptanz ermöglichen?", explanation: "Diese Frage erkundet Möglichkeiten, die durch vollständige Annahme entstehen.\n\nTipp: Übe tägliche Affirmationen, um sie zu stärken." }
    ]
  },
  {
    id: "day7",
    title: "Tag 7",
    subtitle: "Integration, Vergebung & Nächste Schritte",
    questions: [
      { text: "Welche Einsicht aus dieser Reise ist am wichtigsten zu behalten?", explanation: "Diese Frage bündelt Lernen und Schlüsselthemen. Beispiel: ‚Meine Gefühle sind gültig‘.\n\nTipp: Schreibe sie an einen sichtbaren Ort." },
      { text: "Wofür vergibst du dir heute – und was verändert sich dadurch?", explanation: "Diese Frage lädt zu Selbstvergebung und Loslassen ein. Beispiel: ein vergangener Fehler.\n\nTipp: Achte darauf, wie dein Körper sich nach dem Vergeben anfühlt." },
      { text: "Welches Muster verpflichtest du dich zu ändern – und wie kannst du handeln?", explanation: "Diese Frage identifiziert konkrete, umsetzbare Veränderungsverpflichtungen. Beispiel: Gefallenwollen.\n\nTipp: Setze ein kleines Ziel, z. B. einmal pro Woche ‚nein‘ sagen." },
      { text: "Welche kleine Grenze setzt du diese Woche, um deine Energie zu schützen?", explanation: "Diese Frage schafft konkrete Absichten fürs Grenzen‑Setzen. Beispiel: Social‑Media‑Zeit begrenzen.\n\nTipp: Kommuniziere sie klar an die Beteiligten." },
      { text: "Welches Mini‑Experiment hilft dir, eine neue Weise des Seins zu testen?", explanation: "Diese Frage entwirft kleine Experimente für neues Verhalten. Beispiel: täglich Gefühle ausdrücken.\n\nTipp: Halte die Ergebnisse im Tagebuch fest." },
      { text: "Welche Unterstützung (z. B. Therapie, Coach oder Freund) brauchst du, um weiterzugehen?", explanation: "Diese Frage identifiziert Unterstützungsbedarfe für weiteres Wachstum. Beispiel: Therapeut(in) für Tiefenarbeit.\n\nTipp: Recherchiere und nimm Kontakt zu möglichen Unterstützern auf." },
      { text: "Wenn dein Schatten sprechen könnte – was wäre seine freundlichste Botschaft an dich?", explanation: "Diese Frage lädt zu einem mitfühlenden Dialog mit verleugneten Anteilen ein. Beispiel: ‚Du bist wertvoll, so wie du bist‘.\n\nTipp: Höre zu und integriere die Botschaft." },
      { text: "Was soll dein Schatten‑Profil als Stärke hervorheben?", explanation: "Diese Frage rahmt Schattenmaterial als potenzielle Stärke.\n\nTipp: Umarme und entwickle diese Stärke." },
      { text: "Welchen einen Satz oder welche Mantra möchtest du in den nächsten Monat mitnehmen?", explanation: "Diese Frage destilliert zentrale Einsichten zu einem Leitprinzip.\n\nTipp: Wiederhole es täglich zur Verstärkung." },
      { text: "Wie wirst du den Abschluss dieser Schattenarbeitsreise feiern?", explanation: "Diese Frage plant das Feiern und die Anerkennung deiner Arbeit.\n\nTipp: Mache es bedeutungsvoll und selbst‑ehrend." }
    ]
  }
];
const courseData_pl = [
  {
    id: "intro",
    title: "Wprowadzenie",
    subtitle: "Witaj w swojej podróży pracy z cieniem",
    questions: []
  },
  {
    id: "day1",
    title: "Dzień 1",
    subtitle: "Ugruntowanie i świadomość emocji",
    questions: [
      { text: "Jaką emocję najłatwiej ci odczuwać i wyrażać?", explanation: "To pytanie pomaga rozpoznać twoją emocjonalną strefę komfortu i naturalne tendencje. Przykład: radość pojawia się łatwo wśród przyjaciół lub podczas pasji.\n\nTipp: Zauważ, gdzie ta emocja pojawia się najnaturalniej i dlaczego jest dla ciebie dostępna." },
      { text: "Jaka emocja jest dla ciebie najtrudniejsza do odczuwania lub wyrażania – i dlaczego?", explanation: "To pytanie ujawnia blokady emocjonalne oraz obszary wymagające uwagi i integracji. Przykład: złość jest trudna, jeśli nauczono cię, że jest ‚zła’.\n\nTipp: Weź pod uwagę doświadczenia z dzieciństwa lub wpływy kulturowe, które utrudniają tę emocję, oraz to, jak wpływa na codzienne życie." },
      { text: "Kiedy ostatnio powiedziałaś/eś: ‚Wszystko w porządku’, chociaż tak nie było? Opisz krótko sytuację.", explanation: "To pytanie bada nawyk maskowania i dyskomfort związany z wrażliwością. Przykład: powiedzenie ‚W porządku’ w pracy, aby nie pokazywać stresu.\n\nTipp: Zapisz, dlaczego ukryłaś/eś swoje uczucia i jaka bezpieczniejsza, bardziej szczera alternatywa byłaby możliwa." },
      { text: "Które uczucia najczęściej oceniasz u siebie?", explanation: "To pytanie ujawnia wzorce samosądu dotyczące wyrażania emocji. Przykład: ocenianie siebie za zazdrość.\n\nTipp: Zbadaj, skąd pochodzi ten osąd – np. normy społeczne – i rozważ, jak akceptacja może prowadzić do lepszego zrozumienia siebie." },
      { text: "Jakie uczucia tolerujesz u innych, ale nie u siebie?", explanation: "To pytanie pokazuje podwójne standardy i braki w samowspółczuciu. Przykład: akceptujesz złość przyjaciela, ale nie własną.\n\nTipp: Ćwicz okazywanie sobie tej samej życzliwości, którą dajesz innym." },
      { text: "Gdy jesteś cicho lub sam/a, jakie uczucie często jest tuż pod powierzchnią?", explanation: "To pytanie łączy cię z ukrytymi stanami emocjonalnymi, które często ignorujesz. Przykład: subtelny smutek w spokojnych chwilach.\n\nTipp: Zwracaj uwagę na te momenty w ciągu dnia; prowadź dziennik, aby rozumieć powtarzające się wzorce i wyzwalacze." },
      { text: "Jakie odczucia w ciele zauważasz, gdy czujesz wstyd?", explanation: "To pytanie buduje somatyczną świadomość reakcji wstydu w ciele. Przykład: zapadający się żołądek lub gorące policzki.\n\nTipp: Skanuj ciało w chwilach wstydu; użyj tej świadomości, aby się uziemić i skuteczniej przetworzyć emocje." },
      { text: "Jakie odczucia w ciele zauważasz, gdy czujesz złość?", explanation: "To pytanie rozwija świadomość ciała w kontekście złości i jej fizycznych przejawów. Przykład: zaciśnięta szczęka lub przyspieszone tętno.\n\nTipp: Zauważ te sygnały wcześnie, aby lepiej zarządzać złością; spróbuj ćwiczeń oddechowych, by uspokoić reakcję." },
      { text: "Jaka myśl najczęściej pojawia się w twojej głowie, gdy czujesz niepokój?", explanation: "To pytanie identyfikuje wzorce myślenia związane z lękiem i mentalne pętle. Przykład: ‚A jeśli wszystko się nie uda?’\n\nTipp: Kwestionuj te myśli – zapisz je i znajdź dowody przeciw, aby przerwać cykl lęku." },
      { text: "Co zazwyczaj mówisz sobie, gdy popełnisz błąd?", explanation: "To pytanie ujawnia wzorce wewnętrznego krytyka po błędach. Przykład: ‚Zawsze wszystko psuję’.\n\nTipp: Spróbuj łagodniejszej zmiany perspektywy: ‚Każdy popełnia błędy — czego mogę się z tego nauczyć?’" },
      { text: "Nazwij jedno małe uczucie, które ostatnio zaprzeczasz lub ignorujesz.", explanation: "To pytanie uświadamia subtelną emocjonalną ucieczkę. Przykład: cicha rozczarowanie w przyjaźni.\n\nTipp: Uznaj je bez osądu i rozważ mały krok, aby się nim zająć." },
      { text: "Jaki nastrój zwykle jest twoją ‚bazą’ po trudnym dniu?", explanation: "To pytanie identyfikuje twój domyślny nastrój po stresie. Przykład: wycofanie w odrętwienie.\n\nTipp: Zauważ, czy to ci służy; przetestuj jedną alternatywę (krótki spacer, ciepły prysznic, kojąca chwila refleksji)." },
      { text: "Co szybko pomaga ci rozładować napięcie — i czy rzeczywiście pomaga na dłuższą metę?", explanation: "To pytanie bada twoje aktualne strategie rozładowywania napięcia. Przykład: przewijanie social mediów koi krótko, ale później zwiększa stres.\n\nTipp: Zatrzymaj to, co naprawdę pomaga, i wypróbuj zdrowszą opcję (ruch, oddech, krótkie pisanie)." },
      { text: "Jaką emocję chciał(a)byś wyrażać łatwiej — i dlaczego?", explanation: "To pytanie doprecyzowuje cele rozwoju emocjonalnego. Przykład: wyrażanie wrażliwości, aby pogłębić relacje.\n\nTipp: Zrób mały krok — podziel się uczuciem z zaufaną osobą i zauważ, co się dzieje." },
      { text: "Jakiej strategii bezpieczeństwa używasz, gdy emocje są przytłaczające?", explanation: "To pytanie identyfikuje strategie ochronne używane przy przeciążeniu. Przykład: rozpraszanie się pracą.\n\nTipp: Jeśli jest bardziej unikowa niż pomocna, wypróbuj delikatniejszą opcję (uziemienie, journaling albo kontakt z kimś)." }
    ]
  },
  {
    id: "day2",
    title: "Dzień 2",
    subtitle: "Wyzwalacze, projekcja i relacje",
    questions: [
      { text: "Kto najczęściej cię uruchamia i jakie ich konkretne zachowanie wywołuje twoją reakcję?", explanation: "To pytanie identyfikuje konkretne wzorce wyzwalaczy i dynamiki relacyjne. Przykład: krytyka współpracownika uruchamia poczucie niepewności.\n\nTipp: Zapisuj wyzwalacze w dzienniku, aby zobaczyć wzorce i ukryte powody." },
      { text: "Opisz jedną ostatnią kłótnię — która część ciebie czuła się najbardziej zagrożona lub popchnięta?", explanation: "To pytanie bada, które aspekty siebie czują się zagrożone w konflikcie. Przykład: poczucie kompetencji mogło zostać naruszone.\n\nTipp: Poszukaj podstawowego lęku stojącego za reakcją, np. lęku przed porażką." },
      { text: "Jaka cecha u innych sprawia, że natychmiast ich nie lubisz lub oceniasz?", explanation: "To pytanie wskazuje na cechy, które możesz wypierać w sobie i projektować na innych. Przykład: niechęć do arogancji może odzwierciedlać tłumioną pewność siebie.\n\nTipp: Zapytaj siebie, czy ta cecha w jakiejś formie jest też w tobie i dlaczego ją odrzucasz." },
      { text: "Jakie założenia na temat innych mogą być w rzeczywistości projekcjami twoich własnych trudności?", explanation: "To pytanie uświadamia nieświadome projekcje na innych. Przykład: uznawanie kogoś za leniwego może odzwierciedlać twoje wypalenie.\n\nTipp: Odwróć założenie i sprawdź, czy stosuje się do ciebie; to może ujawnić ukryte samooceny." },
      { text: "Gdy ktoś odnosi sukces tam, gdzie ty poniosłaś/eś porażkę, jaka jest twoja pierwsza emocjonalna reakcja?", explanation: "To pytanie bada reakcje na sukces innych i osobiste wyzwalacze. Przykład: zgorzknienie może wskazywać na nieprzepracowaną porażkę.\n\nTipp: Ćwicz świętowanie ich sukcesu, by budować odporność i współczucie dla siebie." },
      { text: "Kogo w twoim życiu najtrudniej ci przebaczyć — i dlaczego to takie trudne?", explanation: "To pytanie eksploruje blokady wobec przebaczenia i nierozwiązane rany relacyjne. Przykład: zaniedbanie przez rodzica.\n\nTipp: Napisz list (bez wysyłania), aby wyrazić uczucia i przetworzyć ból." },
      { text: "Jaki wzorzec wciąż powtarza się w twoich relacjach romantycznych?", explanation: "To pytanie identyfikuje powtarzalne dynamiki w związkach. Przykład: wybieranie niedostępnych partnerów.\n\nTipp: Szukaj wspólnych tematów i rozważ, jak twoje wybory dokładają się do wzorca." },
      { text: "Jaki wzorzec wciąż powtarza się w twoich przyjaźniach?", explanation: "To pytanie ujawnia spójne motywy w relacjach platonicznych. Przykład: poczucie bycia wykorzystywanym lub pomijanym.\n\nTipp: Zbadaj swoją rolę w tych wzorcach i ustaw nowe granice." },
      { text: "W relacjach, gdzie masz tendencję dawać za dużo, a gdzie brać za dużo?", explanation: "To pytanie bada równowagę i wzajemność w relacjach. Przykład: dawanie wsparcia emocjonalnego przy jednoczesnym braniu pomocy materialnej.\n\nTipp: Dąż do równowagi, jasno komunikując potrzeby i granice." },
      { text: "Gdy wycofujesz się z relacji, jaką opowieść mówisz sobie, by to uzasadnić?", explanation: "To pytanie identyfikuje narracje usprawiedliwiające emocjonalne wycofanie. Przykład: ‚Im i tak nie zależy’.\n\nTipp: Podważ tę opowieść, sprawdzając fakty i rozmawiając otwarcie." },
      { text: "Która rola relacyjna (np. opiekun, ratownik, krytyk) jest ci najbardziej znajoma?", explanation: "To pytanie nazywa nawykowe role przyjmowane w relacjach. Przykład: zawsze bycie opiekunem.\n\nTipp: Rozważ, czy ta rola ci służy, czy czas spróbować nowych dynamik." },
      { text: "Gdy ktoś prosi o pomoc, jaka jest twoja natychmiastowa reakcja lub impuls?", explanation: "To pytanie bada automatyczne odpowiedzi na potrzeby innych. Przykład: porzucanie wszystkiego, by pomóc.\n\nTipp: Zauważ, czy to zdrowe czy współuzależniające i ćwicz bardziej zrównoważone reakcje." },
      { text: "Gdy ktoś cię krytykuje, jaka jest twoja pierwsza reakcja lub działanie?", explanation: "To pytanie mapuje wzorce obronne i reakcje na krytykę. Przykład: natychmiastowa obrona albo wycofanie.\n\nTipp: Zatrzymaj się i zapytaj, czy w krytyce jest ziarnko prawdy, zanim zareagujesz." },
      { text: "Z którą granicą masz największy problem — i dlaczego utrzymanie jej jest trudne?", explanation: "To pytanie identyfikuje wyzwania graniczne i ukryte lęki. Przykład: mówienie ‚nie’ prośbom rodziny z powodu poczucia winy.\n\nTipp: Ćwicz małe ‚nie’, aby budować pewność w stawianiu granic." },
      { text: "Komu zazdrościsz i jakiej konkretnej jakości u tej osoby potajemnie pragniesz dla siebie?", explanation: "To pytanie wykorzystuje zazdrość do ujawnienia wypartych pragnień i potencjałów. Przykład: zazdrość o pewność siebie przyjaciela.\n\nTipp: Użyj zazdrości jako motywacji do rozwijania tej jakości w sobie." }
    ]
  },
  {
    id: "day3",
    title: "Dzień 3",
    subtitle: "Wstyd, poczucie winy i przekonania o sobie",
    questions: [
      { text: "Kiedy po raz pierwszy sprawiono, że poczułaś/eś wstyd? Opisz krótko sytuację.", explanation: "To pytanie śledzi wczesne doświadczenia wstydu i ich trwały wpływ. Przykład: publiczne zbesztanie w dzieciństwie.\n\nTipp: Zastanów się, jak ta pamięć wciąż wpływa na twój obraz siebie." },
      { text: "Co nosisz w sobie i nigdy nikomu nie powiedziałaś/eś?", explanation: "To pytanie eksploruje ukryty wstyd i sekrety, które izolują. Przykład: przeszła porażka trzymana w tajemnicy.\n\nTipp: Rozważ ulgę związaną z podzieleniem się z zaufaną osobą lub w dzienniku." },
      { text: "Jaki prywatny błąd z przeszłości wciąż cię nawiedza?", explanation: "To pytanie identyfikuje nieprzepracowaną winę i wzorce samokarania. Przykład: niezamierzone zranienie przyjaciela.\n\nTipp: Ćwicz samoprzebaczenie, zapisując, czego cię to nauczyło." },
      { text: "Jakiej etykiety najbardziej się boisz, że przypiszą ci inni?", explanation: "To pytanie ujawnia lęki tożsamościowe i przekonania oparte na wstydzie. Przykład: bycie postrzeganym jako ‚słaby/a’.\n\nTipp: Zbadaj źródło tego lęku i podważ jego zasadność." },
      { text: "Jakie ograniczające przekonanie o sobie pochodzi z dzieciństwa?", explanation: "To pytanie śledzi ograniczające przekonania do ich dziecięcych źródeł. Przykład: ‚Nie jestem wystarczająco mądry/a’.\n\nTipp: Przepisz to przekonanie, używając dowodów z dorosłego życia." },
      { text: "Który wewnętrzny głos jest wobec ciebie najbardziej surowy? Co zwykle mówi?", explanation: "To pytanie daje głos wewnętrznemu krytykowi i jego komunikatom. Przykład: ‚Zawsze wszystko psujesz’.\n\nTipp: Odpowiadaj mu życzliwym, wspierającym tonem — jak przyjaciel." },
      { text: "Gdy wyobrażasz sobie pełną akceptację i miłość, co zmienia się w twoim zachowaniu lub odczuwaniu?", explanation: "To pytanie bada przemieniającą moc bezwarunkowej akceptacji. Przykład: większa gotowość do ryzyka.\n\nTipp: Ćwicz akceptację siebie, by przybliżyć to uczucie do codzienności." },
      { text: "Co wierzysz, że musisz zrobić lub osiągnąć, aby zasługiwać na miłość czy sukces?", explanation: "To pytanie identyfikuje skrypty warunkowej wartości i wzorce ‚zarabiania na siebie’. Przykład: ‚Muszę być perfekcyjny/a’.\n\nTipp: Podważ to, wypisując swoją wrodzoną wartość niezależnie od osiągnięć." },
      { text: "Jakie pragnienie masz, którego nigdy nie przyznał(a)byś głośno z powodu wstydu?", explanation: "To pytanie odsłania wstyd wokół autentycznych potrzeb. Przykład: pragnienie większej uwagi.\n\nTipp: Uznaj to pragnienie bez oceny, by zmniejszyć jego wpływ." },
      { text: "W której sferze życia czujesz się zasadniczo ‚niewystarczający/a’?", explanation: "To pytanie lokalizuje przekonania o niedostatku i ich przejawy. Przykład: niewystarczająco dobry/a w relacjach.\n\nTipp: Zbieraj dowody na swoją wystarczalność w tej sferze." },
      { text: "Gdy spełniłby się twój najgłębszy lęk, co próbował(a)byś ukryć przed innymi?", explanation: "To pytanie eksploruje strategie ukrywania oparte na wstydzie. Przykład: ukrywanie porażki przed rodziną.\n\nTipp: Rozważ koszt ukrywania i korzyści z wrażliwości." },
      { text: "Jaka jest twoja ‚historia wyjaśniająca’, gdy coś idzie nie po twojej myśli?", explanation: "To pytanie identyfikuje wzorce obwiniania i narracje odpowiedzialności. Przykład: ‚To zawsze moja wina’.\n\nTipp: Zrównoważ to realistyczną oceną sytuacji." },
      { text: "Za co najczęściej się karzesz — i w jaki sposób?", explanation: "To pytanie ujawnia wzorce samokarania i wyzwalacze winy. Przykład: przepracowywanie się po błędzie.\n\nTipp: Zastąp karanie nauką i troską o siebie." },
      { text: "Gdy zawodzisz, jaka opowieść pojawia się w twojej głowie?", explanation: "To pytanie bada narracje porażki i wewnętrzny dialog po potknięciach. Przykład: ‚Jestem porażką’.\n\nTipp: Przekształć to na ‚To okazja do nauki’." },
      { text: "Jak wstyd przejawia się w twoich zachowaniach lub wyborach?", explanation: "To pytanie łączy uczucie wstydu z wzorcami zachowań i decyzji. Przykład: unikanie wydarzeń towarzyskich.\n\nTipp: Zauważaj i łagodnie kwestionuj zachowania napędzane wstydem." }
    ]
  },
  {
    id: "day4",
    title: "Dzień 4",
    subtitle: "Wzorce z dzieciństwa i rodzinne uwarunkowania",
    questions: [
      { text: "Jaką rolę przypisano ci w rodzinie lub jaką sama/sam przyjąłeś (np. rozjemca, prymus)?", explanation: "To pytanie identyfikuje rodzinne role z dzieciństwa, które wciąż wpływają na tożsamość. Przykład: bycie ‚odpowiedzialnym’.\n\nTipp: Zastanów się, czy ta rola ci teraz służy, czy ogranicza." },
      { text: "Jakie przesłanie najczęściej powtarzali ci opiekunowie?", explanation: "To pytanie ujawnia zinternalizowane komunikaty rodziców i ich wpływ. Przykład: ‚Bądź miły dla wszystkich’.\n\nTipp: Zdecyduj, czy to przesłanie wciąż ci służy, czy wymaga aktualizacji." },
      { text: "Jakie tematy lub emocje były w domu zakazane?", explanation: "To pytanie eksploruje rodzinne tabu i ograniczenia komunikacji. Przykład: problemy finansowe.\n\nTipp: Ćwicz wyrażanie ich teraz w bezpiecznych przestrzeniach." },
      { text: "Jakie rodzinne przekonanie o pieniądzach lub sukcesie najbardziej w tobie zostało?", explanation: "To pytanie identyfikuje przejęte przekonania o wartości i osiągnięciach. Przykład: ‚Pieniądze to zło’.\n\nTipp: Sprawdź, czy jest zgodne z twoimi wartościami, czy potrzebuje rewizji." },
      { text: "Kogo w dzieciństwie najbardziej starałaś/eś się zadowolić — i dlaczego?", explanation: "To pytanie ujawnia wczesne wzorce zadowalania i szukania aprobaty. Przykład: surowy rodzic.\n\nTipp: Zauważ, czy wzorzec trwa w dorosłych relacjach." },
      { text: "Kiedy po raz pierwszy nauczyłaś/eś się ukrywać część siebie — i co to było?", explanation: "To pytanie śledzi początki ukrywania siebie i utraty autentyczności. Przykład: chowanie emocji, by uniknąć konfliktu.\n\nTipp: Pokazuj tę część w małych, bezpiecznych krokach." },
      { text: "Jaka rana z dzieciństwa nadal wpływa na twoje wybory?", explanation: "To pytanie łączy dawne zranienia z obecnymi decyzjami. Przykład: lęk przed porzuceniem prowadzący do przywiązania.\n\nTipp: Szukaj uzdrowienia w terapii lub refleksji." },
      { text: "Jaką zasadę z domu wciąż nieświadomie przestrzegasz?", explanation: "To pytanie identyfikuje nieświadome rodzinne reguły kierujące zachowaniem. Przykład: ‚Nie pokazuj słabości’.\n\nTipp: Świadomie wybierz, które zasady zachować, a które porzucić." },
      { text: "Czyje rodzinne wzorce lub zachowania dziś powtarzasz?", explanation: "To pytanie eksploruje dziedziczone wzorce zachowań i emocji. Przykład: pracoholizm rodzica.\n\nTipp: Przerwij cykl, wybierając inne reakcje." },
      { text: "Jaka tajemnica lub milczenie istniało w twojej rodzinie?", explanation: "To pytanie bada rodzinne sekrety i ich wpływ na otwartość. Przykład: brak rozmów o chorobie krewnego.\n\nTipp: Rozważ, jak to wpływa na twój obecny styl komunikacji." },
      { text: "Jakie dziecięce marzenie po cichu porzuciłaś/eś — i dlaczego?", explanation: "To pytanie przywraca utracone marzenia i bada powody rezygnacji. Przykład: porzucenie sztuki dla ‚praktycznej’ kariery.\n\nTipp: Ożywiaj je w małych krokach, by połączyć się z pasją." },
      { text: "Jaką strategię bezpieczeństwa rozwinęłaś/eś w dzieciństwie, która dziś wciąż działa automatycznie?", explanation: "To pytanie identyfikuje dziecięce strategie przetrwania aktywne w dorosłości. Przykład: zadowalanie, by uniknąć złości.\n\nTipp: Zaktualizuj ją tak, by lepiej służyła twojemu dorosłemu życiu." },
      { text: "Kim wolno ci było być jako dziecko, a kim nie?", explanation: "To pytanie eksploruje przyzwolenia i zakazy tożsamościowe z dzieciństwa. Przykład: wolno było być ‚mądrym’, ale nie ‚emocjonalnym’.\n\nTipp: Daj sobie teraz przyzwolenie na pełnię siebie." },
      { text: "Jaka wczesna strata lub odrzucenie ukształtowało cię najmocniej?", explanation: "To pytanie identyfikuje formujące straty i ich długotrwały wpływ. Przykład: rozwód rodziców.\n\nTipp: Przepracuj żałobę, aby zmniejszyć jej wpływ." },
      { text: "Co twoje młodsze ja chciałoby, żebyś teraz wiedziała/wiedział lub zrobił(a)?", explanation: "To pytanie łączy z mądrością wewnętrznego dziecka i niezaspokojonymi potrzebami. Przykład: ‚Wolno ci się bawić’.\n\nTipp: Działaj zgodnie z tą wiadomością, by leczyć wewnętrzne rany." }
    ]
  },
  {
    id: "day5",
    title: "Dzień 5",
    subtitle: "Złość, granice, pieniądze i władza",
    questions: [
      { text: "Jak zazwyczaj wyrażasz złość — jeśli w ogóle?", explanation: "To pytanie bada wzorce wyrażania złości i poziom komfortu. Przykład: tłumienie aż do wybuchu.\n\nTipp: Ćwicz zdrowe wyrażanie, np. asertywną komunikację." },
      { text: "Gdy jesteś zły/a, czego się boisz, jeśli zabierzesz głos?", explanation: "To pytanie identyfikuje lęki blokujące zdrowe wyrażanie złości. Przykład: strach przed odrzuceniem.\n\nTipp: Testuj małe wypowiedzi, by budować pewność." },
      { text: "Co powinnaś/eś kiedyś powiedzieć, ale się powstrzymałaś/eś?", explanation: "To pytanie eksploruje niewyrażone komunikaty i ich wpływ. Przykład: postawienie granicy przyjacielowi.\n\nTipp: Odegraj, co powiedział(a)byś teraz." },
      { text: "Kto lub co najbardziej wysysa twoją energię — i jak na to pozwalasz?", explanation: "To pytanie identyfikuje drenaż energii i naruszanie granic. Przykład: nadmierne zobowiązania w pracy.\n\nTipp: Ustal limity, aby chronić energię." },
      { text: "Co pieniądze znaczą dla ciebie w rdzeniu?", explanation: "To pytanie bada głębokie przekonania i emocje wokół pieniędzy. Przykład: bezpieczeństwo albo wolność.\n\nTipp: Sprawdź, czy to przekonanie pomaga, czy ogranicza." },
      { text: "Jakie przekonania o pieniądzach powstrzymują cię przed proszeniem o to, na ile zasługujesz?", explanation: "To pytanie identyfikuje ograniczające przekonania wpływające na samo‑adwokację finansową. Przykład: ‚Prośba o więcej jest chciwa’.\n\nTipp: Zbadaj stawki rynkowe, by zbudować pewność." },
      { text: "W której sferze życia czujesz się teraz bezsilny/a?", explanation: "To pytanie lokalizuje obszary bezradności i braku sprawczości. Przykład: kariera.\n\nTipp: Podejmij małe działania, by odzyskać moc." },
      { text: "Z jaką granicą masz trudność, by ją egzekwować — i dlaczego?", explanation: "To pytanie bada konkretne wyzwania graniczne i ich powody. Przykład: mówienie ‚nie’ dodatkowej pracy.\n\nTipp: Ćwicz na sytuacjach niskiego ryzyka." },
      { text: "Co potrzebował(a)byś, aby poczuć się bardziej wpływowy/a w swoim życiu?", explanation: "To pytanie eksploruje drogi do osobistej sprawczości. Przykład: nauka nowych umiejętności.\n\nTipp: Stwórz plan z małymi, wykonanymi krokami." },
      { text: "Gdzie używasz zadowalania, by unikać konfliktu?", explanation: "To pytanie identyfikuje unikanie konfliktu poprzez zadowalanie. Przykład: zgadzanie się, gdy się nie zgadzasz.\n\nTipp: Ćwicz szczerą, ale życzliwą komunikację." },
      { text: "Co czujesz w środku, gdy ktoś narusza twoją granicę?", explanation: "To pytanie łączy z wewnętrznymi reakcjami na naruszenia granic. Przykład: uraza lub lęk.\n\nTipp: Użyj tej informacji jako sygnału, by się odezwać." },
      { text: "Jakie poczucie uprawnienia lub urazę skrycie w sobie nosisz?", explanation: "To pytanie bada ukryte urazy i poczucie roszczeniowości. Przykład: uraza wobec sukcesu rodzeństwa.\n\nTipp: Wypisz to, by uwolnić napięcie." },
      { text: "Jakie finansowe lęki trzymasz w tajemnicy?", explanation: "To pytanie odsłania wstyd i tajemnicę wokół lęków o pieniądze. Przykład: lęk przed biedą.\n\nTipp: Podziel się z zaufanym doradcą, by uzyskać perspektywę." },
      { text: "Gdy dostajesz władzę lub autorytet, jaka twoja część się kurczy lub reaguje negatywnie?", explanation: "To pytanie bada reakcje na władzę i szanse przywódcze. Przykład: syndrom oszusta.\n\nTipp: Buduj pewność przez małe role przywódcze." },
      { text: "Co zrobił(a)byś inaczej, gdyby nie bał(a)byś się reakcji lub ocen innych?", explanation: "To pytanie eksploruje, jak lęk przed oceną ogranicza autentyczne działanie. Przykład: projekt pasji.\n\nTipp: Zacznij od działań, gdzie ryzyko oceny jest mniejsze." }
    ]
  },
  {
    id: "day6",
    title: "Dzień 6",
    subtitle: "Pragnienia, autentyczność i złoty cień",
    questions: [
      { text: "Czego potajemnie pragniesz, co wydaje się ‚zbyt wiele’ lub przesadne?", explanation: "To pytanie odsłania pragnienia uznawane za nadmierne lub nieodpowiednie. Przykład: chęć większego uznania.\n\nTipp: Zbadaj, dlaczego wydaje się ‚zbyt wiele’ i czy naprawdę jest nieuzasadnione." },
      { text: "Jakie marzenie umniejszyłaś/eś lub zminimalizowałaś/eś, by zachować spokój?", explanation: "To pytanie eksploruje marzenia poświęcone dla harmonii lub akceptacji. Przykład: zmiana kariery.\n\nTipp: Rób małe kroki w jego stronę, bez przewracania wszystkiego do góry nogami." },
      { text: "Co spróbował(a)byś lub zrobił(a), gdyby nikt nie mógł cię ocenić?", explanation: "To pytanie identyfikuje autentyczne pragnienia ograniczane lękiem przed oceną. Przykład: rozpoczęcie bloga.\n\nTipp: Znajdź wspierające społeczności, by się wyrażać." },
      { text: "Które cechy podziwiasz u innych, a w sobie odrzucasz lub zaprzeczasz?", explanation: "To pytanie ujawnia wyparte pozytywne cechy — złoty cień. Przykład: podziw dla kreatywności przy przekonaniu, że jej nie masz.\n\nTipp: Eksperymentuj z tą jakością w małych krokach." },
      { text: "Jakiej radości lub przyjemności odmawiasz sobie jako ‚egoistycznej’?", explanation: "To pytanie bada wzorce samodeprywacji i odmawiania sobie przyjemności. Przykład: brak czasu na hobby.\n\nTipp: Pozwól sobie na małe przyjemności, by budować nawyk dbania o siebie." },
      { text: "Jaki dar lub talent umniejszasz lub minimalizujesz?", explanation: "To pytanie identyfikuje umniejszane mocne strony i talenty. Przykład: zdolności artystyczne.\n\nTipp: Podziel się nimi, by otrzymać pozytywny feedback." },
      { text: "Jak wyglądałoby twoje życie, gdybyś w pełni podążał(a) za jednym prawdziwym pragnieniem?", explanation: "To pytanie wizualizuje życie zgodne z autentycznymi pragnieniami. Przykład: mieszkanie w innym mieście.\n\nTipp: Stwórz tablicę wizji lub kroki w jego stronę." },
      { text: "Co pragniesz powiedzieć lub wyrazić, ale nawyk lub lęk cię powstrzymuje?", explanation: "To pytanie eksploruje niewyrażone prawdy i blokady komunikacyjne. Przykład: powiedzenie komuś, że go kochasz.\n\nTipp: Ćwicz najpierw w sytuacjach niskiego ryzyka." },
      { text: "Gdzie grasz ‚mało’ lub umniejszasz się, by czuć się bezpiecznie?", explanation: "To pytanie identyfikuje zachowania umniejszające dla bezpieczeństwa. Przykład: milczenie na spotkaniach.\n\nTipp: Buduj poczucie bezpieczeństwa przez auto‑afirmację." },
      { text: "Jaka fantazja lub marzenie nigdy nie zostało przez ciebie nikomu ujawnione?", explanation: "To pytanie odsłania prywatne marzenia i aspiracje. Przykład: napisanie książki.\n\nTipp: Zapisz je i rozważ pierwszy krok." },
      { text: "Jaka mała przyjemność znacząco poprawiłaby twoje samopoczucie?", explanation: "To pytanie identyfikuje proste radości, które mogą podnieść jakość życia.\n\nTipp: Planuj ją regularnie, by priorytetyzować dbanie o siebie." },
      { text: "Którą część osobowości edytujesz lub ukrywasz publicznie?", explanation: "To pytanie eksploruje różnice między autentycznym ja a personą publiczną.\n\nTipp: Pokazuj ją w bezpiecznych sytuacjach społecznych." },
      { text: "Który aspekt sukcesu najbardziej cię przeraża?", explanation: "To pytanie bada lęki wokół osiągnięć i widoczności.\n\nTipp: Pracuj z tym lękiem przez przygotowanie lub wsparcie." },
      { text: "Jak sabotujesz potencjalną radość lub obfitość w swoim życiu?", explanation: "To pytanie identyfikuje wzorce autosabotażu wokół pozytywnych doświadczeń.\n\nTipp: Zauważ schemat i wybierz inaczej." },
      { text: "Co umożliwiłaby ci radykalna akceptacja siebie?", explanation: "To pytanie eksploruje możliwości otwierane przez pełną akceptację.\n\nTipp: Codziennie praktykuj afirmacje, by ją wzmacniać." }
    ]
  },
  {
    id: "day7",
    title: "Dzień 7",
    subtitle: "Integracja, przebaczenie i kolejne kroki",
    questions: [
      { text: "Jaki wgląd z tej podróży wydaje się najważniejszy do zapamiętania?", explanation: "To pytanie konsoliduje naukę i kluczowe tematy. Przykład: ‚Moje uczucia są ważne’.\n\nTipp: Zapisz go w widocznym miejscu." },
      { text: "Za co dziś sobie przebaczasz — i co się dzięki temu zmienia?", explanation: "To pytanie zaprasza do samoprzebaczenia i uwolnienia. Przykład: dawny błąd.\n\nTipp: Zwróć uwagę, jak czuje się ciało po przebaczeniu." },
      { text: "Jaki wzorzec zobowiązujesz się zmienić — i jak możesz działać?", explanation: "To pytanie identyfikuje konkretne, wykonalne zobowiązania do zmiany. Przykład: zadowalanie.\n\nTipp: Ustal mały cel, np. raz w tygodniu powiedzieć ‚nie’." },
      { text: "Jaką małą granicę ustawisz w tym tygodniu, by chronić energię?", explanation: "To pytanie tworzy konkretne zamiary stawiania granic. Przykład: ograniczenie mediów społecznościowych.\n\nTipp: Zakomunikuj ją jasno odpowiednim osobom." },
      { text: "Jaki mini‑eksperyment pomoże ci przetestować nowy sposób bycia?", explanation: "To pytanie projektuje małe eksperymenty dla nowych zachowań. Przykład: codzienne wyrażanie emocji.\n\nTipp: Notuj wyniki w dzienniku." },
      { text: "Jakiego wsparcia (np. terapia, coach, przyjaciel) potrzebujesz, by iść dalej?", explanation: "To pytanie identyfikuje potrzeby wsparcia dla dalszego wzrostu. Przykład: terapeuta do głębokiej pracy.\n\nTipp: Poszukaj i skontaktuj się z potencjalnymi osobami." },
      { text: "Gdyby twój cień mówił, jaki byłby jego najżyczliwszy komunikat do ciebie?", explanation: "To pytanie zaprasza do czułego dialogu z wypartymi częściami. Przykład: ‚Jesteś wartościowy/a taki/a, jaki/a jesteś’.\n\nTipp: Słuchaj i integruj ten przekaz." },
      { text: "Co chciał(a)byś, aby twój profil cienia podkreślał jako mocną stronę?", explanation: "To pytanie przeformułowuje materiał cienia jako potencjalne mocne strony.\n\nTipp: Przyjmij i rozwijaj tę jakość." },
      { text: "Jakie jedno zdanie lub mantra ma ci towarzyszyć w przyszłym miesiącu?", explanation: "To pytanie destyluje kluczowe wglądy w zasadę przewodnią.\n\nTipp: Powtarzaj ją codziennie, by wzmocnić efekt." },
      { text: "Jak uczcisz ukończenie tej podróży pracy z cieniem?", explanation: "To pytanie pomaga zaplanować świętowanie i uznanie wysiłku.\n\nTipp: Spraw, by było znaczące i pełne szacunku dla siebie." }
    ]
  }
  // Fallback to English content for remaining days
  // (Brak fallbacku) — pełne tłumaczenia dla dni 2–7 powyżej
];
const courseDataByLanguage = {
  en: courseData_en,
  de: courseData_de,
  pl: courseData_pl
};
function getCourseData(lang) {
  return courseDataByLanguage[lang] || courseData_en;
}
const courseData = courseData_en;
courseData.flatMap(
  (day) => day.questions.map((q) => ({
    section: day.subtitle,
    text: q.text,
    explanation: q.explanation
  }))
);
function App($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentLanguage = "en";
    let courseData2 = getCourseData(currentLanguage);
    courseData2[0];
    courseData2 = getCourseData(currentLanguage);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<main class="min-h-screen">`);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="relative">`);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div${attr_class(`fixed top-16 bottom-0 right-0 overflow-y-auto transition-all duration-500 z-20 ${stringify("left-0")}`)}>`);
      {
        $$renderer3.push("<!--[-->");
        Login($$renderer3, { currentLanguage });
      }
      $$renderer3.push(`<!--]--></div></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></main>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _page($$renderer) {
  App($$renderer);
}
export {
  _page as default
};
