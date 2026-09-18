/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_EDITOR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
