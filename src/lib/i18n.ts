export type SupportedLocale = 'fr' | 'en';

export interface Translations {
  nav: {
    contactMe: string;
    viewProjects: string;
    downloadCv: string;
    language: string;
    menu: string;
    backToTop: string;
  };
  sections: {
    hero: string;
    skills: string;
    projects: string;
    experience: string;
    testimonials: string;
    articles: string;
    contact: string;
  };
  projects: {
    allFilter: string;
    viewCode: string;
    liveDemo: string;
    repository: string;
    deployment: string;
    noLink: string;
  };
  articles: {
    readArticle: string;
    details: string;
    consult: string;
    estimatedReadTime: string;
    closeModal: string;
    openExternal: string;
  };
  contact: {
    copied: string;
    copyTooltip: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    requiredFields: string;
    invalidEmail: string;
    openingMailClient: string;
    sendButton: string;
  };
  editor: {
    resetConfirmed: string;
    resetTitle: string;
    resetDescription: string;
    resetButton: string;
    confirmResetButton: string;
    cancelButton: string;
  };
}

export const TRANSLATIONS: Record<SupportedLocale, Translations> = {
  fr: {
    nav: {
      contactMe: 'Me contacter',
      viewProjects: 'Voir mes réalisations',
      downloadCv: 'Télécharger CV',
      language: 'Langue',
      menu: 'Menu',
      backToTop: 'Haut de page',
    },
    sections: {
      hero: 'Accueil',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Parcours',
      testimonials: 'Témoignages',
      articles: 'Publications',
      contact: 'Contact',
    },
    projects: {
      allFilter: 'Tous',
      viewCode: 'Code source',
      liveDemo: 'Démo en direct',
      repository: 'Dépôt',
      deployment: 'Déploiement',
      noLink: "Aucun lien n'est encore renseigné pour cet élément.",
    },
    articles: {
      readArticle: 'Lire l’article',
      details: 'Détails',
      consult: 'Consulter',
      estimatedReadTime: 'min de lecture',
      closeModal: 'Fermer',
      openExternal: 'Ouvrir le lien externe',
    },
    contact: {
      copied: 'Copié dans le presse-papiers !',
      copyTooltip: 'Copier',
      sending: 'Transmission sécurisée de votre demande…',
      successMessage: 'Message envoyé avec succès !',
      errorMessage: "L'envoi a échoué. Réessayez ou utilisez directement les liens de contact.",
      requiredFields: 'Veuillez renseigner tous les champs obligatoires (*).',
      invalidEmail: 'Veuillez saisir une adresse e-mail valide (ex. nom@domaine.com).',
      openingMailClient: 'Ouverture de votre application de messagerie…',
      sendButton: 'Envoyer ma demande',
    },
    editor: {
      resetConfirmed: 'Portfolio réinitialisé à son état d’origine.',
      resetTitle: 'Restauration d’usine',
      resetDescription: 'Efface toutes les personnalisations du navigateur et recharge la configuration de base de N-product.',
      resetButton: 'Réinitialiser le projet',
      confirmResetButton: 'Confirmer la réinitialisation d’usine',
      cancelButton: 'Annuler',
    },
  },
  en: {
    nav: {
      contactMe: 'Contact Me',
      viewProjects: 'View My Work',
      downloadCv: 'Download CV',
      language: 'Language',
      menu: 'Menu',
      backToTop: 'Back to top',
    },
    sections: {
      hero: 'Home',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      testimonials: 'Testimonials',
      articles: 'Articles',
      contact: 'Contact',
    },
    projects: {
      allFilter: 'All',
      viewCode: 'Source code',
      liveDemo: 'Live Demo',
      repository: 'Repository',
      deployment: 'Deployment',
      noLink: 'No link provided for this item yet.',
    },
    articles: {
      readArticle: 'Read article',
      details: 'Details',
      consult: 'View',
      estimatedReadTime: 'min read',
      closeModal: 'Close',
      openExternal: 'Open external link',
    },
    contact: {
      copied: 'Copied to clipboard!',
      copyTooltip: 'Copy',
      sending: 'Securely sending your request…',
      successMessage: 'Message sent successfully!',
      errorMessage: 'Sending failed. Please try again or use the contact links directly.',
      requiredFields: 'Please fill in all required fields (*).',
      invalidEmail: 'Please enter a valid email address (e.g. name@domain.com).',
      openingMailClient: 'Opening your email client…',
      sendButton: 'Send message',
    },
    editor: {
      resetConfirmed: 'Portfolio reset to default state.',
      resetTitle: 'Factory Reset',
      resetDescription: 'Clears all browser customizations and reloads the default N-product configuration.',
      resetButton: 'Reset project',
      confirmResetButton: 'Confirm factory reset',
      cancelButton: 'Cancel',
    },
  },
};

/**
 * Traduction de repli pour les libellés de sections par défaut si l'utilisateur change de langue
 */
export const DEFAULT_SECTION_LABELS_BY_LOCALE: Record<SupportedLocale, Record<string, string>> = {
  fr: {
    hero: 'Accueil',
    skills: 'Compétences',
    projects: 'Projets',
    experience: 'Parcours',
    testimonials: 'Témoignages',
    articles: 'Publications',
    contact: 'Contact',
  },
  en: {
    hero: 'Home',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    testimonials: 'Testimonials',
    articles: 'Articles',
    contact: 'Contact',
  },
};
