import { useState } from 'react';
import { useConfig } from '../../../lib/config-context';
import { cx, slugify } from '../../../lib/utils';
import type { SectionDescriptor, SectionType } from '../../../types/config';
import Icon from '../../ui/Icon';

const TYPE_ICON: Record<SectionType, string> = {
  hero: 'home',
  skills: 'sparkles',
  projects: 'layers',
  experience: 'milestone',
  testimonials: 'quote',
  contact: 'mail',
};

export default function SectionsTab() {
  const { config, update } = useConfig();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);

  const sections = config.sections;

  const setSections = (next: SectionDescriptor[]) => update('sections', next);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= sections.length || from === to) return;
    const next = [...sections];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setSections(next);
  };

  const patch = (index: number, p: Partial<SectionDescriptor>) => {
    setSections(sections.map((s, i) => (i === index ? { ...s, ...p } : s)));
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400 leading-relaxed">
        Glissez les sections pour changer leur ordre d’affichage, désactivez celles dont vous n’avez
        pas besoin, renommez leur libellé de navigation.
      </p>

      <div className="space-y-2">
        {sections.map((s, i) => (
          <div
            key={s.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setOverIndex(i);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) move(dragIndex, i);
              setDragIndex(null);
              setOverIndex(null);
            }}
            className={cx(
              'rounded-lg border bg-white/[0.03] transition-colors',
              s.enabled ? 'border-white/10' : 'border-white/5 opacity-60',
              dragIndex === i && 'dragging',
              overIndex === i && dragIndex !== null && dragIndex !== i && 'drag-over',
            )}
          >
            <div className="flex items-center gap-2 px-2 py-2.5">
              <span className="cursor-grab text-slate-600" title="Glisser pour réordonner">
                <Icon name="grip-vertical" className="w-4 h-4" />
              </span>
              <Icon
                name={TYPE_ICON[s.type] ?? 'square'}
                className="w-4 h-4 text-[rgb(var(--acc-1))] shrink-0"
              />

              {editing === i ? (
                <input
                  autoFocus
                  value={s.label}
                  onChange={(e) => patch(i, { label: e.target.value })}
                  onBlur={() => setEditing(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditing(null)}
                  className="flex-1 px-2 py-1 rounded bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[rgb(var(--acc-1))]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(i)}
                  className="flex-1 text-left text-sm font-medium text-slate-200 hover:text-white truncate"
                >
                  {s.label}
                  <span className="ml-2 text-[10px] font-mono text-slate-600">#{s.id}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => patch(i, { label: s.label, id: slugify(s.label) })}
                title="Synchroniser l'ancre sur le libellé"
                className="p-1 rounded text-slate-600 hover:text-slate-300"
              >
                <Icon name="link" className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={s.enabled}
                onClick={() => patch(i, { enabled: !s.enabled })}
                className={cx(
                  'relative w-10 h-[22px] rounded-full transition-colors shrink-0',
                  s.enabled ? 'bg-[rgb(var(--acc-1))]' : 'bg-white/15',
                )}
                aria-label={s.enabled ? 'Désactiver la section' : 'Activer la section'}
              >
                <span
                  className={cx(
                    'absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white transition-transform',
                    s.enabled && 'translate-x-[18px]',
                  )}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-slate-500 leading-relaxed border-t border-white/5 pt-3">
        Une section reste masquée si son contenu est vide, même activée. Les types disponibles sont
        fixés par l’architecture : accueil, compétences, projets/galerie, expériences, témoignages,
        contact.
      </div>
    </div>
  );
}
