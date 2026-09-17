import { useConfig } from '../../lib/config-context';
import { accentStyle, cx, filled, keepFilled, scrollToId } from '../../lib/utils';
import type { TerminalLine } from '../../types/config';
import Icon from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const TONE_CLASS: Record<TerminalLine['tone'], string> = {
  default: 'text-slate-200',
  keyword: 'text-[rgb(var(--acc-1))]',
  string: 'text-emerald-300',
  accent: 'text-[rgb(var(--acc-2))]',
  muted: 'text-slate-500',
  number: 'text-amber-400',
};

function Showcase() {
  const { config } = useConfig();
  const sc = config.hero.showcase;
  if (sc.type === 'none') return null;

  const badges = keepFilled(sc.floatingBadges, 'title');

  const inner =
    sc.type === 'image' && filled(sc.image) ? (
      <div className="relative glass-panel rounded-2xl p-3 shadow-2xl border border-white/10 glow-accent">
        <img
          src={sc.image}
          alt={sc.imageCaption || 'Visuel de présentation'}
          className="w-full h-auto rounded-xl object-cover aspect-[4/5]"
          loading="lazy"
        />
        {filled(sc.imageCaption) && (
          <p className="text-xs text-slate-400 mt-3 px-1 pb-1">{sc.imageCaption}</p>
        )}
      </div>
    ) : sc.type === 'terminal' ? (
      <div className="relative glass-panel rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/10 glow-accent">
        <div className="flex items-center justify-between pb-4 border-b border-white/5 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />
            {filled(sc.terminalTitle) && (
              <span className="text-xs font-mono text-slate-400 ml-2 truncate">
                {sc.terminalTitle}
              </span>
            )}
          </div>
          {filled(sc.terminalTag) && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[rgb(var(--acc-1)/0.15)] text-[rgb(var(--acc-1))] border border-[rgb(var(--acc-1)/0.3)] shrink-0">
              {sc.terminalTag}
            </span>
          )}
        </div>

        <pre className="pt-4 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
          {sc.terminalLines.map((line, i) => (
            <div key={i} className={TONE_CLASS[line.tone] ?? TONE_CLASS.default}>
              {line.text || '\u00A0'}
            </div>
          ))}
        </pre>

        {(filled(sc.terminalFooterLeft) || filled(sc.terminalFooterRight)) && (
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 gap-3">
            {filled(sc.terminalFooterLeft) && (
              <span className="flex items-center gap-2">
                <Icon name="check-circle-2" className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{sc.terminalFooterLeft}</span>
              </span>
            )}
            {filled(sc.terminalFooterRight) && (
              <span className="flex items-center gap-1.5 text-[rgb(var(--acc-1))] shrink-0">
                <Icon name="cpu" className="w-3.5 h-3.5" />
                <span>{sc.terminalFooterRight}</span>
              </span>
            )}
          </div>
        )}
      </div>
    ) : null;

  if (!inner) return null;

  return (
    <div className="lg:col-span-5 relative">
      <div className="relative mx-auto max-w-md lg:max-w-none">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[rgb(var(--acc-1)/0.3)] to-[rgb(var(--acc-2)/0.3)] blur-xl opacity-70" />
        {inner}

        {badges[0] && (
          <div
            style={accentStyle(badges[0].accent)}
            className="hidden sm:flex absolute -bottom-5 -left-5 glass-panel px-4 py-2.5 rounded-xl items-center gap-3 border border-white/10 shadow-lg animate-float"
          >
            <span className="p-2 rounded-lg bg-[rgb(var(--c)/0.2)] text-[rgb(var(--c))]">
              <Icon name={badges[0].icon} className="w-4 h-4" />
            </span>
            <span className="block">
              <span className="block text-xs font-bold text-white">{badges[0].title}</span>
              <span className="block text-[10px] text-slate-400">{badges[0].subtitle}</span>
            </span>
          </div>
        )}

        {badges[1] && (
          <div
            style={accentStyle(badges[1].accent)}
            className="hidden sm:flex absolute -top-5 -right-5 glass-panel px-4 py-2.5 rounded-xl items-center gap-3 border border-white/10 shadow-lg"
          >
            <span className="p-2 rounded-lg bg-[rgb(var(--c)/0.2)] text-[rgb(var(--c))]">
              <Icon name={badges[1].icon} className="w-4 h-4" />
            </span>
            <span className="block">
              <span className="block text-xs font-bold text-white">{badges[1].title}</span>
              <span className="block text-[10px] text-slate-400">{badges[1].subtitle}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero({ id }: { id: string }) {
  const { config } = useConfig();
  const hero = config.hero;
  const ctas = keepFilled(hero.ctas, 'label');
  const stats = keepFilled(hero.stats, 'value');
  const hasShowcase = hero.showcase.type !== 'none';

  return (
    <Reveal id={id} className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className={cx('flex flex-col items-start space-y-6', hasShowcase ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl')}>
            {filled(hero.badgeText) && (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-badge text-xs font-semibold text-slate-200 shadow-sm">
                {hero.badgePulse && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
                <span>{hero.badgeText}</span>
              </div>
            )}

            {(filled(hero.title) || filled(hero.titleHighlight)) && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {hero.title}
                {filled(hero.titleHighlight) && (
                  <>
                    <br className="hidden sm:inline" />
                    <span className="text-gradient">{hero.titleHighlight}</span>
                  </>
                )}
              </h1>
            )}

            {filled(hero.subtitle) && (
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                {hero.subtitle}
              </p>
            )}

            {ctas.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                {ctas.map((cta, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToId(cta.target)}
                    className={cx(
                      'btn-bounce w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--acc-1))]',
                      cta.variant === 'primary'
                        ? 'btn-primary'
                        : 'glass-panel text-slate-200 hover:text-white border border-white/10',
                    )}
                  >
                    {cta.variant !== 'primary' && filled(cta.icon) && (
                      <Icon name={cta.icon} className="w-5 h-5 text-[rgb(var(--acc-1))]" />
                    )}
                    <span>{cta.label}</span>
                    {cta.variant === 'primary' && filled(cta.icon) && (
                      <Icon name={cta.icon} className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {stats.length > 0 && (
              <div
                className="grid gap-6 pt-6 border-t border-white/5 w-full max-w-lg"
                style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, minmax(0, 1fr))` }}
              >
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Showcase />
        </div>
      </div>
    </Reveal>
  );
}
