import { useConfig } from '../../lib/config-context';
import { filled, keepFilled } from '../../lib/utils';
import Icon from '../ui/Icon';
import { Reveal, SectionHeading } from '../ui/Reveal';

export default function Testimonials({ id }: { id: string }) {
  const { config } = useConfig();
  const t = config.testimonials;
  const items = keepFilled(t.items, 'quote');
  if (items.length === 0) return null;

  return (
    <Reveal id={id} className="py-20 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeading
            badgeIcon={t.badgeIcon}
            badgeText={t.badgeText}
            title={t.title}
            highlight={t.titleHighlight}
            subtitle={t.subtitle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <figure
              key={i}
              className="glass-panel rounded-2xl p-7 border border-white/10 hover:border-[rgb(var(--acc-1)/0.35)] transition-all flex flex-col gap-5"
            >
              <Icon name="quote" className="w-7 h-7 text-[rgb(var(--acc-1)/0.6)]" />
              <blockquote className="text-slate-200 leading-relaxed text-[15px] flex-1">
                {item.quote}
              </blockquote>

              {item.rating > 0 && (
                <div className="flex gap-0.5" aria-label={`Note : ${item.rating} sur 5`}>
                  {Array.from({ length: Math.min(5, Math.max(0, item.rating)) }).map((_, j) => (
                    <Icon key={j} name="star" className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}

              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/5">
                {filled(item.avatar) ? (
                  <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  filled(item.author) && (
                    <span className="w-10 h-10 rounded-full bg-[rgb(var(--acc-1)/0.15)] border border-[rgb(var(--acc-1)/0.3)] flex items-center justify-center text-sm font-bold text-[rgb(var(--acc-1))]">
                      {item.author.slice(0, 1).toUpperCase()}
                    </span>
                  )
                )}
                <span className="block">
                  {filled(item.author) && (
                    <span className="block text-sm font-semibold text-white">{item.author}</span>
                  )}
                  {filled(item.role) && (
                    <span className="block text-xs text-slate-400">{item.role}</span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
