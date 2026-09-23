import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '../../../lib/utils';
import Icon from '../../ui/Icon';

let nextId = 0;
function generateStableId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  nextId += 1;
  return `vpb_item_${Date.now()}_${nextId}`;
}

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
  const list = items ?? [];
  const [keys, setKeys] = useState<string[]>(() => list.map(() => generateStableId()));
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  // Synchronisation des clés stables lorsque la taille de la liste change
  useEffect(() => {
    setKeys((prev) => {
      if (prev.length === list.length) return prev;
      if (list.length > prev.length) {
        const added = Array.from({ length: list.length - prev.length }, () => generateStableId());
        return [...prev, ...added];
      }
      return prev.slice(0, list.length);
    });
  }, [list.length]);

  const setItem = (index: number, patch: Partial<T>) => {
    const next = list.map((it, i) => (i === index ? { ...it, ...patch } : it));
    onChange(next);
  };

  const remove = (index: number) => {
    const targetKey = keys[index];
    const nextList = list.filter((_, i) => i !== index);
    const nextKeys = keys.filter((_, i) => i !== index);
    setKeys(nextKeys);
    onChange(nextList);
    if (openKey === targetKey) {
      setOpenKey(null);
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    const nextList = [...list];
    const [movedItem] = nextList.splice(from, 1);
    nextList.splice(to, 0, movedItem);

    const nextKeys = [...keys];
    const [movedKey] = nextKeys.splice(from, 1);
    nextKeys.splice(to, 0, movedKey);

    setKeys(nextKeys);
    onChange(nextList);
    setOpenKey(movedKey);
  };

  const handleAdd = () => {
    const newKey = generateStableId();
    setKeys((prev) => [...prev, newKey]);
    onChange([...list, create()]);
    setOpenKey(newKey);
  };

  return (
    <div className="space-y-2">
      {list.map((item, i) => {
        const itemKey = keys[i] || `fallback-${i}`;
        const isOpen = openKey === itemKey;

        return (
          <div
            key={itemKey}
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
                onClick={() => setOpenKey(isOpen ? null : itemKey)}
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
                onClick={() => setOpenKey(isOpen ? null : itemKey)}
                className="p-1 rounded text-slate-500 hover:text-white"
                aria-label="Déplier"
              >
                <Icon name={isOpen ? 'chevron-up' : 'pencil'} className="w-3.5 h-3.5" />
              </button>
            </div>

            {isOpen && (
              <div className="px-3 pb-3 pt-1 space-y-3 border-t border-white/5">
                {children(item, i, (patch) => setItem(i, patch))}
              </div>
            )}
          </div>
        );
      })}

      {list.length < max && (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/15 text-xs font-medium text-slate-400 hover:text-white hover:border-[rgb(var(--acc-1)/0.5)] transition-colors"
        >
          <Icon name="plus" className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
