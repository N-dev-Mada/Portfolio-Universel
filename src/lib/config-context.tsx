import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import defaultConfig from '../data/portfolio-config.json';
import type { PortfolioConfig } from '../types/config';
import { applyFont } from './fonts';
import { applyTheme } from './themes';
import { deepMerge, downloadJson, setPath } from './utils';

const STORAGE_KEY = 'vpb:portfolio-config';

const DEFAULTS = defaultConfig as unknown as PortfolioConfig;

export function loadInitialConfig(): PortfolioConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULTS);
    return deepMerge(structuredClone(DEFAULTS), JSON.parse(raw));
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

  // Persistance locale
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      /* quota dépassé : on ignore silencieusement */
    }
  }, [config]);

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

  const importConfig = useCallback((json: string) => {
    const parsed = JSON.parse(json) as Partial<PortfolioConfig>;
    setConfigState(deepMerge(structuredClone(DEFAULTS), parsed));
    setDirty(true);
  }, []);

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
