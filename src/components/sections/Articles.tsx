import { useMemo, useState, useEffect } from 'react';
import { useConfig } from '../../lib/config-context';
import { accentStyle, cx, filled, keepFilled } from '../../lib/utils';
import type { ArticleItem } from '../../types/config';
import Icon from '../ui/Icon';
import { Reveal, SectionHeading } from '../ui/Reveal';

export default function Articles({ id }: { id: string }) {
  const { config, t } = useConfig();
  const a = config.articles;

  const rawItems = a?.items ?? [];
  const items = useMemo(() => keepFilled(rawItems, 'title'), [rawItems]);

  const [activeTag, setActiveTag] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  // Fermeture du modal par la touche Échap
  useEffect(() => {
    if (!readingArticle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadingArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingArticle]);

  if (!a || items.length === 0) return null;

  // Extraction unique des tags
  const allTags = Array.from(
    new Set(
      items
        .flatMap((item) => item.tags || [])
        .filter(filled)
        .map((t) => t.trim()),
    ),
  );

  const filteredItems =
    activeTag === 'all'
      ? items
      : items.filter((item) => (item.tags || []).includes(activeTag));

  const handleOpenArticle = (item: ArticleItem) => {
    if (filled(item.content)) {
      setReadingArticle(item);
    } else if (filled(item.url)) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      setReadingArticle(item);
    }
  };

  return (
    <Reveal id={id} className="py-20 relative border-t border-[rgb(var(--border-base))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            align="left"
            badgeIcon={a.badgeIcon || 'book-open'}
            badgeText={a.badgeText || 'Publications & Blog'}
            title={a.title || 'Articles &'}
            highlight={a.titleHighlight || 'Réflexions'}
            subtitle={
              a.subtitle ||
              'Partages d’expériences, retours techniques et analyses sur le développement web moderne.'
            }
          />

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTag('all')}
                className={cx(
                  'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  activeTag === 'all'
                    ? 'bg-[rgb(var(--acc-1))] text-white shadow-md'
                    : 'glass-badge text-slate-300 hover:text-white',
                )}
              >
                {t.projects.allFilter} ({items.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={cx(
                    'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                    activeTag === tag
                      ? 'bg-[rgb(var(--acc-1))] text-white shadow-md'
                      : 'glass-badge text-slate-300 hover:text-white',
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grille des publications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const tags = (item.tags || []).filter(filled);
            return (
              <article
                key={item.id || index}
                style={accentStyle(item.accent)}
                className="group flex flex-col glass-panel rounded-2xl overflow-hidden border border-[rgb(var(--border-base))] hover:border-[rgb(var(--c)/0.4)] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                {filled(item.image) && (
                  <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--surface))] via-transparent to-transparent opacity-80" />
                  </div>
                )}

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {/* Méta-données : Date & Temps de lecture */}
                    <div className="flex items-center gap-3 text-xs text-[rgb(var(--text-secondary))] mb-3">
                      {filled(item.date) && (
                        <span className="flex items-center gap-1.5">
                          <Icon name="calendar" className="w-3.5 h-3.5 text-[rgb(var(--c))]" />
                          <time>{item.date}</time>
                        </span>
                      )}
                      {filled(item.readTime) && (
                        <span className="flex items-center gap-1 text-[rgb(var(--text-secondary))]">
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </span>
                      )}
                    </div>

                    {/* Titre */}
                    <h3
                      onClick={() => handleOpenArticle(item)}
                      className="text-lg sm:text-xl font-bold text-[rgb(var(--text-primary))] group-hover:text-[rgb(var(--c))] transition-colors cursor-pointer line-clamp-2 mb-3"
                    >
                      {item.title}
                    </h3>

                    {/* Extrait */}
                    {filled(item.excerpt) && (
                      <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed line-clamp-3 mb-4">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tags.map((tag, tIndex) => (
                          <span
                            key={tIndex}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[rgb(var(--text-secondary))]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bouton d'action */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--border-base))] text-sm">
                      <button
                        type="button"
                        onClick={() => handleOpenArticle(item)}
                        className="inline-flex items-center gap-1.5 font-semibold text-[rgb(var(--c))] hover:underline underline-offset-4"
                      >
                        <span>
                          {filled(item.content)
                            ? t.articles.readArticle
                            : filled(item.url)
                              ? t.articles.consult
                              : t.articles.details}
                        </span>
                        <Icon name="arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      {filled(item.url) && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Ouvrir le lien externe"
                          aria-label={`Ouvrir le lien externe vers ${item.title}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon name="external-link" className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal de lecture fluide d'un article */}
      {readingArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel border border-[rgb(var(--border-base))] rounded-2xl p-6 sm:p-8 shadow-2xl bg-[rgb(var(--bg-base))]"
            onClick={(e) => e.stopPropagation()}
            style={accentStyle(readingArticle.accent)}
          >
            {/* Bouton Fermer */}
            <button
              type="button"
              onClick={() => setReadingArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-xl glass-badge text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={t.articles.closeModal}
            >
              <Icon name="x" className="w-5 h-5" />
            </button>

            {/* En-tête de l'article */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[rgb(var(--text-secondary))] mb-3">
              {filled(readingArticle.date) && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Icon name="calendar" className="w-4 h-4 text-[rgb(var(--c))]" />
                  <time>{readingArticle.date}</time>
                </span>
              )}
              {filled(readingArticle.readTime) && (
                <span>• {readingArticle.readTime}</span>
              )}
            </div>

            <h2
              id="modal-article-title"
              className="text-2xl sm:text-3xl font-extrabold text-[rgb(var(--text-primary))] mb-4 leading-tight"
            >
              {readingArticle.title}
            </h2>

            {readingArticle.tags && readingArticle.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {readingArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[rgb(var(--c)/0.12)] text-[rgb(var(--c))] border border-[rgb(var(--c)/0.3)] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {filled(readingArticle.image) && (
              <div className="mb-6 rounded-xl overflow-hidden aspect-video max-h-80 w-full bg-black/20">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Contenu principal */}
            <div className="prose prose-invert max-w-none text-sm sm:text-base text-[rgb(var(--text-secondary))] leading-relaxed space-y-4">
              {readingArticle.content ? (
                readingArticle.content
                  .split('\n\n')
                  .map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
              ) : (
                <p className="italic text-slate-400">
                  {readingArticle.excerpt}
                </p>
              )}
            </div>

            {/* Pied de modal avec lien externe éventuel */}
            {filled(readingArticle.url) && (
              <div className="mt-8 pt-6 border-t border-[rgb(var(--border-base))] flex justify-end">
                <a
                  href={readingArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <span>{t.articles.openExternal}</span>
                  <Icon name="external-link" className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </Reveal>
  );
}
