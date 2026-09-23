export interface ThemePreset {
  id: string;
  label: string;
  /** rgb triplets "r g b" pour compatibilité avec rgb(var(--x) / alpha) */
  acc1: string;
  acc2: string;
  acc3: string;
  /** couleur de fond principale (triplet RGB) */
  bg: string;
  /** surface vitrée (triplet RGB) */
  surface: string;
  /** texte principal (triplet RGB) */
  textPrimary?: string;
  /** texte secondaire (triplet RGB) */
  textSecondary?: string;
  /** bordure de base */
  borderBase?: string;
  /** mode clair ou sombre */
  mode?: 'dark' | 'light';
  swatch: [string, string];
}

export const THEMES: ThemePreset[] = [
  {
    id: 'violet-cyan',
    label: 'Violet / Cyan',
    acc1: '167 139 250',
    acc2: '56 189 248',
    acc3: '52 211 153',
    bg: '3 7 18',
    surface: '15 23 42',
    textPrimary: '248 250 252',
    textSecondary: '148 163 184',
    borderBase: '255 255 255 / 0.08',
    mode: 'dark',
    swatch: ['#a78bfa', '#38bdf8'],
  },
  {
    id: 'emerald-teal',
    label: 'Émeraude / Teck',
    acc1: '52 211 153',
    acc2: '45 212 191',
    acc3: '132 204 22',
    bg: '2 12 10',
    surface: '6 30 26',
    textPrimary: '248 250 252',
    textSecondary: '148 163 184',
    borderBase: '255 255 255 / 0.08',
    mode: 'dark',
    swatch: ['#34d399', '#2dd4bf'],
  },
  {
    id: 'rose-amber',
    label: 'Rose / Ambre',
    acc1: '244 114 182',
    acc2: '251 191 36',
    acc3: '248 113 113',
    bg: '14 5 12',
    surface: '35 12 30',
    textPrimary: '248 250 252',
    textSecondary: '148 163 184',
    borderBase: '255 255 255 / 0.08',
    mode: 'dark',
    swatch: ['#f472b6', '#fbbf24'],
  },
  {
    id: 'mono',
    label: 'Noir & Blanc minimal',
    acc1: '244 244 245',
    acc2: '161 161 170',
    acc3: '212 212 216',
    bg: '9 9 11',
    surface: '24 24 27',
    textPrimary: '248 250 252',
    textSecondary: '148 163 184',
    borderBase: '255 255 255 / 0.08',
    mode: 'dark',
    swatch: ['#fafafa', '#a1a1aa'],
  },
];

export function getTheme(id: string): ThemePreset {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export const RADIUS_MAP: Record<string, string> = {
  sm: '0.375rem',
  md: '0.625rem',
  lg: '0.875rem',
  xl: '1rem',
};

/** Applique le thème sur <html> via variables CSS. */
export function applyTheme(presetId: string, radius: string): void {
  const t = getTheme(presetId);
  const root = document.documentElement;
  root.style.setProperty('--acc-1', t.acc1);
  root.style.setProperty('--acc-2', t.acc2);
  root.style.setProperty('--acc-3', t.acc3);
  root.style.setProperty('--bg-base', t.bg);
  root.style.setProperty('--bg-surface', t.surface);
  root.style.setProperty('--surface', t.surface);
  root.style.setProperty('--text-primary', t.textPrimary ?? '248 250 252');
  root.style.setProperty('--text-secondary', t.textSecondary ?? '148 163 184');
  root.style.setProperty('--border-base', t.borderBase ?? '255 255 255 / 0.08');
  root.style.setProperty('--radius-app', RADIUS_MAP[radius] ?? RADIUS_MAP.xl);

  if (t.mode === 'light') {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  } else {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  }
}
