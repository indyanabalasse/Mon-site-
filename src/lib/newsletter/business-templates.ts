import { renderNewsletterEmail } from "@/lib/newsletter/template";
import { getDictionary, type Locale } from "@/lib/i18n";

export function renderBusinessAcknowledgment({
  locale,
  name,
  confirmUrl,
}: {
  locale: Locale;
  name: string;
  confirmUrl: string;
}): { subject: string; html: string } {
  const dict = getDictionary(locale);
  const isEn = locale === "en";

  return {
    subject: isEn ? `Hi ${name}, let's discuss your project` : `Bonjour ${name}, parlons de votre projet`,
    html: renderNewsletterEmail({
      locale,
      heading: isEn ? `Hi ${name}` : `Bonjour ${name}`,
      bodyHtml: `
        <p style="margin:0 0 1em 0;">
          ${
            isEn
              ? `Thank you for reaching out about photography for your business. I'm excited to learn more about your project.`
              : `Merci de votre intérêt pour la photographie d'entreprise. Je suis impatiente de mieux connaître votre projet.`
          }
        </p>
        <p style="margin:0 0 1em 0;">
          ${
            isEn
              ? `The best next step is to confirm your email address by clicking the link below. Then I'll send you more details about how we can work together, including pricing and availability.`
              : `Le mieux est de confirmer votre adresse email en cliquant le lien ci-dessous. Je vous enverrai ensuite un devis détaillé et les infos pratiques, selon votre besoin exact.`
          }
        </p>
      `,
      ctaLabel: isEn ? "Confirm and continue" : "Confirmer et continuer",
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
  const dict = getDictionary(locale);
  const isEn = locale === "en";

  return {
    subject: isEn
      ? `Your quote is ready – next steps`
      : `Votre devis et les prochaines étapes`,
    html: renderNewsletterEmail({
      locale,
      heading: isEn ? `Your quote, ${name}` : `Votre devis, ${name}`,
      bodyHtml: `
        <p style="margin:0 0 1em 0;">
          ${
            isEn
              ? `I'm attaching a detailed quote for your project, along with options and timelines. Here's what comes next:`
              : `En pièce jointe, vous trouverez le devis détaillé avec les options et les délais. Voici ce qui vient ensuite :`
          }
        </p>
        <ul style="margin:0 0 1em 0; padding-left:1.5em;">
          <li style="margin-bottom:0.5em;">
            ${
              isEn
                ? `Review the quote and the details of each option`
                : `Vérifiez le devis et les détails de chaque option`
            }
          </li>
          <li style="margin-bottom:0.5em;">
            ${
              isEn
                ? `Let me know if you'd like to adjust anything — dates, deliverables, scope — I'm flexible`
                : `Dites-moi si vous voulez ajuster quoi que ce soit — dates, livrables, périmètre — je m'adapte`
            }
          </li>
          <li style="margin-bottom:0.5em;">
            ${
              isEn
                ? `Once you're ready, we'll finalize and schedule your shoot`
                : `Une fois d'accord, on finalise et on planifie votre séance`
            }
          </li>
        </ul>
        <p style="margin:0;">
          ${
            isEn
              ? `I'm usually available within 48 hours, and I'd love to answer any questions you have.`
              : `Je réponds généralement sous 48h et j'adorerais répondre à vos questions.`
          }
        </p>
      `,
      ctaLabel: isEn ? "Reply with your questions" : "Répondre avec vos questions",
      ctaHref: "mailto:indyana.balasse@gmail.com",
    }),
  };
}
