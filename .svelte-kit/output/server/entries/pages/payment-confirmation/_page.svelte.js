import { y as head, G as stringify } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { a as attr } from "../../../chunks/attributes.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { l as logo } from "../../../chunks/logo_shadowwork.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentLanguage = "en";
    let email = "";
    function getTranslation(key) {
      const translations = {
        en: {
          title: "Payment Successful!",
          subtitle: "Welcome to your Shadow Work Journey",
          confirmationMessage: "Thank you for your purchase! We've sent your course invitation to:",
          inviteSent: "Your invitation has been sent to your email address. Please check your inbox and spam folder.",
          nextSteps: "What happens next?",
          step1: "Check your email for an invitation link",
          step2: "Click the link to create your account",
          step3: "Start your 7-day shadow work journey",
          resendButton: "Resend Invitation",
          resendSuccess: "Invitation sent successfully! Please check your email.",
          resendError: "Failed to send invitation. Please contact support.",
          contactTitle: "Need Help?",
          contactMessage: "If you don't receive the invitation within 15 minutes, please contact us:",
          emailSupport: "Email Support",
          goToSales: "Back to Course Info",
          checkEmail: "Check Your Email"
        },
        de: {
          title: "Zahlung erfolgreich!",
          subtitle: "Willkommen zu Ihrer Shadow Work Journey",
          confirmationMessage: "Vielen Dank für Ihren Kauf! Wir haben Ihre Kurseinladung gesendet an:",
          inviteSent: "Ihre Einladung wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang und Spam-Ordner.",
          nextSteps: "Was passiert als nächstes?",
          step1: "Überprüfen Sie Ihre E-Mail auf einen Einladungslink",
          step2: "Klicken Sie auf den Link, um Ihr Konto zu erstellen",
          step3: "Beginnen Sie Ihre 7-tägige Shadow Work Journey",
          resendButton: "Einladung erneut senden",
          resendSuccess: "Einladung erfolgreich gesendet! Bitte überprüfen Sie Ihre E-Mail.",
          resendError: "Einladung konnte nicht gesendet werden. Bitte kontaktieren Sie den Support.",
          contactTitle: "Brauchen Sie Hilfe?",
          contactMessage: "Falls Sie die Einladung nicht innerhalb von 15 Minuten erhalten, kontaktieren Sie uns bitte:",
          emailSupport: "E-Mail Support",
          goToSales: "Zurück zur Kursinfo",
          checkEmail: "E-Mail überprüfen"
        },
        pl: {
          title: "Płatność udana!",
          subtitle: "Witamy w Twojej Shadow Work Journey",
          confirmationMessage: "Dziękujemy za zakup! Wysłaliśmy zaproszenie do kursu na adres:",
          inviteSent: "Zaproszenie zostało wysłane na Twój adres e-mail. Sprawdź swoją skrzynkę odbiorczą i folder spam.",
          nextSteps: "Co dalej?",
          step1: "Sprawdź swoją pocztę e-mail pod kątem linku zaproszenia",
          step2: "Kliknij link, aby utworzyć swoje konto",
          step3: "Rozpocznij swoją 7-dniową podróż shadow work",
          resendButton: "Wyślij ponownie zaproszenie",
          resendSuccess: "Zaproszenie wysłane pomyślnie! Sprawdź swoją pocztę e-mail.",
          resendError: "Nie udało się wysłać zaproszenia. Skontaktuj się z pomocą techniczną.",
          contactTitle: "Potrzebujesz pomocy?",
          contactMessage: "Jeśli nie otrzymasz zaproszenia w ciągu 15 minut, skontaktuj się z nami:",
          emailSupport: "Wsparcie e-mail",
          goToSales: "Powrót do informacji o kursie",
          checkEmail: "Sprawdź swoją pocztę e-mail"
        }
      };
      return translations[currentLanguage][key] || translations.en[key];
    }
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Payment Confirmation - Shadow Work Journey</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Your payment was successful. Check your email for your course invitation." class="svelte-1qtf5b5"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen svelte-1qtf5b5"><nav class="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 svelte-1qtf5b5"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 svelte-1qtf5b5"><div class="flex justify-between items-center h-12 svelte-1qtf5b5"><div class="flex items-center gap-2 svelte-1qtf5b5"><img${attr("src", logo)} alt="Shadow Work" class="opacity-90 svelte-1qtf5b5" style="height: 20px; width: auto;"/> <span class="text-white font-bold text-lg svelte-1qtf5b5">Shadow Work Journey</span></div> <div class="flex items-center gap-4 svelte-1qtf5b5"><div class="relative svelte-1qtf5b5"><button class="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-white/15 border border-white/30 text-white/90 svelte-1qtf5b5" title="Change language">${escape_html(currentLanguage.toUpperCase())}</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div></nav> <div class="pt-24 pb-20 px-4 sm:px-6 lg:px-8 svelte-1qtf5b5"><div class="max-w-4xl mx-auto svelte-1qtf5b5"><div class="text-center mb-12 svelte-1qtf5b5"><div class="w-20 h-20 bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-6 shadow-lg svelte-1qtf5b5"><svg class="w-10 h-10 text-green-400 svelte-1qtf5b5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" class="svelte-1qtf5b5"></path></svg></div> <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4 font-primary svelte-1qtf5b5">${escape_html(getTranslation("title"))}</h1> <p class="text-xl text-white/80 mb-8 font-secondary svelte-1qtf5b5">${escape_html(getTranslation("subtitle"))}</p></div> <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8 svelte-1qtf5b5"><div class="text-center svelte-1qtf5b5"><p class="text-lg text-white/90 mb-4 svelte-1qtf5b5">${escape_html(getTranslation("confirmationMessage"))}</p> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <p class="text-white/80 mt-6 svelte-1qtf5b5">${escape_html(getTranslation("inviteSent"))}</p></div></div> <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8 svelte-1qtf5b5"><h2 class="text-2xl font-bold text-white mb-6 text-center font-primary svelte-1qtf5b5">${escape_html(getTranslation("nextSteps"))}</h2> <div class="space-y-4 svelte-1qtf5b5"><div class="flex items-start gap-4 svelte-1qtf5b5"><div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center svelte-1qtf5b5"><span class="text-accent font-bold text-sm svelte-1qtf5b5">1</span></div> <p class="text-white/90 text-lg font-secondary svelte-1qtf5b5">${escape_html(getTranslation("step1"))}</p></div> <div class="flex items-start gap-4 svelte-1qtf5b5"><div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center svelte-1qtf5b5"><span class="text-accent font-bold text-sm svelte-1qtf5b5">2</span></div> <p class="text-white/90 text-lg font-secondary svelte-1qtf5b5">${escape_html(getTranslation("step2"))}</p></div> <div class="flex items-start gap-4 svelte-1qtf5b5"><div class="flex-shrink-0 w-8 h-8 bg-accent/20 border border-accent/40 flex items-center justify-center svelte-1qtf5b5"><span class="text-accent font-bold text-sm svelte-1qtf5b5">3</span></div> <p class="text-white/90 text-lg font-secondary svelte-1qtf5b5">${escape_html(getTranslation("step3"))}</p></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="bg-white/10 backdrop-blur-sm border border-white/20 p-8 mb-8 svelte-1qtf5b5"><h3 class="text-xl font-bold text-white mb-4 text-center font-primary svelte-1qtf5b5">${escape_html(getTranslation("contactTitle"))}</h3> <div class="text-center svelte-1qtf5b5"><p class="text-white/80 mb-6 svelte-1qtf5b5">${escape_html(getTranslation("contactMessage"))}</p> <div class="space-y-4 svelte-1qtf5b5"><a href="mailto:support@shadowworkjourney.com" class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all duration-200 svelte-1qtf5b5"><svg class="w-5 h-5 mr-2 svelte-1qtf5b5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" class="svelte-1qtf5b5"></path></svg> ${escape_html(getTranslation("emailSupport"))}</a></div></div></div> <div class="flex flex-col sm:flex-row gap-4 justify-center svelte-1qtf5b5"><a href="/sales" class="px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-all duration-200 text-center svelte-1qtf5b5">${escape_html(getTranslation("goToSales"))}</a> <a${attr("href", `mailto:${stringify(email)}`)} class="px-6 py-3 text-white font-semibold border-2 transition-all duration-300 hover:brightness-110 text-center svelte-1qtf5b5" style="background: linear-gradient(135deg, #0C6E78 0%, #0A5A63 100%); border-color: #D4AF37;">${escape_html(getTranslation("checkEmail"))}</a></div></div></div></div>`);
  });
}
export {
  _page as default
};
