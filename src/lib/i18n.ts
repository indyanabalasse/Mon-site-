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
    offers: {
      slug: string;
      title: string;
      tagline: string;
      cta: string;
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
    styles: { title: string; text: string }[];
    journeyTitle: string;
    journey: { title: string; text: string }[];
    criteria: string[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  offerEvenement: {
    kicker: string;
    title: string;
    intro: string;
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
      title: "Nos prestations",
      intro: "Quatre façons de travailler ensemble, une seule exigence : des images qui vous ressemblent vraiment. Trouvez l'offre qui correspond à votre projet.",
      offers: [
        {
          slug: "shooting-studio",
          title: "Shooting Studio",
          tagline: "Portrait, création ou grossesse : une séance sur mesure dans un cadre professionnel.",
          cta: "Découvrir l'offre",
        },
        {
          slug: "shooting-evenement",
          title: "Shooting Événement",
          tagline: "Mariage, anniversaire, soirée d'entreprise : votre événement raconté en images.",
          cta: "Découvrir l'offre",
        },
        {
          slug: "photobooth",
          title: "Spécial Photobooth",
          tagline: "Une animation photo live et déguisée qui rassemble vos invités toute la soirée.",
          cta: "Découvrir l'offre",
        },
        {
          slug: "location-studio",
          title: "Location Studio",
          tagline: "150 m² lumineux, entièrement équipé, à louer pour vos propres productions.",
          cta: "Découvrir le studio",
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
      title: "Une séance sur mesure, dans un cadre pensé pour vous",
      intro: "Portrait, création artistique ou grossesse : chaque séance studio est une rencontre avant d'être une photo. On prend le temps de comprendre ce que vous voulez raconter, puis on le met en lumière.",
      styles: [
        {
          title: "Essentielle",
          text: "Une séance épurée en studio, pensée pour un portrait sincère. Matériel professionnel et retouches inclus, remise de 10 photos en noir et blanc.",
        },
        {
          title: "Créative",
          text: "Une mise en scène plus affirmée, pour des images qui sortent des codes. Matériel professionnel et retouches inclus, remise de 15 photos.",
        },
        {
          title: "Femme enceinte",
          text: "Une séance dédiée à ce moment suspendu, tout en douceur. Matériel professionnel et retouches inclus.",
        },
      ],
      journeyTitle: "Votre séance, étape par étape",
      journey: [
        {
          title: "Rendez-vous découverte",
          text: "Un premier échange pour comprendre votre projet et cerner précisément vos envies.",
        },
        {
          title: "Direction artistique",
          text: "Brainstorming et création d'un moodboard sur Pinterest, pour poser ensemble l'univers visuel de la séance.",
        },
        {
          title: "Accueil sur le plateau",
          text: "Le jour J, vous êtes accueilli(e) dans un cadre pensé pour vous mettre pleinement à l'aise.",
        },
        {
          title: "Stylisme & maquillage",
          text: "Un styliste et une maquilleuse sont mis à votre disposition pour préparer chaque détail avant l'objectif.",
        },
        {
          title: "La séance",
          text: "Le shooting démarre, porté par une direction claire et une confiance installée en amont.",
        },
        {
          title: "Retouche photo",
          text: "Une fois la séance terminée, chaque image est sublimée avec soin avant de vous être livrée.",
        },
      ],
      criteria: [
        "Séance en studio, au 143 rue du Ham à Uccle",
        "Matériel professionnel et retouches toujours inclus",
        "Tarif communiqué sur devis, selon la formule choisie",
      ],
      ctaTitle: "Envie d'en discuter ?",
      ctaText: "Chaque séance est unique : on l'ajuste ensemble selon vos envies.",
      ctaButton: "Demander un devis",
    },
    offerEvenement: {
      kicker: "Shooting Événement",
      title: "Votre événement, raconté en images",
      intro: "Mariage, anniversaire, soirée d'entreprise : je me glisse dans votre événement pour en capturer l'énergie et les instants qu'on ne rejoue jamais deux fois.",
      includesTitle: "Ce qui est inclus",
      includes: [
        "Couverture photo d'une demi-journée",
        "Reportage complet de votre événement privé",
        "Livraison de photos retouchées, prêtes à partager",
      ],
      criteriaTitle: "À savoir",
      criteria: [
        "Idéal pour les mariages, anniversaires et soirées d'entreprise",
        "Durée et formule ajustables selon votre événement",
      ],
      ctaTitle: "Parlons de votre événement",
      ctaText: "Racontez-moi votre projet, on construit la formule ensemble.",
      ctaButton: "Demander un devis",
    },
    offerPhotobooth: {
      kicker: "Spécial Photobooth",
      title: "Une animation photo qui rassemble vos invités",
      intro: "Loin de la cabine fermée et des selfies figés, Fun Booth propose une expérience photo vivante, encadrée par un œil professionnel : un moment qui rassemble les invités autant qu'il immortalise la soirée.",
      includesTitle: "Ce qui est inclus",
      includes: [
        "Animation photo live tout au long de l'événement",
        "Décor sélectionné selon le thème de votre soirée",
        "Déguisements et accessoires à disposition des invités",
      ],
      criteriaTitle: "À savoir",
      criteria: ["Idéal pour mariages, anniversaires, soirées d'entreprise"],
      ctaTitle: "Envie d'un Fun Booth à votre soirée ?",
      ctaText: "Parlons de votre événement pour composer l'animation idéale.",
      ctaButton: "Demander un devis",
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
      title: "Our Services",
      intro: "Four ways to work together, one standard: images that truly look like you. Find the offer that fits your project.",
      offers: [
        {
          slug: "shooting-studio",
          title: "Studio Shoot",
          tagline: "Portrait, creative or maternity: a tailored session in a professional setting.",
          cta: "Discover the offer",
        },
        {
          slug: "shooting-evenement",
          title: "Event Shoot",
          tagline: "Wedding, birthday, corporate party: your event told in images.",
          cta: "Discover the offer",
        },
        {
          slug: "photobooth",
          title: "Photo Booth Special",
          tagline: "A live, costume-filled photo animation that brings your guests together all night.",
          cta: "Discover the offer",
        },
        {
          slug: "location-studio",
          title: "Studio Rental",
          tagline: "150 m² of bright, fully equipped space to rent for your own productions.",
          cta: "Discover the studio",
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
      title: "A tailored session, in a space designed for you",
      intro: "Portrait, creative concept or maternity: every studio session is an encounter before it's a photo. We take the time to understand what you want to tell, then bring it to light.",
      styles: [
        {
          title: "Essential",
          text: "A clean studio session, built for a sincere portrait. Professional equipment and retouching included, 10 black and white photos delivered.",
        },
        {
          title: "Creative",
          text: "A bolder staging, for images that step outside the usual codes. Professional equipment and retouching included, 15 photos delivered.",
        },
        {
          title: "Maternity",
          text: "A gentle session dedicated to this suspended moment. Professional equipment and retouching included.",
        },
      ],
      journeyTitle: "Your session, step by step",
      journey: [
        {
          title: "Discovery meeting",
          text: "A first conversation to understand your project and pin down exactly what you're after.",
        },
        {
          title: "Creative direction",
          text: "Brainstorming and building a Pinterest moodboard together, to set the visual direction of the session.",
        },
        {
          title: "Welcome on set",
          text: "On the day, you're welcomed into a space designed to put you fully at ease.",
        },
        {
          title: "Styling & make-up",
          text: "A stylist and make-up artist are on hand to prepare every detail before the camera.",
        },
        {
          title: "The shoot",
          text: "The session begins, carried by a clear direction and the trust built beforehand.",
        },
        {
          title: "Retouching",
          text: "Once the session wraps, every image is carefully refined before it's delivered to you.",
        },
      ],
      criteria: [
        "Studio session at 143 rue du Ham, Uccle",
        "Professional equipment and retouching always included",
        "Rate quoted on request, depending on the package",
      ],
      ctaTitle: "Want to talk it through?",
      ctaText: "Every session is unique: we shape it together around what you want.",
      ctaButton: "Request a quote",
    },
    offerEvenement: {
      kicker: "Event Shoot",
      title: "Your event, told in images",
      intro: "Wedding, birthday, corporate party: I slip into your event to capture its energy and the moments that only happen once.",
      includesTitle: "What's included",
      includes: [
        "Half-day photo coverage",
        "Full coverage of your private event",
        "Retouched photos delivered, ready to share",
      ],
      criteriaTitle: "Good to know",
      criteria: [
        "Perfect for weddings, birthdays and corporate parties",
        "Duration and package adjustable to your event",
      ],
      ctaTitle: "Let's talk about your event",
      ctaText: "Tell me about your project and we'll build the right package together.",
      ctaButton: "Request a quote",
    },
    offerPhotobooth: {
      kicker: "Photo Booth Special",
      title: "A photo animation that brings your guests together",
      intro: "Far from the closed booth and stiff selfies, Fun Booth offers a living photo experience guided by a professional eye: a moment that brings guests together as much as it captures the night.",
      includesTitle: "What's included",
      includes: [
        "Live photo animation throughout the event",
        "Backdrop chosen to match your event's theme",
        "Costumes and accessories available for guests",
      ],
      criteriaTitle: "Good to know",
      criteria: ["Perfect for weddings, birthdays, corporate parties"],
      ctaTitle: "Want a Fun Booth at your party?",
      ctaText: "Let's talk about your event to put together the ideal animation.",
      ctaButton: "Request a quote",
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
