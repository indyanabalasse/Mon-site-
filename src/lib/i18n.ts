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
    text: string;
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
  };
  categories: Record<
    CategorySlug,
    { title: string; description: string; series: Record<string, string> }
  >;
  subseries?: Partial<Record<CategorySlug, Record<string, Record<string, string>>>>;
  studio: {
    title: string;
    subtitle: string;
    highlight: string;
    equipment: { title: string; items: string[]; cta: string };
    kitchen: { title: string; text: string };
    sanitary: { text: string };
    garden: { title: string; text: string };
    closing: { cta: string };
  };
  packaging: {
    title: string;
    intro: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    formulas: {
      number: string;
      category: string;
      subcategory: string;
      title: string;
      price: string;
      unit: string;
      features: string[];
    }[];
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
      portfolio: "Explore",
      studio: "Studio",
      packaging: "Booking",
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
      title: "Suivez INDYANASTUDIO sur Instagram",
      text: "Nouvelles photos, coulisses de séances et projets en cours : tout se passe d'abord sur Instagram.",
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
          "mariage-1": "Mariage 1",
          "mariage-2": "Mariage 2",
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
      subtitle: "Location professionnelle",
      highlight:
        "Pensé pour la photographie comme pour la vidéo, ce lieu unique de 150 m² vous offre jusqu'à 5 mètres sous plafond pour donner vie à toutes vos idées créatives. Sa flexibilité s'adapte à des besoins et des budgets variés, quel que soit votre projet.",
      equipment: {
        title: "Équipement mis à disposition",
        items: [
          "Fond studio sur système à enrouleurs (papier blanc et coloris variés)",
          "Rideaux occultants permettant de moduler la lumière naturelle selon les besoins",
          "Kit d'éclairage varié : softbox, réflecteurs, flashs, pieds sur roulettes",
          "Trépied photo/vidéo",
          "Ventilateur, échelle et accessoires techniques",
          "Connexion Wi-Fi",
          "Système son (sono)",
          "Coin make-up équipé d'un miroir lumineux, pour la préparation des modèles avant le shooting",
        ],
        cta: "Réserver le studio",
      },
      kitchen: {
        title: "Espace cuisine",
        text: "Un espace cuisine entièrement équipé (cuisinière, hotte, réfrigérateur, machine à café, micro-ondes) est mis à la disposition des équipes tout au long de la journée de location. Sa grande table conviviale permet d'accueillir l'ensemble de l'équipe pour les pauses et les repas.",
      },
      sanitary: {
        text: "Toilette et douche à disposition.",
      },
      garden: {
        title: "Jardin",
        text: "Le lieu dispose également d'un accès à un jardin arboré et paisible, à l'écart de l'agitation urbaine. Cet espace extérieur — avec son grand arbre offrant une ombre naturelle et son hamac — se prête aussi bien à une pause détente qu'à des prises de vue en extérieur.",
      },
      closing: {
        cta: "Réserver le studio",
      },
    },
    packaging: {
      title: "Formules & Tarifs",
      intro: "Quatre façons de capturer votre image — du portrait épuré à l'événement privé, chaque séance est pensée, cadrée et retouchée avec soin.",
      ctaTitle: "Réservons votre séance",
      ctaText: "Disponibilités sur demande. Chaque formule peut être adaptée selon vos envies — écrivez-moi pour en discuter.",
      ctaButton: "Me contacter",
      formulas: [
        {
          number: "N°01",
          category: "Studio",
          subcategory: "Essentielle",
          title: "Formule Essentielle",
          price: "200€",
          unit: "Séance studio",
          features: [
            "Séance en studio",
            "Matériel professionnel inclus",
            "Retouches photo incluses",
            "Remise de 10 photos en noir et blanc",
          ],
        },
        {
          number: "N°02",
          category: "Studio",
          subcategory: "Créative",
          title: "Formule Créative",
          price: "300€",
          unit: "Séance studio",
          features: [
            "Séance en studio, mise en scène créative",
            "Matériel professionnel inclus",
            "Retouches photo incluses",
            "Remise de 15 photos",
          ],
        },
        {
          number: "N°03",
          category: "Studio",
          subcategory: "Grossesse",
          title: "Formule Femme Enceinte",
          price: "400€",
          unit: "Séance studio",
          features: [
            "Séance en studio dédiée grossesse",
            "Matériel professionnel inclus",
            "Retouches photo incluses",
          ],
        },
        {
          number: "N°04",
          category: "Extérieur",
          subcategory: "Événement",
          title: "Formule Événement Privé",
          price: "400€",
          unit: "Demi-journée",
          features: [
            "Couverture photo d'une demi-journée",
            "Reportage de votre événement privé",
          ],
        },
        {
          number: "N°05",
          category: "Studio",
          subcategory: "Location",
          title: "Location Studio",
          price: "Sur devis",
          unit: "Tarif communiqué par e-mail",
          features: [
            "Mise à disposition du studio pour vos propres séances",
            "Prise de rendez-vous sur demande",
          ],
        },
        {
          number: "N°06",
          category: "Événementiel",
          subcategory: "Animation",
          title: "Fun Booth",
          price: "Sur devis",
          unit: "Tarif communiqué par e-mail",
          features: [
            "Animation photo live tout au long de l'événement",
            "Décor sélectionné selon le thème de votre soirée",
            "Déguisements et accessoires pour les invités",
            "Idéal pour mariages, anniversaires, soirées d'entreprise",
          ],
        },
      ],
    },
    about: {
      title: "À propos",
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
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Explore",
      studio: "Studio",
      packaging: "Booking",
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
      title: "Follow INDYANASTUDIO on Instagram",
      text: "New photos, behind-the-scenes shoots and works in progress: it all happens on Instagram first.",
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
          "mariage-1": "Wedding 1",
          "mariage-2": "Wedding 2",
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
      subtitle: "Professional location",
      highlight:
        "Designed for both photography and video, this unique 150 m² space gives you up to 5 metres of ceiling height to bring your creative ideas to life. Its flexibility adapts to a variety of needs and budgets, whatever your project.",
      equipment: {
        title: "Equipment provided",
        items: [
          "Roller-mounted studio backdrop system (white and assorted colours)",
          "Blackout curtains to adjust natural light as needed",
          "Varied lighting kit: softbox, reflectors, flashes, wheeled stands",
          "Photo/video tripod",
          "Fan, ladder and technical accessories",
          "Wi-Fi connection",
          "Sound system",
          "Make-up corner with a lit mirror, for preparing models before the shoot",
        ],
        cta: "Book the studio",
      },
      kitchen: {
        title: "Kitchen area",
        text: "A fully equipped kitchen (cooker, extractor hood, fridge, coffee machine, microwave) is available to crews throughout the rental day. Its large, convivial table comfortably seats the whole team for breaks and meals.",
      },
      sanitary: {
        text: "Restroom and shower available.",
      },
      garden: {
        title: "Garden",
        text: "The location also gives access to a peaceful, tree-lined garden, away from the city bustle. This outdoor space — with its large shade tree and hammock — is just as suited to a relaxing break as to outdoor shots.",
      },
      closing: {
        cta: "Book the studio",
      },
    },
    packaging: {
      title: "Packages & Rates",
      intro: "Four ways to capture your image — from a clean portrait to a private event, every session is thoughtfully composed, framed and retouched.",
      ctaTitle: "Let's book your session",
      ctaText: "Availability on request. Every package can be tailored to your needs — get in touch to discuss.",
      ctaButton: "Contact me",
      formulas: [
        {
          number: "N°01",
          category: "Studio",
          subcategory: "Essential",
          title: "Essential Package",
          price: "€200",
          unit: "Studio session",
          features: [
            "Studio session",
            "Professional equipment included",
            "Photo retouching included",
            "10 black and white photos delivered",
          ],
        },
        {
          number: "N°02",
          category: "Studio",
          subcategory: "Creative",
          title: "Creative Package",
          price: "€300",
          unit: "Studio session",
          features: [
            "Studio session with creative staging",
            "Professional equipment included",
            "Photo retouching included",
            "15 photos delivered",
          ],
        },
        {
          number: "N°03",
          category: "Studio",
          subcategory: "Maternity",
          title: "Maternity Package",
          price: "€400",
          unit: "Studio session",
          features: [
            "Studio session dedicated to maternity",
            "Professional equipment included",
            "Photo retouching included",
          ],
        },
        {
          number: "N°04",
          category: "Outdoor",
          subcategory: "Event",
          title: "Private Event Package",
          price: "€400",
          unit: "Half day",
          features: [
            "Half-day photo coverage",
            "Coverage of your private event",
          ],
        },
        {
          number: "N°05",
          category: "Studio",
          subcategory: "Rental",
          title: "Studio Rental",
          price: "On request",
          unit: "Rate sent by email",
          features: [
            "Studio made available for your own sessions",
            "Booking on request",
          ],
        },
        {
          number: "N°06",
          category: "Events",
          subcategory: "Entertainment",
          title: "Fun Booth",
          price: "On request",
          unit: "Rate sent by email",
          features: [
            "Live photo animation throughout the event",
            "Backdrop chosen to match your event's theme",
            "Costumes and accessories available for guests",
            "Perfect for weddings, birthdays, corporate parties",
          ],
        },
      ],
    },
    about: {
      title: "About",
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
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
