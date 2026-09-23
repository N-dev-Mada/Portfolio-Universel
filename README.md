# Portfolio Universel (Visual Portfolio Builder) — Suite N-product

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-FR%20%7C%20EN-10B981?style=for-the-badge)](https://github.com/)
[![Suite](https://img.shields.io/badge/Suite-N--product-7C3AED?style=for-the-badge)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> Une Single Page Application (SPA) professionnelle, ultra-rapide et modulaire conçue avec **React 19**, **Vite** et **Tailwind CSS v4**. Elle permet de prévisualiser, personnaliser et déployer un portfolio de calibre international en temps réel grâce à son éditeur visuel intégré sans code (**Visual Portfolio Builder**) ou via un fichier de configuration JSON unique.

---

### 🌟 Origine & Écosystème

- **Développeur & Architecte** : Développé avec rigueur et passion par **N-dev-Mada**.
- **Écosystème** : Ce projet constitue le **second produit officiel de la suite N-product**, dédiée à la création d'outils web modernes, robustes, zéro-dette technique et orientés expérience utilisateur.

---

## ✨ Fonctionnalités Majeures

### 🌐 1. Support Multilingue Natif (Commutateur FR / EN)
- **Commutateur instantané** : Basculez l'interface à tout moment via le sélecteur segmenté responsive (FR / EN) présent dans la barre de navigation et dans l'Éditeur visuel.
- **Propagation complète** : Traduction automatique de tous les libellés fixes (navigation, boutons d'action, filtres de catégories, messages Toast, modales et formulaires).
- **SEO & Accessibilité** : Synchronisation temps réel de l'attribut DOM `<html lang="fr">` ou `<html lang="en">` ainsi que de `meta.lang`.

### 🔄 2. Restauration d'Usine Sécurisée (N-Product Factory Reset)
- **Réinitialisation en 1 clic** : Réinjecte la configuration d'origine officielle issue de `src/data/portfolio-config.json` et purge les caches obsolètes du `localStorage`.
- **Dialogue de confirmation explicite** : Protection anti-fausse manipulation avec modale d'avertissement dédiée, rappel de sécurité pour l'export JSON préalable et notification Toast traduite.

### 📖 3. Section Éditoriale / Blog Immersive
- **Publications & Réflexions** : Intégration d'un module complet pour articles techniques, notes de recherche ou études de cas.
- **Filtrage par tags** : Navigation fluide par mots-clés (`#React`, `#TypeScript`, `#Architecture`).
- **Modale de lecture fluide** : Fenêtre de lecture immersive (`role="dialog"`, fermeture via Échap ou clic externe, support des paragraphes formatés) et redirection externe élégante.

### 📦 4. Export HTML Autonome « Zero-Build »
- **Autonomie totale** : Téléchargez d'un clic un fichier HTML complet (`portfolio-standalone.html`) contenant le balisage, les styles Tailwind CSS, les polices Google Fonts et un script minimaliste d'interaction.
- **Prêt pour l'hébergement** : Déployable immédiatement sur GitHub Pages, un hébergeur mutualisé ou consultable en local sans aucune dépendance ni compilation.
- **Réimportabilité** : La configuration JSON complète est directement embarquée dans le fichier HTML autonome, permettant sa réimportation ultérieure dans le Builder.

### 🎨 5. Éditeur Visuel WYSIWYG Complet
- **Personnalisation en direct** : Palettes d'accentuation prédéfinies, polices Google Fonts chargées à la volée, rayons de bordure et halos d'ambiance avec répercussion instantanée.
- **Gestion des sections** : Glissez-déposez pour réordonner, activez/désactivez les rubriques (Accueil, Compétences, Projets, Parcours, Témoignages, Publications, Contact).
- **Modèles de profil (Presets)** : Basculez en un clic entre profils types (Développeur Fullstack, Designer UI/UX, Consultant Tech, Chercheur).
- **Import / Export JSON** : Téléchargement et réinjection directe du fichier `portfolio-config.json`.

### ⚡ 6. Compression d'Images Intelligente Côté Client
- **Optimisation Canvas HTML5** : Redimensionnement automatique sous le plafond strict de 800×800 px.
- **Encodage WebP / JPEG** : Compression réduisant le poids des images sous **150 Ko**, prévenant tout dépassement de quota du `localStorage` (5 Mo).
- **Support SVG** : Préservation native des fichiers vectoriels SVG sans pixellisation.

### ✉️ 7. Formulaire de Contact Intelligent & Hybride
- **Validation stricte** : Vérification syntaxique de l'adresse e-mail selon les normes RFC (`EMAIL_REGEX`).
- **Mode API REST** : Connexion transparente avec Formspree, Baserow ou votre propre backend via requête `POST` JSON.
- **Bascule dynamique `mailto:`** : Si aucun endpoint n'est renseigné, le formulaire résout automatiquement l'e-mail du profil et pré-remplit l'application de messagerie cliente.

### 🚀 8. Performance & Navigation 60 FPS
- **Spy Scroll optimisé** : Détection passive basée sur l'API native `IntersectionObserver` sans aucun recalcul de géométrie synchrone (`offsetTop`/`offsetHeight`).
- **Architecture Zero-Slop** : Conception rigoureuse respectant les règles d'accessibilité WCAG AA, animations Motion fluides et typographies soignées.

---

## 🛠️ Stack Technique

| Technologie | Version | Rôle |
|---|---|---|
| **React** | `19.0.x` | Librairie d'interface utilisateur réactive |
| **TypeScript** | `5.7.x` | Typage statique strict et intégrité du code |
| **Vite** | `6.2.x` | Environnement de développement et bundler de production |
| **Tailwind CSS** | `4.1.x` | Moteur de styles utilitaire nouvelle génération |
| **Motion** | `12.23.x` | Animations fluides et transitions d'interface |
| **Lucide React** | `0.546.x` | Iconographie vectorielle cohérente et légère |

---

## 🔐 Contrôle d'Accès & Variables d'Environnement

L'éditeur visuel est verrouillé par défaut en production afin d'offrir une expérience visiteur pure et sécurisée.

### 1. Configuration `.env`

Consultez `.env.example` et configurez votre fichier `.env` :

```env
# Autoriser ou masquer globalement l'éditeur visuel
VITE_ENABLE_EDITOR=true
```

- Si `VITE_ENABLE_EDITOR=false` : L'éditeur visuel (bouton flottant et raccourci `Ctrl + Alt + N`) est masqué en production.
- En développement (`npm run dev`), l'éditeur reste accessible pour faciliter la création.

### 2. Accès Administrateur par URL & Persistance de Session

En production avec l'éditeur masqué, le propriétaire peut déverrouiller l'interface d'édition :
- **Activer l'accès** : Ajoutez le paramètre `?admin=true` ou `?edit=true` à l'URL (ex. `https://mon-portfolio.com/?admin=true`).
- **Persistance en session** : L'autorisation est stockée dans le `sessionStorage` (`vpb:editor_authorized`). Vous pouvez naviguer ou recharger la page sans perdre l'accès.
- **Révocation** : Ajoutez `?admin=false` ou `?edit=false` pour refermer la session d'administration.

---

## 🚀 Installation & Démarrage Rapide

### Prérequis
- **Node.js** : version 18.0 ou supérieure
- **npm**, **pnpm** ou **yarn**

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/N-dev-Mada/Portfolio-Universel.git
   cd portfolio-universel
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application est accessible sur `http://localhost:3000`.

4. **Vérification TypeScript & Linting :**
   ```bash
   npm run lint
   ```

5. **Compiler pour la production :**
   ```bash
   npm run build
   ```
   Les fichiers statiques optimisés sont générés dans le répertoire `dist/`.

---

## 📁 Architecture du Projet

```
├── .env.example                       # Variables d'environnement documentées
├── index.html                         # Point d'entrée HTML avec métadonnées
├── metadata.json                      # Métadonnées de l'application
├── package.json                       # Scripts et dépendances
├── tsconfig.json                      # Configuration TypeScript en mode strict
├── vite.config.ts                     # Configuration Vite et Tailwind CSS v4
└── src/
    ├── App.tsx                        # Composant racine avec Providers et ErrorBoundary
    ├── main.tsx                       # Point de montage ReactDOM
    ├── index.css                      # Thème global, variables d'accent et styles
    ├── vite-env.d.ts                  # Typage des variables d'environnement
    ├── data/
    │   └── portfolio-config.json      # ⭐️ Source de vérité centrale du contenu
    ├── types/
    │   └── config.ts                  # Schémas et interfaces TypeScript
    ├── lib/
    │   ├── config-context.tsx         # Contexte global, persistance et reset
    │   ├── export.ts                  # Générateur HTML autonome Zero-Build
    │   ├── fonts.ts                   # Injection dynamique Google Fonts
    │   ├── i18n.ts                    # Dictionnaire de traduction FR / EN
    │   ├── presets.ts                 # Profils métiers préconfigurés
    │   ├── themes.ts                  # Palettes de couleurs et rayons d'arrondis
    │   ├── utils.ts                   # Compression d'images Canvas, scroll, helpers
    │   └── validation.ts              # Validation défensive de la configuration
    └── components/
        ├── layout/                    # Navbar, Footer, AmbientBackground
        ├── sections/                  # Hero, Skills, Projects, Experience, Articles, Testimonials, Contact
        ├── ui/                        # Icon (Lucide), LanguageSwitcher, Toast, Reveal, ErrorBoundary
        └── editor/                    # Visual Portfolio Builder (onglets, champs, modals)
```

---

## ☁️ Guides de Déploiement

L'application étant une Single Page Application (SPA) optimisée, elle se déploie instantanément sur toutes les plateformes modernes.

### ⚡ Vercel

1. Liez votre compte GitHub à **Vercel** et importez le dépôt.
2. Paramètres détectés :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
3. Définissez la variable d'environnement :
   - `VITE_ENABLE_EDITOR` = `false` (recommandé pour la vitrine publique).
4. Cliquez sur **Deploy**. Chaque `git push` déclenchera un déploiement continu.

### 🌐 Netlify

1. Créez un nouveau site depuis GitHub sur **Netlify**.
2. Paramètres de compilation :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Configurez la variable `VITE_ENABLE_EDITOR` dans *Site configuration > Environment variables*.
4. **Règles SPA (Redirection)** : Pour garantir le bon fonctionnement des URLs profondes, créez un fichier `public/_redirects` contenant :
   ```text
   /*    /index.html   200
   ```

---

## 🤝 Crédits & Licence

- **Conception & Développement** : Réalisé par **N-dev-Mada**.
- **Écosystème** : Produit officiel de la suite **N-product**.
- **Licence** : Ce projet est sous licence [MIT](LICENSE). Libre d'utilisation pour vos besoins personnels et commerciaux.
