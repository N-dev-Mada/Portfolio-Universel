import type { PortfolioConfig, SectionDescriptor, SectionType } from '../types/config';

export interface ValidationResult {
  success: boolean;
  error?: string;
  data?: Partial<PortfolioConfig>;
}

const VALID_SECTION_TYPES: readonly SectionType[] = [
  'hero',
  'skills',
  'projects',
  'experience',
  'testimonials',
  'articles',
  'contact',
];

/**
 * Valide de manière défensive la structure d'une configuration de portfolio
 * pour empêcher les corruptions du localStorage et les écrans blancs.
 */
export function validatePortfolioConfig(input: unknown): ValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      success: false,
      error: 'Le fichier JSON doit contenir un objet racine valide.',
    };
  }

  const data = input as Record<string, unknown>;

  // Validation stricte du tableau des sections
  if ('sections' in data) {
    if (!Array.isArray(data.sections)) {
      return {
        success: false,
        error: "La propriété 'sections' doit impérativement être un tableau.",
      };
    }

    if (data.sections.length === 0) {
      return {
        success: false,
        error: "Le tableau 'sections' ne peut pas être vide.",
      };
    }

    for (let i = 0; i < data.sections.length; i++) {
      const section = data.sections[i];
      if (!section || typeof section !== 'object' || Array.isArray(section)) {
        return {
          success: false,
          error: `La section à l'index ${i} n'est pas un objet valide.`,
        };
      }

      const s = section as Partial<SectionDescriptor>;

      if (typeof s.id !== 'string' || !s.id.trim()) {
        return {
          success: false,
          error: `La section à l'index ${i} doit avoir un identifiant ('id') textuel non vide.`,
        };
      }

      if (typeof s.type !== 'string' || !VALID_SECTION_TYPES.includes(s.type as SectionType)) {
        return {
          success: false,
          error: `La section '${s.id}' a un type inconnu ou manquant ('${s.type}'). Types autorisés : ${VALID_SECTION_TYPES.join(', ')}.`,
        };
      }

      if (typeof s.label !== 'string') {
        return {
          success: false,
          error: `La section '${s.id}' doit contenir un libellé ('label') textuel.`,
        };
      }

      if (typeof s.enabled !== 'boolean') {
        return {
          success: false,
          error: `La section '${s.id}' doit définir un attribut 'enabled' de type booléen.`,
        };
      }
    }
  }

  // Validation défensive du thème si spécifié
  if ('theme' in data && data.theme !== undefined) {
    if (!data.theme || typeof data.theme !== 'object' || Array.isArray(data.theme)) {
      return {
        success: false,
        error: "La section 'theme' doit être un objet valide.",
      };
    }
    const theme = data.theme as Record<string, unknown>;
    if ('radius' in theme && theme.radius !== undefined) {
      if (!['sm', 'md', 'lg', 'xl'].includes(theme.radius as string)) {
        return {
          success: false,
          error: "Le rayon 'theme.radius' doit être l'une des valeurs : 'sm', 'md', 'lg', 'xl'.",
        };
      }
    }
  }

  // Validation défensive des méta si spécifié
  if ('meta' in data && data.meta !== undefined) {
    if (!data.meta || typeof data.meta !== 'object' || Array.isArray(data.meta)) {
      return {
        success: false,
        error: "La section 'meta' doit être un objet valide.",
      };
    }
  }

  // Validation défensive de identity si spécifié
  if ('identity' in data && data.identity !== undefined) {
    if (!data.identity || typeof data.identity !== 'object' || Array.isArray(data.identity)) {
      return {
        success: false,
        error: "La section 'identity' doit être un objet valide.",
      };
    }
  }

  return {
    success: true,
    data: data as Partial<PortfolioConfig>,
  };
}
