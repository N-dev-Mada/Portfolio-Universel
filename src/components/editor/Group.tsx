import { useState, type ReactNode } from 'react';
import Icon from '../ui/Icon';

export default function Group({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-white/[0.03] transition-colors"
      >
        {icon && <Icon name={icon} className="w-4 h-4 text-[rgb(var(--acc-1))] shrink-0" />}
        <span className="flex-1 text-sm font-semibold text-slate-100">{title}</span>
        <Icon
          name={open ? 'chevron-up' : 'chevron-down'}
          className="w-4 h-4 text-slate-500 shrink-0"
        />
      </button>
      {open && <div className="px-3 pb-4 pt-1 space-y-3.5 border-t border-white/5">{children}</div>}
    </div>
  );
}
