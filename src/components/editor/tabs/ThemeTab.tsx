import { useConfig } from '../../../lib/config-context';
import { FONTS } from '../../../lib/fonts';
import { THEMES } from '../../../lib/themes';
import { cx } from '../../../lib/utils';
import { SelectField, ToggleField } from '../fields/Fields';
import Icon from '../../ui/Icon';

export default function ThemeTab() {
  const { config, update } = useConfig();

  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Couleurs d’accentuation
        </span>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => update('theme.preset', t.id)}
              className={cx(
                'flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all',
                config.theme.preset === t.id
                  ? 'border-[rgb(var(--acc-1))] bg-[rgb(var(--acc-1)/0.1)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/25',
              )}
            >
              <span className="flex -space-x-1.5 shrink-0">
                <span
                  className="w-5 h-5 rounded-full border-2 border-[rgb(var(--bg-base))]"
                  style={{ background: t.swatch[0] }}
                />
                <span
                  className="w-5 h-5 rounded-full border-2 border-[rgb(var(--bg-base))]"
                  style={{ background: t.swatch[1] }}
                />
              </span>
              <span className="text-xs font-medium text-slate-200 leading-tight">{t.label}</span>
              {config.theme.preset === t.id && (
                <Icon name="check" className="w-3.5 h-3.5 text-[rgb(var(--acc-1))] ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <SelectField
        label="Typographie (Google Fonts)"
        value={config.theme.font}
        onChange={(v) => update('theme.font', v)}
        options={FONTS.map((f) => ({ value: f.id, label: f.label }))}
        hint="La police est chargée à la volée depuis Google Fonts."
      />

      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <p className="text-2xl font-extrabold text-white leading-tight">Aperçu typographique</p>
        <p className="text-sm text-slate-400 mt-1">
          Le rendu ci-dessus utilise la police sélectionnée.
        </p>
      </div>

      <SelectField
        label="Arrondi des composants"
        value={config.theme.radius}
        onChange={(v) => update('theme.radius', v)}
        options={[
          { value: 'sm', label: 'Angles nets' },
          { value: 'md', label: 'Léger' },
          { value: 'lg', label: 'Prononcé' },
          { value: 'xl', label: 'Très arrondi (défaut)' },
        ]}
      />

      <ToggleField
        label="Halos lumineux en arrière-plan"
        value={config.theme.ambientGlow}
        onChange={(v) => update('theme.ambientGlow', v)}
        hint="Désactivez pour un rendu plus sobre."
      />
    </div>
  );
}
