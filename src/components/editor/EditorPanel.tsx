import { useState } from 'react';
import { cx } from '../../lib/utils';
import Icon from '../ui/Icon';
import ContentTab from './tabs/ContentTab';
import CreditsTab from './tabs/CreditsTab';
import DataTab from './tabs/DataTab';
import GeneralTab from './tabs/GeneralTab';
import SectionsTab from './tabs/SectionsTab';
import ThemeTab from './tabs/ThemeTab';

type TabId = 'general' | 'content' | 'sections' | 'theme' | 'data' | 'credits';

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'general', label: 'Général', icon: 'user' },
  { id: 'content', label: 'Contenu', icon: 'file-text' },
  { id: 'sections', label: 'Sections', icon: 'layout-list' },
  { id: 'theme', label: 'Style', icon: 'palette' },
  { id: 'data', label: 'Données', icon: 'database' },
  { id: 'credits', label: 'Crédits', icon: 'sparkles' },
];

export default function EditorPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<TabId>('general');

  return (
    <aside
      className="panel-enter fixed top-0 right-0 z-[80] h-dvh w-full sm:w-[420px] flex flex-col border-l border-white/10 bg-[rgb(var(--bg-base)/0.97)] backdrop-blur-xl shadow-2xl"
      role="dialog"
      aria-label="Éditeur visuel du portfolio"
    >
      <header className="flex items-center gap-3 px-4 h-16 border-b border-white/10 shrink-0">
        <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] flex items-center justify-center text-[rgb(var(--bg-base))] shrink-0">
          <Icon name="wand-2" className="w-4 h-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-white leading-tight">Portfolio Builder</span>
          <span className="block text-[11px] text-slate-400">Édition en direct — aucun code requis</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fermer l'éditeur"
        >
          <Icon name="x" className="w-5 h-5" />
        </button>
      </header>

      <nav className="flex items-center gap-1 px-2 py-2 border-b border-white/10 shrink-0 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cx(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
              tab === t.id
                ? 'bg-[rgb(var(--acc-1)/0.15)] text-[rgb(var(--acc-1))]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
          >
            <Icon name={t.icon} className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto editor-scroll px-4 py-4">
        {tab === 'general' && <GeneralTab />}
        {tab === 'content' && <ContentTab />}
        {tab === 'sections' && <SectionsTab />}
        {tab === 'theme' && <ThemeTab />}
        {tab === 'data' && <DataTab />}
        {tab === 'credits' && <CreditsTab />}
      </div>

      <footer className="px-4 py-2.5 border-t border-white/10 text-[11px] text-slate-500 shrink-0 flex items-center justify-between gap-2">
        <span>Sauvegarde automatique locale</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
          Ctrl + Alt + N
        </kbd>
      </footer>
    </aside>
  );
}
