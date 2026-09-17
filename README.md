# Portfolio universel — système dynamique & éditable sans code

Portfolio React/Vite entièrement piloté par un unique fichier de configuration JSON,
avec éditeur visuel intégré (« Visual Portfolio Builder »).

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production dans dist/
npm run lint       # vérification TypeScript
```

## Principe

Tout le contenu du site vit dans `src/data/portfolio-config.json`.
Aucun texte, lien, image ou couleur n'est écrit en dur dans les composants.

**Règle d'affichage conditionnel :** tout champ vide (`""`) ou toute liste vide (`[]`)
masque automatiquement l'élément correspondant. Vider `projects.items` supprime la
section Projets ; vider un lien LinkedIn supprime le bouton ; etc.

## Éditeur visuel

- Bouton engrenage en bas à gauche, ou raccourci **Ctrl + Shift + E**.
- Cinq onglets : Général, Contenu, Sections, Style, Données.
- Les modifications s'appliquent en direct et sont sauvegardées dans le
  `localStorage` du navigateur.
- Onglet **Données** : modèles de profil (Tech, Créatif, Business, Académique),
  export du `portfolio-config.json`, import d'un fichier existant, réinitialisation.

### Figer son contenu

1. Personnaliser via l'éditeur.
2. Onglet **Données → Exporter**.
3. Remplacer `src/data/portfolio-config.json` par le fichier téléchargé.
4. `npm run build`.

## Arborescence

```
src/
├── App.tsx                        Composition racine (providers + boucle de sections)
├── index.css                      Variables de thème, glassmorphism, animations
├── data/portfolio-config.json     ⇦ source unique de vérité du contenu
├── types/config.ts                Schéma TypeScript complet
├── lib/
│   ├── config-context.tsx         État global, persistance, import/export
│   ├── themes.ts                  4 palettes d'accentuation
│   ├── fonts.ts                   8 Google Fonts chargées à la volée
│   ├── presets.ts                 4 modèles de profil
│   └── utils.ts                   filled(), setPath(), deepMerge(), etc.
├── components/
│   ├── layout/                    Navbar, Footer, AmbientBackground
│   ├── sections/                  Hero, Skills, Projects, Experience,
│   │                              Testimonials, Contact, SectionRenderer
│   ├── ui/                        Icon (registre Lucide), Toast, Reveal
│   └── editor/
│       ├── EditorLauncher.tsx     Bouton flottant + raccourci clavier
│       ├── EditorPanel.tsx        Panneau latéral à onglets
│       ├── Group.tsx              Bloc repliable
│       ├── fields/                TextField, ImageField, IconPicker, ListEditor…
│       └── tabs/                  General, Content, Sections, Theme, Data
```

## Personnalisation visuelle

| Réglage | Emplacement JSON | Valeurs |
|---|---|---|
| Palette | `theme.preset` | `violet-cyan`, `emerald-teal`, `rose-amber`, `mono` |
| Typographie | `theme.font` | voir `src/lib/fonts.ts` |
| Arrondis | `theme.radius` | `sm`, `md`, `lg`, `xl` |
| Halos de fond | `theme.ambientGlow` | `true` / `false` |

Les couleurs sont exposées en variables CSS (`--acc-1`, `--acc-2`, `--acc-3`) : aucun
composant ne référence une couleur en dur, changer de palette suffit.

## Formulaire de contact

Par défaut l'envoi est simulé côté client. Renseignez `contact.form.endpoint`
(Formspree, Getform, API maison…) pour un envoi réel en `POST` JSON.

## Ajouter une icône

Les icônes proposées sont listées dans `ICON_LIBRARY` (`src/components/ui/Icon.tsx`).
Pour en ajouter une : importez-la depuis `lucide-react`, ajoutez-la au `REGISTRY`
puis à `ICON_LIBRARY`. Le registre est statique afin de ne pas empaqueter les
1500 icônes de la librairie.
