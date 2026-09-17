import { useConfig } from '../../../lib/config-context';
import { ImageField, TextAreaField, TextField, ToggleField } from '../fields/Fields';
import Group from '../Group';

export default function GeneralTab() {
  const { config, update } = useConfig();

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
        <TextField
          label="Section cible (identifiant)"
          value={config.nav.ctaTarget}
          onChange={(v) => update('nav.ctaTarget', v)}
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
        <TextField
          label="Langue"
          value={config.meta.lang}
          onChange={(v) => update('meta.lang', v)}
          hint="Code ISO : fr, en, es…"
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
