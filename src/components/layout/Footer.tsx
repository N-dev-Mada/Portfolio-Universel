import { useConfig } from '../../lib/config-context';
import { filled, scrollToId } from '../../lib/utils';
import Icon from '../ui/Icon';

export default function Footer() {
  const { config } = useConfig();
  const { identity, footer } = config;
  const sections = config.sections.filter((s) => s.enabled);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 relative bg-[rgb(var(--bg-base)/0.9)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            {filled(identity.initials) && (
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] flex items-center justify-center font-bold text-[rgb(var(--bg-base))] text-xs shadow-md">
                {identity.initials}
              </span>
            )}
            <span className="text-xs text-slate-400">
              {filled(identity.name) && (
                <span className="font-semibold text-white">{identity.name}</span>
              )}
              {filled(identity.name) && ' — '}© {year}
              {filled(footer.copyright) && `. ${footer.copyright}`}
            </span>
          </div>

          {footer.showQuickNav && sections.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className="hover:text-white transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {footer.showBackToTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-bounce inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-badge text-xs text-slate-300 hover:text-white transition-all"
              aria-label="Retourner en haut de la page"
            >
              <span>Haut de page</span>
              <Icon name="arrow-up" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
