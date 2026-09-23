import { useEffect, useState } from 'react';
import { useConfig } from '../../lib/config-context';
import { cx, filled, scrollToId } from '../../lib/utils';
import Icon from '../ui/Icon';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export default function Navbar() {
  const { config, t } = useConfig();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const sections = config.sections.filter((s) => s.enabled);

  useEffect(() => {
    if (sections.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      setActive(sections[0].id);
      return;
    }

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        if (visibleSections.size > 0) {
          let bestId = '';
          let maxRatio = -1;

          for (const s of sections) {
            const ratio = visibleSections.get(s.id);
            if (ratio !== undefined && ratio > maxRatio) {
              maxRatio = ratio;
              bestId = s.id;
            }
          }

          if (bestId) {
            setActive(bestId);
          }
        }
      },
      {
        rootMargin: '-80px 0px -35% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const go = (id: string) => {
    setActive(id);
    setOpen(false);
    scrollToId(id);
  };

  const { identity, nav } = config;
  const showCta = filled(nav.ctaLabel) && filled(nav.ctaTarget);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(sections[0]?.id ?? '')}
          className="flex items-center gap-3 group rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]"
        >
          {filled(identity.logoImage) ? (
            <img
              src={identity.logoImage}
              alt={identity.name}
              className="w-10 h-10 rounded-xl object-cover shadow-lg"
            />
          ) : (
            filled(identity.initials) && (
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] flex items-center justify-center font-extrabold text-[rgb(var(--bg-base))] text-base shadow-lg group-hover:scale-105 transition-transform">
                {identity.initials}
              </span>
            )
          )}
          <span className="flex flex-col text-left">
            {filled(identity.name) && (
              <span className="font-bold tracking-tight text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--acc-1))] transition-colors">
                {identity.name}
              </span>
            )}
            {filled(identity.role) && (
              <span className="text-xs text-[rgb(var(--text-secondary))] font-medium">{identity.role}</span>
            )}
          </span>
        </button>

        {sections.length > 0 && (
          <nav
            className="hidden md:flex items-center gap-1 glass-badge px-4 py-1.5 rounded-full"
            aria-label="Navigation principale"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className={cx(
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  active === s.id
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white',
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Commutateur de langue FR / EN */}
          <LanguageSwitcher variant="segmented" className="hidden sm:inline-flex" />
          <LanguageSwitcher variant="compact" className="sm:hidden" />

          {showCta && (
            <button
              type="button"
              onClick={() => go(nav.ctaTarget)}
              className="btn-bounce btn-primary hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]"
            >
              <span>{nav.ctaLabel}</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          )}

          {sections.length > 0 && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl glass-badge text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={open}
            >
              <Icon name={open ? 'x' : 'menu'} className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pt-2 pb-6 glass-panel border-t border-[rgb(var(--border-base))] mt-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-1">
              <span className="text-xs text-slate-400 font-medium">{t.nav.language} :</span>
              <LanguageSwitcher variant="segmented" />
            </div>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className="px-4 py-3 rounded-xl text-slate-200 hover:bg-white/5 font-medium flex items-center justify-between"
              >
                <span>{s.label}</span>
                <Icon name="chevron-right" className="w-4 h-4 text-slate-500" />
              </button>
            ))}
            {filled(nav.mobileCtaLabel) && filled(nav.ctaTarget) && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => go(nav.ctaTarget)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm"
                >
                  <span>{nav.mobileCtaLabel}</span>
                  <Icon name="send" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
