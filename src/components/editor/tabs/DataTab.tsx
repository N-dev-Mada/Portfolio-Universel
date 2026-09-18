import { useRef, useState } from 'react';
import { useConfig } from '../../../lib/config-context';
import { PRESETS, buildPreset } from '../../../lib/presets';
import { readFileAsText } from '../../../lib/utils';
import Icon from '../../ui/Icon';
import { useToast } from '../../ui/Toast';

export default function DataTab() {
  const { setConfig, exportConfig, importConfig, reset } = useConfig();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

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
        <h3 className="text-sm font-semibold text-slate-100">Réinitialisation</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Efface les modifications enregistrées dans ce navigateur et recharge la configuration
          d’origine du projet.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirming !== '__reset') {
              setConfirming('__reset');
              window.setTimeout(() => setConfirming((c) => (c === '__reset' ? null : c)), 4000);
              return;
            }
            setConfirming(null);
            reset();
            toast('Configuration réinitialisée.', 'info');
          }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
            confirming === '__reset'
              ? 'bg-rose-500/20 text-rose-200 border border-rose-500/50'
              : 'glass-badge text-rose-300 hover:text-rose-200'
          }`}
        >
          <Icon name="rotate-ccw" className="w-4 h-4" />
          {confirming === '__reset' ? 'Confirmer la réinitialisation' : 'Réinitialiser'}
        </button>
      </section>
    </div>
  );
}
