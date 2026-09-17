import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '../../lib/utils';
import Icon from './Icon';

export type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastHandle {
  update: (message: string, type?: ToastType, duration?: number) => void;
  dismiss: () => void;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => ToastHandle;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const STYLES: Record<ToastType, string> = {
  loading: 'border-sky-500/50 text-sky-300',
  success: 'border-emerald-500/50 text-emerald-300',
  error: 'border-rose-500/50 text-rose-300',
  info: 'border-[rgb(var(--acc-1)/0.5)] text-[rgb(var(--acc-1))]',
};

function ToastIcon({ type }: { type: ToastType }) {
  if (type === 'loading') {
    return (
      <span className="relative w-7 h-7 flex items-center justify-center shrink-0">
        <span className="absolute inset-0 rounded-full bg-sky-500/20 animate-ping opacity-75" />
        <Icon name="loader-2" className="w-5 h-5 text-sky-400 animate-spin-smooth" />
      </span>
    );
  }
  const map: Record<string, { icon: string; cls: string }> = {
    success: { icon: 'check', cls: 'bg-emerald-500/20 text-emerald-400' },
    error: { icon: 'x', cls: 'bg-rose-500/20 text-rose-400' },
    info: { icon: 'info', cls: 'bg-[rgb(var(--acc-1)/0.2)] text-[rgb(var(--acc-1))]' },
  };
  const conf = map[type] ?? map.info;
  return (
    <span className={cx('w-7 h-7 rounded-full flex items-center justify-center shrink-0', conf.cls)}>
      <Icon name={conf.icon} className="w-4 h-4" />
    </span>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, number>>(new Map());
  const seq = useRef(0);

  const remove = useCallback((id: number) => {
    const t = timers.current.get(id);
    if (t) window.clearTimeout(t);
    timers.current.delete(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const schedule = useCallback(
    (id: number, ms: number) => {
      const existing = timers.current.get(id);
      if (existing) window.clearTimeout(existing);
      timers.current.set(id, window.setTimeout(() => remove(id), ms));
    },
    [remove],
  );

  const toast = useCallback(
    (message: string, type: ToastType = 'success', duration = 3500): ToastHandle => {
      seq.current += 1;
      const id = seq.current;
      setItems((prev) => [...prev, { id, message, type }]);
      schedule(id, type === 'loading' ? 10000 : duration);

      return {
        update: (newMessage, newType = 'success', newDuration = 3200) => {
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, message: newMessage, type: newType } : i)),
          );
          schedule(id, newDuration);
        },
        dismiss: () => remove(id),
      };
    },
    [remove, schedule],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => window.clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 pointer-events-none max-w-[min(22rem,calc(100vw-3rem))]"
        role="region"
        aria-live="polite"
      >
        {items.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cx(
              'toast-enter pointer-events-auto relative overflow-hidden px-4 py-3 rounded-xl glass-panel border flex items-center gap-3 shadow-2xl',
              STYLES[item.type],
            )}
          >
            <ToastIcon type={item.type} />
            <span className="text-xs font-semibold text-slate-100 flex-1 leading-snug">
              {item.message}
            </span>
            {item.type === 'loading' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-950/60 overflow-hidden">
                <span className="block h-full w-1/2 bg-gradient-to-r from-sky-500 to-indigo-400 animate-toast-progress" />
              </span>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans <ToastProvider>');
  return ctx;
}
