import type { Dictionary } from "./dictionaries";

const fr: Dictionary = {
  meta: {
    title: "RAPIDOSS DELIVERY — Simplement. Rapidement. Livré chez vous.",
    description:
      "Livraison rapide, fiable et humaine partout en Tunisie : ramassages, livraison 24h sur le Grand Tunis, gestion des paiements et accompagnement marketing. Plus qu'une société, une famille.",
  },

  nav: {
    services: "Services",
    engagements: "Engagements",
    about: "À propos",
    marketing: "Marketing",
    track: "Suivi",
    devis: "Devis",
    becomeCourier: "Devenir livreur",
    login: "Se connecter",
    tagline: "Rapide. Fiable. Humain. — Tunis",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Accueil RAPIDOSS",
  },

  hero: {
    status: "Dispatch en ligne — livreurs en tournée sur le Grand Tunis",
    line1: "SIMPLEMENT.",
    line2: "RAPIDEMENT.",
    line3: "LIVRÉ CHEZ VOUS.",
    lede: "Des colis livrés rapidement, avec fiabilité et une touche humaine. Du ramassage à votre porte jusqu'à l'argent sur votre compte, RAPIDOSS rend chaque livraison transparente et sécurisée — pour vous et vos clients.",
    ctaClient: "Devenir client",
    ctaCourier: "Devenir livreur",
    scroll: "Défiler",
  },

  marquee: [
    "RAMASSAGES",
    "LIVRAISON 24H",
    "GESTION DES PAIEMENTS",
    "ACCOMPAGNEMENT MARKETING",
    "SUIVI EN DIRECT",
    "GRAND TUNIS & AU-DELÀ",
  ],

  services: {
    id: "services",
    kicker: "Nos services",
    heading1: "Tout ce qu'il y a entre",
    heading2: "vendu et livré",
    cta: "Commencer",
    cards: [
      {
        index: "01",
        name: "Pickups",
        desc: "Collecte rapide de vos marchandises à votre porte, atelier ou dépôt. Vos colis sont scannés sur votre seuil — la traçabilité commence au mètre zéro.",
        spec: "À VOTRE PORTE · SCANNÉ AU RAMASSAGE",
      },
      {
        index: "02",
        name: "Livraison",
        desc: "Expédition sécurisée avec suivi en temps réel, livrée en 24 heures sur le Grand Tunis et 48 heures partout dans le pays.",
        spec: "24H GRAND TUNIS · 48H NATIONAL",
      },
      {
        index: "03",
        name: "Paiement",
        desc: "Gestion simplifiée des transactions : on encaisse le paiement à la livraison, on rapproche chaque dinar et on vous vire votre argent à un rythme régulier.",
        spec: "PAIEMENT À LA LIVRAISON · RELEVÉS PROPRES",
      },
      {
        index: "04",
        name: "Marketing",
        desc: "Des solutions de visibilité et de croissance pour votre marque — des conseils personnalisés d'une équipe qui observe des milliers de livraisons par jour.",
        spec: "CONSEIL · STRATÉGIE · SUPPORT",
      },
    ],
  },

  engagements: {
    id: "engagements",
    kicker: "Nos engagements",
    heading: "Trois promesses, zéro astérisque",
    items: [
      {
        n: "A",
        title: "Plateforme simple & efficace",
        body: "Une solution adaptée à votre activité avec une traçabilité totale — chaque colis, chaque scan, chaque statut visible en temps réel.",
      },
      {
        n: "B",
        title: "Délai garanti",
        body: "Un délai garanti de livraison de 24 heures sur le Grand Tunis. Garanti veut dire garanti — pas « en général ».",
      },
      {
        n: "C",
        title: "Livraison sécurisée",
        body: "Une sécurité maximale pour vos colis et les données de vos clients, du premier scan jusqu'à la signature à la porte.",
      },
    ],
  },

  about: {
    id: "apropos",
    kicker: "À propos",
    heading1: "Plus qu'une société,",
    heading2: "une famille !",
    body: "On ne se voit pas comme un prestataire. Quand vous rejoignez RAPIDOSS, vos livraisons deviennent notre responsabilité, vos clients deviennent nos clients, et vos problèmes se règlent avant de devenir les vôtres.",
    messages: [
      "VOTRE PROJET DEVIENT NOTRE PROJET",
      "NOS ÉQUIPES TRAVAILLENT COMME SI VOTRE BUSINESS ÉTAIT LE LEUR",
      "VOTRE RÉUSSITE = NOTRE SUCCÈS",
    ],
    cta: "Commencer",
  },

  marketing: {
    id: "marketing",
    kicker: "Aller plus loin",
    heading1: "Accompagnement",
    heading2: "marketing",
    body: "La livraison, c'est le moment où votre client rencontre enfin votre marque. On vous aide à en faire un moment qui compte.",
    items: [
      {
        n: "01",
        title: "Conseils marketing personnalisés",
        body: "Des recommandations concrètes basées sur ce qu'on voit chaque jour à des milliers de portes — emballage, timing, relance.",
      },
      {
        n: "02",
        title: "Suivi stratégique pour améliorer vos ventes",
        body: "On suit avec vous vos taux de refus et de retour et on les transforme en plan d'action, mois après mois.",
      },
      {
        n: "03",
        title: "Support continu pour optimiser votre présence en ligne",
        body: "Un accompagnement permanent pour optimiser votre boutique, vos offres et votre communication client.",
      },
    ],
  },

  stats: {
    kicker: "Les chiffres",
    heading: "Pourquoi +150 expéditeurs nous font confiance",
    items: [
      { value: 24, suffix: "H", prefix: "", label: "Livraison assurée en moins de 24 heures sur le Grand Tunis" },
      { value: 150, suffix: "", prefix: "+", label: "Plus de 150 entreprises et particuliers nous font confiance" },
      { value: 92, suffix: "%", prefix: "", label: "Taux de livraison — un indicateur de fiabilité exceptionnel" },
    ],
  },

  partners: {
    kicker: "Ils livrent avec nous",
    names: [
      "MODA.TN",
      "ELECTROZONE",
      "BLEDI STORE",
      "NOOR COSMETICS",
      "MEDINA CRAFT",
      "CACTUS SHOP",
      "ZITOUNA KIDS",
      "VELOCE",
    ],
  },

  teaser: {
    kicker: "Suivre mon colis",
    heading: "Il est où, là, maintenant ?",
    body: "Saisissez votre numéro de suivi et regardez le trajet se rejouer — préparation, ramassage, livraison, et tout ce qu'il y a entre.",
  },

  devis: {
    id: "devis",
    kicker: "Commencer à livrer ?",
    heading1: "Devenir",
    heading2: "client",
    lede: "Dites-nous qui vous êtes et ce que vous expédiez. Le dispatch vous répond sous 48 heures — souvent bien plus vite.",
    nextSteps: [
      ["T+0H", "Votre demande arrive au dispatch — pas dans une file CRM."],
      ["T+24H", "On vous appelle pour comprendre vos produits, volumes et besoins de paiement."],
      ["T+48H", "Compte ouvert, tarifs convenus, premier ramassage au calendrier."],
    ],
    urgentKicker: "Colis urgent ?",
    urgentBody: "Sautez le formulaire. Le dispatch répond tous les jours de la semaine.",
    phone: "+216 96 000 123",
    form: {
      name: "Nom complet",
      namePlaceholder: "Ahmed Ben Salah",
      email: "Email",
      emailPlaceholder: "contact@votreboutique.tn",
      phone: "Téléphone",
      phonePlaceholder: "96 000 123",
      ville: "Ville",
      villePlaceholder: "Sélectionnez votre ville",
      message: "Votre message",
      messageOptional: "(facultatif)",
      messagePlaceholder: "Produits, volumes, destinations, galères actuelles avec la livraison…",
      submit: "Envoyer ma demande →",
      sending: "Transmission",
      errors: {
        name: "Nom complet requis",
        email: "Email valide requis",
        phone: "Numéro de téléphone valide requis (8 chiffres)",
        ville: "Sélectionnez votre ville",
      },
      successTitle: "Demande enregistrée",
      successBody1: "Référence",
      successBody2: ". Le dispatch revient vers vous sous 48 heures.",
      successNote: "// Formulaire de démo — rien n'a réellement été envoyé",
    },
  },

  villes: [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Bizerte",
    "Béja", "Jendouba", "Le Kef", "Siliana", "Zaghouan", "Sousse",
    "Monastir", "Mahdia", "Kairouan", "Kasserine", "Sidi Bouzid", "Sfax",
    "Gabès", "Médenine", "Tataouine", "Gafsa", "Tozeur", "Kébili",
  ],

  courierPage: {
    meta: {
      title: "Devenir livreur — RAPIDOSS",
      description:
        "Rejoignez la flotte RAPIDOSS : remplissez le formulaire livreur et roulez avec une équipe qui vous traite comme une famille.",
    },
    index: "05",
    kicker: "Rejoindre la flotte",
    title: "FORMULAIRE LIVREUR",
    lede: "Veuillez remplir le formulaire pour devenir livreur. Des tournées régulières, une paie hebdomadaire, un dispatch qui répond — et du respect pour ceux qui font les kilomètres.",
    perks: [
      ["TOURNÉES", "Régulières, planifiées la veille au soir"],
      ["PAIE", "Hebdomadaire, tarifs à l'arrêt transparents"],
      ["ÉQUIPEMENT", "App, scanner et kit aux couleurs fournis"],
      ["SOUTIEN", "Un dispatcheur au bout du fil 7J/7"],
    ],
    form: {
      name: "Nom complet",
      namePlaceholder: "Mohamed Trabelsi",
      phone: "Téléphone",
      phonePlaceholder: "98 803 600",
      email: "Email",
      emailPlaceholder: "vous@mail.tn",
      ville: "Ville",
      villePlaceholder: "Sélectionnez votre ville",
      vehicle: "Véhicule",
      vehicleOptions: ["Moto", "Voiture", "Camionnette", "Pas encore de véhicule"],
      availability: "Disponibilité",
      availabilityOptions: ["Temps plein", "Temps partiel", "Week-ends"],
      submit: "Envoyer →",
      sending: "Transmission",
      errors: {
        name: "Nom complet requis",
        phone: "Numéro de téléphone valide requis (8 chiffres)",
        email: "Email valide requis",
        ville: "Sélectionnez votre ville",
        vehicle: "Choisissez un véhicule",
        availability: "Choisissez votre disponibilité",
      },
      successTitle: "Candidature reçue",
      successBody1: "Référence",
      successBody2: ". L'équipe flotte vous appelle sous 48 heures pour un premier échange.",
      successNote: "// Formulaire de démo — rien n'a réellement été envoyé",
    },
  },

  trackPage: {
    meta: {
      title: "Suivre mon colis — RAPIDOSS",
      description:
        "Tracez n'importe quel numéro de suivi RAPIDOSS : chaque statut, de la préparation à la livraison, au retour ou à l'annulation.",
    },
    index: "03",
    kicker: "Suivre mon colis",
    title: "TROUVEZ VOTRE COLIS",
    lede: "Entrez votre numéro de suivi pour rejouer le trajet — préparation, ramassage, livraison et tout ce qu'il y a entre.",
    search: {
      waybill: "N° de suivi",
      placeholder: "RX-481 992",
      ariaLabel: "Numéro de suivi",
      button: "Tracer",
      hint: "Format : RX-000000 — essayez 6 chiffres au hasard",
      error: "// Format invalide — RX suivi de 6 chiffres attendu",
    },
    scanLines: [
      "CONNEXION AU DISPATCH…",
      "INTERROGATION DES MANIFESTES…",
      "RECOUPEMENT TÉLÉMÉTRIE LIVREURS…",
      "COLIS LOCALISÉ — DÉCRYPTAGE DU TRAJET",
    ],
    fields: { origin: "Origine", destination: "Destination", service: "Service", load: "Charge", cod: "COD" },
    pcs: "PCS",
    eta: "ETA",
    completed: "CLÔTURÉ",
    pipelineLabel: "Pipeline des statuts",
    serviceNames: ["24H GRAND TUNIS", "48H NATIONAL", "ÉCHANGE", "COD STANDARD"],
    statuses: {
      PREPARATION: "Préparation",
      PREPARE: "Préparé",
      LIVRAISON: "Livraison",
      LIVRE: "Livré",
      EN_RETOUR: "En retour",
      RETOURNE: "Retourné",
      ANNULE: "Annulé",
    },
    statusEvents: {
      PREPARATION: "Colis en préparation chez l'expéditeur",
      PREPARE: "Colis préparé & ramassé",
      LIVRAISON: "En cours de livraison avec le livreur",
      LIVRE: "Livré & paiement encaissé",
      EN_RETOUR: "En retour vers l'expéditeur",
      RETOURNE: "Retourné à l'expéditeur",
      ANNULE: "Commande annulée",
    },
    demoNote:
      "// Environnement de démo — les données du colis sont simulées de façon déterministe à partir du numéro saisi. Même numéro, même trajet, à chaque fois.",
  },

  footer: {
    blurb:
      "Plus qu'une société, une famille. Ramassages, livraison 24h sur le Grand Tunis, gestion des paiements et accompagnement marketing pour les expéditeurs de toute la Tunisie.",
    dispatch: "Dispatch · 7J/7",
    phones: "+216 96 000 123 · +216 98 803 600",
    navigate: "Navigation",
    links: {
      services: "Services",
      engagements: "Engagements",
      about: "À propos",
      track: "Suivre mon colis",
      devis: "Devenir client",
      courier: "Devenir livreur",
      login: "Se connecter",
    },
    hq: "Contact",
    address1: "Rue de la Pépinière",
    address2: "El Agba, Tunis",
    email: "rapidossdelivery@gmail.com",
    feedbackKicker: "Vos suggestions et remarques",
    feedbackBody: "Dites-nous ce qu'on pourrait faire mieux — on lit tout.",
    feedbackCta: "Écrivez-nous",
    copyright: "© 2026 RAPIDOSS DELIVERY — Tous droits réservés",
    tagline: "VOTRE RÉUSSITE = NOTRE SUCCÈS",
  },

  notFound: {
    kicker: "// Erreur d'acheminement",
    body: "Cette adresse ne figure sur aucun de nos manifestes. Le colis que vous cherchez a peut-être été réacheminé.",
    cta: "Retour au hub",
  },
};

export default fr;
