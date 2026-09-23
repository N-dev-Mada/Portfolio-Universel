export interface FontOption {
  id: string;
  label: string;
  /** requête Google Fonts */
  query: string;
  stack: string;
}

export const FONTS: FontOption[] = [
  {
    id: 'Plus Jakarta Sans',
    label: 'Plus Jakarta Sans (moderne)',
    query: 'Plus+Jakarta+Sans:wght@300;400;500;600;700;800',
    stack: '"Plus Jakarta Sans", system-ui, sans-serif',
  },
  {
    id: 'Inter',
    label: 'Inter (neutre / tech)',
    query: 'Inter:wght@300;400;500;600;700;800',
    stack: '"Inter", system-ui, sans-serif',
  },
  {
    id: 'Space Grotesk',
    label: 'Space Grotesk (créatif)',
    query: 'Space+Grotesk:wght@300;400;500;600;700',
    stack: '"Space Grotesk", system-ui, sans-serif',
  },
  {
    id: 'Sora',
    label: 'Sora (design / produit)',
    query: 'Sora:wght@300;400;500;600;700;800',
    stack: '"Sora", system-ui, sans-serif',
  },
  {
    id: 'Playfair Display',
    label: 'Playfair Display (éditorial)',
    query: 'Playfair+Display:wght@400;500;600;700;800',
    stack: '"Playfair Display", Georgia, serif',
  },
  {
    id: 'DM Sans',
    label: 'DM Sans (business)',
    query: 'DM+Sans:wght@300;400;500;600;700',
    stack: '"DM Sans", system-ui, sans-serif',
  },
  {
    id: 'Lora',
    label: 'Lora (académique)',
    query: 'Lora:wght@400;500;600;700',
    stack: '"Lora", Georgia, serif',
  },
  {
    id: 'IBM Plex Sans',
    label: 'IBM Plex Sans (technique)',
    query: 'IBM+Plex+Sans:wght@300;400;500;600;700',
    stack: '"IBM Plex Sans", system-ui, sans-serif',
  },
];

export function getFont(id: string): FontOption {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}

const DYNAMIC_LINK_ID = 'vpb-dynamic-font';
const LEGACY_LINK_ID = 'vpb-google-font';

/** Supprime ou remplace proprement l'ancienne balise de police avant d'en injecter une nouvelle. */
export function loadGoogleFont(fontId: string): void {
  const font = getFont(fontId);
  const href = `https://fonts.googleapis.com/css2?family=${font.query}&display=swap`;

  // Nettoyage de l'ancienne balise orpheline pour éviter l'accumulation dans document.head
  const existingDynamic = document.getElementById(DYNAMIC_LINK_ID);
  if (existingDynamic && existingDynamic.parentNode) {
    existingDynamic.parentNode.removeChild(existingDynamic);
  }
  const existingLegacy = document.getElementById(LEGACY_LINK_ID);
  if (existingLegacy && existingLegacy.parentNode) {
    existingLegacy.parentNode.removeChild(existingLegacy);
  }

  // Création et injection de la balise propre
  const link = document.createElement('link');
  link.id = DYNAMIC_LINK_ID;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);

  document.documentElement.style.setProperty('--font-app', font.stack);
}

export const applyFont = loadGoogleFont;
