import { useConfig } from '../../lib/config-context';
import { accentStyle, filled, keepFilled } from '../../lib/utils';
import { Reveal, SectionHeading } from '../ui/Reveal';

export default function Experience({ id }: { id: string }) {
  const { config } = useConfig();
  const e = config.experience;
  const items = keepFilled(e.items, 'title');
  if (items.length === 0) return null;

  return (
    <Reveal id={id} className="py-20 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionHeading
            badgeIcon={e.badgeIcon}
            badgeText={e.badgeText}
            title={e.title}
            highlight={e.titleHighlight}
            subtitle={e.subtitle}
          />
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-12">
          {items.map((item, i) => {
            const tags = (item.tags ?? []).filter(filled);
            return (
              <div key={i} className="relative group" style={accentStyle(item.accent)}>
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[rgb(var(--c))] ring-4 ring-[rgb(var(--bg-base))] shadow-md group-hover:scale-125 transition-transform duration-200" />

                <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-[rgb(var(--c)/0.3)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                    {filled(item.period) && (
                      <span className="text-xs font-semibold text-[rgb(var(--c))] px-3 py-1 rounded-full bg-[rgb(var(--c)/0.12)] border border-[rgb(var(--c)/0.3)] w-fit shrink-0">
                        {item.period}
                      </span>
                    )}
                  </div>

                  {filled(item.organization) && (
                    <div className="text-sm font-medium text-slate-300 mb-3">{item.organization}</div>
                  )}

                  {filled(item.description) && (
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>
                  )}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
