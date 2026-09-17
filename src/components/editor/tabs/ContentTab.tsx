import { useConfig } from '../../../lib/config-context';
import type {
  AccentIndex,
  CtaItem,
  ContactInfo,
  ExperienceItem,
  FloatingBadge,
  FormSubject,
  ProjectFilter,
  ProjectItem,
  ProjectLink,
  SkillCategory,
  SkillItem,
  SocialLink,
  StatItem,
  TerminalLine,
  TestimonialItem,
} from '../../../types/config';
import Group from '../Group';
import IconPicker from '../fields/IconPicker';
import ListEditor from '../fields/ListEditor';
import {
  ImageField,
  NumberField,
  SelectField,
  TagsField,
  TextAreaField,
  TextField,
  ToggleField,
} from '../fields/Fields';

function AccentSelect({
  value,
  onChange,
}: {
  value: AccentIndex;
  onChange: (v: AccentIndex) => void;
}) {
  return (
    <SelectField
      label="Couleur d’accent"
      value={String(value ?? 1)}
      onChange={(v) => onChange(Number(v) as AccentIndex)}
      options={[
        { value: '1', label: 'Accent 1 (principal)' },
        { value: '2', label: 'Accent 2 (secondaire)' },
        { value: '3', label: 'Accent 3 (tertiaire)' },
      ]}
    />
  );
}

/* ------------------------------ ACCUEIL ------------------------------ */
function HeroEditor() {
  const { config, update } = useConfig();
  const h = config.hero;

  return (
    <Group title="Accueil (Hero)" icon="home" defaultOpen>
      <TextField label="Badge de statut" value={h.badgeText} onChange={(v) => update('hero.badgeText', v)} hint="Vide = badge masqué." />
      <ToggleField label="Pastille clignotante" value={h.badgePulse} onChange={(v) => update('hero.badgePulse', v)} />
      <TextField label="Titre — première ligne" value={h.title} onChange={(v) => update('hero.title', v)} />
      <TextField label="Titre — partie colorée" value={h.titleHighlight} onChange={(v) => update('hero.titleHighlight', v)} />
      <TextAreaField label="Présentation" value={h.subtitle} onChange={(v) => update('hero.subtitle', v)} rows={5} />

      <div className="pt-1">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Boutons d’action
        </span>
        <ListEditor<CtaItem>
          items={h.ctas}
          onChange={(v) => update('hero.ctas', v)}
          create={() => ({ label: 'Nouveau bouton', target: 'contact', icon: 'arrow-right', variant: 'ghost' })}
          titleOf={(i) => i.label}
          addLabel="Ajouter un bouton"
          max={3}
        >
          {(item, _i, set) => (
            <>
              <TextField label="Libellé" value={item.label} onChange={(v) => set({ label: v })} />
              <TextField label="Section cible" value={item.target} onChange={(v) => set({ target: v })} />
              <IconPicker label="Icône" value={item.icon} onChange={(v) => set({ icon: v })} />
              <SelectField
                label="Style"
                value={item.variant}
                onChange={(v) => set({ variant: v })}
                options={[
                  { value: 'primary', label: 'Principal (dégradé)' },
                  { value: 'ghost', label: 'Secondaire (vitré)' },
                ]}
              />
            </>
          )}
        </ListEditor>
      </div>

      <div className="pt-1">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Chiffres clés
        </span>
        <ListEditor<StatItem>
          items={h.stats}
          onChange={(v) => update('hero.stats', v)}
          create={() => ({ value: '0', label: 'Libellé' })}
          titleOf={(i) => `${i.value} — ${i.label}`}
          addLabel="Ajouter un chiffre"
          max={4}
        >
          {(item, _i, set) => (
            <>
              <TextField label="Valeur" value={item.value} onChange={(v) => set({ value: v })} />
              <TextField label="Libellé" value={item.label} onChange={(v) => set({ label: v })} />
            </>
          )}
        </ListEditor>
      </div>

      <SelectField
        label="Visuel de droite"
        value={h.showcase.type}
        onChange={(v) => update('hero.showcase.type', v)}
        options={[
          { value: 'terminal', label: 'Terminal / encadré texte' },
          { value: 'image', label: 'Photo ou visuel' },
          { value: 'none', label: 'Aucun (titre pleine largeur)' },
        ]}
      />

      {h.showcase.type === 'image' && (
        <>
          <ImageField label="Image" value={h.showcase.image} onChange={(v) => update('hero.showcase.image', v)} />
          <TextField label="Légende" value={h.showcase.imageCaption} onChange={(v) => update('hero.showcase.imageCaption', v)} />
        </>
      )}

      {h.showcase.type === 'terminal' && (
        <>
          <TextField label="Titre de l’encadré" value={h.showcase.terminalTitle} onChange={(v) => update('hero.showcase.terminalTitle', v)} />
          <TextField label="Étiquette d’en-tête" value={h.showcase.terminalTag} onChange={(v) => update('hero.showcase.terminalTag', v)} />
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Lignes affichées
            </span>
            <ListEditor<TerminalLine>
              items={h.showcase.terminalLines}
              onChange={(v) => update('hero.showcase.terminalLines', v)}
              create={() => ({ text: '', tone: 'default' })}
              titleOf={(i) => i.text || '(ligne vide)'}
              addLabel="Ajouter une ligne"
              max={20}
            >
              {(item, _i, set) => (
                <>
                  <TextField label="Texte" value={item.text} onChange={(v) => set({ text: v })} />
                  <SelectField
                    label="Couleur"
                    value={item.tone}
                    onChange={(v) => set({ tone: v })}
                    options={[
                      { value: 'default', label: 'Neutre' },
                      { value: 'keyword', label: 'Accent 1' },
                      { value: 'accent', label: 'Accent 2' },
                      { value: 'string', label: 'Vert' },
                      { value: 'number', label: 'Ambre' },
                      { value: 'muted', label: 'Grisé (commentaire)' },
                    ]}
                  />
                </>
              )}
            </ListEditor>
          </div>
          <TextField label="Pied — gauche" value={h.showcase.terminalFooterLeft} onChange={(v) => update('hero.showcase.terminalFooterLeft', v)} />
          <TextField label="Pied — droite" value={h.showcase.terminalFooterRight} onChange={(v) => update('hero.showcase.terminalFooterRight', v)} />
        </>
      )}

      {h.showcase.type !== 'none' && (
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Badges flottants (2 max)
          </span>
          <ListEditor<FloatingBadge>
            items={h.showcase.floatingBadges}
            onChange={(v) => update('hero.showcase.floatingBadges', v)}
            create={() => ({ icon: 'star', title: 'Titre', subtitle: 'Sous-titre', accent: 1 })}
            titleOf={(i) => i.title}
            addLabel="Ajouter un badge"
            max={2}
          >
            {(item, _i, set) => (
              <>
                <IconPicker label="Icône" value={item.icon} onChange={(v) => set({ icon: v })} />
                <TextField label="Titre" value={item.title} onChange={(v) => set({ title: v })} />
                <TextField label="Sous-titre" value={item.subtitle} onChange={(v) => set({ subtitle: v })} />
                <AccentSelect value={item.accent} onChange={(v) => set({ accent: v })} />
              </>
            )}
          </ListEditor>
        </div>
      )}
    </Group>
  );
}

/* ------------------------------ COMPÉTENCES ------------------------------ */
function SkillsEditor() {
  const { config, update } = useConfig();
  const s = config.skills;

  return (
    <Group title="Compétences / Services" icon="sparkles">
      <IconPicker label="Icône du badge" value={s.badgeIcon} onChange={(v) => update('skills.badgeIcon', v)} />
      <TextField label="Texte du badge" value={s.badgeText} onChange={(v) => update('skills.badgeText', v)} />
      <TextField label="Titre" value={s.title} onChange={(v) => update('skills.title', v)} />
      <TextField label="Titre — partie colorée" value={s.titleHighlight} onChange={(v) => update('skills.titleHighlight', v)} />
      <TextAreaField label="Sous-titre" value={s.subtitle} onChange={(v) => update('skills.subtitle', v)} />
      <ToggleField
        label="Afficher les barres de niveau"
        value={s.showLevels}
        onChange={(v) => update('skills.showLevels', v)}
        hint="Désactivez pour une simple liste à puces (profils non techniques)."
      />

      <ListEditor<SkillCategory>
        items={s.categories}
        onChange={(v) => update('skills.categories', v)}
        create={() => ({
          icon: 'star',
          badge: 'Catégorie',
          title: 'Nouvelle catégorie',
          description: '',
          accent: 1,
          items: [],
          tags: [],
        })}
        titleOf={(i) => i.title}
        addLabel="Ajouter une catégorie"
        max={6}
      >
        {(cat, _i, set) => (
          <>
            <IconPicker label="Icône" value={cat.icon} onChange={(v) => set({ icon: v })} />
            <TextField label="Étiquette" value={cat.badge} onChange={(v) => set({ badge: v })} />
            <TextField label="Titre" value={cat.title} onChange={(v) => set({ title: v })} />
            <TextAreaField label="Description" value={cat.description} onChange={(v) => set({ description: v })} />
            <AccentSelect value={cat.accent} onChange={(v) => set({ accent: v })} />
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Éléments
              </span>
              <ListEditor<SkillItem>
                items={cat.items}
                onChange={(v) => set({ items: v })}
                create={() => ({ name: 'Nouvel élément', level: 80, levelLabel: 'Confirmé' })}
                titleOf={(it) => it.name}
                addLabel="Ajouter un élément"
                max={10}
              >
                {(it, _j, setIt) => (
                  <>
                    <TextField label="Intitulé" value={it.name} onChange={(v) => setIt({ name: v })} />
                    {s.showLevels && (
                      <>
                        <NumberField label="Niveau (%)" value={it.level} onChange={(v) => setIt({ level: v })} />
                        <TextField label="Mention" value={it.levelLabel} onChange={(v) => setIt({ levelLabel: v })} />
                      </>
                    )}
                  </>
                )}
              </ListEditor>
            </div>
            <TagsField label="Mots-clés" value={cat.tags} onChange={(v) => set({ tags: v })} />
          </>
        )}
      </ListEditor>
    </Group>
  );
}

/* ------------------------------ PROJETS ------------------------------ */
function ProjectsEditor() {
  const { config, update } = useConfig();
  const p = config.projects;

  return (
    <Group title="Projets / Galerie" icon="layers">
      <IconPicker label="Icône du badge" value={p.badgeIcon} onChange={(v) => update('projects.badgeIcon', v)} />
      <TextField label="Texte du badge" value={p.badgeText} onChange={(v) => update('projects.badgeText', v)} />
      <TextField label="Titre" value={p.title} onChange={(v) => update('projects.title', v)} />
      <TextField label="Titre — partie colorée" value={p.titleHighlight} onChange={(v) => update('projects.titleHighlight', v)} />
      <TextAreaField label="Sous-titre" value={p.subtitle} onChange={(v) => update('projects.subtitle', v)} />
      <SelectField
        label="Disposition"
        value={p.layout}
        onChange={(v) => update('projects.layout', v)}
        options={[
          { value: 'grid-2', label: '2 colonnes (détaillé)' },
          { value: 'grid-3', label: '3 colonnes (galerie)' },
          { value: 'gallery', label: 'Galerie compacte' },
        ]}
      />
      <ToggleField label="Filtres par catégorie" value={p.filtersEnabled} onChange={(v) => update('projects.filtersEnabled', v)} />

      {p.filtersEnabled && (
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
            Filtres
          </span>
          <ListEditor<ProjectFilter>
            items={p.filters}
            onChange={(v) => update('projects.filters', v)}
            create={() => ({ id: 'categorie', label: 'Catégorie' })}
            titleOf={(f) => f.label}
            addLabel="Ajouter un filtre"
            max={6}
          >
            {(f, _i, set) => (
              <>
                <TextField label="Libellé" value={f.label} onChange={(v) => set({ label: v })} />
                <TextField label="Identifiant" value={f.id} onChange={(v) => set({ id: v })} hint="À reporter dans le champ « catégorie » des projets." />
              </>
            )}
          </ListEditor>
        </div>
      )}

      <ListEditor<ProjectItem>
        items={p.items}
        onChange={(v) => update('projects.items', v)}
        create={() => ({
          title: 'Nouveau projet',
          category: '',
          categoryLabel: '',
          description: '',
          image: '',
          accent: 1,
          tags: [],
          links: [],
        })}
        titleOf={(i) => i.title}
        addLabel="Ajouter un projet"
        max={20}
      >
        {(item, _i, set) => (
          <>
            <TextField label="Titre" value={item.title} onChange={(v) => set({ title: v })} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => set({ description: v })} rows={4} />
            <ImageField label="Visuel" value={item.image} onChange={(v) => set({ image: v })} hint="Vide = vignette générée automatiquement." />
            <TextField label="Identifiant de catégorie" value={item.category} onChange={(v) => set({ category: v })} />
            <TextField label="Étiquette affichée" value={item.categoryLabel} onChange={(v) => set({ categoryLabel: v })} />
            <AccentSelect value={item.accent} onChange={(v) => set({ accent: v })} />
            <TagsField label="Technologies / mots-clés" value={item.tags} onChange={(v) => set({ tags: v })} />
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Liens
              </span>
              <ListEditor<ProjectLink>
                items={item.links}
                onChange={(v) => set({ links: v })}
                create={() => ({ label: 'Voir le projet', url: '', icon: 'external-link' })}
                titleOf={(l) => l.label}
                addLabel="Ajouter un lien"
                max={3}
              >
                {(l, _j, setL) => (
                  <>
                    <TextField label="Libellé" value={l.label} onChange={(v) => setL({ label: v })} />
                    <TextField label="URL" value={l.url} onChange={(v) => setL({ url: v })} />
                    <IconPicker label="Icône" value={l.icon} onChange={(v) => setL({ icon: v })} />
                  </>
                )}
              </ListEditor>
            </div>
          </>
        )}
      </ListEditor>
    </Group>
  );
}

/* ------------------------------ PARCOURS ------------------------------ */
function ExperienceEditor() {
  const { config, update } = useConfig();
  const e = config.experience;

  return (
    <Group title="Expériences / Parcours" icon="milestone">
      <IconPicker label="Icône du badge" value={e.badgeIcon} onChange={(v) => update('experience.badgeIcon', v)} />
      <TextField label="Texte du badge" value={e.badgeText} onChange={(v) => update('experience.badgeText', v)} />
      <TextField label="Titre" value={e.title} onChange={(v) => update('experience.title', v)} />
      <TextField label="Titre — partie colorée" value={e.titleHighlight} onChange={(v) => update('experience.titleHighlight', v)} />
      <TextAreaField label="Sous-titre" value={e.subtitle} onChange={(v) => update('experience.subtitle', v)} />

      <ListEditor<ExperienceItem>
        items={e.items}
        onChange={(v) => update('experience.items', v)}
        create={() => ({ title: 'Nouveau poste', organization: '', period: '', description: '', accent: 1, tags: [] })}
        titleOf={(i) => i.title}
        addLabel="Ajouter une étape"
        max={15}
      >
        {(item, _i, set) => (
          <>
            <TextField label="Intitulé" value={item.title} onChange={(v) => set({ title: v })} />
            <TextField label="Organisation / lieu" value={item.organization} onChange={(v) => set({ organization: v })} />
            <TextField label="Période" value={item.period} onChange={(v) => set({ period: v })} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => set({ description: v })} rows={4} />
            <AccentSelect value={item.accent} onChange={(v) => set({ accent: v })} />
            <TagsField label="Mots-clés" value={item.tags} onChange={(v) => set({ tags: v })} />
          </>
        )}
      </ListEditor>
    </Group>
  );
}

/* ------------------------------ TÉMOIGNAGES ------------------------------ */
function TestimonialsEditor() {
  const { config, update } = useConfig();
  const t = config.testimonials;

  return (
    <Group title="Témoignages" icon="quote">
      <IconPicker label="Icône du badge" value={t.badgeIcon} onChange={(v) => update('testimonials.badgeIcon', v)} />
      <TextField label="Texte du badge" value={t.badgeText} onChange={(v) => update('testimonials.badgeText', v)} />
      <TextField label="Titre" value={t.title} onChange={(v) => update('testimonials.title', v)} />
      <TextField label="Titre — partie colorée" value={t.titleHighlight} onChange={(v) => update('testimonials.titleHighlight', v)} />
      <TextAreaField label="Sous-titre" value={t.subtitle} onChange={(v) => update('testimonials.subtitle', v)} />

      <ListEditor<TestimonialItem>
        items={t.items}
        onChange={(v) => update('testimonials.items', v)}
        create={() => ({ quote: '', author: '', role: '', avatar: '', rating: 5 })}
        titleOf={(i) => i.author || i.quote.slice(0, 40)}
        addLabel="Ajouter un témoignage"
        max={12}
      >
        {(item, _i, set) => (
          <>
            <TextAreaField label="Citation" value={item.quote} onChange={(v) => set({ quote: v })} rows={4} />
            <TextField label="Auteur" value={item.author} onChange={(v) => set({ author: v })} />
            <TextField label="Fonction / entreprise" value={item.role} onChange={(v) => set({ role: v })} />
            <ImageField label="Photo" value={item.avatar} onChange={(v) => set({ avatar: v })} />
            <NumberField label="Note (étoiles)" value={item.rating} onChange={(v) => set({ rating: v })} min={0} max={5} />
          </>
        )}
      </ListEditor>
    </Group>
  );
}

/* ------------------------------ CONTACT ------------------------------ */
function ContactEditor() {
  const { config, update } = useConfig();
  const c = config.contact;

  return (
    <Group title="Contact" icon="mail">
      <IconPicker label="Icône du badge" value={c.badgeIcon} onChange={(v) => update('contact.badgeIcon', v)} />
      <TextField label="Texte du badge" value={c.badgeText} onChange={(v) => update('contact.badgeText', v)} />
      <TextField label="Titre" value={c.title} onChange={(v) => update('contact.title', v)} />
      <TextField label="Titre — partie colorée" value={c.titleHighlight} onChange={(v) => update('contact.titleHighlight', v)} />
      <TextAreaField label="Introduction" value={c.intro} onChange={(v) => update('contact.intro', v)} rows={4} />

      <div>
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
          Coordonnées
        </span>
        <ListEditor<ContactInfo>
          items={c.infos}
          onChange={(v) => update('contact.infos', v)}
          create={() => ({ icon: 'mail', label: 'Libellé', value: '', copyable: false, accent: 1 })}
          titleOf={(i) => i.label || i.value}
          addLabel="Ajouter une coordonnée"
          max={6}
        >
          {(item, _i, set) => (
            <>
              <IconPicker label="Icône" value={item.icon} onChange={(v) => set({ icon: v })} />
              <TextField label="Libellé" value={item.label} onChange={(v) => set({ label: v })} />
              <TextField label="Valeur" value={item.value} onChange={(v) => set({ value: v })} />
              <ToggleField label="Bouton copier" value={item.copyable} onChange={(v) => set({ copyable: v })} />
              <AccentSelect value={item.accent} onChange={(v) => set({ accent: v })} />
            </>
          )}
        </ListEditor>
      </div>

      <TextField label="Titre du bloc réseaux" value={c.socialsTitle} onChange={(v) => update('contact.socialsTitle', v)} />
      <ListEditor<SocialLink>
        items={c.socials}
        onChange={(v) => update('contact.socials', v)}
        create={() => ({ label: 'Réseau', icon: 'link', url: '', accent: 1 })}
        titleOf={(i) => i.label}
        addLabel="Ajouter un réseau"
        max={8}
      >
        {(item, _i, set) => (
          <>
            <TextField label="Libellé" value={item.label} onChange={(v) => set({ label: v })} />
            <TextField label="URL" value={item.url} onChange={(v) => set({ url: v })} />
            <IconPicker label="Icône" value={item.icon} onChange={(v) => set({ icon: v })} />
            <AccentSelect value={item.accent} onChange={(v) => set({ accent: v })} />
          </>
        )}
      </ListEditor>

      <ToggleField label="Afficher le formulaire" value={c.form.enabled} onChange={(v) => update('contact.form.enabled', v)} />

      {c.form.enabled && (
        <>
          <TextField label="Titre du formulaire" value={c.form.title} onChange={(v) => update('contact.form.title', v)} />
          <TextField label="Sous-titre" value={c.form.subtitle} onChange={(v) => update('contact.form.subtitle', v)} />
          <TextField label="Libellé du bouton" value={c.form.submitLabel} onChange={(v) => update('contact.form.submitLabel', v)} />
          <TextAreaField label="Message de succès" value={c.form.successMessage} onChange={(v) => update('contact.form.successMessage', v)} />
          <TextAreaField label="Mention de confidentialité" value={c.form.privacyNote} onChange={(v) => update('contact.form.privacyNote', v)} />
          <TextField
            label="Endpoint d’envoi (optionnel)"
            value={c.form.endpoint}
            onChange={(v) => update('contact.form.endpoint', v)}
            hint="URL Formspree / Getform / API perso. Vide = simulation locale."
          />
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
              Objets proposés
            </span>
            <ListEditor<FormSubject>
              items={c.form.subjects}
              onChange={(v) => update('contact.form.subjects', v)}
              create={() => ({ value: 'objet', label: 'Nouvel objet' })}
              titleOf={(i) => i.label}
              addLabel="Ajouter un objet"
              max={8}
            >
              {(item, _i, set) => (
                <>
                  <TextField label="Libellé" value={item.label} onChange={(v) => set({ label: v })} />
                  <TextField label="Valeur technique" value={item.value} onChange={(v) => set({ value: v })} />
                </>
              )}
            </ListEditor>
          </div>
        </>
      )}
    </Group>
  );
}

export default function ContentTab() {
  const { config } = useConfig();
  const enabledTypes = new Set(config.sections.filter((s) => s.enabled).map((s) => s.type));

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400 leading-relaxed">
        Seules les sections actives sont listées. Laissez un champ vide pour masquer l’élément
        correspondant sur le site.
      </p>
      {enabledTypes.has('hero') && <HeroEditor />}
      {enabledTypes.has('skills') && <SkillsEditor />}
      {enabledTypes.has('projects') && <ProjectsEditor />}
      {enabledTypes.has('experience') && <ExperienceEditor />}
      {enabledTypes.has('testimonials') && <TestimonialsEditor />}
      {enabledTypes.has('contact') && <ContactEditor />}
    </div>
  );
}
