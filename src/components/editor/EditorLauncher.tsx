import { useEffect, useState } from 'react';
import { cx } from '../../lib/utils';
import Icon from '../ui/Icon';
import EditorPanel from './EditorPanel';

export default function EditorLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Éditeur visuel (Ctrl + Shift + E)"
        aria-label="Ouvrir l'éditeur visuel"
        className={cx(
          'fixed bottom-6 left-6 z-[70] w-11 h-11 rounded-full glass-panel border border-white/10 flex items-center justify-center text-slate-400 hover:text-[rgb(var(--acc-1))] hover:border-[rgb(var(--acc-1)/0.4)] shadow-lg transition-all hover:scale-105 active:scale-95',
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
