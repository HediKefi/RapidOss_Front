import type { Dictionary } from "./dictionaries";

const fr: Dictionary = {
  meta: {
    title: "RAPIDOSS — La livraison qui fait grandir votre business",
    description:
      "RAPIDOSS gère ramassage, livraison 24h/48h, paiement à la livraison et accompagnement marketing pour plus de 150 e-commerçants tunisiens. Plus qu'une société, une famille.",
  },

  nav: {
    services: "Services",
    network: "Réseau",
    track: "Suivi",
    quote: "Rejoignez-nous",
    tagline: "Infrastructure de livraison — Tunis",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "Accueil RAPIDOSS",
  },

  hero: {
    status: "Centre de dispatch en ligne — ramassages en cours sur 24 gouvernorats",
    line1: "ON LIVRE CE QUI",
    line2: "FAIT TOURNER",
    line3: "VOTRE BUSINESS.",
    lede: "RAPIDOSS gère la livraison de plus de 150 marques e-commerce tunisiennes — ramassage à votre porte, 24h sur le Grand Tunis, 48h partout en Tunisie, et votre argent COD versé chaque semaine. Vous vendez. On livre.",
    cta1: "Rejoignez-nous",
    cta2: "Suivre un colis",
    stats: [
      { value: 92, suffix: "%", decimals: 0, label: "Taux de livraison" },
      { value: 8, suffix: "K", decimals: 0, label: "Colis / jour" },
      { value: 24, suffix: "", decimals: 0, label: "Gouvernorats" },
    ],
  },

  marquee: [
    "RAMASSAGE EXPRESS",
    "24H GRAND TUNIS",
    "48H TOUTE LA TUNISIE",
    "PAIEMENT À LA LIVRAISON",
    "SUIVI EN DIRECT",
    "PREUVE DE LIVRAISON",
    "BOOST MARKETING",
  ],

  homeServices: {
    heading1: "Quatre façons de",
    heading2: "vous porter",
    all: "Tous les services",
    cards: [
      {
        index: "01",
        name: "Ramassage Express",
        desc: "Un livreur récupère vos colis à votre porte ou atelier en moins d'une heure. Pas de volume minimum, pas de file à l'agence — votre stock part dès qu'il est prêt.",
        spec: "À VOTRE PORTE ≤ 60 MIN · 7J/7",
      },
      {
        index: "02",
        name: "24H Grand Tunis",
        desc: "Tout ce qui est ramassé aujourd'hui est chez votre client demain, sur Tunis, l'Ariana, Ben Arous et la Manouba. Garanti, pas promis.",
        spec: "GARANTIE LENDEMAIN · 4 GOUVERNORATS",
      },
      {
        index: "03",
        name: "48H Toute la Tunisie",
        desc: "De Bizerte à Médenine, les 24 gouvernorats en 48 heures grâce à notre réseau de relais. Vos clients du sud ne patientent plus une semaine.",
        spec: "24 GOUVERNORATS · RÉSEAU DE RELAIS",
      },
      {
        index: "04",
        name: "Gestion COD",
        desc: "On encaisse le paiement à la livraison, on rapproche chaque dinar de chaque colis, et on vous verse votre argent chaque semaine. Votre compta se ferme toute seule.",
        spec: "VERSEMENT HEBDO · RAPPROCHEMENT TOTAL",
      },
    ],
  },

  steps: {
    kicker: "Comment ça marche",
    heading: "De votre boutique à leur porte, en trois temps",
    items: [
      {
        n: "A",
        title: "Branchez-vous",
        body: "Créez votre compte expéditeur en quelques minutes — connectez votre boutique, importez un CSV ou saisissez vos commandes sur la plateforme. On s'adapte à vous.",
      },
      {
        n: "B",
        title: "On ramasse & on livre",
        body: "Le dispatch affecte chaque colis au bon livreur et au bon itinéraire — 24h sur le Grand Tunis, 48h partout ailleurs, avec un suivi en direct à chaque scan.",
      },
      {
        n: "C",
        title: "Vous êtes payé",
        body: "L'argent du COD est rapproché colis par colis et arrive sur votre compte chaque semaine, avec un relevé que votre comptable va vraiment apprécier.",
      },
    ],
  },

  statsBand: {
    heading1: "Des chiffres qui nous",
    heading2: "engagent",
    body: "Chaque expéditeur voit le même tableau de bord que nous. Ces chiffres sont des moyennes glissantes sur 90 jours, réseau entier — pas une photo marketing.",
    cta: "Inspecter le réseau",
    stats: [
      { value: 92, suffix: "%", decimals: 0, label: "Succès 1ère présentation" },
      { value: 150, suffix: "+", decimals: 0, label: "Expéditeurs actifs" },
      { value: 24, suffix: "H", decimals: 0, label: "SLA Grand Tunis" },
      { value: 48, suffix: "H", decimals: 0, label: "SLA national" },
    ],
  },

  teaser: {
    kicker: "Suivi en direct",
    heading: "Il est où, là, maintenant ?",
    body: "Saisissez un numéro de bordereau et regardez le trajet se rejouer — chaque scan, chaque relais, chaque passage de main.",
  },

  quote: {
    text1: "On a confié à RAPIDOSS nos",
    highlight: " 800 commandes COD hebdomadaires ",
    text2: "en janvier. Les versements tombent chaque lundi, notre taux de retour a baissé d'un tiers, et j'ai retrouvé mes soirées.",
    author: "— Fondatrice, boutique de mode en ligne · Tunis · partenaire depuis 2023",
  },

  cta: {
    heading1: "Arrêtez de courir",
    heading2: "après les livreurs.",
    heading3: "Faites grandir",
    heading4: "votre boutique.",
    body: "Dites-nous ce que vous expédiez et où. Compte expéditeur ouvert et premier ramassage programmé sous 48 heures.",
    button: "Parler au dispatch",
  },

  footer: {
    blurb:
      "Plus qu'une société, une famille. Nous gérons la livraison de plus de 150 marques e-commerce tunisiennes : ramassage, livraison 24h/48h, gestion COD et accompagnement marketing.",
    dispatch: "Dispatch · 7J/7 · +216 96 000 123",
    navigate: "Navigation",
    links: {
      services: "Services",
      network: "Réseau",
      track: "Suivre un colis",
      quote: "Rejoignez-nous",
    },
    hq: "Siège",
    address1: "Rue de la Pépinière",
    address2: "El Agba, Tunis",
    email: "rapidossdelivery@gmail.com",
    copyright: "© 2026 RAPIDOSS DELIVERY",
    tagline: "VOTRE RÉUSSITE = NOTRE SUCCÈS",
    cities: [
      "TUNIS", "ARIANA", "BEN AROUS", "NABEUL", "BIZERTE", "SOUSSE",
      "MONASTIR", "SFAX", "KAIROUAN", "GABÈS", "MÉDENINE", "TOZEUR",
    ],
  },

  servicesPage: {
    meta: {
      title: "Services — RAPIDOSS",
      description:
        "Ramassage express, livraison 24h/48h, gestion COD, boost marketing et retours — des services de livraison pensés pour l'e-commerce tunisien.",
    },
    index: "01",
    kicker: "Ce qu'on opère",
    title: "SERVICES",
    lede: "Cinq modes opératoires, un seul dispatch. Combinez-les par commande, par axe, par saison — votre compte ne change pas.",
    items: [
      {
        index: "01",
        name: "Ramassage Express",
        tagline: "Votre stock part dès qu'il est prêt.",
        body: "Un livreur est à votre porte, atelier ou dépôt en moins d'une heure, sept jours sur sept. Pas de volume minimum, pas de file à l'agence — chaque colis est scanné sur votre seuil, la traçabilité commence au mètre zéro.",
        specs: [
          ["Réactivité", "≤ 60 MIN"],
          ["Zone", "GRAND TUNIS"],
          ["Jours", "7 / 7"],
          ["Premier scan", "À VOTRE PORTE"],
        ],
      },
      {
        index: "02",
        name: "24H Grand Tunis",
        tagline: "Demain matin, pas « dans quelques jours ».",
        body: "Les colis ramassés avant 18h sont triés la nuit à notre hub d'El Agba et livrés le lendemain sur Tunis, l'Ariana, Ben Arous et la Manouba — avec photo et signature à chaque remise.",
        specs: [
          ["Heure limite", "18:00"],
          ["Livraison", "LENDEMAIN"],
          ["Zone", "4 GOUVERNORATS"],
          ["Preuve", "PHOTO + SIGNATURE"],
        ],
      },
      {
        index: "03",
        name: "48H Toute la Tunisie",
        tagline: "De Bizerte à Médenine, aucun colis oublié.",
        body: "Notre réseau de relais couvre les 24 gouvernorats sur un rythme de 48 heures. Les lignes partent chaque nuit ; des livreurs régionaux assurent le dernier kilomètre avec une connaissance du terrain qu'aucune appli n'a.",
        specs: [
          ["Couverture", "24 GOUVERNORATS"],
          ["Délai", "≤ 48 H"],
          ["Lignes", "CHAQUE NUIT"],
          ["Relais", "12 POINTS"],
        ],
      },
      {
        index: "04",
        name: "Gestion COD",
        tagline: "Chaque dinar compté, chaque semaine.",
        body: "On encaisse le paiement à la livraison, on le rapproche colis par colis et on vous vire votre argent chaque semaine avec un relevé propre. Les colis refusés vous reviennent vite — sans mauvaises surprises.",
        specs: [
          ["Versement", "HEBDOMADAIRE"],
          ["Rapprochement", "PAR COLIS"],
          ["Relevé", "À CHAQUE VIREMENT"],
          ["Colis refusés", "RETOUR RAPIDE"],
        ],
      },
      {
        index: "05",
        name: "Boost Marketing",
        tagline: "Votre réussite = notre succès.",
        body: "Emballage à votre marque, inserts soignés et conseils concrets d'une équipe qui observe des milliers de livraisons par jour. On vous dit pourquoi des clients refusent leurs colis — et comment y remédier.",
        specs: [
          ["Emballage", "À VOTRE MARQUE"],
          ["Conseil", "INCLUS"],
          ["Audit des refus", "MENSUEL"],
          ["Coût", "0 DT DE PLUS"],
        ],
      },
    ],
    customKicker: "Besoin d'un mode qu'on n'a pas listé ?",
    customHeading: "On construit des axes sur mesure.",
    customCta: "Dessiner mon axe",
    flowMarquee: ["RAMASSAGE", "TRI", "LIGNE", "DERNIER KM", "SIGNATURE", "PAYÉ"],
  },

  networkPage: {
    meta: {
      title: "Réseau — RAPIDOSS",
      description:
        "12 points relais, 24 gouvernorats, 24h sur le Grand Tunis et 48h partout. Le réseau de livraison RAPIDOSS en Tunisie.",
    },
    index: "02",
    kicker: "Là où on opère",
    title: "LE RÉSEAU",
    lede: "Un hub à El Agba, douze points relais, les 24 gouvernorats sur un rythme de 48 heures. La capacité est dimensionnée pour votre plus grosse promo, pas pour un mardi moyen.",
    telemetry: "Télémétrie réseau — en direct",
    legendHub: "Hub",
    legendRelay: "Relais",
    legendHaul: "Ligne active",
    stats: [
      { value: 24, suffix: "", label: "Gouvernorats couverts" },
      { value: 12, suffix: "", label: "Points relais" },
      { value: 240, suffix: "+", label: "Livreurs & véhicules" },
      { value: 92, suffix: "%", label: "Taux de livraison" },
    ],
    manifestHeading: "Manifeste des relais",
    tableHeaders: { code: "Code", city: "Ville", role: "Rôle", couriers: "Livreurs", sla: "SLA", status: "Statut" },
    online: "EN LIGNE",
    hubs: [
      { code: "TUN-1", city: "Tunis — El Agba", role: "HUB DE TRI PRINCIPAL", couriers: 64, sla: "24H" },
      { code: "ARN-2", city: "Ariana", role: "BOUCLE TUNIS NORD", couriers: 28, sla: "24H" },
      { code: "BNA-3", city: "Ben Arous", role: "BOUCLE TUNIS SUD", couriers: 26, sla: "24H" },
      { code: "NBL-4", city: "Nabeul", role: "RELAIS CAP BON", couriers: 18, sla: "48H" },
      { code: "BZT-5", city: "Bizerte", role: "PORTE DU NORD", couriers: 14, sla: "48H" },
      { code: "SUS-6", city: "Sousse", role: "PORTE DU SAHEL", couriers: 22, sla: "48H" },
      { code: "MNS-7", city: "Monastir", role: "BOUCLE SAHEL", couriers: 12, sla: "48H" },
      { code: "SFX-8", city: "Sfax", role: "TRI SUD", couriers: 24, sla: "48H" },
      { code: "KRN-9", city: "Kairouan", role: "RELAIS CENTRE", couriers: 10, sla: "48H" },
      { code: "GBS-10", city: "Gabès", role: "RELAIS DU GOLFE", couriers: 10, sla: "48H" },
      { code: "MDN-11", city: "Médenine", role: "GRAND SUD", couriers: 8, sla: "48H" },
      { code: "TZR-12", city: "Tozeur", role: "ROUTE DES OASIS", couriers: 6, sla: "48H" },
    ],
    coverageHeading: "Pas encore sur la carte ?",
    coverageBody: "On ouvre de nouveaux points relais quand le volume des expéditeurs le justifie — et le volume commence par une conversation.",
    coverageCta: "Demander une couverture",
  },

  trackPage: {
    meta: {
      title: "Suivre un colis — RAPIDOSS",
      description: "Tracez n'importe quel bordereau RAPIDOSS : chaque scan, chaque relais, chaque passage de main.",
    },
    index: "03",
    kicker: "Suivi en direct",
    title: "TROUVEZ VOTRE COLIS",
    lede: "Saisissez un numéro de bordereau pour rejouer le trajet — ramassage, hub, ligne et le dernier mètre jusqu'à la porte.",
    search: {
      waybill: "Bordereau",
      placeholder: "RX-481 992",
      ariaLabel: "Code de suivi",
      button: "Tracer",
      hint: "Format : RX-000000 — essayez 6 chiffres au hasard",
      error: "// Format invalide — RX suivi de 6 chiffres attendu",
    },
    scanLines: [
      "CONNEXION AU DISPATCH…",
      "INTERROGATION DES MANIFESTES…",
      "RECOUPEMENT TÉLÉMÉTRIE LIVREURS…",
      "BORDEREAU LOCALISÉ — DÉCRYPTAGE DU TRAJET",
    ],
    fields: { origin: "Origine", destination: "Destination", service: "Service", load: "Charge", cod: "COD" },
    pcs: "PCS",
    eta: "ETA",
    completed: "TERMINÉ",
    serviceNames: ["RAMASSAGE EXPRESS", "24H GRAND TUNIS", "48H NATIONAL", "COD STANDARD", "TOURNÉE RETOURS"],
    stages: {
      REGISTERED: "Commande enregistrée",
      PICKED_UP: "Ramassé chez l'expéditeur",
      AT_HUB: "Trié au hub",
      LINE_HAUL: "En transit sur ligne",
      OUT_FOR_DELIVERY: "En cours de livraison",
      DELIVERED: "Livré & COD encaissé",
    },
    stageBadges: {
      REGISTERED: "ENREGISTRÉ",
      PICKED_UP: "RAMASSÉ",
      AT_HUB: "AU HUB",
      LINE_HAUL: "SUR LIGNE",
      OUT_FOR_DELIVERY: "EN LIVRAISON",
      DELIVERED: "LIVRÉ",
    },
    demoNote:
      "// Environnement de démo — les données du bordereau sont simulées de façon déterministe à partir du code saisi. Même code, même trajet, à chaque fois.",
  },

  contactPage: {
    meta: {
      title: "Rejoignez-nous — RAPIDOSS",
      description:
        "Ouvrez votre compte expéditeur : dites-nous ce que vous expédiez et où. Premier ramassage programmé sous 48 heures.",
    },
    index: "04",
    kicker: "Ouvrez votre compte",
    title: "REJOIGNEZ-NOUS",
    lede: "Cinq champs, deux minutes. Un vrai humain du dispatch vous répond sous 48 heures — souvent bien plus vite.",
    nextHeading: "La suite des opérations",
    nextSteps: [
      ["T+0H", "Votre demande arrive au dispatch — pas dans une file CRM."],
      ["T+24H", "On vous appelle pour comprendre vos produits, volumes et besoins COD."],
      ["T+48H", "Compte ouvert, tarifs convenus, premier ramassage au calendrier."],
    ],
    urgentKicker: "Colis urgent ?",
    urgentBody: "Sautez le formulaire. Le dispatch répond tous les jours de la semaine.",
    phone: "+216 96 000 123",
    form: {
      company: "Société / boutique",
      companyPlaceholder: "Dar Artisan Shop",
      email: "Email professionnel",
      emailPlaceholder: "contact@votreboutique.tn",
      volume: "Volume hebdomadaire",
      volumes: ["< 50 / sem", "50 – 300 / sem", "300 – 1K / sem", "1K+ / sem"],
      modes: "Services souhaités",
      modeOptions: ["Ramassage", "24H Tunis", "48H National", "COD", "Marketing"],
      notes: "Qu'est-ce que vous expédiez ?",
      notesOptional: "(facultatif)",
      notesPlaceholder: "Produits, destinations, galères actuelles avec la livraison…",
      submit: "Ouvrir mon compte →",
      sending: "Transmission",
      errors: {
        company: "Nom de société requis",
        email: "Email professionnel valide requis",
        volume: "Choisissez une tranche de volume",
        modes: "Sélectionnez au moins un service",
      },
      successTitle: "Demande enregistrée",
      successBody1: "Référence",
      successBody2:
        ". Le dispatch revient vers vous avec les détails de votre compte sous 48 heures.",
      successNote: "// Formulaire de démo — rien n'a réellement été envoyé",
    },
  },

  notFound: {
    kicker: "// Erreur d'acheminement",
    body: "Cette adresse ne figure sur aucun de nos manifestes. Le colis que vous cherchez a peut-être été réacheminé.",
    cta: "Retour au hub",
  },
};

export default fr;
