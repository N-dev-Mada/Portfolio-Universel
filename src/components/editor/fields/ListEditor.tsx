import { useState, type ReactNode } from 'react';
import { cx } from '../../../lib/utils';
import Icon from '../../ui/Icon';

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  /** Fabrique un nouvel élément vide. */
  create: () => T;
  /** Titre affiché dans l'en-tête repliable. */
  titleOf: (item: T, index: number) => string;
  /** Formulaire d'édition d'un élément. */
  children: (item: T, index: number, set: (patch: Partial<T>) => void) => ReactNode;
  addLabel?: string;
  max?: number;
}

export default function ListEditor<T>({
  items,
  onChange,
  create,
  titleOf,
  children,
  addLabel = 'Ajouter un élément',
  max = 24,
}: ListEditorProps<T>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const list = items ?? [];

  const setItem = (index: number, patch: Partial<T>) => {
    const next = list.map((it, i) => (i === index ? { ...it, ...patch } : it));
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(list.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    setOpenIndex(to);
  };

  return (
    <div className="space-y-2">
      {list.map((item, i) => (
        <div
          key={i}
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
            'rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden',
            dragIndex === i && 'dragging',
            overIndex === i && dragIndex !== null && dragIndex !== i && 'drag-over',
          )}
        >
          <div className="flex items-center gap-1 px-2 py-2">
            <span className="cursor-grab text-slate-600 px-1" title="Glisser pour réordonner">
              <Icon name="grip-vertical" className="w-4 h-4" />
            </span>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex-1 text-left text-xs font-medium text-slate-200 truncate hover:text-white"
            >
              {titleOf(item, i) || `Élément ${i + 1}`}
            </button>
            <button
              type="button"
              onClick={() => move(i, i - 1)}
              disabled={i === 0}
              className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-25"
              aria-label="Monter"
            >
              <Icon name="chevron-up" className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => move(i, i + 1)}
              disabled={i === list.length - 1}
              className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-25"
              aria-label="Descendre"
            >
              <Icon name="chevron-down" className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1 rounded text-slate-500 hover:text-rose-400"
              aria-label="Supprimer"
            >
              <Icon name="trash-2" className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="p-1 rounded text-slate-500 hover:text-white"
              aria-label="Déplier"
            >
              <Icon name={openIndex === i ? 'chevron-up' : 'pencil'} className="w-3.5 h-3.5" />
            </button>
          </div>

          {openIndex === i && (
            <div className="px-3 pb-3 pt-1 space-y-3 border-t border-white/5">
              {children(item, i, (patch) => setItem(i, patch))}
            </div>
          )}
        </div>
      ))}

      {list.length < max && (
        <button
          type="button"
          onClick={() => {
            onChange([...list, create()]);
            setOpenIndex(list.length);
          }}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/15 text-xs font-medium text-slate-400 hover:text-white hover:border-[rgb(var(--acc-1)/0.5)] transition-colors"
        >
          <Icon name="plus" className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
