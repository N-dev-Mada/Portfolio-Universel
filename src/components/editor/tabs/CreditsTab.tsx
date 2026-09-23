import Icon from '../../ui/Icon';

export default function CreditsTab() {
  return (
    <div className="space-y-6 text-slate-200">
      {/* En-tête avec Bannière d'auteur */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-cyan-950/40 p-4 text-center">
        <div className="mb-3 overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=0:61dafb,100:7c3aed&height=180&section=header&text=Nancy%20Fitahianiavo%20👋&fontSize=32&fontColor=ffffff&animation=twinkling"
            alt="Header Banner Nancy Fitahianiavo"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex justify-center my-2">
          <a
            href="https://github.com/N-dev-Mada"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img
              src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=16&pause=1000&color=61DAFB&center=true&vCenter=true&width=360&height=40&lines=D%C3%A9veloppeur+Web+%26+Applications;Cr%C3%A9ateur+de+la+suite+N-product;Expertise+React+19+%26+Next.js+15;Applications+PWA+%26+Souverainet%C3%A9+LAN"
              alt="Typing Animation"
              className="max-w-full h-auto"
            />
          </a>
        </div>

        <p className="text-xs text-slate-300 italic px-2">
          « Passionné par l'ingénierie logicielle, les architectures réseau résilientes et la création d'outils web autonomes. »
        </p>

        {/* Badges de Statut */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
          <img
            src="https://img.shields.io/badge/Focus-Freelance_%7C_Stage_%7C_Remote-7C3AED?style=flat-square&logo=visualstudiocode"
            alt="Focus"
          />
          <img
            src="https://img.shields.io/badge/Status-Open_for_opportunities-brightgreen?style=flat-square&logo=github"
            alt="Status"
          />
          <a href="https://github.com/N-dev-Mada/Portfolio-Universel" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.shields.io/badge/Suite-N--product-007ACC?style=flat-square&logo=rocket"
              alt="N-product Suite"
            />
          </a>
        </div>
      </div>

      {/* À propos de moi */}
      <section className="space-y-2.5 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Icon name="user" className="w-4 h-4 text-[rgb(var(--acc-1))]" />
          <span>À propos de l'Auteur</span>
        </div>
        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[rgb(var(--acc-1))]">🎮</span>
            <span><strong>Centres d'intérêt :</strong> Ingénierie web moderne, architectures distribuées et développement de jeux vidéo.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[rgb(var(--acc-1))]">🛠️</span>
            <span><strong>Créateur de la suite N-product :</strong> Conception d'applications web centrées sur la confidentialité, la légèreté et l'autonomie sur réseau local (LAN) et Web.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[rgb(var(--acc-1))]">⚡</span>
            <span><strong>Domaines d'expertise :</strong> Écosystème <strong>React 19</strong> & <strong>Next.js 15</strong>, applications PWA hors-ligne (<em>Offline First</em>), temps réel via <strong>SSE</strong>, traitement multimédia (Web Audio & Canvas) et déploiement LAN autonome.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[rgb(var(--acc-1))]">💡</span>
            <span><strong>Philosophie :</strong> <strong>KISS</strong> (<em>Keep It Simple, Stupid</em>), <strong>DRY</strong> (<em>Don't Repeat Yourself</em>), sécurité renforcée et architectures résilientes.</span>
          </li>
        </ul>
      </section>

      {/* Stack Technique */}
      <section className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Icon name="code-2" className="w-4 h-4 text-[rgb(var(--acc-2))]" />
          <span>Stack Technique & Outillage</span>
        </div>

        <div className="space-y-2">
          <span className="block text-[11px] font-semibold uppercase text-slate-400">Frontend & Frameworks UI</span>
          <div className="flex flex-wrap gap-1.5">
            <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
            <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
            <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
            <img src="https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6" />
            <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
            <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript ES6+" />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="block text-[11px] font-semibold uppercase text-slate-400">Backend, API & Databases</span>
          <div className="flex flex-wrap gap-1.5">
            <img src="https://img.shields.io/badge/Node.js_22+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
            <img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP" />
            <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
            <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
            <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
            <img src="https://img.shields.io/badge/SQLite_WAL-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite WAL" />
            <img src="https://img.shields.io/badge/Zod_v3-3E67B1?style=flat-square&logo=zod&logoColor=white" alt="Zod" />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="block text-[11px] font-semibold uppercase text-slate-400">Déploiement & DevOps</span>
          <div className="flex flex-wrap gap-1.5">
            <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
            <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
            <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify" />
            <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
            <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm" />
            <img src="https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" alt="VS Code" />
          </div>
        </div>
      </section>

      {/* Produits Phares de la Suite N-product */}
      <section className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Icon name="rocket" className="w-4 h-4 text-amber-400" />
          <span>Produits Phares de la Suite N-product</span>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/10">
            <div className="flex items-center justify-between">
              <a
                href="https://github.com/N-dev-Mada/Messagerie-Local"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xs text-cyan-400 hover:underline flex items-center gap-1.5"
              >
                <span>1. Messagerie-Local</span>
                <Icon name="external-link" className="w-3 h-3" />
              </a>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                N-product #1
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              WhatsApp Web Clone LAN — Application de messagerie instantanée 100% autonome et résiliente pour réseaux locaux.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 space-y-0.5">
              <div>• Compression WebP Canvas anti-OOM</div>
              <div>• Moteur SQLite WAL via node:sqlite</div>
              <div>• PWA autonome & synchro SSE temps réel</div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10">
            <div className="flex items-center justify-between">
              <a
                href="https://github.com/N-dev-Mada/Portfolio-Universel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-xs text-purple-400 hover:underline flex items-center gap-1.5"
              >
                <span>2. Portfolio-Universel</span>
                <Icon name="external-link" className="w-3 h-3" />
              </a>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                N-product #2
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Visual Portfolio Builder — SPA No-Code / WYSIWYG ultra-performante basée sur un JSON unique.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 space-y-0.5">
              <div>• Édition visuelle live & export HTML autonome Zero-Build</div>
              <div>• Restauration d'usine sécurisée N-Product Reset</div>
              <div>• React 19, TypeScript strict, Vite 6, Tailwind CSS v4</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques GitHub */}
      <section className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Icon name="bar-chart-3" className="w-4 h-4 text-emerald-400" />
          <span>Statistiques & Activité GitHub</span>
        </div>
        <div className="space-y-2">
          <a href="https://github.com/N-dev-Mada" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="https://github-readme-stats.vercel.app/api?username=N-dev-Mada&show_icons=true&theme=tokyonight&count_private=true&hide_border=true&title_color=61dafb&icon_color=7c3aed"
              alt="Nancy's GitHub Stats"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </a>
          <a href="https://github.com/N-dev-Mada" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=N-dev-Mada&layout=compact&theme=tokyonight&hide_border=true&title_color=61dafb"
              alt="Top Languages"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* Contacts & Réseaux */}
      <section className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Icon name="mail" className="w-4 h-4 text-cyan-400" />
          <span>Contacts & Réseaux</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <a href="mailto:nancyfitahianiavo@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src="https://img.shields.io/badge/Gmail-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Gmail" />
          </a>
          <a href="https://www.linkedin.com/in/nancy-fitahianiavo-b85837237" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />
          </a>
          <a href="https://github.com/N-dev-Mada" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
          </a>
          <a href="https://wa.me/qr/ISKQHPY3TL5LC1" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src="https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="WhatsApp" />
          </a>
          <a href="https://www.facebook.com/share/1HpJTwTkX2/" target="_blank" rel="noopener noreferrer" className="hover:opacity-90">
            <img src="https://img.shields.io/badge/Facebook-1877F2?style=flat-square&logo=facebook&logoColor=white" alt="Facebook" />
          </a>
        </div>
      </section>

      {/* Footer Signature */}
      <div className="text-center text-[11px] text-slate-400 pt-2 pb-1 border-t border-white/10">
        ⚡ Conçu & maintenu par <strong className="text-white">Nancy Fitahianiavo</strong> (<code>N-dev-Mada</code>) — Suite <strong className="text-[rgb(var(--acc-1))]">N-product</strong>
      </div>
    </div>
  );
}
