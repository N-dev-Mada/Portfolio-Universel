import { useMemo, useState } from 'react';
import { useConfig } from '../../lib/config-context';
import { accentStyle, cx, filled, keepFilled } from '../../lib/utils';
import Icon from '../ui/Icon';
import { useToast } from '../ui/Toast';
import { Reveal, SectionHeading } from '../ui/Reveal';

export default function Projects({ id }: { id: string }) {
  const { config, t } = useConfig();
  const { toast } = useToast();
  const p = config.projects;
  const [active, setActive] = useState('all');

  const items = useMemo(() => keepFilled(p.items, 'title'), [p.items]);
  const filters = useMemo(() => keepFilled(p.filters, 'label'), [p.filters]);

  if (items.length === 0) return null;

  const visible = active === 'all' ? items : items.filter((i) => i.category === active);
  const cols =
    p.layout === 'grid-3'
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : p.layout === 'gallery'
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'md:grid-cols-2';

  const openLink = (label: string, url: string) => {
    if (filled(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    const toastInstance = toast(`Ouverture de « ${label} »…`, 'loading');
    window.setTimeout(() => {
      toastInstance.update(t.projects.noLink, 'info');
    }, 700);
  };

  return (
    <Reveal id={id} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            align="left"
            badgeIcon={p.badgeIcon}
            badgeText={p.badgeText}
            title={p.title}
            highlight={p.titleHighlight}
            subtitle={p.subtitle}
          />

          {p.filtersEnabled && filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 glass-badge p-1.5 rounded-xl self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setActive('all')}
                className={cx(
                  'btn-bounce px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all',
                  active === 'all'
                    ? 'btn-primary shadow'
                    : 'text-slate-400 hover:text-white',
                )}
              >
                {t.projects.allFilter} ({items.length})
              </button>
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={cx(
                    'btn-bounce px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all',
                    active === f.id ? 'btn-primary shadow' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={cx('grid grid-cols-1 gap-8', cols)}>
          {visible.map((item, i) => {
            const rawLinks = [...(item.links ?? [])];
            // Si repoUrl est défini et non déjà présent, l'ajouter
            if (typeof item.repoUrl === 'string' && item.repoUrl.trim().length > 0 && !rawLinks.some((l) => l.url === item.repoUrl)) {
              rawLinks.push({ label: t.projects.repository, url: item.repoUrl, icon: 'github' });
            }
            // Si demoUrl est défini et non déjà présent, l'ajouter
            if (typeof item.demoUrl === 'string' && item.demoUrl.trim().length > 0 && !rawLinks.some((l) => l.url === item.demoUrl)) {
              rawLinks.unshift({ label: t.projects.deployment, url: item.demoUrl, icon: 'rocket' });
            }
            const links = keepFilled(rawLinks, 'label');
            const tags = (item.tags ?? []).filter(filled);
            return (
              <article
                key={`${item.title}-${i}`}
                style={accentStyle(item.accent)}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-[rgb(var(--c)/0.4)] hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {filled(item.image) ? (
                  <div className="relative h-56 overflow-hidden border-b border-white/5">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-base)/0.7)] to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-40 bg-gradient-to-br from-[rgb(var(--surface))] via-[rgb(var(--c)/0.12)] to-[rgb(var(--surface))] border-b border-white/5 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-2xl bg-[rgb(var(--c)/0.15)] border border-[rgb(var(--c)/0.3)] flex items-center justify-center text-[rgb(var(--c))] group-hover:scale-110 transition-transform">
                      <Icon name="layers" className="w-7 h-7" />
                    </span>
                    <span className="absolute -right-10 -bottom-10 w-40 h-40 bg-[rgb(var(--c)/0.2)] rounded-full blur-2xl" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[rgb(var(--c))] transition-colors">
                        {item.title}
                      </h3>
                      {filled(item.categoryLabel) && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[rgb(var(--c)/0.12)] text-[rgb(var(--c))] border border-[rgb(var(--c)/0.3)] shrink-0 mt-1">
                          {item.categoryLabel}
                        </span>
                      )}
                    </div>

                    {filled(item.description) && (
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.description}</p>
                    )}

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {tags.map((tag, j) => (
                          <span key={j} className="text-xs px-2.5 py-1 rounded-md glass-badge text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {links.length > 0 && (
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 flex-wrap">
                      {links.map((link, j) => (
                        <button
                          key={j}
                          type="button"
                          onClick={() => openLink(link.label, link.url)}
                          className={cx(
                            'btn-bounce inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
                            j === 0
                              ? 'text-[rgb(var(--c))] hover:brightness-125'
                              : 'text-slate-400 hover:text-white',
                          )}
                        >
                          {j !== 0 && filled(link.icon) && <Icon name={link.icon} className="w-4 h-4" />}
                          <span>{link.label}</span>
                          {j === 0 && filled(link.icon) && <Icon name={link.icon} className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-10">
            Aucun élément ne correspond à ce filtre.
          </p>
        )}
      </div>
    </Reveal>
  );
}
