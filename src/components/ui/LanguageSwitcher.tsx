import { useConfig } from '../../lib/config-context';
import type { SupportedLocale } from '../../lib/i18n';
import { cx } from '../../lib/utils';
import Icon from './Icon';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'compact' | 'segmented';
  className?: string;
  showIcon?: boolean;
}

export default function LanguageSwitcher({
  variant = 'segmented',
  className,
  showIcon = true,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useConfig();

  const handleSelect = (nextLocale: SupportedLocale) => {
    if (nextLocale !== locale) {
      setLocale(nextLocale);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => handleSelect(locale === 'fr' ? 'en' : 'fr')}
        className={cx(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg glass-badge text-xs font-semibold tracking-wide text-slate-200 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]',
          className,
        )}
        title={locale === 'fr' ? 'Switch to English' : 'Passer en Français'}
        aria-label="Commuter de langue (FR / EN)"
      >
        {showIcon && <Icon name="globe" className="w-3.5 h-3.5 text-[rgb(var(--acc-1))]" />}
        <span className="uppercase font-mono">{locale === 'fr' ? 'EN' : 'FR'}</span>
      </button>
    );
  }

  return (
    <div
      className={cx(
        'inline-flex items-center p-1 rounded-xl glass-badge border border-white/10 select-none text-xs font-semibold',
        className,
      )}
      role="group"
      aria-label="Sélection de la langue"
    >
      {showIcon && (
        <span className="pl-1.5 pr-1 text-slate-400">
          <Icon name="globe" className="w-3.5 h-3.5 text-[rgb(var(--acc-1))]" />
        </span>
      )}
      <button
        type="button"
        onClick={() => handleSelect('fr')}
        className={cx(
          'px-2.5 py-1 rounded-lg transition-all duration-200 focus:outline-none',
          locale === 'fr'
            ? 'bg-gradient-to-r from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] text-white shadow font-bold'
            : 'text-slate-400 hover:text-white',
        )}
        aria-pressed={locale === 'fr'}
      >
        FR
      </button>
      <span className="text-white/20 px-0.5">•</span>
      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={cx(
          'px-2.5 py-1 rounded-lg transition-all duration-200 focus:outline-none',
          locale === 'en'
            ? 'bg-gradient-to-r from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] text-white shadow font-bold'
            : 'text-slate-400 hover:text-white',
        )}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}
