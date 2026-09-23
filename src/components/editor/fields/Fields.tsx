import { useRef, useState, type ReactNode } from 'react';
import { cx, compressImageFile } from '../../../lib/utils';
import Icon from '../../ui/Icon';
import { useToast } from '../../ui/Toast';

const BASE =
  'w-full px-3 py-2 rounded-lg bg-[rgb(var(--bg-base)/0.75)] border border-white/10 text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-[rgb(var(--acc-1))] focus:ring-2 focus:ring-[rgb(var(--acc-1)/0.25)] transition-all';

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-slate-500">{hint}</span>}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="text"
        className={BASE}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={rows}
        className={cx(BASE, 'resize-y leading-relaxed')}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-[rgb(var(--acc-1))]"
        />
        <span className="text-xs font-mono text-slate-300 w-10 text-right">{value ?? 0}</span>
      </div>
    </Field>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <select
        className={cx(BASE, 'cursor-pointer')}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[rgb(var(--surface))] text-[rgb(var(--text-primary))]">
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function ToggleField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1">
      <span className="block">
        <span className="block text-sm font-medium text-slate-200">{label}</span>
        {hint && <span className="block text-[11px] text-slate-500">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cx(
          'relative w-11 h-6 rounded-full transition-colors shrink-0 mt-0.5',
          value ? 'bg-[rgb(var(--acc-1))]' : 'bg-white/15',
        )}
      >
        <span
          className={cx(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform',
            value && 'translate-x-5',
          )}
        />
      </button>
    </div>
  );
}

export function TagsField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint ?? 'Séparez les éléments par une virgule.'}>
      <input
        type="text"
        className={BASE}
        value={(value ?? []).join(', ')}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
          )
        }
      />
    </Field>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressing, setCompressing] = useState(false);
  const { toast } = useToast();

  const pick = async (file?: File) => {
    if (!file) return;
    setCompressing(true);
    const t = toast('Optimisation de l’image…', 'loading');
    try {
      const dataUrl = await compressImageFile(file, 800, 800, 0.82);
      onChange(dataUrl);
      t.update('Image optimisée avec succès (< 150 Ko).', 'success', 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Échec du traitement de l’image.';
      t.update(msg, 'error', 4500);
    } finally {
      setCompressing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <Field label={label} hint={hint ?? 'Collez une URL ou téléversez un fichier (auto-optimisé < 150 Ko).'}>
      <div className="space-y-2">
        <input
          type="text"
          className={BASE}
          placeholder="https://… ou data:image/…"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={compressing}
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-badge text-xs font-medium text-slate-300 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Icon name={compressing ? 'loader-2' : 'upload'} className={cx('w-3.5 h-3.5', compressing && 'animate-spin')} />
            <span>{compressing ? 'Optimisation…' : 'Téléverser'}</span>
          </button>
          {value && (
            <>
              <button
                type="button"
                onClick={() => onChange('')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-badge text-xs font-medium text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
              >
                <Icon name="trash-2" className="w-3.5 h-3.5" />
                Retirer
              </button>
              <img
                src={value}
                alt=""
                className="w-9 h-9 rounded-lg object-cover border border-white/10 ml-auto"
              />
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>
    </Field>
  );
}
