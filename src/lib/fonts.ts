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

const LINK_ID = 'vpb-google-font';

/** Injecte (ou remplace) la feuille Google Fonts et applique la pile typographique. */
export function applyFont(fontId: string): void {
  const font = getFont(fontId);
  let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const href = `https://fonts.googleapis.com/css2?family=${font.query}&display=swap`;
  if (link.href !== href) link.href = href;
  document.documentElement.style.setProperty('--font-app', font.stack);
}
