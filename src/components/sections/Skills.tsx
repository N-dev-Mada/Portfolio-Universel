import { useConfig } from '../../lib/config-context';
import { accentStyle, filled, keepFilled } from '../../lib/utils';
import Icon from '../ui/Icon';
import { Reveal, SectionHeading } from '../ui/Reveal';

export default function Skills({ id }: { id: string }) {
  const { config } = useConfig();
  const s = config.skills;
  const categories = keepFilled(s.categories, 'title');
  if (categories.length === 0) return null;

  const cols = categories.length === 1 ? 'md:grid-cols-1' : categories.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <Reveal id={id} className="py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionHeading
            badgeIcon={s.badgeIcon}
            badgeText={s.badgeText}
            title={s.title}
            highlight={s.titleHighlight}
            subtitle={s.subtitle}
          />
        </div>

        <div className={`grid grid-cols-1 ${cols} gap-8`}>
          {categories.map((cat, i) => {
            const items = keepFilled(cat.items, 'name');
            const tags = (cat.tags ?? []).filter(filled);
            return (
              <div
                key={i}
                style={accentStyle(cat.accent)}
                className="accent-card glass-panel rounded-2xl p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 gap-3">
                    {filled(cat.icon) && (
                      <span className="w-12 h-12 rounded-xl bg-[rgb(var(--c)/0.15)] border border-[rgb(var(--c)/0.3)] flex items-center justify-center text-[rgb(var(--c))] group-hover:scale-110 transition-transform shrink-0">
                        <Icon name={cat.icon} className="w-6 h-6" />
                      </span>
                    )}
                    {filled(cat.badge) && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgb(var(--c)/0.12)] text-[rgb(var(--c))] border border-[rgb(var(--c)/0.3)]">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{cat.title}</h3>
                  {filled(cat.description) && (
                    <p className="text-sm text-slate-400 mb-6">{cat.description}</p>
                  )}

                  {items.length > 0 && (
                    <div className={s.showLevels ? 'space-y-4' : 'space-y-2.5'}>
                      {items.map((item, j) =>
                        s.showLevels ? (
                          <div key={j}>
                            <div className="flex justify-between text-xs font-semibold mb-1 gap-2">
                              <span className="text-slate-200">{item.name}</span>
                              {filled(item.levelLabel) && (
                                <span className="text-[rgb(var(--c))] shrink-0">
                                  {item.levelLabel} ({item.level}%)
                                </span>
                              )}
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--c))] to-[rgb(var(--c)/0.5)]"
                                style={{ width: `${Math.max(0, Math.min(100, item.level))}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div key={j} className="flex items-start gap-2 text-sm text-slate-200">
                            <Icon name="check" className="w-4 h-4 mt-0.5 text-[rgb(var(--c))] shrink-0" />
                            <span>{item.name}</span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/5">
                    {tags.map((tag, j) => (
                      <span key={j} className="text-[11px] px-2.5 py-1 rounded-md glass-badge text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
