import { useEffect, useState } from 'react';
import { cx } from '../../lib/utils';
import Icon from '../ui/Icon';
import EditorPanel from './EditorPanel';

const STORAGE_SESSION_AUTH = 'vpb:editor_authorized';

function checkEditorAuthorization(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);

    // Révocation explicite
    if (params.get('admin') === 'false' || params.get('edit') === 'false') {
      sessionStorage.removeItem(STORAGE_SESSION_AUTH);
      return false;
    }

    // Autorisation par paramètre d'URL (?admin=true ou ?edit=true)
    if (params.get('admin') === 'true' || params.get('edit') === 'true') {
      sessionStorage.setItem(STORAGE_SESSION_AUTH, 'true');
      return true;
    }
  } catch {
    /* no-op */
  }

  // Maintien actif dans la session utilisateur après activation
  try {
    if (sessionStorage.getItem(STORAGE_SESSION_AUTH) === 'true') {
      return true;
    }
  } catch {
    /* no-op */
  }

  // Variable d'environnement explicite (ex: VITE_ENABLE_EDITOR !== 'false')
  const envFlag = import.meta.env.VITE_ENABLE_EDITOR;
  if (envFlag !== undefined) {
    return envFlag !== 'false';
  }

  // En environnement de développement local (Vite dev)
  if (import.meta.env.DEV) {
    return true;
  }

  return false;
}

export default function EditorLauncher() {
  const [authorized, setAuthorized] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isAuth = checkEditorAuthorization();
    setAuthorized(isAuth);

    if (!isAuth) return;

    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === 'N' || e.key === 'n' || e.code === 'KeyN')) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!authorized) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Éditeur visuel (Ctrl + Alt + N)"
        aria-label="Ouvrir l'éditeur visuel"
        className={cx(
          'fixed bottom-6 left-6 z-[70] w-11 h-11 rounded-full glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-[rgb(var(--acc-1))] hover:border-[rgb(var(--acc-1)/0.4)] shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer',
          open && 'opacity-0 pointer-events-none',
        )}
      >
        <Icon name="settings-2" className="w-5 h-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[75] bg-black/40 sm:bg-transparent sm:pointer-events-none"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <EditorPanel onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
}
