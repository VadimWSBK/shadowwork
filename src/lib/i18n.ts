export type Language = 'en' | 'de' | 'pl';

type Params = Record<string, string | number>;

type DayIntro = { title: string; theme: string; intro: string };

type Translations = Record<string, string>;

type I18nBundle = {
  strings: Translations;
  daySummaries: Record<string, string>;
  dayIntros: Record<string, DayIntro>;
};

const en: I18nBundle = {
  strings: {
    'settings.title': 'Settings',

    'app.welcomeTitle': 'Welcome to Your Shadow Work Journey',
    'app.whatIsShadowWorkTitle': 'What is shadow work?'
    , 'app.whatIsShadowWorkP1': 'Shadow work is the practice of meeting the hidden sides of yourself with curiosity and compassion. These are the emotions you suppress, the beliefs you inherited, and the patterns that quietly shape your choices. They’re not “bad” parts — just unseen.',
    'app.whatIsShadowWorkP2': 'When you shine light on them, you stop repeating the same old cycles. You begin to understand why you react the way you do. You discover strengths, desires, and parts of yourself you’ve been denying.',
    'app.whatIsShadowWorkP3': 'This 7-day journey is designed to guide you gently through that process. With powerful questions and space for honest reflection, you’ll uncover what holds you back, release old stories, and reconnect with your most authentic self. The result? More clarity, more freedom, and more self-trust.',

    'app.overviewTitle': '7‑day overview',
    'app.takeYourTimeLine': 'Take your time. Be real. This is your journey. You can repeat days, skip and return, and move at your own pace.',
    'app.startJourneyButton': 'Start the Journey',
    'app.themeLabel': 'Theme: {theme}',
    'app.questionsLabel': 'Questions: {count}',
    'app.dayIntroTip': 'Tip: Set aside 10–20 minutes. Breathe. Be honest, not perfect.',
    'app.startDayButton': 'Start Day {day}',
    'app.disclaimer': 'This is a safe space for self-reflection. Your responses are private and stored locally on your device.',
    'app.howToUseTitle': 'How to use this course',
    'app.howTo1': 'Set aside 10–20 minutes per day. Write freely — honesty over perfection.',
    'app.howTo2': 'If you feel overwhelmed, pause, breathe, and return later. Support is welcome.',
    'app.howTo3': 'We recommend revisiting this journey twice a year, or during life transitions.',
    'app.howTo4': 'Your data is fully encrypted and secure. It is only visible to you.',
    'app.howTo5': 'Your data will never be shared with anyone.',
    'app.howTo6': 'You can download your answers anytime or request a full deletion of your data in your profile settings.',

    'sidebar.title': 'Shadow Work Course',
    'sidebar.subtitle': '7-Day Journey of Self-Discovery',
    'sidebar.close': 'Close sidebar',
    'sidebar.overallProgress': 'Overall Progress',
    'sidebar.questionsCount': '{count} questions',
    'sidebar.completedOf100': '{count} of 100 questions completed',
    'sidebar.footerLine1': 'Take your time with each question',
    'sidebar.footerLine2': 'Your journey matters',

    'login.title': 'Shadow Work Course',
    'login.subtitle': '7-Day Journey of Self-Discovery',
    'login.nameLabel': 'Your Name',
    'login.namePlaceholder': 'Enter your name to begin...',
    'login.startButton': 'Start Your Journey',
    'login.disclaimer': 'This is a safe space for self-reflection. Your responses are private and stored locally on your device.',

    'questionnaire.viewAnswers': 'View Answers',
    'questionnaire.questionXofY': 'Question {x} of {y}',
    'questionnaire.complete': 'Complete',
    'questionnaire.progressAria': 'Progress',
    'questionnaire.reflectionLabel': 'Your reflection:',
    'questionnaire.reflectionPlaceholder': 'Take your time to reflect deeply on this question...',
    'questionnaire.characters': '{count} characters',
    'questionnaire.aimForDetail': '• Aim for 300+ characters. The more detailed, the better.',
    'questionnaire.autoSaved': 'Auto-saved',

    'answers.byUser': 'Reflections by {username}',
    'answers.backToQuestionnaire': 'Go to Questionnaire',
    'answers.shareReflection': 'Share your reflection...',
    'answers.cancel': 'Cancel',
    'answers.saveChanges': 'Save Changes',
    'answers.editAnswer': 'Edit answer',
    'answers.noResponse': 'No response provided',
    'answers.addResponse': 'Add Response',
    'answers.daySummary': 'Day Summary',
    'answers.questionsAnswered': 'Questions Answered',
    'answers.totalCharacters': 'Total Characters',
    'answers.completionRate': 'Completion Rate',
    'answers.summaryParagraph': 'Your journey of self-discovery is ongoing. These reflections are stepping stones toward greater self-awareness and personal growth. Consider revisiting these questions periodically as you continue to evolve.'
  },
  daySummaries: {
    day1: 'Grounding and emotional awareness. Notice, name, and normalize feelings.',
    day2: 'Triggers, projection and relationships. See what reactions reveal about you.',
    day3: 'Shame, guilt and self-beliefs. Meet the inner critic and the stories you carry.',
    day4: 'Childhood patterns and family conditioning. Trace roles, rules, and dynamics.',
    day5: 'Anger, boundaries, money and power. Clarify limits, energy, and agency.',
    day6: 'Desires, authenticity and the golden shadow. Reclaim strengths and true wants.',
    day7: 'Integration, forgiveness and next steps. Choose small, practical commitments.'
  },
  dayIntros: {
    day1: { title: 'Meeting your inner world', theme: 'Awareness', intro: 'Every journey begins with noticing. Today you will gently meet the parts of yourself you often overlook. Slow down, name what you feel, and let honesty lead the way.' },
    day2: { title: 'Triggers and reflections', theme: 'Relationships', intro: 'Relationships are mirrors. When something or someone sets you off, it shows you a part of yourself asking to be seen. Today you will look at triggers and what they reveal.' },
    day3: { title: 'Shame, guilt and core beliefs', theme: 'Self-beliefs', intro: 'Hidden beliefs can shape your choices. By meeting shame and guilt with kindness, you create space for a truer story. Today you will listen to your inner voice and update it.' },
    day4: { title: 'Early patterns and family rules', theme: 'Origins', intro: 'Many patterns began in childhood. Roles, rules, and unspoken messages still echo. Today you will trace where they came from and decide which ones you want to keep.' },
    day5: { title: 'Boundaries, power and energy', theme: 'Agency', intro: 'Power lives in clear boundaries. When you honor your limits, your energy returns. Today you will explore anger, money beliefs, and the places you want to stand taller.' },
    day6: { title: 'Desires and the golden shadow', theme: 'Authenticity', intro: 'Your deepest desires are signals. Qualities you admire in others may already live in you. Today you will reclaim hidden strengths and say yes to what you truly want.' },
    day7: { title: 'Integration and next steps', theme: 'Wholeness', intro: 'Wholeness means welcoming all parts of you. Today you will gather your insights, offer yourself forgiveness, and choose small actions that help your growth continue.' }
  }
};

const de: I18nBundle = {
  strings: {
    'settings.title': 'Einstellungen',

    'app.welcomeTitle': 'Willkommen auf deiner Reise der Schattenarbeit',
    'app.whatIsShadowWorkTitle': 'Was ist Schattenarbeit?'
    , 'app.whatIsShadowWorkP1': 'Schattenarbeit bedeutet, die verborgenen Seiten von dir mit Neugier und Mitgefühl zu begegnen. Das sind Gefühle, die du unterdrückst, übernommene Glaubenssätze und Muster, die unbemerkt deine Entscheidungen prägen. Es sind keine „schlechten“ Teile – nur ungesehene.',
    'app.whatIsShadowWorkP2': 'Wenn du Licht auf sie wirfst, durchbrichst du alte Kreisläufe. Du verstehst, warum du so reagierst, wie du reagierst. Du entdeckst Stärken, Wünsche und Anteile, die du bisher verleugnet hast.',
    'app.whatIsShadowWorkP3': 'Diese 7‑Tage‑Reise begleitet dich sanft durch diesen Prozess. Mit kraftvollen Fragen und Raum für ehrliche Reflexion erkennst du, was dich zurückhält, lässt alte Geschichten los und verbindest dich wieder mit deinem authentischen Selbst. Ergebnis: mehr Klarheit, mehr Freiheit, mehr Selbstvertrauen.',

    'app.overviewTitle': '7‑Tage‑Übersicht',
    'app.takeYourTimeLine': 'Lass dir Zeit. Sei ehrlich. Das ist deine Reise. Du kannst Tage wiederholen, überspringen und in deinem eigenen Tempo gehen.',
    'app.startJourneyButton': 'Reise starten',
    'app.themeLabel': 'Thema: {theme}',
    'app.questionsLabel': 'Fragen: {count}',
    'app.dayIntroTip': 'Tipp: Nimm dir 10–20 Minuten. Atme. Sei ehrlich, nicht perfekt.',
    'app.startDayButton': 'Tag {day} starten',
    'app.disclaimer': 'Dies ist ein sicherer Raum für Selbstreflexion. Deine Antworten sind privat und werden lokal auf deinem Gerät gespeichert.',
    'app.howToUseTitle': 'So nutzt du diesen Kurs',
    'app.howTo1': 'Nimm dir täglich 10–20 Minuten. Schreibe frei — Ehrlichkeit vor Perfektion.',
    'app.howTo2': 'Wenn du dich überwältigt fühlst, pausiere, atme und kehre später zurück. Unterstützung ist willkommen.',
    'app.howTo3': 'Wir empfehlen, diese Reise zweimal im Jahr oder in Lebensübergängen zu wiederholen.',
    'app.howTo4': 'Deine Daten sind vollständig verschlüsselt und sicher. Nur du kannst sie sehen.',
    'app.howTo5': 'Deine Daten werden niemals mit jemandem geteilt.',
    'app.howTo6': 'Du kannst deine Antworten jederzeit herunterladen oder in den Profileinstellungen die vollständige Löschung deiner Daten anfordern.',

    'sidebar.title': 'Schattenarbeits‑Kurs',
    'sidebar.subtitle': '7‑Tage‑Reise der Selbsterkenntnis',
    'sidebar.close': 'Seitenleiste schließen',
    'sidebar.overallProgress': 'Gesamtfortschritt',
    'sidebar.questionsCount': '{count} Fragen',
    'sidebar.completedOf100': '{count} von 100 Fragen beantwortet',
    'sidebar.footerLine1': 'Nimm dir Zeit für jede Frage',
    'sidebar.footerLine2': 'Deine Reise zählt',

    'login.title': 'Schattenarbeits‑Kurs',
    'login.subtitle': '7‑Tage‑Reise der Selbsterkenntnis',
    'login.nameLabel': 'Dein Name',
    'login.namePlaceholder': 'Gib deinen Namen ein, um zu beginnen...',
    'login.startButton': 'Starte deine Reise',
    'login.disclaimer': 'Dies ist ein sicherer Raum für Selbstreflexion. Deine Antworten sind privat und werden lokal auf deinem Gerät gespeichert.',

    'questionnaire.viewAnswers': 'Antworten ansehen',
    'questionnaire.questionXofY': 'Frage {x} von {y}',
    'questionnaire.complete': 'Abgeschlossen',
    'questionnaire.progressAria': 'Fortschritt',
    'questionnaire.reflectionLabel': 'Deine Reflexion:',
    'questionnaire.reflectionPlaceholder': 'Nimm dir Zeit, um diese Frage tiefgehend zu reflektieren...',
    'questionnaire.characters': '{count} Zeichen',
    'questionnaire.aimForDetail': '• Ziel: 300+ Zeichen. Je detaillierter, desto besser.',
    'questionnaire.autoSaved': 'Automatisch gespeichert',

    'answers.byUser': 'Reflexionen von {username}',
    'answers.backToQuestionnaire': 'Zurück zum Fragebogen',
    'answers.shareReflection': 'Teile deine Reflexion...',
    'answers.cancel': 'Abbrechen',
    'answers.saveChanges': 'Änderungen speichern',
    'answers.editAnswer': 'Antwort bearbeiten',
    'answers.noResponse': 'Keine Antwort angegeben',
    'answers.addResponse': 'Antwort hinzufügen',
    'answers.daySummary': 'Tagesübersicht',
    'answers.questionsAnswered': 'Beantwortete Fragen',
    'answers.totalCharacters': 'Zeichen gesamt',
    'answers.completionRate': 'Abschlussrate',
    'answers.summaryParagraph': 'Deine Reise der Selbsterkenntnis geht weiter. Diese Reflexionen sind Schritte zu mehr Bewusstsein und persönlichem Wachstum. Besuche die Fragen regelmäßig erneut, während du dich weiterentwickelst.'
  },
  daySummaries: {
    day1: 'Erdung und emotionale Bewusstheit. Gefühle wahrnehmen, benennen und normalisieren.',
    day2: 'Trigger, Projektion und Beziehungen. Erkenne, was deine Reaktionen über dich zeigen.',
    day3: 'Scham, Schuld und Selbstüberzeugungen. Begegne dem inneren Kritiker und den Geschichten, die du trägst.',
    day4: 'Kindheitsmuster und familiäre Prägung. Verfolge Rollen, Regeln und Dynamiken.',
    day5: 'Wut, Grenzen, Geld und Macht. Kläre deine Grenzen, Energie und Handlungsfähigkeit.',
    day6: 'Wünsche, Authentizität und der goldene Schatten. Gewinne deine Stärken und wahren Wünsche zurück.',
    day7: 'Integration, Vergebung und nächste Schritte. Wähle kleine, praktische Verpflichtungen.'
  },
  dayIntros: {
    day1: { title: 'Begegnung mit deiner inneren Welt', theme: 'Bewusstsein', intro: 'Jede Reise beginnt mit dem Wahrnehmen. Heute begegnest du sanft den Teilen von dir, die du oft übersiehst. Verlangsame, benenne, was du fühlst, und lass Ehrlichkeit den Weg weisen.' },
    day2: { title: 'Trigger und Reflexionen', theme: 'Beziehungen', intro: 'Beziehungen sind Spiegel. Wenn dich etwas oder jemand aus der Fassung bringt, zeigt es dir einen Teil von dir, der gesehen werden möchte. Heute schaust du auf Trigger und was sie offenbaren.' },
    day3: { title: 'Scham, Schuld und Kernüberzeugungen', theme: 'Selbstüberzeugungen', intro: 'Verborgene Überzeugungen prägen deine Entscheidungen. Wenn du Scham und Schuld mit Freundlichkeit begegnest, entsteht Raum für eine wahrere Geschichte. Heute hörst du deiner inneren Stimme zu und aktualisierst sie.' },
    day4: { title: 'Frühe Muster und Familienregeln', theme: 'Ursprünge', intro: 'Viele Muster begannen in der Kindheit. Rollen, Regeln und unausgesprochene Botschaften klingen nach. Heute verfolgst du, wo sie herkamen, und entscheidest, welche du behalten willst.' },
    day5: { title: 'Grenzen, Macht und Energie', theme: 'Handlungsfähigkeit', intro: 'Klarheit lebt in deutlichen Grenzen. Wenn du deine Limits ehrst, kehrt deine Energie zurück. Heute erkundest du Wut, Geldglaubenssätze und die Orte, an denen du größer stehen willst.' },
    day6: { title: 'Wünsche und der goldene Schatten', theme: 'Authentizität', intro: 'Deine tiefsten Wünsche sind Signale. Eigenschaften, die du an anderen bewunderst, leben vielleicht schon in dir. Heute reclaimst du verborgene Stärken und sagst Ja zu dem, was du wirklich willst.' },
    day7: { title: 'Integration und nächste Schritte', theme: 'Ganzheit', intro: 'Ganzheit bedeutet, alle Teile von dir willkommen zu heißen. Heute sammelst du deine Einsichten, schenkst dir Vergebung und wählst kleine Handlungen, die dein Wachstum weitertragen.' }
  }
};

const pl: I18nBundle = {
  strings: {
    'settings.title': 'Ustawienia',

    'app.welcomeTitle': 'Witamy na twojej drodze pracy z cieniem',
    'app.whatIsShadowWorkTitle': 'Czym jest praca z cieniem?'
    , 'app.whatIsShadowWorkP1': 'Praca z cieniem to spotykanie ukrytych stron siebie z ciekawością i współczuciem. To emocje, które tłumisz, przekonania, które przejąłeś, oraz wzorce, które po cichu kierują twoimi wyborami. To nie są „złe” części — tylko niewidoczne.',
    'app.whatIsShadowWorkP2': 'Gdy rzucisz na nie światło, przestajesz powtarzać stare schematy. Zaczynasz rozumieć, dlaczego reagujesz w określony sposób. Odkrywasz siły, pragnienia i części siebie, które dotąd zaprzeczałeś.',
    'app.whatIsShadowWorkP3': 'Ta 7‑dniowa podróż została zaprojektowana, aby łagodnie przeprowadzić cię przez ten proces. Dzięki mocnym pytaniom i przestrzeni do szczerej refleksji odkryjesz, co cię powstrzymuje, uwolnisz stare historie i połączysz się na nowo z autentycznym sobą. Efekt: więcej klarowności, wolności i zaufania do siebie.',

    'app.overviewTitle': 'Przegląd 7 dni',
    'app.takeYourTimeLine': 'Daj sobie czas. Bądź szczery. To twoja podróż. Możesz powtarzać dni, wracać i iść we własnym tempie.',
    'app.startJourneyButton': 'Rozpocznij podróż',
    'app.themeLabel': 'Temat: {theme}',
    'app.questionsLabel': 'Pytania: {count}',
    'app.dayIntroTip': 'Wskazówka: Przeznacz 10–20 minut. Oddychaj. Bądź szczery, nie idealny.',
    'app.startDayButton': 'Rozpocznij dzień {day}',
    'app.disclaimer': 'To bezpieczna przestrzeń do autorefleksji. Twoje odpowiedzi są prywatne i przechowywane lokalnie na twoim urządzeniu.',
    'app.howToUseTitle': 'Jak korzystać z tego kursu',
    'app.howTo1': 'Przeznacz codziennie 10–20 minut. Pisz swobodnie — szczerość ponad perfekcję.',
    'app.howTo2': 'Gdy czujesz przeciążenie, zrób pauzę, oddychaj i wróć później. Wsparcie jest mile widziane.',
    'app.howTo3': 'Zalecamy wracać do tej podróży dwa razy w roku lub podczas życiowych zmian.',
    'app.howTo4': 'Twoje dane są w pełni szyfrowane i bezpieczne. Tylko ty masz do nich dostęp.',
    'app.howTo5': 'Twoje dane nigdy nie będą nikomu udostępniane.',
    'app.howTo6': 'Możesz pobrać swoje odpowiedzi w dowolnym momencie lub w ustawieniach profilu poprosić o całkowite usunięcie danych.',

    'sidebar.title': 'Kurs pracy z cieniem',
    'sidebar.subtitle': '7‑dniowa podróż do poznania siebie',
    'sidebar.close': 'Zamknij panel boczny',
    'sidebar.overallProgress': 'Postęp ogólny',
    'sidebar.questionsCount': '{count} pytań',
    'sidebar.completedOf100': '{count} z 100 pytań ukończonych',
    'sidebar.footerLine1': 'Poświęć czas na każde pytanie',
    'sidebar.footerLine2': 'Twoja podróż jest ważna',

    'login.title': 'Kurs pracy z cieniem',
    'login.subtitle': '7‑dniowa podróż do poznania siebie',
    'login.nameLabel': 'Twoje imię',
    'login.namePlaceholder': 'Wpisz swoje imię, aby rozpocząć...',
    'login.startButton': 'Rozpocznij swoją podróż',
    'login.disclaimer': 'To bezpieczna przestrzeń do autorefleksji. Twoje odpowiedzi są prywatne i przechowywane lokalnie na twoim urządzeniu.',

    'questionnaire.viewAnswers': 'Zobacz odpowiedzi',
    'questionnaire.questionXofY': 'Pytanie {x} z {y}',
    'questionnaire.complete': 'Ukończono',
    'questionnaire.progressAria': 'Postęp',
    'questionnaire.reflectionLabel': 'Twoja refleksja:',
    'questionnaire.reflectionPlaceholder': 'Poświęć czas na głęboką refleksję nad tym pytaniem...',
    'questionnaire.characters': '{count} znaków',
    'questionnaire.aimForDetail': '• Cel: 300+ znaków. Im bardziej szczegółowo, tym lepiej.',
    'questionnaire.autoSaved': 'Zapisano automatycznie',

    'answers.byUser': 'Refleksje użytkownika {username}',
    'answers.backToQuestionnaire': 'Przejdź do kwestionariusza',
    'answers.shareReflection': 'Podziel się refleksją...',
    'answers.cancel': 'Anuluj',
    'answers.saveChanges': 'Zapisz zmiany',
    'answers.editAnswer': 'Edytuj odpowiedź',
    'answers.noResponse': 'Brak odpowiedzi',
    'answers.addResponse': 'Dodaj odpowiedź',
    'answers.daySummary': 'Podsumowanie dnia',
    'answers.questionsAnswered': 'Odpowiedziane pytania',
    'answers.totalCharacters': 'Łącznie znaków',
    'answers.completionRate': 'Wskaźnik ukończenia',
    'answers.summaryParagraph': 'Twoja podróż samopoznania trwa. Te refleksje to kroki w kierunku większej świadomości i rozwoju osobistego. Warto co jakiś czas wracać do tych pytań, gdy się rozwijasz.'
  },
  daySummaries: {
    day1: 'Ugruntowanie i świadomość emocji. Zauważaj, nazywaj i normalizuj uczucia.',
    day2: 'Wyzwalacze, projekcja i relacje. Zobacz, co twoje reakcje o tobie mówią.',
    day3: 'Wstyd, poczucie winy i przekonania o sobie. Spotkaj wewnętrznego krytyka i historie, które nosisz.',
    day4: 'Wczesne wzorce i rodzinne zasady. Prześledź role, reguły i dynamiki.',
    day5: 'Złość, granice, pieniądze i władza. Doprecyzuj granice, energię i sprawczość.',
    day6: 'Pragnienia, autentyczność i złoty cień. Odzyskaj swoje mocne strony i prawdziwe pragnienia.',
    day7: 'Integracja, przebaczenie i kolejne kroki. Wybierz małe, praktyczne zobowiązania.'
  },
  dayIntros: {
    day1: { title: 'Spotkanie ze swoim światem wewnętrznym', theme: 'Świadomość', intro: 'Każda podróż zaczyna się od zauważania. Dziś delikatnie spotkasz części siebie, które często pomijasz. Zwolnij, nazwij to, co czujesz, i pozwól, by prowadziła cię szczerość.' },
    day2: { title: 'Wyzwalacze i refleksje', theme: 'Relacje', intro: 'Relacje są lustrami. Gdy coś lub ktoś cię uruchamia, pokazuje część ciebie, która prosi o uwagę. Dziś spojrzysz na wyzwalacze i to, co ujawniają.' },
    day3: { title: 'Wstyd, poczucie winy i przekonania', theme: 'Przekonania o sobie', intro: 'Ukryte przekonania kształtują wybory. Spotykając wstyd i winę z życzliwością, tworzysz przestrzeń dla prawdziwszej historii. Dziś posłuchasz swojego wewnętrznego głosu i go zaktualizujesz.' },
    day4: { title: 'Wczesne wzorce i rodzinne zasady', theme: 'Pochodzenie', intro: 'Wiele wzorców zaczęło się w dzieciństwie. Role, reguły i niewypowiedziane komunikaty wciąż wybrzmiewają. Dziś prześledzisz, skąd pochodzą, i zdecydujesz, które zachować.' },
    day5: { title: 'Granice, moc i energia', theme: 'Sprawczość', intro: 'Moc mieszka w jasnych granicach. Gdy honorujesz swoje ograniczenia, powraca energia. Dziś zbadamy złość, przekonania dotyczące pieniędzy oraz miejsca, w których chcesz stanąć pewniej.' },
    day6: { title: 'Pragnienia i złoty cień', theme: 'Autentyczność', intro: 'Twoje najgłębsze pragnienia są sygnałami. Cechy, które podziwiasz u innych, mogą już żyć w tobie. Dziś odzyskasz ukryte mocne strony i powiesz „tak” temu, czego naprawdę chcesz.' },
    day7: { title: 'Integracja i kolejne kroki', theme: 'Pełnia', intro: 'Pełnia to przyjęcie wszystkich części siebie. Dziś zbierzesz wglądy, obdarzysz siebie przebaczeniem i wybierzesz małe działania, które podtrzymają wzrost.' }
  }
};

const bundles: Record<Language, I18nBundle> = { en, de, pl };

export function t(lang: Language, key: keyof Translations | string, params?: Params): string {
  const bundle = bundles[lang] || bundles.en;
  const enBundle = bundles.en;
  const raw = bundle.strings[key] ?? enBundle.strings[key] ?? String(key);
  if (!params) return raw;
  return Object.keys(params).reduce((acc, k) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(params[k])), raw);
}

export function getDaySummary(lang: Language, dayId: string): string {
  const bundle = bundles[lang] || bundles.en;
  return bundle.daySummaries[dayId] ?? bundles.en.daySummaries[dayId] ?? '';
}

export function getDayIntro(lang: Language, dayId: string): DayIntro | undefined {
  const bundle = bundles[lang] || bundles.en;
  return bundle.dayIntros[dayId] ?? bundles.en.dayIntros[dayId];
}