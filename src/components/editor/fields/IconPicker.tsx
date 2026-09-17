import { useMemo, useState } from 'react';
import { cx } from '../../../lib/utils';
import Icon, { ICON_LIBRARY } from '../../ui/Icon';
import { Field } from './Fields';

export default function IconPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_LIBRARY;
    return ICON_LIBRARY.filter((n) => n.includes(q));
  }, [query]);

  return (
    <Field label={label}>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[rgb(var(--bg-base)/0.75)] border border-white/10 text-sm text-slate-100 hover:border-[rgb(var(--acc-1)/0.5)] transition-colors"
        >
          <span className="flex items-center gap-2 min-w-0">
            {value ? (
              <Icon name={value} className="w-4 h-4 text-[rgb(var(--acc-1))] shrink-0" />
            ) : (
              <span className="w-4 h-4 rounded bg-white/10 shrink-0" />
            )}
            <span className="truncate font-mono text-xs">{value || 'aucune'}</span>
          </span>
          <Icon name={open ? 'chevron-up' : 'chevron-down'} className="w-4 h-4 text-slate-500" />
        </button>

        {open && (
          <div className="rounded-lg border border-white/10 bg-[rgb(var(--bg-base)/0.9)] p-2 space-y-2">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une icône…"
              className="w-full px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-[rgb(var(--acc-1))]"
            />
            <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto editor-scroll">
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
                title="Aucune icône"
                className="aspect-square rounded-md flex items-center justify-center text-slate-500 hover:bg-white/10"
              >
                <Icon name="ban" className="w-4 h-4" />
              </button>
              {results.map((name) => (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={cx(
                    'aspect-square rounded-md flex items-center justify-center hover:bg-white/10 transition-colors',
                    value === name
                      ? 'bg-[rgb(var(--acc-1)/0.2)] text-[rgb(var(--acc-1))]'
                      : 'text-slate-300',
                  )}
                >
                  <Icon name={name} className="w-4 h-4" />
                </button>
              ))}
            </div>
            {results.length === 0 && (
              <p className="text-[11px] text-slate-500 text-center py-2">Aucun résultat.</p>
            )}
          </div>
        )}
      </div>
    </Field>
  );
}
