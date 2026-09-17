import defaultConfig from '../data/portfolio-config.json';
import type { PortfolioConfig } from '../types/config';
import { deepMerge } from './utils';

export interface PresetDescriptor {
  id: string;
  label: string;
  icon: string;
  description: string;
  patch: Record<string, unknown>;
}

const DEFAULTS = defaultConfig as unknown as PortfolioConfig;

export const PRESETS: PresetDescriptor[] = [
  {
    id: 'tech',
    label: 'Tech / Développeur',
    icon: 'code-2',
    description: 'Terminal, stack technique, niveaux de compétences, dépôts Git.',
    patch: {},
  },
  {
    id: 'creative',
    label: 'Créatif / Designer / Photographe',
    icon: 'palette',
    description: 'Galerie visuelle, services créatifs, témoignages clients.',
    patch: {
      meta: {
        title: 'Portfolio — Studio créatif & Direction artistique',
        description: 'Direction artistique, identité visuelle et photographie.',
      },
      theme: { preset: 'rose-amber', font: 'Space Grotesk' },
      identity: { name: 'Léa Moreau', initials: 'LM', role: 'Directrice Artistique & Photographe' },
      nav: { ctaLabel: 'Travaillons ensemble', mobileCtaLabel: 'Demander un devis' },
      sections: [
        { id: 'accueil', type: 'hero', label: 'Accueil', enabled: true },
        { id: 'services', type: 'skills', label: 'Services', enabled: true },
        { id: 'galerie', type: 'projects', label: 'Galerie', enabled: true },
        { id: 'parcours', type: 'experience', label: 'Parcours', enabled: true },
        { id: 'temoignages', type: 'testimonials', label: 'Témoignages', enabled: true },
        { id: 'contact', type: 'contact', label: 'Contact', enabled: true },
      ],
      hero: {
        badgeText: 'Carnet de commandes ouvert — automne 2026',
        title: 'Images, identités &',
        titleHighlight: 'émotions visuelles',
        subtitle:
          "Je construis des univers visuels cohérents : identité de marque, direction artistique et photographie. Chaque projet démarre par une intention et se termine par une image qui reste.",
        ctas: [
          { label: 'Voir la galerie', target: 'galerie', icon: 'image', variant: 'primary' },
          { label: 'Écrire un mot', target: 'contact', icon: 'mail', variant: 'ghost' },
        ],
        stats: [
          { value: '120+', label: 'Séries livrées' },
          { value: '8 ans', label: "D'expérience" },
          { value: '3', label: 'Prix de design' },
        ],
        showcase: {
          type: 'image',
          image:
            'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80',
          imageCaption: 'Série « Lumière froide » — tirage argentique',
          floatingBadges: [
            { icon: 'camera', title: 'Argentique & numérique', subtitle: 'Moyen format', accent: 1 },
            { icon: 'sparkles', title: 'Retouche incluse', subtitle: 'Colorimétrie fine', accent: 2 },
          ],
        },
      },
      skills: {
        badgeIcon: 'brush',
        badgeText: 'Ce que je propose',
        title: 'Services &',
        titleHighlight: 'Savoir-faire',
        subtitle: 'Un accompagnement complet, de la planche d’inspiration à la livraison finale.',
        showLevels: false,
        categories: [
          {
            icon: 'palette',
            badge: 'Identité',
            title: 'Direction artistique',
            description: 'Création d’univers de marque cohérents et mémorables.',
            accent: 1,
            items: [
              { name: 'Identité visuelle complète', level: 0, levelLabel: '' },
              { name: 'Charte graphique & design system', level: 0, levelLabel: '' },
              { name: 'Planches d’inspiration', level: 0, levelLabel: '' },
            ],
            tags: ['Logo', 'Typographie', 'Couleur'],
          },
          {
            icon: 'camera',
            badge: 'Photographie',
            title: 'Prises de vue',
            description: 'Studio, extérieur, produit et portrait éditorial.',
            accent: 2,
            items: [
              { name: 'Portrait & corporate', level: 0, levelLabel: '' },
              { name: 'Packshot produit', level: 0, levelLabel: '' },
              { name: 'Reportage d’événement', level: 0, levelLabel: '' },
            ],
            tags: ['Studio', 'Lumière naturelle', 'Retouche'],
          },
          {
            icon: 'layout-template',
            badge: 'Digital',
            title: 'Design d’interface',
            description: 'Maquettes web et mobile prêtes pour l’intégration.',
            accent: 3,
            items: [
              { name: 'Maquettes Figma', level: 0, levelLabel: '' },
              { name: 'Prototypes interactifs', level: 0, levelLabel: '' },
              { name: 'Déclinaisons réseaux sociaux', level: 0, levelLabel: '' },
            ],
            tags: ['Figma', 'Webdesign', 'Motion'],
          },
        ],
      },
      projects: {
        badgeIcon: 'image',
        badgeText: 'Sélection de travaux',
        title: 'Galerie &',
        titleHighlight: 'Réalisations',
        subtitle: 'Quelques projets représentatifs de mon approche.',
        layout: 'grid-3',
        filtersEnabled: true,
        filters: [
          { id: 'identite', label: 'Identité' },
          { id: 'photo', label: 'Photographie' },
          { id: 'digital', label: 'Digital' },
        ],
        items: [
          {
            title: 'Maison Verdier — Identité complète',
            category: 'identite',
            categoryLabel: 'Identité',
            description: 'Refonte d’identité pour une maison de parfum indépendante.',
            image:
              'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
            accent: 1,
            tags: ['Logo', 'Packaging', 'Charte'],
            links: [{ label: 'Voir le cas', url: '', icon: 'arrow-up-right' }],
          },
          {
            title: 'Série « Lumière froide »',
            category: 'photo',
            categoryLabel: 'Photographie',
            description: 'Travail personnel sur la lumière hivernale nordique.',
            image:
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
            accent: 2,
            tags: ['Argentique', 'Paysage'],
            links: [{ label: 'Voir la série', url: '', icon: 'arrow-up-right' }],
          },
          {
            title: 'Atelier Nord — Site vitrine',
            category: 'digital',
            categoryLabel: 'Digital',
            description: 'Design d’un site vitrine éditorial pour un atelier de menuiserie.',
            image:
              'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80',
            accent: 3,
            tags: ['Figma', 'Webdesign'],
            links: [{ label: 'Voir la maquette', url: '', icon: 'arrow-up-right' }],
          },
        ],
      },
      experience: {
        badgeIcon: 'milestone',
        badgeText: 'Parcours',
        title: 'Expériences &',
        titleHighlight: 'Collaborations',
        subtitle: '',
        items: [
          {
            title: 'Directrice artistique indépendante',
            organization: 'Studio personnel • Bordeaux',
            period: '2021 — Présent',
            description: 'Accompagnement de marques indépendantes sur leur identité et leur image.',
            accent: 1,
            tags: ['Freelance', 'Branding'],
          },
          {
            title: 'Designer senior',
            organization: 'Agence Belle Lumière • Paris',
            period: '2018 — 2021',
            description: 'Direction visuelle de campagnes print et digitales pour le luxe.',
            accent: 2,
            tags: ['Print', 'Campagnes'],
          },
        ],
      },
      testimonials: {
        badgeIcon: 'quote',
        badgeText: 'Retours clients',
        title: 'Ce qu’ils en',
        titleHighlight: 'disent',
        subtitle: '',
        items: [
          {
            quote:
              'Une écoute rare et un résultat qui a immédiatement repositionné notre marque. Les visuels vivent encore deux ans après.',
            author: 'Hélène Roy',
            role: 'Fondatrice — Maison Verdier',
            avatar: '',
            rating: 5,
          },
          {
            quote: 'Des images d’une justesse folle, livrées dans les temps, avec une vraie direction.',
            author: 'Samir Benali',
            role: 'Directeur — Atelier Nord',
            avatar: '',
            rating: 5,
          },
        ],
      },
      contact: {
        badgeIcon: 'message-square',
        badgeText: 'Prise de contact',
        title: 'Un projet,',
        titleHighlight: 'une intention ?',
        intro:
          'Parlez-moi de votre univers, de vos échéances et de vos références visuelles. Je reviens vers vous avec une proposition claire.',
        infos: [
          { icon: 'mail', label: 'E-mail', value: 'studio@example.com', copyable: true, accent: 1 },
          { icon: 'map-pin', label: 'Atelier', value: 'Bordeaux • Déplacements France & Europe', copyable: false, accent: 2 },
          { icon: 'calendar', label: 'Disponibilité', value: 'Prochains créneaux : novembre', copyable: false, accent: 3 },
        ],
        socials: [
          { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com', accent: 1 },
          { label: 'Behance', icon: 'dribbble', url: 'https://behance.net', accent: 2 },
          { label: 'Email', icon: 'send', url: 'mailto:studio@example.com', accent: 3 },
        ],
        form: {
          title: 'Demander un devis',
          subtitle: 'Décrivez votre projet en quelques lignes.',
          submitLabel: 'Envoyer ma demande',
          subjects: [
            { value: 'identite', label: 'Identité visuelle' },
            { value: 'photo', label: 'Séance photo' },
            { value: 'digital', label: 'Design d’interface' },
            { value: 'autre', label: 'Autre demande' },
          ],
        },
      },
    },
  },
  {
    id: 'business',
    label: 'Business / Consultant',
    icon: 'briefcase',
    description: 'Expertises, missions, résultats chiffrés, références clients.',
    patch: {
      meta: {
        title: 'Portfolio — Conseil en stratégie & transformation',
        description: 'Consultant indépendant : stratégie, organisation et pilotage de projets.',
      },
      theme: { preset: 'mono', font: 'DM Sans' },
      identity: { name: 'Julien Mercier', initials: 'JM', role: 'Consultant en transformation' },
      nav: { ctaLabel: 'Prendre rendez-vous', mobileCtaLabel: 'Planifier un échange' },
      sections: [
        { id: 'accueil', type: 'hero', label: 'Accueil', enabled: true },
        { id: 'expertises', type: 'skills', label: 'Expertises', enabled: true },
        { id: 'missions', type: 'projects', label: 'Missions', enabled: true },
        { id: 'parcours', type: 'experience', label: 'Parcours', enabled: true },
        { id: 'temoignages', type: 'testimonials', label: 'Références', enabled: true },
        { id: 'contact', type: 'contact', label: 'Contact', enabled: true },
      ],
      hero: {
        badgeText: 'Disponible pour missions à partir de janvier',
        badgePulse: false,
        title: 'Transformer la stratégie en',
        titleHighlight: 'résultats mesurables',
        subtitle:
          "J'accompagne les directions générales et opérationnelles sur leurs chantiers de transformation : cadrage, pilotage, conduite du changement et mise en œuvre.",
        ctas: [
          { label: 'Voir mes missions', target: 'missions', icon: 'briefcase', variant: 'primary' },
          { label: 'Planifier un échange', target: 'contact', icon: 'calendar', variant: 'ghost' },
        ],
        stats: [
          { value: '40+', label: 'Missions conduites' },
          { value: '12 ans', label: "D'expérience" },
          { value: '18%', label: 'Gain moyen d’efficacité' },
        ],
        showcase: {
          type: 'terminal',
          terminalTitle: 'Feuille de route — trimestre en cours',
          terminalTag: 'Pilotage',
          terminalLines: [
            { text: 'Phase 1 — Diagnostic & cadrage', tone: 'accent' },
            { text: '  Entretiens directions        ✔ terminé', tone: 'muted' },
            { text: '  Analyse des processus        ✔ terminé', tone: 'muted' },
            { text: '', tone: 'default' },
            { text: 'Phase 2 — Plan de transformation', tone: 'accent' },
            { text: '  Priorisation des chantiers   ● en cours', tone: 'string' },
            { text: '  Business case                ● en cours', tone: 'string' },
            { text: '', tone: 'default' },
            { text: 'Phase 3 — Déploiement & suivi', tone: 'keyword' },
          ],
          terminalFooterLeft: 'Comité de pilotage mensuel',
          terminalFooterRight: 'ROI suivi trimestriellement',
          floatingBadges: [
            { icon: 'target', title: 'Orienté résultat', subtitle: 'KPI définis dès le cadrage', accent: 1 },
            { icon: 'users', title: 'Conduite du changement', subtitle: 'Équipes embarquées', accent: 2 },
          ],
        },
      },
      skills: {
        badgeIcon: 'target',
        badgeText: 'Domaines d’intervention',
        title: 'Expertises &',
        titleHighlight: 'Méthodes',
        subtitle: 'Des interventions cadrées, outillées et orientées impact.',
        showLevels: false,
        categories: [
          {
            icon: 'compass',
            badge: 'Stratégie',
            title: 'Cadrage & stratégie',
            description: 'Diagnostic, vision cible et trajectoire de transformation.',
            accent: 1,
            items: [
              { name: 'Diagnostic organisationnel', level: 0, levelLabel: '' },
              { name: 'Business case & arbitrages', level: 0, levelLabel: '' },
              { name: 'Feuille de route pluriannuelle', level: 0, levelLabel: '' },
            ],
            tags: ['Comité de direction', 'Priorisation'],
          },
          {
            icon: 'workflow',
            badge: 'Opérations',
            title: 'Excellence opérationnelle',
            description: 'Optimisation de processus et pilotage de la performance.',
            accent: 2,
            items: [
              { name: 'Cartographie des processus', level: 0, levelLabel: '' },
              { name: 'Lean & amélioration continue', level: 0, levelLabel: '' },
              { name: 'Tableaux de bord & KPI', level: 0, levelLabel: '' },
            ],
            tags: ['Lean', 'KPI', 'Gouvernance'],
          },
          {
            icon: 'users',
            badge: 'Humain',
            title: 'Conduite du changement',
            description: 'Embarquement des équipes et montée en compétences.',
            accent: 3,
            items: [
              { name: 'Plan de communication interne', level: 0, levelLabel: '' },
              { name: 'Formation & ateliers', level: 0, levelLabel: '' },
              { name: 'Accompagnement managérial', level: 0, levelLabel: '' },
            ],
            tags: ['Ateliers', 'Formation', 'Coaching'],
          },
        ],
      },
      projects: {
        badgeIcon: 'briefcase',
        badgeText: 'Interventions récentes',
        title: 'Missions &',
        titleHighlight: 'Résultats',
        subtitle: 'Exemples anonymisés de missions menées ces trois dernières années.',
        layout: 'grid-2',
        filtersEnabled: true,
        filters: [
          { id: 'strategie', label: 'Stratégie' },
          { id: 'operations', label: 'Opérations' },
          { id: 'change', label: 'Changement' },
        ],
        items: [
          {
            title: 'Refonte du modèle opérationnel — Industrie',
            category: 'operations',
            categoryLabel: 'Opérations',
            description:
              'Révision de l’organisation de 4 sites de production. Réduction de 22% des délais de traitement et mise en place d’un pilotage hebdomadaire.',
            image: '',
            accent: 1,
            tags: ['4 sites', '-22% délais', '9 mois'],
            links: [{ label: 'Détail de la mission', url: '', icon: 'arrow-up-right' }],
          },
          {
            title: 'Plan stratégique 3 ans — Services B2B',
            category: 'strategie',
            categoryLabel: 'Stratégie',
            description:
              'Construction de la trajectoire de croissance avec le comité de direction : segmentation, offre cible et plan d’investissement.',
            image: '',
            accent: 2,
            tags: ['CODIR', 'Croissance', '5 mois'],
            links: [{ label: 'Détail de la mission', url: '', icon: 'arrow-up-right' }],
          },
          {
            title: 'Déploiement ERP — Conduite du changement',
            category: 'change',
            categoryLabel: 'Changement',
            description:
              'Accompagnement de 350 collaborateurs : plan de formation, réseau d’ambassadeurs et suivi de l’adoption.',
            image: '',
            accent: 3,
            tags: ['350 personnes', '94% adoption'],
            links: [{ label: 'Détail de la mission', url: '', icon: 'arrow-up-right' }],
          },
        ],
      },
      experience: {
        badgeIcon: 'milestone',
        badgeText: 'Trajectoire',
        title: 'Parcours',
        titleHighlight: 'professionnel',
        subtitle: '',
        items: [
          {
            title: 'Consultant indépendant',
            organization: 'Cabinet personnel • France & Benelux',
            period: '2020 — Présent',
            description: 'Missions de transformation auprès d’ETI et de grands comptes.',
            accent: 1,
            tags: ['Indépendant'],
          },
          {
            title: 'Manager — Practice Opérations',
            organization: 'Cabinet de conseil international',
            period: '2015 — 2020',
            description: 'Pilotage d’équipes de 6 consultants sur des programmes de transformation.',
            accent: 2,
            tags: ['Management', 'Grands comptes'],
          },
          {
            title: 'MBA — Stratégie & Management',
            organization: 'École de commerce',
            period: '2013 — 2015',
            description: '',
            accent: 3,
            tags: [],
          },
        ],
      },
      testimonials: {
        badgeIcon: 'quote',
        badgeText: 'Références',
        title: 'Retours de',
        titleHighlight: 'clients',
        subtitle: '',
        items: [
          {
            quote:
              'Une capacité rare à poser un diagnostic sans complaisance puis à embarquer les équipes sur la mise en œuvre.',
            author: 'Directrice Générale',
            role: 'ETI industrielle — 900 collaborateurs',
            avatar: '',
            rating: 5,
          },
          {
            quote: 'Le plan livré était directement exécutable. Nous avons tenu les jalons sur douze mois.',
            author: 'Directeur des Opérations',
            role: 'Groupe de services B2B',
            avatar: '',
            rating: 5,
          },
        ],
      },
      contact: {
        badgeIcon: 'calendar',
        badgeText: 'Échangeons',
        title: 'Parlons de votre',
        titleHighlight: 'prochain chantier',
        intro:
          'Un premier échange de 30 minutes suffit généralement à cadrer le besoin et à évaluer la pertinence d’une intervention.',
        infos: [
          { icon: 'mail', label: 'E-mail', value: 'contact@example.com', copyable: true, accent: 1 },
          { icon: 'phone', label: 'Téléphone', value: '+33 6 00 00 00 00', copyable: true, accent: 2 },
          { icon: 'map-pin', label: 'Zone', value: 'France, Belgique, Luxembourg', copyable: false, accent: 3 },
        ],
        socials: [{ label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com', accent: 1 }],
        form: {
          title: 'Demander un premier échange',
          subtitle: 'Décrivez le contexte en quelques lignes.',
          submitLabel: 'Envoyer la demande',
          subjects: [
            { value: 'diagnostic', label: 'Diagnostic & cadrage' },
            { value: 'pilotage', label: 'Pilotage de programme' },
            { value: 'formation', label: 'Formation & ateliers' },
            { value: 'autre', label: 'Autre demande' },
          ],
        },
      },
    },
  },
  {
    id: 'academic',
    label: 'Académique / Étudiant',
    icon: 'graduation-cap',
    description: 'Formation, travaux de recherche, publications, candidatures.',
    patch: {
      meta: {
        title: 'Portfolio académique — Recherche & Formation',
        description: 'Parcours universitaire, travaux de recherche et publications.',
      },
      theme: { preset: 'emerald-teal', font: 'Lora' },
      identity: { name: 'Inès Rakoto', initials: 'IR', role: 'Doctorante en sciences cognitives' },
      nav: { ctaLabel: 'Me contacter', mobileCtaLabel: 'Me contacter' },
      sections: [
        { id: 'accueil', type: 'hero', label: 'Accueil', enabled: true },
        { id: 'competences', type: 'skills', label: 'Compétences', enabled: true },
        { id: 'travaux', type: 'projects', label: 'Travaux', enabled: true },
        { id: 'formation', type: 'experience', label: 'Formation', enabled: true },
        { id: 'temoignages', type: 'testimonials', label: 'Recommandations', enabled: false },
        { id: 'contact', type: 'contact', label: 'Contact', enabled: true },
      ],
      hero: {
        badgeText: 'Candidate à un post-doctorat — rentrée 2027',
        title: 'Recherche en',
        titleHighlight: 'sciences cognitives',
        subtitle:
          "Mes travaux portent sur les mécanismes attentionnels chez l'adulte. J'utilise des protocoles expérimentaux comportementaux couplés à des analyses statistiques bayésiennes.",
        ctas: [
          { label: 'Voir mes travaux', target: 'travaux', icon: 'file-text', variant: 'primary' },
          { label: 'Télécharger mon CV', target: 'contact', icon: 'download', variant: 'ghost' },
        ],
        stats: [
          { value: '4', label: 'Publications' },
          { value: '2', label: 'Conférences internationales' },
          { value: '3e', label: 'Année de doctorat' },
        ],
        showcase: {
          type: 'terminal',
          terminalTitle: 'Protocole expérimental — étude 3',
          terminalTag: 'R / Bayesian',
          terminalLines: [
            { text: 'Population : N = 128 (18–35 ans)', tone: 'accent' },
            { text: 'Design : intra-sujet, 4 conditions', tone: 'string' },
            { text: 'Mesures : temps de réaction, précision', tone: 'string' },
            { text: '', tone: 'default' },
            { text: '# Analyse', tone: 'muted' },
            { text: 'modele <- brms::brm(rt ~ condition + (1|sujet))', tone: 'keyword' },
            { text: 'BF10 = 24.7  → évidence forte', tone: 'number' },
          ],
          terminalFooterLeft: 'Pré-enregistrement OSF',
          terminalFooterRight: 'Données ouvertes',
          floatingBadges: [
            { icon: 'book-open', title: 'Science ouverte', subtitle: 'Données & code publics', accent: 1 },
            { icon: 'microscope', title: 'Méthodo rigoureuse', subtitle: 'Pré-enregistrement', accent: 2 },
          ],
        },
      },
      skills: {
        badgeIcon: 'flask-conical',
        badgeText: 'Compétences',
        title: 'Méthodes &',
        titleHighlight: 'Outils',
        subtitle: 'Compétences acquises au fil du master et du doctorat.',
        showLevels: true,
        categories: [
          {
            icon: 'bar-chart-3',
            badge: 'Analyse',
            title: 'Statistiques & données',
            description: 'Traitement et modélisation de données expérimentales.',
            accent: 1,
            items: [
              { name: 'R / tidyverse', level: 90, levelLabel: 'Avancé' },
              { name: 'Statistiques bayésiennes', level: 80, levelLabel: 'Confirmé' },
              { name: 'Python / pandas', level: 75, levelLabel: 'Confirmé' },
            ],
            tags: ['brms', 'ggplot2', 'JASP'],
          },
          {
            icon: 'microscope',
            badge: 'Expérimentation',
            title: 'Protocoles & recueil',
            description: 'Conception et passation d’études comportementales.',
            accent: 2,
            items: [
              { name: 'Conception de protocole', level: 88, levelLabel: 'Avancé' },
              { name: 'PsychoPy / jsPsych', level: 82, levelLabel: 'Confirmé' },
              { name: 'Éthique & pré-enregistrement', level: 85, levelLabel: 'Confirmé' },
            ],
            tags: ['OSF', 'Comité d’éthique'],
          },
          {
            icon: 'languages',
            badge: 'Transverse',
            title: 'Communication scientifique',
            description: 'Rédaction, présentation et vulgarisation.',
            accent: 3,
            items: [
              { name: 'Rédaction d’articles', level: 85, levelLabel: 'Confirmé' },
              { name: 'Anglais scientifique', level: 90, levelLabel: 'C1' },
              { name: 'LaTeX / Quarto', level: 80, levelLabel: 'Confirmé' },
            ],
            tags: ['Vulgarisation', 'Poster', 'Enseignement'],
          },
        ],
      },
      projects: {
        badgeIcon: 'file-text',
        badgeText: 'Production scientifique',
        title: 'Travaux &',
        titleHighlight: 'Publications',
        subtitle: 'Articles, communications et projets de recherche.',
        layout: 'grid-2',
        filtersEnabled: true,
        filters: [
          { id: 'article', label: 'Articles' },
          { id: 'communication', label: 'Communications' },
          { id: 'projet', label: 'Projets' },
        ],
        items: [
          {
            title: 'Attention sélective et charge cognitive',
            category: 'article',
            categoryLabel: 'Article',
            description:
              'Article publié dans une revue à comité de lecture. Étude comportementale sur 128 participants avec analyse bayésienne.',
            image: '',
            accent: 1,
            tags: ['2026', 'Revue à comité de lecture', 'Premier auteur'],
            links: [{ label: 'Lire l’article', url: '', icon: 'external-link' }],
          },
          {
            title: 'Communication orale — Congrès européen',
            category: 'communication',
            categoryLabel: 'Communication',
            description: 'Présentation des résultats préliminaires de l’étude 3 devant 200 chercheurs.',
            image: '',
            accent: 2,
            tags: ['2025', 'International'],
            links: [{ label: 'Voir le support', url: '', icon: 'external-link' }],
          },
          {
            title: 'Mémoire de master — Mention Très Bien',
            category: 'projet',
            categoryLabel: 'Projet',
            description: 'Travail de recherche sur la mémoire de travail visuo-spatiale.',
            image: '',
            accent: 3,
            tags: ['2022', 'Mention TB'],
            links: [{ label: 'Télécharger', url: '', icon: 'download' }],
          },
        ],
      },
      experience: {
        badgeIcon: 'graduation-cap',
        badgeText: 'Cursus',
        title: 'Formation &',
        titleHighlight: 'Expériences',
        subtitle: '',
        items: [
          {
            title: 'Doctorat en sciences cognitives',
            organization: 'Université — Laboratoire de psychologie cognitive',
            period: '2023 — Présent',
            description: 'Thèse sur les mécanismes attentionnels, encadrée par le Pr. Martin.',
            accent: 1,
            tags: ['Doctorat', 'Contrat doctoral'],
          },
          {
            title: 'Chargée de travaux dirigés',
            organization: 'Université — Licence de psychologie',
            period: '2023 — Présent',
            description: '64h annuelles de TD en statistiques appliquées.',
            accent: 2,
            tags: ['Enseignement'],
          },
          {
            title: 'Master Recherche — Sciences cognitives',
            organization: 'Université • Mention Très Bien',
            period: '2021 — 2023',
            description: '',
            accent: 3,
            tags: [],
          },
        ],
      },
      testimonials: { items: [] },
      contact: {
        badgeIcon: 'mail',
        badgeText: 'Contact',
        title: 'Collaborations &',
        titleHighlight: 'candidatures',
        intro:
          'Je suis ouverte aux collaborations de recherche, aux relectures et aux opportunités de post-doctorat.',
        infos: [
          { icon: 'mail', label: 'E-mail académique', value: 'prenom.nom@universite.fr', copyable: true, accent: 1 },
          { icon: 'building-2', label: 'Laboratoire', value: 'Laboratoire de psychologie cognitive — Bureau 214', copyable: false, accent: 2 },
          { icon: 'file-text', label: 'ORCID', value: '0000-0000-0000-0000', copyable: true, accent: 3 },
        ],
        socials: [
          { label: 'ORCID', icon: 'badge-check', url: 'https://orcid.org', accent: 1 },
          { label: 'Google Scholar', icon: 'graduation-cap', url: 'https://scholar.google.com', accent: 2 },
          { label: 'OSF', icon: 'database', url: 'https://osf.io', accent: 3 },
        ],
        form: {
          title: 'Me écrire',
          subtitle: 'Toute demande de collaboration ou d’information.',
          submitLabel: 'Envoyer le message',
          subjects: [
            { value: 'collaboration', label: 'Collaboration de recherche' },
            { value: 'relecture', label: 'Relecture / expertise' },
            { value: 'poste', label: 'Opportunité de poste' },
            { value: 'autre', label: 'Autre' },
          ],
        },
      },
    },
  },
];

export function buildPreset(id: string): PortfolioConfig {
  const preset = PRESETS.find((p) => p.id === id);
  if (!preset) return structuredClone(DEFAULTS);
  return deepMerge(structuredClone(DEFAULTS), preset.patch);
}
