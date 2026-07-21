export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Dictionary = {
  nav: {
    home: string;
    portfolio: string;
    about: string;
    contact: string;
    themeToLight: string;
    themeToDark: string;
    instagram: string;
  };
  home: {
    tagline: string;
    intro: string[];
    cta: string;
    categoriesTitle: string;
  };
  instagramBanner: {
    title: string;
    text: string;
    cta: string;
  };
  portfolio: {
    title: string;
    intro: string;
    viewSeries: string;
  };
  categories: {
    concert: { title: string; description: string };
    portrait: { title: string; description: string };
    headshot: { title: string; description: string };
  };
  about: {
    title: string;
    paragraphs: string[];
    cta: string;
  };
  contact: {
    title: string;
    intro: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    directly: string;
    phone: string;
    followInstagram: string;
    followInstagramCta: string;
  };
  footer: {
    rights: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      portfolio: "Portfolio",
      about: "À propos",
      contact: "Contact",
      themeToLight: "Passer en mode clair",
      themeToDark: "Passer en mode sombre",
      instagram: "Instagram de INDYANASTUDIO",
    },
    home: {
      tagline: "La photographie est bien plus qu'une passion, c'est une histoire de famille.",
      intro: [
        "Fille d'un photographe belge reconnu, j'ai grandi entourée d'objectifs, de lumière et d'émotions capturées. Tout naturellement, j'ai suivi les traces de mon père, en y apportant ma propre sensibilité et ma vision artistique.",
        "Mon style est avant tout artistique, mais je reste ouverte à différents univers : portrait, mode, concepts créatifs ou projets professionnels.",
      ],
      cta: "Découvrir le portfolio",
      categoriesTitle: "Séries",
    },
    instagramBanner: {
      title: "Suivez INDYANASTUDIO sur Instagram",
      text: "Nouvelles photos, coulisses de séances et projets en cours : tout se passe d'abord sur Instagram.",
      cta: "Suivre @indyanastudio",
    },
    portfolio: {
      title: "Portfolio",
      intro: "Trois univers, une même exigence : capturer l'authenticité de l'instant.",
      viewSeries: "Voir la série",
    },
    categories: {
      concert: {
        title: "Concert",
        description: "Scènes, artistes et festivals — immersion dans l'énergie du live.",
      },
      portrait: {
        title: "Portrait",
        description: "Portraits artistiques et conceptuels, entre lumière, matière et émotion.",
      },
      headshot: {
        title: "Headshot",
        description: "Portraits professionnels épurés, pensés pour révéler une présence.",
      },
    },
    about: {
      title: "À propos",
      paragraphs: [
        "Fille d'un photographe belge reconnu, j'ai grandi entourée d'objectifs, de lumière et d'émotions capturées. Tout naturellement, j'ai suivi les traces de mon père, en apportant ma propre sensibilité et ma vision artistique à ce métier.",
        "Depuis un an, je me consacre pleinement à la photographie, un univers où je peux exprimer ma créativité et donner vie aux émotions à travers l'image. Mon style est avant tout artistique, mais je reste ouverte à différents univers : portrait, mode, concepts créatifs ou projets professionnels.",
        "J'ai commencé mon parcours dans mon propre studio photo, un espace où je peux créer librement, jouer avec la lumière, les textures et les atmosphères pour raconter des histoires visuelles uniques. Chaque séance est une rencontre — une expérience humaine et artistique où l'authenticité prime avant tout.",
        "Mon objectif ? Capturer l'instant, révéler la beauté dans sa forme la plus pure, et créer des images qui vous ressemblent vraiment.",
      ],
      cta: "Discutons de votre projet",
    },
    contact: {
      title: "Contact",
      intro: "Un projet, une séance, une question ? Écrivez-moi.",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi en cours…",
      success: "Merci ! Votre message a bien été envoyé, je vous réponds rapidement.",
      error: "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
      directly: "Vous pouvez aussi m'écrire directement à",
      phone: "Ou m'appeler au",
      followInstagram: "En attendant ma réponse, venez voir mes dernières photos sur Instagram @indyanastudio.",
      followInstagramCta: "Suivre @indyanastudio",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      instagram: "INDYANASTUDIO on Instagram",
    },
    home: {
      tagline: "Photography is more than just a passion — it's a family story.",
      intro: [
        "As the daughter of a renowned Belgian photographer, I grew up surrounded by lenses, light, and captured emotions. Naturally, I followed in my father's footsteps, bringing my own sensitivity and artistic vision to the craft.",
        "My style is primarily artistic, but I remain open to exploring different fields: portrait, fashion, creative concepts, and professional projects.",
      ],
      cta: "Explore the portfolio",
      categoriesTitle: "Series",
    },
    instagramBanner: {
      title: "Follow INDYANASTUDIO on Instagram",
      text: "New photos, behind-the-scenes shoots and works in progress: it all happens on Instagram first.",
      cta: "Follow @indyanastudio",
    },
    portfolio: {
      title: "Portfolio",
      intro: "Three worlds, one standard: capturing the authenticity of the moment.",
      viewSeries: "View series",
    },
    categories: {
      concert: {
        title: "Concert",
        description: "Stages, artists and festivals — immersed in the energy of live music.",
      },
      portrait: {
        title: "Portrait",
        description: "Artistic and conceptual portraits, between light, texture and emotion.",
      },
      headshot: {
        title: "Headshot",
        description: "Clean professional headshots, crafted to reveal a presence.",
      },
    },
    about: {
      title: "About",
      paragraphs: [
        "As the daughter of a renowned Belgian photographer, I grew up surrounded by lenses, light, and captured emotions. Naturally, I followed in my father's footsteps, bringing my own sensitivity and artistic vision to the craft.",
        "For the past year, I've dedicated myself fully to photography — a world where I can express my creativity and bring emotions to life through images. My style is primarily artistic, but I remain open to exploring different fields: portrait, fashion, creative concepts, and professional projects.",
        "I began my journey in my own photo studio, a space where I can create freely, playing with light, textures, and atmosphere to tell unique visual stories. Every session is an encounter — a human and artistic experience where authenticity comes first.",
        "My goal? To capture the moment, reveal beauty in its purest form, and create images that truly reflect who you are.",
      ],
      cta: "Let's talk about your project",
    },
    contact: {
      title: "Contact",
      intro: "A project, a session, a question? Get in touch.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending…",
      success: "Thank you! Your message has been sent, I'll get back to you shortly.",
      error: "Something went wrong. Please try again or email me directly.",
      directly: "You can also email me directly at",
      phone: "Or call me at",
      followInstagram: "While you wait for my reply, come see my latest photos on Instagram @indyanastudio.",
      followInstagramCta: "Follow @indyanastudio",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
