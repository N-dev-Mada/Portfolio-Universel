import { getTheme, RADIUS_MAP } from './themes';
import { filled, keepFilled } from './utils';
import type { PortfolioConfig } from '../types/config';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Génère un code HTML autonome, complet, responsive et prêt pour la production (zéro build nécessaire).
 */
export function generateStandaloneHtml(config: PortfolioConfig): string {
  const theme = getTheme(config.theme.preset);
  const radiusVal = RADIUS_MAP[config.theme.radius] || '1rem';
  const fontName = config.theme.font || 'Plus Jakarta Sans';
  const encodedFont = fontName.replace(/\s+/g, '+');
  const isLight = theme.mode === 'light';

  const enabledSections = config.sections.filter((s) => s.enabled);
  const hero = config.hero;
  const skills = config.skills;
  const projects = config.projects;
  const experience = config.experience;
  const testimonials = config.testimonials;
  const articles = config.articles;
  const contact = config.contact;
  const footer = config.footer;

  return `<!DOCTYPE html>
<html lang="${escapeHtml(config.meta.lang || 'fr')}" class="${isLight ? 'light-theme' : 'dark-theme'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.meta.title || config.identity.name)}</title>
  <meta name="description" content="${escapeHtml(config.meta.description || '')}">
  <meta property="og:title" content="${escapeHtml(config.meta.title || config.identity.name)}">
  <meta property="og:description" content="${escapeHtml(config.meta.description || '')}">
  <meta property="og:type" content="website">

  <!-- Polices Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodedFont}:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"${fontName}"', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }
        }
      }
    };
  </script>

  <style>
    :root {
      --acc-1: ${theme.acc1};
      --acc-2: ${theme.acc2};
      --acc-3: ${theme.acc3};
      --bg-base: ${theme.bg};
      --bg-surface: ${theme.surface};
      --surface: ${theme.surface};
      --text-primary: ${theme.textPrimary || (isLight ? '15 23 42' : '248 250 252')};
      --text-secondary: ${theme.textSecondary || (isLight ? '71 85 105' : '148 163 184')};
      --border-base: ${theme.borderBase || (isLight ? '15 23 42 / 0.09' : '255 255 255 / 0.08')};
      --radius-app: ${radiusVal};
      --font-app: "${fontName}", system-ui, -apple-system, sans-serif;
    }

    html { scroll-behavior: smooth; }
    body {
      background-color: rgb(var(--bg-base));
      color: rgb(var(--text-primary));
      font-family: var(--font-app);
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
    }

    ::selection {
      background: rgb(var(--acc-1) / 0.3);
      color: rgb(var(--text-primary));
    }

    .glass-panel {
      background: rgb(var(--surface) / 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgb(var(--border-base));
    }

    .glass-nav {
      background: rgb(var(--bg-base) / 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgb(var(--border-base));
    }

    .glass-badge {
      background: rgb(var(--surface) / 0.55);
      border: 1px solid rgb(var(--border-base));
    }

    .text-gradient {
      background: linear-gradient(135deg, rgb(var(--acc-1)) 0%, rgb(var(--acc-2)) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, rgb(var(--acc-1)) 0%, rgb(var(--acc-2)) 100%);
      color: white;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-primary:hover {
      box-shadow: 0 10px 25px -5px rgb(var(--acc-1) / 0.4);
      transform: translateY(-2px);
    }

    .btn-ghost {
      background: rgb(var(--surface) / 0.5);
      border: 1px solid rgb(var(--border-base));
      color: rgb(var(--text-primary));
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-ghost:hover {
      background: rgb(var(--surface) / 0.8);
      border-color: rgb(var(--acc-1) / 0.4);
      transform: translateY(-2px);
    }

    .ambient-glow {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(800px circle at 50% -100px, rgb(var(--acc-1) / 0.15), transparent 70%);
    }

    .glow-accent {
      box-shadow: 0 0 35px -5px rgb(var(--acc-1) / 0.25);
    }
  </style>
</head>
<body class="relative min-h-screen selection:bg-[rgb(var(--acc-1)/0.3)]">
  ${config.theme.ambientGlow ? '<div class="ambient-glow"></div>' : ''}

  <!-- BARRE DE NAVIGATION -->
  <header class="sticky top-0 z-40 w-full transition-all duration-300 glass-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#${enabledSections[0]?.id || ''}" class="flex items-center gap-3 group focus:outline-none">
        ${
          filled(config.identity.logoImage)
            ? `<img src="${config.identity.logoImage}" alt="${escapeHtml(config.identity.name)}" class="w-10 h-10 rounded-xl object-cover shadow-lg">`
            : `<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] flex items-center justify-center font-extrabold text-white text-base shadow-lg">${escapeHtml(config.identity.initials || 'AL')}</div>`
        }
        <div>
          <span class="font-bold text-base tracking-tight text-[rgb(var(--text-primary))] block leading-none">
            ${escapeHtml(config.identity.name)}
          </span>
          ${
            filled(config.identity.role)
              ? `<span class="text-xs text-[rgb(var(--text-secondary))] font-medium block mt-1">${escapeHtml(config.identity.role)}</span>`
              : ''
          }
        </div>
      </a>

      <!-- Liens Desktop -->
      <nav class="hidden md:flex items-center gap-1 glass-badge px-3 py-1.5 rounded-full">
        ${enabledSections
          .map(
            (s) =>
              `<a href="#${s.id}" class="nav-link px-4 py-2 text-sm font-medium rounded-full text-slate-300 hover:text-white transition-colors" data-section="${s.id}">${escapeHtml(s.label)}</a>`,
          )
          .join('\n        ')}
      </nav>

      <!-- Action droite -->
      <div class="flex items-center gap-3">
        ${
          filled(config.nav.ctaLabel) && filled(config.nav.ctaTarget)
            ? `<a href="#${config.nav.ctaTarget}" class="btn-primary hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold">
                <span>${escapeHtml(config.nav.ctaLabel)}</span>
                <span>→</span>
              </a>`
            : ''
        }
        <button id="mobile-menu-btn" type="button" class="md:hidden p-2.5 rounded-xl glass-badge text-slate-300 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <div id="mobile-menu" class="hidden md:hidden px-4 pt-2 pb-6 glass-panel border-t border-[rgb(var(--border-base))] mt-1">
      <div class="flex flex-col gap-2">
        ${enabledSections
          .map(
            (s) =>
              `<a href="#${s.id}" class="mobile-nav-link px-4 py-3 rounded-xl text-slate-200 hover:bg-white/5 font-medium flex items-center justify-between"><span>${escapeHtml(s.label)}</span><span>→</span></a>`,
          )
          .join('\n        ')}
      </div>
    </div>
  </header>

  <main class="relative z-10">
    <!-- SECTION ACCUEIL (HERO) -->
    <section id="${enabledSections.find((s) => s.type === 'hero')?.id || 'accueil'}" class="pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div class="lg:col-span-7 space-y-8">
            ${
              filled(hero.badgeText)
                ? `<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-badge text-xs font-semibold text-slate-200">
                    <span class="w-2 h-2 rounded-full bg-[rgb(var(--acc-1))] animate-pulse"></span>
                    <span>${escapeHtml(hero.badgeText)}</span>
                   </div>`
                : ''
            }
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[rgb(var(--text-primary))] leading-tight">
              ${escapeHtml(hero.title)}
              <span class="text-gradient block sm:inline">${escapeHtml(hero.titleHighlight || '')}</span>
            </h1>
            <p class="text-base sm:text-xl text-[rgb(var(--text-secondary))] leading-relaxed max-w-2xl font-normal">
              ${escapeHtml(hero.subtitle)}
            </p>

            <!-- Boutons CTA -->
            <div class="flex flex-wrap gap-4 pt-2">
              ${(hero.ctas || [])
                .map((cta) =>
                  cta.variant === 'primary'
                    ? `<a href="#${cta.target}" class="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold"><span>${escapeHtml(cta.label)}</span><span>→</span></a>`
                    : `<a href="#${cta.target}" class="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold"><span>${escapeHtml(cta.label)}</span></a>`,
                )
                .join('\n              ')}
            </div>

            <!-- Statistiques -->
            ${
              (hero.stats || []).length > 0
                ? `<div class="grid grid-cols-3 gap-6 pt-6 border-t border-[rgb(var(--border-base))] max-w-lg">
                    ${hero.stats
                      .map(
                        (st) =>
                          `<div>
                            <div class="text-2xl sm:text-3xl font-extrabold text-gradient">${escapeHtml(st.value)}</div>
                            <div class="text-xs sm:text-sm text-[rgb(var(--text-secondary))] font-medium mt-1">${escapeHtml(st.label)}</div>
                          </div>`,
                      )
                      .join('\n                    ')}
                   </div>`
                : ''
            }
          </div>

          <!-- Vitrine droite (Terminal ou Avatar) -->
          <div class="lg:col-span-5">
            ${
              hero.showcase?.type === 'terminal'
                ? `<div class="rounded-2xl glass-panel p-5 font-mono text-xs shadow-2xl border border-[rgb(var(--border-base))] glow-accent">
                    <div class="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                      <div class="flex gap-2">
                        <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
                        <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
                        <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                      </div>
                      <span class="text-slate-400">${escapeHtml(hero.showcase.terminalTitle || 'terminal')}</span>
                    </div>
                    <div class="space-y-1.5 text-slate-300">
                      ${(hero.showcase.terminalLines || [])
                        .map((line) => `<p class="leading-relaxed">${escapeHtml(line.text)}</p>`)
                        .join('\n                      ')}
                    </div>
                   </div>`
                : filled(config.identity.avatar)
                  ? `<div class="relative mx-auto max-w-sm rounded-3xl overflow-hidden glass-panel p-3 border border-[rgb(var(--border-base))] shadow-2xl">
                      <img src="${config.identity.avatar}" alt="${escapeHtml(config.identity.name)}" class="w-full h-auto rounded-2xl object-cover">
                     </div>`
                  : ''
            }
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION COMPÉTENCES -->
    ${
      skills && enabledSections.some((s) => s.type === 'skills')
        ? `<section id="${enabledSections.find((s) => s.type === 'skills')?.id || 'competences'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(skills.badgeText || 'Expertise')}</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))] mt-4">${escapeHtml(skills.title)} <span class="text-gradient">${escapeHtml(skills.titleHighlight || '')}</span></h2>
                <p class="text-base text-[rgb(var(--text-secondary))] mt-3">${escapeHtml(skills.subtitle || '')}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                ${(skills.categories || [])
                  .map(
                    (cat) =>
                      `<div class="glass-panel p-6 sm:p-7 rounded-2xl border border-[rgb(var(--border-base))] hover:border-[rgb(var(--acc-1)/0.4)] transition-all">
                        <h3 class="text-lg font-bold text-[rgb(var(--text-primary))] mb-4">${escapeHtml(cat.title)}</h3>
                        <div class="space-y-4">
                          ${(cat.items || [])
                            .map(
                              (sk) =>
                                `<div>
                                  <div class="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                                    <span>${escapeHtml(sk.name)}</span>
                                    ${sk.level ? `<span class="text-slate-400">${sk.level}%</span>` : ''}
                                  </div>
                                  ${
                                    sk.level
                                      ? `<div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                          <div class="h-full bg-gradient-to-r from-[rgb(var(--acc-1))] to-[rgb(var(--acc-2))] rounded-full" style="width: ${sk.level}%"></div>
                                         </div>`
                                      : ''
                                  }
                                </div>`,
                            )
                            .join('\n                          ')}
                        </div>
                       </div>`,
                  )
                  .join('\n                ')}
              </div>
            </div>
           </section>`
        : ''
    }

    <!-- SECTION PROJETS -->
    ${
      projects && enabledSections.some((s) => s.type === 'projects')
        ? `<section id="${enabledSections.find((s) => s.type === 'projects')?.id || 'projets'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(projects.badgeText || 'Portfolio')}</span>
                  <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))] mt-4">${escapeHtml(projects.title)} <span class="text-gradient">${escapeHtml(projects.titleHighlight || '')}</span></h2>
                  <p class="text-base text-[rgb(var(--text-secondary))] mt-3 max-w-2xl">${escapeHtml(projects.subtitle || '')}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                ${keepFilled(projects.items || [], 'title')
                  .map(
                    (p) => {
                      const allLinks = [...(p.links || [])];
                      if (typeof p.repoUrl === 'string' && p.repoUrl.trim().length > 0 && !allLinks.some((l) => l.url === p.repoUrl)) {
                        allLinks.push({ label: 'Dépôt', url: p.repoUrl, icon: 'github' });
                      }
                      if (typeof p.demoUrl === 'string' && p.demoUrl.trim().length > 0 && !allLinks.some((l) => l.url === p.demoUrl)) {
                        allLinks.unshift({ label: 'Déploiement', url: p.demoUrl, icon: 'rocket' });
                      }
                      return `<div class="glass-panel rounded-2xl overflow-hidden border border-[rgb(var(--border-base))] flex flex-col justify-between hover:border-[rgb(var(--acc-1)/0.4)] transition-all">
                        ${
                          filled(p.image)
                            ? `<div class="aspect-video w-full overflow-hidden bg-black/20">
                                <img src="${p.image}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover">
                               </div>`
                            : ''
                        }
                        <div class="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 class="text-xl font-bold text-[rgb(var(--text-primary))] mb-2">${escapeHtml(p.title)}</h3>
                            <p class="text-sm text-[rgb(var(--text-secondary))] leading-relaxed mb-4">${escapeHtml(p.description)}</p>
                            <div class="flex flex-wrap gap-1.5 mb-6">
                              ${(p.tags || [])
                                .map((t) => `<span class="text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">${escapeHtml(t)}</span>`)
                                .join('\n                              ')}
                            </div>
                          </div>
                          <div class="flex items-center gap-3 pt-4 border-t border-[rgb(var(--border-base))]">
                            ${allLinks
                              .map(
                                (l) =>
                                  `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold"><span>${escapeHtml(l.label)}</span><span>↗</span></a>`,
                              )
                              .join('\n                            ')}
                          </div>
                        </div>
                       </div>`;
                    },
                  )
                  .join('\n                ')}
              </div>
            </div>
           </section>`
        : ''
    }

    <!-- SECTION EXPÉRIENCE -->
    ${
      experience && enabledSections.some((s) => s.type === 'experience')
        ? `<section id="${enabledSections.find((s) => s.type === 'experience')?.id || 'parcours'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-2xl mx-auto mb-16">
                <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(experience.badgeText || 'Trajectoire')}</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))] mt-4">${escapeHtml(experience.title)} <span class="text-gradient">${escapeHtml(experience.titleHighlight || '')}</span></h2>
                <p class="text-base text-[rgb(var(--text-secondary))] mt-3">${escapeHtml(experience.subtitle || '')}</p>
              </div>

              <div class="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-12">
                ${keepFilled(experience.items || [], 'title')
                  .map(
                    (it) =>
                      `<div class="relative">
                        <span class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[rgb(var(--acc-1))] ring-4 ring-[rgb(var(--bg-base))]"></span>
                        <div class="glass-panel p-6 sm:p-7 rounded-2xl border border-[rgb(var(--border-base))]">
                          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 class="text-lg sm:text-xl font-bold text-[rgb(var(--text-primary))]">${escapeHtml(it.title)}</h3>
                            ${filled(it.period) ? `<span class="text-xs font-semibold text-[rgb(var(--acc-1))] px-3 py-1 rounded-full bg-[rgb(var(--acc-1)/0.12)] border border-[rgb(var(--acc-1)/0.3)] w-fit shrink-0">${escapeHtml(it.period)}</span>` : ''}
                          </div>
                          ${filled(it.organization) ? `<div class="text-sm font-medium text-slate-300 mb-3">${escapeHtml(it.organization)}</div>` : ''}
                          ${filled(it.description) ? `<p class="text-sm text-[rgb(var(--text-secondary))] leading-relaxed mb-4">${escapeHtml(it.description)}</p>` : ''}
                          <div class="flex flex-wrap gap-2">
                            ${(it.tags || [])
                              .map((tg) => `<span class="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300">${escapeHtml(tg)}</span>`)
                              .join('\n                            ')}
                          </div>
                        </div>
                       </div>`,
                  )
                  .join('\n                ')}
              </div>
            </div>
           </section>`
        : ''
    }

    <!-- SECTION ARTICLES / BLOG -->
    ${
      articles && enabledSections.some((s) => s.type === 'articles')
        ? `<section id="${enabledSections.find((s) => s.type === 'articles')?.id || 'articles'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(articles.badgeText || 'Publications')}</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))] mt-4">${escapeHtml(articles.title)} <span class="text-gradient">${escapeHtml(articles.titleHighlight || '')}</span></h2>
                <p class="text-base text-[rgb(var(--text-secondary))] mt-3">${escapeHtml(articles.subtitle || '')}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                ${keepFilled(articles.items || [], 'title')
                  .map(
                    (art) =>
                      `<article class="glass-panel rounded-2xl overflow-hidden border border-[rgb(var(--border-base))] flex flex-col justify-between hover:border-[rgb(var(--acc-1)/0.4)] transition-all">
                        ${
                          filled(art.image)
                            ? `<div class="aspect-video w-full overflow-hidden bg-black/20">
                                <img src="${art.image}" alt="${escapeHtml(art.title)}" class="w-full h-full object-cover">
                               </div>`
                            : ''
                        }
                        <div class="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div class="flex items-center gap-3 text-xs text-[rgb(var(--text-secondary))] mb-2">
                              ${filled(art.date) ? `<span>${escapeHtml(art.date)}</span>` : ''}
                              ${art.readTime ? `<span>• ${escapeHtml(art.readTime)}</span>` : ''}
                            </div>
                            <h3 class="text-xl font-bold text-[rgb(var(--text-primary))] mb-3">${escapeHtml(art.title)}</h3>
                            <p class="text-sm text-[rgb(var(--text-secondary))] leading-relaxed mb-4">${escapeHtml(art.excerpt)}</p>
                            <div class="flex flex-wrap gap-1.5 mb-6">
                              ${(art.tags || [])
                                .map((t) => `<span class="text-xs px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">#${escapeHtml(t)}</span>`)
                                .join('\n                              ')}
                            </div>
                          </div>
                          <div class="pt-4 border-t border-[rgb(var(--border-base))] flex items-center justify-between">
                            ${
                              filled(art.url)
                                ? `<a href="${art.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold"><span>Lire l'article</span><span>↗</span></a>`
                                : `<button type="button" class="btn-ghost inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold" onclick="alert('Consulter le détail de : ' + ${JSON.stringify(art.title)})"><span>Détails</span><span>→</span></button>`
                            }
                          </div>
                        </div>
                       </article>`,
                  )
                  .join('\n                ')}
              </div>
            </div>
           </section>`
        : ''
    }

    <!-- SECTION TÉMOIGNAGES -->
    ${
      testimonials && enabledSections.some((s) => s.type === 'testimonials')
        ? `<section id="${enabledSections.find((s) => s.type === 'testimonials')?.id || 'temoignages'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-2xl mx-auto mb-16">
                <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(testimonials.badgeText || 'Confiance')}</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))] mt-4">${escapeHtml(testimonials.title)} <span class="text-gradient">${escapeHtml(testimonials.titleHighlight || '')}</span></h2>
                <p class="text-base text-[rgb(var(--text-secondary))] mt-3">${escapeHtml(testimonials.subtitle || '')}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                ${keepFilled(testimonials.items || [], 'quote')
                  .map(
                    (tm) =>
                      `<div class="glass-panel p-6 sm:p-8 rounded-2xl border border-[rgb(var(--border-base))] flex flex-col justify-between">
                        <p class="text-sm sm:text-base text-slate-300 italic mb-6">« ${escapeHtml(tm.quote)} »</p>
                        <div class="flex items-center gap-3 pt-4 border-t border-[rgb(var(--border-base))]">
                          ${
                            filled(tm.avatar)
                              ? `<img src="${tm.avatar}" alt="${escapeHtml(tm.author)}" class="w-10 h-10 rounded-full object-cover">`
                              : `<div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm">${escapeHtml((tm.author || 'T').slice(0, 2))}</div>`
                          }
                          <div>
                            <div class="font-bold text-sm text-[rgb(var(--text-primary))]">${escapeHtml(tm.author)}</div>
                            <div class="text-xs text-[rgb(var(--text-secondary))]">${escapeHtml(tm.role)}</div>
                          </div>
                        </div>
                       </div>`,
                  )
                  .join('\n                ')}
              </div>
            </div>
           </section>`
        : ''
    }

    <!-- SECTION CONTACT -->
    ${
      contact && enabledSections.some((s) => s.type === 'contact')
        ? `<section id="${enabledSections.find((s) => s.type === 'contact')?.id || 'contact'}" class="py-20 border-t border-[rgb(var(--border-base))]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="grid lg:grid-cols-12 gap-12 items-start">
                <div class="lg:col-span-5 space-y-6">
                  <span class="text-xs font-semibold px-3.5 py-1.5 rounded-full glass-badge text-[rgb(var(--acc-1))] uppercase tracking-wider">${escapeHtml(contact.badgeText || 'Contact')}</span>
                  <h2 class="text-3xl sm:text-4xl font-extrabold text-[rgb(var(--text-primary))]">${escapeHtml(contact.title)} <span class="text-gradient">${escapeHtml(contact.titleHighlight || '')}</span></h2>
                  <p class="text-base text-[rgb(var(--text-secondary))] leading-relaxed">${escapeHtml(contact.intro || '')}</p>

                  <!-- Coordonnées -->
                  <div class="space-y-3 pt-4">
                    ${(contact.infos || [])
                      .map(
                        (inf) =>
                          `<div class="glass-panel p-4 rounded-xl border border-[rgb(var(--border-base))] flex items-center justify-between">
                            <div>
                              <div class="text-xs text-[rgb(var(--text-secondary))] font-medium">${escapeHtml(inf.label)}</div>
                              <div class="text-sm font-semibold text-[rgb(var(--text-primary))] mt-0.5">${escapeHtml(inf.value)}</div>
                            </div>
                            ${inf.copyable ? `<button type="button" class="btn-ghost px-3 py-1 rounded text-xs" onclick="navigator.clipboard.writeText(${JSON.stringify(inf.value)}); alert('Copié dans le presse-papiers !');">Copier</button>` : ''}
                           </div>`,
                      )
                      .join('\n                    ')}
                  </div>

                  <!-- Réseaux Sociaux -->
                  <div class="pt-4">
                    <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">${escapeHtml(contact.socialsTitle || 'Réseaux')}</div>
                    <div class="flex flex-wrap gap-2">
                      ${(contact.socials || [])
                        .map(
                          (soc) =>
                            `<a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2"><span>${escapeHtml(soc.label)}</span><span>↗</span></a>`,
                        )
                        .join('\n                      ')}
                    </div>
                  </div>
                </div>

                <!-- Formulaire -->
                <div class="lg:col-span-7">
                  <div class="glass-panel p-6 sm:p-8 rounded-2xl border border-[rgb(var(--border-base))]">
                    <h3 class="text-xl font-bold text-[rgb(var(--text-primary))] mb-2">${escapeHtml(contact.form?.title || 'Envoyer un message')}</h3>
                    <p class="text-sm text-[rgb(var(--text-secondary))] mb-6">${escapeHtml(contact.form?.subtitle || '')}</p>

                    <form id="standalone-contact-form" action="${contact.form?.endpoint || '#'}" method="POST" class="space-y-4">
                      <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-xs font-medium text-slate-300 mb-1.5">${escapeHtml(contact.form?.nameLabel || 'Nom complet')}</label>
                          <input type="text" name="name" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[rgb(var(--acc-1))]">
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-slate-300 mb-1.5">${escapeHtml(contact.form?.emailLabel || 'Email')}</label>
                          <input type="email" name="email" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[rgb(var(--acc-1))]">
                        </div>
                      </div>

                      ${
                        (contact.form?.subjects || []).length > 0
                          ? `<div>
                              <label class="block text-xs font-medium text-slate-300 mb-1.5">${escapeHtml(contact.form?.subjectLabel || 'Sujet')}</label>
                              <select name="subject" class="w-full px-4 py-2.5 rounded-xl bg-[rgb(var(--surface))] border border-white/10 text-white focus:outline-none focus:border-[rgb(var(--acc-1))]">
                                ${contact.form.subjects.map((sb) => `<option value="${escapeHtml(sb.value)}">${escapeHtml(sb.label)}</option>`).join('\n                                ')}
                              </select>
                             </div>`
                          : ''
                      }

                      <div>
                        <label class="block text-xs font-medium text-slate-300 mb-1.5">${escapeHtml(contact.form?.messageLabel || 'Message')}</label>
                        <textarea name="message" rows="4" required class="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[rgb(var(--acc-1))]"></textarea>
                      </div>

                      <button type="submit" class="btn-primary w-full py-3.5 rounded-xl font-bold text-sm">
                        ${escapeHtml(contact.form?.submitLabel || 'Envoyer ma demande')}
                      </button>

                      ${filled(contact.form?.privacyNote) ? `<p class="text-[11px] text-slate-400 text-center mt-2">${escapeHtml(contact.form.privacyNote)}</p>` : ''}
                    </form>
                  </div>
                </div>
              </div>
            </div>
           </section>`
        : ''
    }
  </main>

  <!-- PIED DE PAGE -->
  <footer class="py-12 border-t border-[rgb(var(--border-base))] text-sm text-[rgb(var(--text-secondary))] relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        © ${new Date().getFullYear()} ${escapeHtml(config.identity.name)}. ${escapeHtml(footer?.copyright || 'Tous droits réservés.')}
      </div>

      <div class="flex items-center gap-6">
        ${
          footer?.showBackToTop !== false
            ? `<a href="#" class="hover:text-white transition-colors">↑ Haut de page</a>`
            : ''
        }
      </div>
    </div>
  </footer>

  <!-- Script minimal autonome pour les interactions -->
  <script>
    // Menu mobile toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    // Gestion du formulaire de contact (simulation locale si pas d'endpoint)
    const form = document.getElementById('standalone-contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        const action = form.getAttribute('action');
        if (!action || action === '#') {
          e.preventDefault();
          alert(${JSON.stringify(contact.form?.successMessage || 'Message transmis avec succès !')});
          form.reset();
        }
      });
    }
  </script>

  <!-- Configuration complète embarquée (réimportable dans le Visual Portfolio Builder) -->
  <script id="portfolio-config" type="application/json">
${JSON.stringify(config, null, 2)}
  </script>
</body>
</html>`;
}

/**
 * Télécharge directement le site exporté sous forme d'un fichier .html autonome.
 */
export function exportStandaloneHtml(config: PortfolioConfig, filename = 'portfolio-standalone.html'): void {
  const htmlContent = generateStandaloneHtml(config);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
