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
    quote: string;
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
  categories: Record<
    CategorySlug,
    { title: string; description: string; series: Record<string, string> }
  >;
  subseries?: Partial<Record<CategorySlug, Record<string, Record<string, string>>>>;
  studio: {
    title: string;
    subtitle: string;
    tagline: string;
    intro: string;
    equipment: { title: string; items: string[] };
    kitchen: { title: string; text: string };
    sanitary: { text: string };
    garden: { title: string; text: string };
    closing: { title: string; text: string; note: string; cta: string };
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
      portfolio: "Portfolio",
      studio: "Studio",
      packaging: "Package",
      about: "À propos",
      contact: "Contact",
      themeToLight: "Passer en mode clair",
      themeToDark: "Passer en mode sombre",
      fullscreenEnter: "Passer en plein écran",
      fullscreenExit: "Quitter le plein écran",
      instagram: "Instagram de INDYANASTUDIO",
    },
    home: {
      quote: "Color your life !",
      cta: "Découvrir le portfolio",
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
          "my-mood": "INDY MOOD",
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
        title: "INDY MOOD",
        description: "Univers personnel et créatif, entre expérimentation et émotion.",
        series: {
          "my-mood": "INDY MOOD",
        },
      },
      "fun-photo-booth": {
        title: "Fun Photo Booth",
        description: "Ambiance déjantée et lumières colorées, pour des souvenirs pleins de fun.",
        series: {
          "fun-photo-booth": "Fun Photo Booth",
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
      title: "Studio Photo",
      subtitle: "Location professionnelle",
      tagline: "Un espace lumineux et polyvalent, pensé pour vos productions.",
      intro:
        "Aménagé sous une charpente blanche, ce studio bénéficie d'un bel apport de lumière naturelle grâce à ses multiples fenêtres de toit. Mur en briques blanchies, volumes généreux et sol carrelé clair composent un décor épuré et intemporel, adapté à tout type de production : portrait, mode, beauté, packshot ou vidéo.",
      equipment: {
        title: "Équipement mis à disposition",
        items: [
          "Fond studio sur système à enrouleurs (papier blanc et coloris variés)",
          "Rideaux occultants permettant de moduler la lumière naturelle selon les besoins",
          "Kit d'éclairage professionnel : softbox, réflecteurs, flashs, pieds sur roulettes",
          "Ventilateur, échelle et accessoires techniques",
          "Coin make-up équipé d'un miroir lumineux, pour la préparation des modèles avant le shooting",
        ],
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
        title: "Un lieu clé en main pour vos tournages",
        text: "Studio équipé, espace de restauration fonctionnel et jardin apaisant : ce lieu réunit tous les éléments nécessaires à des productions photo et vidéo dans des conditions optimales.",
        note: "Studio disponible à la location — contactez-nous pour toute demande de réservation.",
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
      ],
    },
    about: {
      title: "À propos",
      paragraphs: [
        "Fille d'un photographe de mode, j'ai grandi entourée d'objectifs, de lumière et d'émotions capturées. Tout naturellement, j'ai suivi les traces de mon père, en apportant ma propre sensibilité et ma vision artistique à ce métier.",
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
      studio: "Studio",
      packaging: "Package",
      about: "About",
      contact: "Contact",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      fullscreenEnter: "Enter fullscreen",
      fullscreenExit: "Exit fullscreen",
      instagram: "INDYANASTUDIO on Instagram",
    },
    home: {
      quote: "Color your life !",
      cta: "Explore the portfolio",
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
          "my-mood": "INDY MOOD",
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
        title: "INDY MOOD",
        description: "A personal, creative universe, between experimentation and emotion.",
        series: {
          "my-mood": "INDY MOOD",
        },
      },
      "fun-photo-booth": {
        title: "Fun Photo Booth",
        description: "Wild vibes and colorful lights, for memories full of fun.",
        series: {
          "fun-photo-booth": "Fun Photo Booth",
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
      title: "Photo Studio",
      subtitle: "Professional location",
      tagline: "A bright, versatile space, designed for your productions.",
      intro:
        "Set beneath a white timber roof structure, this studio enjoys lovely natural light through its multiple skylights. Whitewashed brick walls, generous volumes and a light tiled floor create a clean, timeless setting suited to any type of production: portrait, fashion, beauty, packshot or video.",
      equipment: {
        title: "Equipment provided",
        items: [
          "Roller-mounted studio backdrop system (white and assorted colours)",
          "Blackout curtains to adjust natural light as needed",
          "Professional lighting kit: softbox, reflectors, flashes, wheeled stands",
          "Fan, ladder and technical accessories",
          "Make-up corner with a lit mirror, for preparing models before the shoot",
        ],
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
        title: "A turnkey location for your shoots",
        text: "An equipped studio, a functional catering area and a calming garden: this location brings together everything needed for photo and video productions in optimal conditions.",
        note: "Studio available for rent — get in touch for any booking request.",
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
      ],
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
