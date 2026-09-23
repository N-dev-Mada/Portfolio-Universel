import { useConfig } from '../../../lib/config-context';
import { ImageField, SelectField, TextAreaField, TextField, ToggleField } from '../fields/Fields';
import LanguageSwitcher from '../../ui/LanguageSwitcher';
import Group from '../Group';

export default function GeneralTab() {
  const { config, update, locale, setLocale, t } = useConfig();

  const activeSections = config.sections.filter((s) => s.enabled);
  const sectionOptions = activeSections.map((s) => ({
    value: s.id,
    label: `${s.label} (#${s.id})`,
  }));

  const ctaOptions = sectionOptions.some((o) => o.value === config.nav.ctaTarget)
    ? sectionOptions
    : config.nav.ctaTarget
      ? [{ value: config.nav.ctaTarget, label: `${config.nav.ctaTarget} (personnalisé)` }, ...sectionOptions]
      : [{ value: '', label: '— Sélectionner une section —' }, ...sectionOptions];

  return (
    <div className="space-y-4">
      <Group title="Identité" icon="user" defaultOpen>
        <TextField
          label="Nom affiché"
          value={config.identity.name}
          onChange={(v) => update('identity.name', v)}
        />
        <TextField
          label="Intitulé / rôle"
          value={config.identity.role}
          onChange={(v) => update('identity.role', v)}
        />
        <TextField
          label="Initiales (logo texte)"
          value={config.identity.initials}
          onChange={(v) => update('identity.initials', v)}
          hint="Laissez vide pour masquer la pastille."
        />
        <ImageField
          label="Logo image (remplace les initiales)"
          value={config.identity.logoImage}
          onChange={(v) => update('identity.logoImage', v)}
        />
      </Group>

      <Group title="Navigation" icon="menu">
        <TextField
          label="Libellé du bouton principal"
          value={config.nav.ctaLabel}
          onChange={(v) => update('nav.ctaLabel', v)}
          hint="Vide = bouton masqué."
        />
        <SelectField
          label="Section cible"
          value={config.nav.ctaTarget}
          onChange={(v) => update('nav.ctaTarget', v)}
          options={ctaOptions}
          hint="Section vers laquelle défile le bouton principal."
        />
        <TextField
          label="Libellé du bouton mobile"
          value={config.nav.mobileCtaLabel}
          onChange={(v) => update('nav.mobileCtaLabel', v)}
        />
      </Group>

      <Group title="Référencement (SEO)" icon="globe">
        <TextField
          label="Titre de la page"
          value={config.meta.title}
          onChange={(v) => update('meta.title', v)}
        />
        <TextAreaField
          label="Description"
          value={config.meta.description}
          onChange={(v) => update('meta.description', v)}
        />
        <div className="pt-1">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {t.nav.language} active de l'interface
          </label>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-slate-300">
              <span className="font-medium text-white block">
                {locale === 'fr' ? 'Français (FR)' : 'English (EN)'}
              </span>
              <span className="text-[11px] text-slate-400">
                Bascule instantanée des libellés et de l'attribut HTML lang.
              </span>
            </div>
            <LanguageSwitcher variant="segmented" />
          </div>
        </div>

        <SelectField
          label="Langue du document HTML (meta.lang)"
          value={config.meta.lang || 'fr'}
          onChange={(v) => {
            update('meta.lang', v);
            if (v === 'fr' || v === 'en') {
              setLocale(v);
            }
          }}
          options={[
            { value: 'fr', label: 'Français (FR)' },
            { value: 'en', label: 'English (EN)' },
            { value: 'es', label: 'Español (ES)' },
            { value: 'de', label: 'Deutsch (DE)' },
          ]}
          hint="Définit l'attribut lang du document HTML et configure le dictionnaire de traduction."
        />
      </Group>

      <Group title="Pied de page" icon="panel-bottom">
        <TextField
          label="Mention légale"
          value={config.footer.copyright}
          onChange={(v) => update('footer.copyright', v)}
        />
        <ToggleField
          label="Navigation rapide"
          value={config.footer.showQuickNav}
          onChange={(v) => update('footer.showQuickNav', v)}
        />
        <ToggleField
          label="Bouton « haut de page »"
          value={config.footer.showBackToTop}
          onChange={(v) => update('footer.showBackToTop', v)}
        />
      </Group>
    </div>
  );
}
