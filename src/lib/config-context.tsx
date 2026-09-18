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
import { useOptionalToast } from '../components/ui/Toast';
import defaultConfig from '../data/portfolio-config.json';
import type { PortfolioConfig } from '../types/config';
import { applyFont } from './fonts';
import { applyTheme } from './themes';
import { deepMerge, downloadJson, setPath } from './utils';
import { validatePortfolioConfig } from './validation';

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
    return deepMerge(structuredClone(DEFAULTS), validation.data!);
  } catch {
    return structuredClone(DEFAULTS);
  }
}

interface ConfigContextValue {
  config: PortfolioConfig;
  /** Remplace intégralement la configuration. */
  setConfig: (next: PortfolioConfig) => void;
  /** Met à jour une valeur via son chemin ("hero.title", "skills.categories.0.title"). */
  update: (path: string, value: unknown) => void;
  reset: () => void;
  exportConfig: () => void;
  importConfig: (json: string) => void;
  dirty: boolean;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<PortfolioConfig>(() => loadInitialConfig());
  const [dirty, setDirty] = useState(false);
  const toastContext = useOptionalToast();
  const isFirstRender = useRef(true);

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
        toastContext?.toast(
          'Quota de stockage local dépassé : votre modification n’a pas pu être enregistrée. Pensez à réduire la taille des images importées.',
          'error',
          6000,
        );
      } else {
        toastContext?.toast(
          'Erreur inattendue lors de la sauvegarde dans le stockage local.',
          'error',
          4000,
        );
      }
    }
  }, [config, toastContext]);

  // Thème + typographie + méta
  useEffect(() => {
    applyTheme(config.theme.preset, config.theme.radius);
    applyFont(config.theme.font);
  }, [config.theme.preset, config.theme.radius, config.theme.font]);

  useEffect(() => {
    if (config.meta.title) document.title = config.meta.title;
    document.documentElement.lang = config.meta.lang || 'fr';
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', config.meta.description || '');
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

  const exportConfig = useCallback(() => {
    downloadJson(config, 'portfolio-config.json');
  }, [config]);

  const importConfig = useCallback(
    (json: string) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(json);
      } catch {
        const errMsg = 'Format de fichier invalide : JSON illisible ou malformé.';
        toastContext?.toast(errMsg, 'error', 5000);
        throw new Error(errMsg);
      }

      const validation = validatePortfolioConfig(parsed);
      if (!validation.success) {
        const errMsg = `Configuration invalide : ${validation.error}`;
        toastContext?.toast(errMsg, 'error', 6000);
        throw new Error(errMsg);
      }

      setConfigState(deepMerge(structuredClone(DEFAULTS), validation.data!));
      setDirty(true);
    },
    [toastContext],
  );

  const value = useMemo<ConfigContextValue>(
    () => ({ config, setConfig, update, reset, exportConfig, importConfig, dirty }),
    [config, setConfig, update, reset, exportConfig, importConfig, dirty],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): ConfigContextValue {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig doit être utilisé dans <ConfigProvider>');
  return ctx;
}
