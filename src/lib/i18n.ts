import type { CategorySlug } from "@/data/portfolio";

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
    studio: string;
    packaging: string;
    about: string;
    contact: string;
    themeToLight: string;
    themeToDark: string;
    fullscreenEnter: string;
    fullscreenExit: string;
    instagram: string;
  };
  home: {
    cta: string;
  };
  instagramBanner: {
    title: string;
    cta: string;
  };
  portfolio: {
    title: string;
    intro: string;
    viewSeries: string;
  };
  gallery: {
    nextKicker: string;
    bookCta: string;
    backToCategory: string;
    back: string;
  };
  categories: Record<
    CategorySlug,
    { title: string; description: string; series: Record<string, string> }
  >;
  subseries?: Partial<Record<CategorySlug, Record<string, Record<string, string>>>>;
  studio: {
    title: string;
    highlight: string;
    equipment: { title: string; items: string[]; cta: string };
    amenities: {
      title: string;
      items: { title: string; text: string }[];
    };
    closing: { cta: string };
  };
  packaging: {
    title: string;
    intro: string;
    offers: {
      slug: string;
      title: string;
      tagline: string;
    }[];
    gift: {
      title: string;
      text: string;
      cta: string;
    };
  };
  offerStudio: {
    kicker: string;
    title: string;
    intro: string;
    viewShootsCta: string;
    bookNowCta: string;
    packagesTitle: string;
    packages: { title: string; photos: string; price: string }[];
    processLabel: string;
    process: string[];
    addonsLabel: string;
    addons: { title: string; text: string }[];
    ctaTitle: string;
    ctaButton: string;
  };
  offerEvenement: {
    kicker: string;
    title: string;
    intro: string;
    viewSeriesCta: string;
    includesTitle: string;
    includes: string[];
    criteriaTitle: string;
    criteria: string[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  offerPhotobooth: {
    kicker: string;
    title: string;
    intro: string;
    viewSeriesCta: string;
    includesTitle: string;
    includes: string[];
    criteriaTitle: string;
    criteria: string[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
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
    newsletterOptIn: string;
  };
  footer: {
    rights: string;
  };
  newsletter: {
    heading: string;
    intro: string;
    emailPlaceholder: string;
    submitCta: string;
    consent: string;
    successMessage: string;
    alreadySubscribedOrGenericSuccess: string;
    errorMessage: string;
    confirmedTitle: string;
    confirmedBody: string;
    unsubscribedTitle: string;
    unsubscribedBody: string;
    confirmEmailSubject: string;
    confirmEmailHeading: string;
    confirmEmailBody: string;
    confirmEmailCta: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      portfolio: "Explore",
      studio: "Studio",
      packaging: "Prestations",
      about: "À propos",
      contact: "Contact",
      themeToLight: "Passer en mode clair",
      themeToDark: "Passer en mode sombre",
      fullscreenEnter: "Passer en plein écran",
      fullscreenExit: "Quitter le plein écran",
      instagram: "Instagram de INDYANASTUDIO",
    },
    home: {
      cta: "Explore",
    },
    instagramBanner: {
      title: "Suivez-moi en coulisse sur mon Insta",
      cta: "Suivre @indyanastudio",
    },
    portfolio: {
      title: "Portfolio",
      intro: "Trois univers, une même exigence : capturer l'authenticité de l'instant.",
      viewSeries: "Voir la série",
    },
    gallery: {
      nextKicker: "Découvrir la série suivante",
      bookCta: "Réserver votre shooting",
      backToCategory: "Retour à la catégorie",
      back: "Retour",
    },
    categories: {
      evenementiel: {
        title: "Événementiel",
        description: "Concerts, scènes et festivals — immersion dans l'énergie du live.",
        series: {
          concert: "Concert",
          "open-air": "Open Air",
          festival: "Festival",
          anniversaire: "Anniversaire",
        },
      },
      portrait: {
        title: "Portrait",
        description: "Portraits artistiques et conceptuels, entre lumière, matière et émotion.",
        series: {
          "laura-degreef": "Laura Degreef",
          wolfgang: "Wolfgang",
          herton: "Herton",
          arty: "Arty",
          "my-mood": "INDY LAB",
          "didier-vdb": "Didier VDB",
          esphan: "Esphan",
        },
      },
      corporate: {
        title: "Corporate",
        description: "Photographie d'entreprise : équipes, événements et portraits professionnels.",
        series: {
          "ma-vie": "Ma Vie",
          "esg-logic": "ESG Logic",
        },
      },
      sante: {
        title: "Santé",
        description: "Entraînement, préparation physique et kinésithérapie sportive en action.",
        series: {
          kine: "Kinésithérapie",
        },
      },
      famille: {
        title: "Famille",
        description: "Moments de vie en famille, entre tendresse et authenticité.",
        series: {
          "femme-enceinte": "Femme enceinte",
        },
      },
      "my-mood": {
        title: "INDY LAB",
        description: "Univers personnel et créatif, entre expérimentation et émotion.",
        series: {
          "my-mood": "INDY LAB",
        },
      },
      "fun-photo-booth": {
        title: "Fun Photo Booth",
        description: "Un photobooth pas comme les autres : c'est moi qui prends les photos en direct, tout au long de votre événement. Le décor est sélectionné en amont pour s'accorder au thème de votre soirée, et chaque invité peut choisir un déguisement ou un accessoire pour une touche spontanée et ludique. Loin de la cabine fermée et des selfies figés, Fun Booth propose une expérience photo vivante, encadrée par un œil professionnel — un moment qui rassemble les invités autant qu'il immortalise la soirée.",
        series: {
          "mariage-1": "Mariage J & A",
          "mariage-2": "Mariage J & M",
        },
      },
      "press-kit": {
        title: "Press Kit",
        description: "Visuels promotionnels pour événements et soirées.",
        series: {
          "press-kit": "Press Kit",
        },
      },
    },
    subseries: {
      portrait: {
        "laura-degreef": {
          "shoot-1": "Shoot 1",
          "shoot-2": "Shoot 2",
        },
      },
    },
    studio: {
      title: "INDY Studio",
      highlight:
        "Pensé pour la photographie comme pour la vidéo, ce lieu unique de 150 m² vous offre jusqu'à 5 mètres sous plafond pour donner vie à toutes vos idées créatives. Sa flexibilité s'adapte à des besoins et des budgets variés, quel que soit votre projet.",
      equipment: {
        title: "Équipement mis à disposition",
        items: [
          "Fond studio trois mètres ou mur brique, papier blanc et coloris variés",
          "Lumière naturelle réglable",
          "Kit éclairages : softbox, réflecteurs, flashs, pieds sur roulettes",
          "Trépieds photo/vidéo",
          "Wi-Fi",
          "Sono",
          "Coin make-up",
        ],
        cta: "Discutons de votre projet",
      },
      amenities: {
        title: "Commodités",
        items: [
          {
            title: "Jardin",
            text: "Pour des prises de vue en extérieur.",
          },
          {
            title: "Cuisine",
            text: "Full équipée, avec salle à manger.",
          },
          {
            title: "Sanitaire",
            text: "Toilette et douche.",
          },
        ],
      },
      closing: {
        cta: "Discutons de votre projet",
      },
    },
    packaging: {
      title: "Prestations",
      intro: "Quatre façons de travailler ensemble, une seule exigence : des images qui vous ressemblent vraiment. Trouvez l'offre qui correspond à votre projet.",
      offers: [
        {
          slug: "shooting-studio",
          title: "Shooting Studio",
          tagline: "",
        },
        {
          slug: "shooting-evenement",
          title: "Shooting Événement",
          tagline: "",
        },
        {
          slug: "photobooth",
          title: "Spécial Photobooth",
          tagline: "",
        },
        {
          slug: "location-studio",
          title: "Location Studio",
          tagline: "Studio mis à disposition : choisissez votre formule, on s'occupe du reste.",
        },
      ],
      gift: {
        title: "Offrir un shooting",
        text: "Le plus beau des cadeaux : un moment rien que pour soi, immortalisé avec soin. Écrivez-moi pour composer un bon cadeau sur mesure.",
        cta: "Offrir un shooting",
      },
    },
    offerStudio: {
      kicker: "Shooting Studio",
      title: "Prise de vue",
      intro: "Séance en studio. Matériel et commodités inclus.",
      viewShootsCta: "Voir les shootings",
      bookNowCta: "Discutons de votre projet",
      packagesTitle: "Nos formules",
      packages: [
        {
          title: "Demi-journée",
          photos: "5 photos livrées",
          price: "350 €",
        },
        {
          title: "Journée complète",
          photos: "12 photos livrées",
          price: "475 €",
        },
      ],
      processLabel: "Le déroulé",
      process: [
        "Briefing & direction artistique",
        "Set-up studio & lumière",
        "Prise de vue",
        "Post-production",
      ],
      addonsLabel: "En option",
      addons: [
        {
          title: "Stylisme",
          text: "Composer la tenue idéale avant la séance.",
        },
        {
          title: "Maquillage",
          text: "Peau et look préparés pour l'objectif.",
        },
      ],
      ctaTitle: "Prêt(e) à réserver ?",
      ctaButton: "Discutons de votre projet",
    },
    offerEvenement: {
      kicker: "Shooting Événement",
      title: "Mariage, anniversaire, festival, entreprise",
      intro: "Reportage photo de votre événement, du début à la fin.",
      viewSeriesCta: "Voir mes événements",
      includesTitle: "Ce qui est inclus",
      includes: [
        "Couverture en demi-journée ou journée complète",
        "Photos retouchées, livrées rapidement",
      ],
      criteriaTitle: "À savoir",
      criteria: ["Durée et formule ajustables selon votre événement"],
      ctaTitle: "Parlons de votre événement",
      ctaText: "Racontez-moi votre projet, on construit la formule ensemble.",
      ctaButton: "Discutons de votre projet",
    },
    offerPhotobooth: {
      kicker: "Spécial Photobooth",
      title: "Animation photo live",
      intro: "Encadrée par un professionnel, du début à la fin de votre soirée.",
      viewSeriesCta: "Voir mes photobooths",
      includesTitle: "Ce qui est inclus",
      includes: [
        "Décor sélectionné selon le thème de votre soirée",
        "Déguisements et accessoires à disposition des invités",
      ],
      criteriaTitle: "À savoir",
      criteria: ["Idéal pour mariages, anniversaires, soirées d'entreprise"],
      ctaTitle: "Envie d'un Fun Booth à votre soirée ?",
      ctaText: "Parlons de votre événement pour composer l'animation idéale.",
      ctaButton: "Discutons de votre projet",
    },
    about: {
      title: "Indyana Balasse",
      paragraphs: [
        "Derrière chaque image, il y a une rencontre. Une photographie ne commence jamais au déclencheur. Elle commence bien avant. Dans un regard, une conversation, un éclat de rire. C'est là que tout commence.",
        "J'ai grandi dans un studio photo. Mais j'ai trouvé ma propre lumière. Mon père est photographe. J'ai grandi entourée d'appareils, de décors et de créativité. J'ai gardé l'exigence, mais j'ai construit un monde qui m'appartient : plus libre, plus coloré, parfois hors des codes.",
        "Avant de parler photo, je cherche à comprendre la personne devant moi. Mon objectif est simple : te faire oublier l'appareil. Créer un espace où tu peux être pleinement toi, sans rôle à jouer. Et c'est souvent là que les images deviennent vraies.",
        "J'aime créer des univers. Parfois minimalistes, parfois audacieux. Mais toujours pensés pour raconter quelque chose de sincère…",
        "Portrait, corporate, maternité, book, festival ou photobooth immersif : Ce qui compte, c'est l'émotion qui reste.",
        "Si je pouvais te laisser une seule chose, ce ne serait pas seulement de belles photos. Ce serait le souvenir d'un moment où tu t'es senti pleinement toi-même. Parce qu'au fond, la photo n'est qu'un prétexte. Ce qui m'intéresse, ce sont les personnes.",
        "Et maintenant, racontons ton histoire. Si tu as une idée, une envie ou une intuition, écrivons-la ensemble.",
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
      newsletterOptIn: "M'inscrire aussi à la newsletter",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
    newsletter: {
      heading: "La newsletter",
      intro:
        "De temps en temps, un mot sur une nouvelle série, un shooting ou une actualité du studio. Rien de plus.",
      emailPlaceholder: "Votre email",
      submitCta: "S'inscrire",
      consent:
        "En vous inscrivant, vous acceptez de recevoir occasionnellement des nouvelles d'INDYANASTUDIO. Désabonnement possible à tout moment via le lien présent dans chaque email.",
      successMessage:
        "Presque terminé : vérifiez votre boîte mail et cliquez sur le lien de confirmation pour finaliser votre inscription.",
      alreadySubscribedOrGenericSuccess:
        "Si cette adresse n'est pas déjà inscrite, un email de confirmation vient de vous être envoyé.",
      errorMessage: "Une erreur est survenue. Réessayez dans quelques instants.",
      confirmedTitle: "Inscription confirmée",
      confirmedBody:
        "Votre adresse est bien enregistrée. Vous recevrez de temps en temps des nouvelles d'INDYANASTUDIO.",
      unsubscribedTitle: "Désabonnement effectué",
      unsubscribedBody:
        "Votre adresse a été retirée de la liste. Vous ne recevrez plus d'emails d'INDYANASTUDIO.",
      confirmEmailSubject: "Confirmez votre inscription à la newsletter",
      confirmEmailHeading: "Confirmez votre inscription",
      confirmEmailBody:
        "Cliquez sur le bouton ci-dessous pour confirmer votre inscription à la newsletter d'INDYANASTUDIO. Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.",
      confirmEmailCta: "Confirmer mon inscription",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Explore",
      studio: "Studio",
      packaging: "Services",
      about: "About",
      contact: "Contact",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      fullscreenEnter: "Enter fullscreen",
      fullscreenExit: "Exit fullscreen",
      instagram: "INDYANASTUDIO on Instagram",
    },
    home: {
      cta: "Explore",
    },
    instagramBanner: {
      title: "Follow along behind the scenes on my Insta",
      cta: "Follow @indyanastudio",
    },
    portfolio: {
      title: "Portfolio",
      intro: "Three worlds, one standard: capturing the authenticity of the moment.",
      viewSeries: "View series",
    },
    gallery: {
      nextKicker: "Discover the next series",
      bookCta: "Book your shoot",
      backToCategory: "Back to category",
      back: "Back",
    },
    categories: {
      evenementiel: {
        title: "Events",
        description: "Concerts, stages and festivals — immersed in the energy of live music.",
        series: {
          concert: "Concert",
          "open-air": "Open Air",
          festival: "Festival",
          anniversaire: "Birthday",
        },
      },
      portrait: {
        title: "Portrait",
        description: "Artistic and conceptual portraits, between light, texture and emotion.",
        series: {
          "laura-degreef": "Laura Degreef",
          wolfgang: "Wolfgang",
          herton: "Herton",
          arty: "Arty",
          "my-mood": "INDY LAB",
          "didier-vdb": "Didier VDB",
          esphan: "Esphan",
        },
      },
      corporate: {
        title: "Corporate",
        description: "Corporate photography: teams, events and professional portraits.",
        series: {
          "ma-vie": "Ma Vie",
          "esg-logic": "ESG Logic",
        },
      },
      sante: {
        title: "Health",
        description: "Training, athletic performance and sports physiotherapy in action.",
        series: {
          kine: "Physiotherapy",
        },
      },
      famille: {
        title: "Family",
        description: "Family life moments, between tenderness and authenticity.",
        series: {
          "femme-enceinte": "Maternity",
        },
      },
      "my-mood": {
        title: "INDY LAB",
        description: "A personal, creative universe, between experimentation and emotion.",
        series: {
          "my-mood": "INDY LAB",
        },
      },
      "fun-photo-booth": {
        title: "Fun Photo Booth",
        description: "A photo booth like no other: I take the photos live, throughout your event. The backdrop is chosen in advance to match your evening's theme, and each guest can pick a costume or accessory for a spontaneous, playful touch. Far from the closed booth and stiff selfies, Fun Booth offers a living photo experience guided by a professional eye — a moment that brings guests together as much as it captures the night.",
        series: {
          "mariage-1": "Wedding J & A",
          "mariage-2": "Wedding J & M",
        },
      },
      "press-kit": {
        title: "Press Kit",
        description: "Promotional visuals for events and parties.",
        series: {
          "press-kit": "Press Kit",
        },
      },
    },
    subseries: {
      portrait: {
        "laura-degreef": {
          "shoot-1": "Shoot 1",
          "shoot-2": "Shoot 2",
        },
      },
    },
    studio: {
      title: "INDY Studio",
      highlight:
        "Designed for both photography and video, this unique 150 m² space gives you up to 5 metres of ceiling height to bring your creative ideas to life. Its flexibility adapts to a variety of needs and budgets, whatever your project.",
      equipment: {
        title: "Equipment provided",
        items: [
          "3-metre backdrop or brick wall, white paper and assorted colours",
          "Adjustable natural light",
          "Lighting kit: softbox, reflectors, flashes, wheeled stands",
          "Photo/video tripods",
          "Wi-Fi",
          "Sound system",
          "Make-up corner",
        ],
        cta: "Let's talk about your project",
      },
      amenities: {
        title: "Amenities",
        items: [
          {
            title: "Garden",
            text: "Ideal for outdoor shots.",
          },
          {
            title: "Kitchen",
            text: "Equipped kitchen, with dining area.",
          },
          {
            title: "Restroom & shower",
            text: "Restroom and shower.",
          },
        ],
      },
      closing: {
        cta: "Let's talk about your project",
      },
    },
    packaging: {
      title: "Services",
      intro: "Four ways to work together, one standard: images that truly look like you. Find the offer that fits your project.",
      offers: [
        {
          slug: "shooting-studio",
          title: "Studio Shoot",
          tagline: "",
        },
        {
          slug: "shooting-evenement",
          title: "Event Shoot",
          tagline: "",
        },
        {
          slug: "photobooth",
          title: "Photo Booth Special",
          tagline: "",
        },
        {
          slug: "location-studio",
          title: "Studio Rental",
          tagline: "Studio available to hire: choose your package, we take care of the rest.",
        },
      ],
      gift: {
        title: "Gift a shoot",
        text: "The most beautiful gift: a moment just for you, carefully captured. Get in touch to put together a tailor-made gift voucher.",
        cta: "Gift a shoot",
      },
    },
    offerStudio: {
      kicker: "Studio Shoot",
      title: "Photo Shoot",
      intro: "Studio session. Equipment and amenities included.",
      viewShootsCta: "View the shoots",
      bookNowCta: "Let's talk about your project",
      packagesTitle: "Our packages",
      packages: [
        {
          title: "Half day",
          photos: "5 photos delivered",
          price: "€350",
        },
        {
          title: "Full day",
          photos: "12 photos delivered",
          price: "€475",
        },
      ],
      processLabel: "How it works",
      process: [
        "Briefing & creative direction",
        "Studio & lighting set-up",
        "The shoot",
        "Post-production",
      ],
      addonsLabel: "Add-ons",
      addons: [
        {
          title: "Styling",
          text: "Putting together the perfect outfit before the session.",
        },
        {
          title: "Make-up",
          text: "Skin and look prepped for the camera.",
        },
      ],
      ctaTitle: "Ready to book?",
      ctaButton: "Let's talk about your project",
    },
    offerEvenement: {
      kicker: "Event Shoot",
      title: "Wedding, birthday, festival, corporate",
      intro: "Photo coverage of your event, start to finish.",
      viewSeriesCta: "View my events",
      includesTitle: "What's included",
      includes: [
        "Half-day or full-day coverage",
        "Retouched photos, delivered fast",
      ],
      criteriaTitle: "Good to know",
      criteria: ["Duration and package adjustable to your event"],
      ctaTitle: "Let's talk about your event",
      ctaText: "Tell me about your project and we'll build the right package together.",
      ctaButton: "Let's talk about your project",
    },
    offerPhotobooth: {
      kicker: "Photo Booth Special",
      title: "Live photo animation",
      intro: "Guided by a professional, start to finish of your party.",
      viewSeriesCta: "View my photo booths",
      includesTitle: "What's included",
      includes: [
        "Backdrop chosen to match your event's theme",
        "Costumes and accessories available for guests",
      ],
      criteriaTitle: "Good to know",
      criteria: ["Perfect for weddings, birthdays, corporate parties"],
      ctaTitle: "Want a Fun Booth at your party?",
      ctaText: "Let's talk about your event to put together the ideal animation.",
      ctaButton: "Let's talk about your project",
    },
    about: {
      title: "Indyana Balasse",
      paragraphs: [
        "Behind every image, there's an encounter. A photograph never begins at the shutter click. It begins long before. In a look, a conversation, a burst of laughter. That's where it all starts.",
        "I grew up in a photo studio. But I found my own light. My father is a photographer. I grew up surrounded by cameras, sets and creativity. I kept the rigour, but built a world of my own: freer, more colourful, sometimes off the beaten path.",
        "Before talking about photography, I try to understand the person in front of me. My goal is simple: make you forget the camera. Create a space where you can be fully yourself, with no role to play. That's often where images become real.",
        "I love creating worlds. Sometimes minimal, sometimes bold. But always meant to tell something sincere…",
        "Portrait, corporate, maternity, book, festival or immersive photo booth: what matters is the emotion that stays.",
        "If I could leave you with just one thing, it wouldn't only be beautiful photos. It would be the memory of a moment when you felt fully yourself. Because deep down, the photo is just a pretext. What interests me are the people.",
        "And now, let's tell your story. If you have an idea, a desire or a hunch, let's write it together.",
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
      newsletterOptIn: "Also subscribe me to the newsletter",
    },
    footer: {
      rights: "All rights reserved.",
    },
    newsletter: {
      heading: "The newsletter",
      intro:
        "Every once in a while, a note about a new series, a shoot, or studio news. Nothing more.",
      emailPlaceholder: "Your email",
      submitCta: "Subscribe",
      consent:
        "By signing up, you agree to occasionally receive news from INDYANASTUDIO. You can unsubscribe at any time via the link in every email.",
      successMessage:
        "Almost there: check your inbox and click the confirmation link to complete your subscription.",
      alreadySubscribedOrGenericSuccess:
        "If this address isn't already subscribed, a confirmation email has just been sent to you.",
      errorMessage: "Something went wrong. Please try again in a moment.",
      confirmedTitle: "Subscription confirmed",
      confirmedBody: "Your address is now on the list. You'll hear from INDYANASTUDIO from time to time.",
      unsubscribedTitle: "Unsubscribed",
      unsubscribedBody: "Your address has been removed from the list. You won't receive emails from INDYANASTUDIO anymore.",
      confirmEmailSubject: "Confirm your newsletter subscription",
      confirmEmailHeading: "Confirm your subscription",
      confirmEmailBody:
        "Click the button below to confirm your subscription to the INDYANASTUDIO newsletter. If you didn't request this, just ignore this email.",
      confirmEmailCta: "Confirm my subscription",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
