import { renderNewsletterEmail } from "@/lib/newsletter/template";
import type { Locale } from "@/lib/i18n";

function pick<T>(locale: Locale, values: { fr: T; en: T; nl: T }): T {
  return values[locale];
}

export function renderBusinessAcknowledgment({
  locale,
  name,
  confirmUrl,
}: {
  locale: Locale;
  name: string;
  confirmUrl: string;
}): { subject: string; html: string } {
  return {
    subject: pick(locale, {
      fr: `Bonjour ${name}, parlons de votre projet`,
      en: `Hi ${name}, let's discuss your project`,
      nl: `Hallo ${name}, laten we over uw project praten`,
    }),
    html: renderNewsletterEmail({
      locale,
      heading: pick(locale, {
        fr: `Bonjour ${name}`,
        en: `Hi ${name}`,
        nl: `Hallo ${name}`,
      }),
      bodyHtml: `
        <p style="margin:0 0 1em 0;">
          ${pick(locale, {
            fr: `Merci de votre intérêt pour la photographie d'entreprise. Je suis impatiente de mieux connaître votre projet.`,
            en: `Thank you for reaching out about photography for your business. I'm excited to learn more about your project.`,
            nl: `Bedankt voor uw interesse in bedrijfsfotografie. Ik kijk ernaar uit om meer over uw project te weten te komen.`,
          })}
        </p>
        <p style="margin:0 0 1em 0;">
          ${pick(locale, {
            fr: `Le mieux est de confirmer votre adresse email en cliquant le lien ci-dessous. Je vous enverrai ensuite un devis détaillé et les infos pratiques, selon votre besoin exact.`,
            en: `The best next step is to confirm your email address by clicking the link below. Then I'll send you more details about how we can work together, including pricing and availability.`,
            nl: `Bevestig best eerst uw e-mailadres door op de onderstaande link te klikken. Daarna stuur ik u een gedetailleerde offerte en praktische informatie, afgestemd op uw project.`,
          })}
        </p>
      `,
      ctaLabel: pick(locale, {
        fr: "Confirmer et continuer",
        en: "Confirm and continue",
        nl: "Bevestigen en verdergaan",
      }),
      ctaHref: confirmUrl,
    }),
  };
}

export function renderBusinessNextSteps({
  locale,
  name,
}: {
  locale: Locale;
  name: string;
}): { subject: string; html: string } {
  return {
    subject: pick(locale, {
      fr: `Votre devis et les prochaines étapes`,
      en: `Your quote is ready – next steps`,
      nl: `Uw offerte en de volgende stappen`,
    }),
    html: renderNewsletterEmail({
      locale,
      heading: pick(locale, {
        fr: `Votre devis, ${name}`,
        en: `Your quote, ${name}`,
        nl: `Uw offerte, ${name}`,
      }),
      bodyHtml: `
        <p style="margin:0 0 1em 0;">
          ${pick(locale, {
            fr: `En pièce jointe, vous trouverez le devis détaillé avec les options et les délais. Voici ce qui vient ensuite :`,
            en: `I'm attaching a detailed quote for your project, along with options and timelines. Here's what comes next:`,
            nl: `In bijlage vindt u de gedetailleerde offerte met de opties en de termijnen. Dit zijn de volgende stappen:`,
          })}
        </p>
        <ul style="margin:0 0 1em 0; padding-left:1.5em;">
          <li style="margin-bottom:0.5em;">
            ${pick(locale, {
              fr: `Vérifiez le devis et les détails de chaque option`,
              en: `Review the quote and the details of each option`,
              nl: `Controleer de offerte en de details van elke optie`,
            })}
          </li>
          <li style="margin-bottom:0.5em;">
            ${pick(locale, {
              fr: `Dites-moi si vous voulez ajuster quoi que ce soit — dates, livrables, périmètre — je m'adapte`,
              en: `Let me know if you'd like to adjust anything — dates, deliverables, scope — I'm flexible`,
              nl: `Laat me weten als u iets wil aanpassen — data, leveringen, omvang — ik pas me aan`,
            })}
          </li>
          <li style="margin-bottom:0.5em;">
            ${pick(locale, {
              fr: `Une fois d'accord, on finalise et on planifie votre séance`,
              en: `Once you're ready, we'll finalize and schedule your shoot`,
              nl: `Zodra u akkoord bent, ronden we af en plannen we uw sessie in`,
            })}
          </li>
        </ul>
        <p style="margin:0;">
          ${pick(locale, {
            fr: `Je réponds généralement sous 48h et j'adorerais répondre à vos questions.`,
            en: `I'm usually available within 48 hours, and I'd love to answer any questions you have.`,
            nl: `Ik antwoord doorgaans binnen 48u en beantwoord uw vragen graag.`,
          })}
        </p>
      `,
      ctaLabel: pick(locale, {
        fr: "Répondre avec vos questions",
        en: "Reply with your questions",
        nl: "Antwoorden met uw vragen",
      }),
      ctaHref: "mailto:indyana.balasse@gmail.com",
    }),
  };
}
