import { useRef, useState } from 'react';
import { useConfig } from '../../../lib/config-context';
import { PRESETS, buildPreset } from '../../../lib/presets';
import { readFileAsText } from '../../../lib/utils';
import Icon from '../../ui/Icon';
import { useToast } from '../../ui/Toast';

export default function DataTab() {
  const { setConfig, exportConfig, exportStandalone, importConfig, resetToDefaults, t } = useConfig();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const applyPreset = (id: string, label: string) => {
    if (confirming !== id) {
      setConfirming(id);
      window.setTimeout(() => setConfirming((c) => (c === id ? null : c)), 4000);
      return;
    }
    setConfirming(null);
    setConfig(buildPreset(id));
    toast(`Modèle « ${label} » chargé.`, 'success');
  };

  const onImport = async (file?: File) => {
    if (!file) return;
    const t = toast('Lecture du fichier…', 'loading');
    try {
      const text = await readFileAsText(file);
      importConfig(text);
      t.update('Configuration importée avec succès.', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Fichier invalide : JSON illisible.';
      t.update(msg, 'error', 5000);
    }
  };

  return (
    <div className="space-y-6">
      <section className="space-y-2.5">
        <h3 className="text-sm font-semibold text-slate-100">Modèles de profil</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Remplace intégralement le contenu actuel. Exportez d’abord si vous souhaitez conserver
          votre travail.
        </p>
        <div className="space-y-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id, p.label)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                confirming === p.id
                  ? 'border-amber-500/60 bg-amber-500/10'
                  : 'border-white/10 bg-white/[0.02] hover:border-[rgb(var(--acc-1)/0.5)]'
              }`}
            >
              <span className="w-9 h-9 rounded-lg bg-[rgb(var(--acc-1)/0.15)] border border-[rgb(var(--acc-1)/0.3)] flex items-center justify-center text-[rgb(var(--acc-1))] shrink-0">
                <Icon name={p.icon} className="w-4 h-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-100">{p.label}</span>
                <span className="block text-[11px] text-slate-400 leading-snug mt-0.5">
                  {confirming === p.id ? 'Cliquez à nouveau pour confirmer le remplacement.' : p.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2.5 border-t border-white/5 pt-5">
        <h3 className="text-sm font-semibold text-slate-100">Fichier de configuration</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Exportez votre <code className="font-mono text-[rgb(var(--acc-1))]">portfolio-config.json</code>{' '}
          puis remplacez le fichier <code className="font-mono">src/data/portfolio-config.json</code>{' '}
          de votre projet pour figer le contenu.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              exportConfig();
              toast('portfolio-config.json téléchargé.', 'success');
            }}
            className="btn-bounce btn-primary flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold"
          >
            <Icon name="download" className="w-4 h-4" />
            Exporter
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-lg glass-badge text-xs font-semibold text-slate-200 hover:text-white"
          >
            <Icon name="upload" className="w-4 h-4" />
            Importer
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => onImport(e.target.files?.[0])}
        />
      </section>

      <section className="space-y-2.5 border-t border-white/5 pt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100">Export HTML Autonome</h3>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Zéro-Build
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Génère un unique fichier <code className="font-mono text-emerald-400">.html</code> complet
          prêt à l'emploi. Déployez-le directement sur GitHub Pages, Netlify, un serveur FTP ou parcourez-le
          hors-ligne en double-cliquant dessus.
        </p>
        <button
          type="button"
          onClick={() => {
            exportStandalone();
            toast('Site HTML autonome généré et téléchargé.', 'success');
          }}
          className="btn-bounce w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/20"
        >
          <Icon name="code-2" className="w-4 h-4" />
          Télécharger le site autonome (.html)
        </button>
      </section>

      {/* Bloc d'action Restauration d'usine bien en évidence */}
      <section className="space-y-3 border-t border-rose-500/20 pt-5 p-4 rounded-xl bg-gradient-to-b from-rose-950/20 to-rose-900/10 border border-rose-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Icon name="alert-triangle" className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-rose-100">{t.editor.resetTitle}</h3>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            N-Product Reset
          </span>
        </div>
        <p className="text-xs text-rose-200/80 leading-relaxed">
          {t.editor.resetDescription}
        </p>
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="btn-bounce w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <Icon name="rotate-ccw" className="w-4 h-4" />
          <span>{t.editor.resetButton}</span>
        </button>
      </section>

      {/* Boîte de dialogue modale de confirmation explicite */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="w-full max-w-md rounded-2xl glass-panel border border-rose-500/40 p-6 shadow-2xl bg-[rgb(var(--surface)/0.95)] text-slate-100 space-y-4">
            <div className="flex items-start gap-4">
              <span className="p-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
                <Icon name="alert-triangle" className="w-6 h-6" />
              </span>
              <div>
                <h4 id="reset-dialog-title" className="text-base font-bold text-white">
                  {t.editor.confirmResetButton} ?
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Cette action est irréversible. L'ensemble des modifications personnalisées (textes, images, thèmes et sections) enregistrées dans votre navigateur seront effacées. La configuration initiale du projet sera immédiatement réinjectée.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200 block mb-0.5">Conseil de sécurité :</span>
              Si vous souhaitez conserver votre travail actuel, pensez à utiliser l'action <strong className="text-slate-200">« Exporter JSON »</strong> avant de confirmer.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white glass-badge transition-all"
              >
                {t.editor.cancelButton}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  resetToDefaults();
                }}
                className="btn-bounce px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 flex items-center gap-1.5"
              >
                <Icon name="rotate-ccw" className="w-3.5 h-3.5" />
                <span>{t.editor.confirmResetButton}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
