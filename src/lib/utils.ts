import type { AccentIndex } from '../types/config';

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Un champ est "rempli" (donc affichable) s'il n'est ni vide ni uniquement des espaces. */
export function filled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'number') return true;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'object') return Object.keys(value as object).length > 0;
  return Boolean(value);
}

/** Retire les entrées vides d'une liste d'objets sur la base d'une clé requise. */
export function keepFilled<T>(list: T[] | undefined, key: keyof T): T[] {
  if (!Array.isArray(list)) return [];
  return list.filter((item) => filled(item?.[key]));
}

/** Style inline exposant --c / --c-rgb pour une carte accentuée. */
export function accentStyle(accent: AccentIndex | number | undefined): React.CSSProperties {
  const n = accent === 2 || accent === 3 ? accent : 1;
  return { ['--c' as string]: `var(--acc-${n})` } as React.CSSProperties;
}

/** Fusion profonde : la config utilisateur complète les valeurs par défaut manquantes. */
export function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(base) || Array.isArray(patch)) return (patch as T) ?? base;
  if (typeof base !== 'object' || typeof patch !== 'object') return (patch as T) ?? base;

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
    const b = (base as Record<string, unknown>)[k];
    out[k] = b !== undefined && typeof b === 'object' && b !== null && !Array.isArray(b)
      ? deepMerge(b, v)
      : v;
  }
  return out as T;
}

/** Récupère une valeur imbriquée via chemin "a.b.0.c". */
export function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

/** Retourne une copie de obj avec la valeur définie au chemin donné (immuable). */
export function setPath<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const clone = Array.isArray(obj) ? [...(obj as unknown[])] : { ...(obj as object) };
  let cursor: Record<string, unknown> = clone as Record<string, unknown>;

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    const current = cursor[key];
    const copy = Array.isArray(current) ? [...current] : { ...(current as object) };
    cursor[key] = copy;
    cursor = copy as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return clone as T;
}

export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

export function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Lecture du fichier impossible'));
    reader.readAsText(file);
  });
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Lecture de l’image impossible'));
    reader.readAsDataURL(file);
  });
}

/**
 * Redimensionne et compresse une image côté client via un élément Canvas
 * pour préserver les performances et le quota du stockage local (< 150 Ko).
 */
export function compressImageFile(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Le fichier sélectionné n’est pas une image valide.'));
    }

    // Préserver les fichiers vectoriels SVG
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Lecture du fichier vectoriel SVG impossible.'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Lecture du fichier image impossible.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Fichier image corrompu ou illisible.'));
      img.onload = () => {
        let { width, height } = img;

        if (width <= 0 || height <= 0) {
          return reject(new Error('Dimensions d’image invalides.'));
        }

        // Conservation du ratio d'aspect
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.max(1, Math.round(width * ratio));
          height = Math.max(1, Math.round(height * ratio));
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Initialisation du contexte Canvas impossible.'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Tentative d'encodage en WebP, fallback vers JPEG
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData && webpData.startsWith('data:image/webp')) {
            return resolve(webpData);
          }
        } catch {
          /* fallback to jpeg */
        }

        const jpegData = canvas.toDataURL('image/jpeg', quality);
        resolve(jpegData);
      };
      img.src = String(e.target?.result);
    };
    reader.readAsDataURL(file);
  });
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
