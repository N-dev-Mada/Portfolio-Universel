import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useToast } from '../components/ui/Toast';
import defaultConfig from '../data/portfolio-config.json';
import type { PortfolioConfig } from '../types/config';
import { applyFont } from './fonts';
import { applyTheme } from './themes';
import { deepMerge, downloadJson, setPath } from './utils';
import { validatePortfolioConfig } from './validation';
import { exportStandaloneHtml } from './export';
import { TRANSLATIONS, type SupportedLocale, type Translations } from './i18n';

export const STORAGE_KEY = 'vpb:portfolio-config';

const DEFAULTS = defaultConfig as unknown as PortfolioConfig;

export function loadInitialConfig(): PortfolioConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const parsed = JSON.parse(raw);
    const validation = validatePortfolioConfig(parsed);
    if (!validation.success) {
      console.warn('Configuration locale corrompue ignorée :', validation.error);
      return structuredClone(DEFAULTS);
    }
    const merged = deepMerge(structuredClone(DEFAULTS), validation.data!);
    // Si l'ancien thème enregistré n'existe plus (ex: thèmes clairs supprimés), basculer sur le thème par défaut
    if (merged.theme?.preset && !['violet-cyan', 'emerald-teal', 'rose-amber', 'mono'].includes(merged.theme.preset)) {
      merged.theme.preset = DEFAULTS.theme.preset;
    }
    return merged;
  } catch {
    return structuredClone(DEFAULTS);
  }
}

interface ConfigContextValue {
  config: PortfolioConfig;
  /** Langue active ('fr' | 'en') */
  locale: SupportedLocale;
  /** Dictionnaire de traduction de l'interface pour la langue active */
  t: Translations;
  /** Modifie la langue active et synchronise config.meta.lang et le DOM */
  setLocale: (locale: SupportedLocale) => void;
  /** Remplace intégralement la configuration. */
  setConfig: (next: PortfolioConfig) => void;
  /** Met à jour une valeur via son chemin ("hero.title", "skills.categories.0.title"). */
  update: (path: string, value: unknown) => void;
  /** Alias de réinitialisation simple */
  reset: () => void;
  /** Réinitialisation complète à l'état d'origine (Restauration d'usine) */
  resetToDefaults: () => void;
  exportConfig: () => void;
  exportStandalone: () => void;
  importConfig: (json: string) => void;
  dirty: boolean;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<PortfolioConfig>(() => loadInitialConfig());
  const [dirty, setDirty] = useState(false);
  const { toast } = useToast();
  const isFirstRender = useRef(true);

  // Normalisation de la langue active
  const locale: SupportedLocale =
    config.meta.lang === 'en' ? 'en' : 'fr';
  const t: Translations = TRANSLATIONS[locale] || TRANSLATIONS.fr;

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    setConfigState((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        lang: newLocale,
      },
    }));
    setDirty(true);
  }, []);

  // Persistance locale avec interception des dépassements de quota
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      } catch (err) {
        console.warn('Impossible d’écrire la configuration initiale dans le stockage local :', err);
      }
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (err: unknown) {
      console.error('Erreur de persistance dans le stockage local :', err);
      const isQuota =
        (err instanceof DOMException &&
          (err.name === 'QuotaExceededError' ||
            err.code === 22 ||
            err.code === 1014 ||
            err.name === 'NS_ERROR_DOM_QUOTA_REACHED')) ||
        (typeof err === 'object' &&
          err !== null &&
          'name' in err &&
          (err as { name: string }).name === 'QuotaExceededError');

      if (isQuota) {
        toast(
          'Quota de stockage local dépassé : votre modification n’a pas pu être enregistrée. Pensez à réduire la taille des images importées.',
          'error',
          6000,
        );
      } else {
        toast(
          'Erreur inattendue lors de la sauvegarde dans le stockage local.',
          'error',
          4000,
        );
      }
    }
  }, [config, toast]);

  // Thème + typographie + méta
  useEffect(() => {
    applyTheme(config.theme.preset, config.theme.radius);
    applyFont(config.theme.font);
  }, [config.theme.preset, config.theme.radius, config.theme.font]);

  useEffect(() => {
    if (config.meta.title) document.title = config.meta.title;
    document.documentElement.lang = config.meta.lang || 'fr';

    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content || '');
    };

    setMetaTag('name', 'description', config.meta.description || '');
    setMetaTag('property', 'og:title', config.meta.title || '');
    setMetaTag('property', 'og:description', config.meta.description || '');
  }, [config.meta.title, config.meta.description, config.meta.lang]);

  const setConfig = useCallback((next: PortfolioConfig) => {
    setConfigState(next);
    setDirty(true);
  }, []);

  const update = useCallback((path: string, value: unknown) => {
    setConfigState((prev) => setPath(prev, path, value));
    setDirty(true);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setConfigState(structuredClone(DEFAULTS));
    setDirty(false);
  }, []);

  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Erreur lors du nettoyage de localStorage :', err);
    }
    const freshDefaults = structuredClone(DEFAULTS);
    setConfigState(freshDefaults);
    setDirty(false);
    toast(t.editor.resetConfirmed, 'success', 4000);
  }, [t.editor.resetConfirmed, toast]);

  const exportConfig = useCallback(() => {
    downloadJson(config, 'portfolio-config.json');
  }, [config]);

  const exportStandalone = useCallback(() => {
    const filename = `${config.identity.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'portfolio'}-site.html`;
    exportStandaloneHtml(config, filename);
  }, [config]);

  const importConfig = useCallback(
    (json: string) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(json);
      } catch {
        const errMsg = 'Format de fichier invalide : JSON illisible ou malformé.';
        toast(errMsg, 'error', 5000);
        throw new Error(errMsg);
      }

      const validation = validatePortfolioConfig(parsed);
      if (!validation.success) {
        const errMsg = `Configuration invalide : ${validation.error}`;
        toast(errMsg, 'error', 6000);
        throw new Error(errMsg);
      }

      setConfigState(deepMerge(structuredClone(DEFAULTS), validation.data!));
      setDirty(true);
    },
    [toast],
  );

  const value = useMemo<ConfigContextValue>(
    () => ({
      config,
      locale,
      t,
      setLocale,
      setConfig,
      update,
      reset,
      resetToDefaults,
      exportConfig,
      exportStandalone,
      importConfig,
      dirty,
    }),
    [
      config,
      locale,
      t,
      setLocale,
      setConfig,
      update,
      reset,
      resetToDefaults,
      exportConfig,
      exportStandalone,
      importConfig,
      dirty,
    ],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig doit être utilisé dans <ConfigProvider>');
  return ctx;
}
