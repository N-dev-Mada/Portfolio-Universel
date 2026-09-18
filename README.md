# Portfolio Universel (Visual Portfolio Builder)

[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Suite](https://img.shields.io/badge/Suite-N--product-7C3AED?style=for-the-badge)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

> Une Single Page Application (SPA) moderne, performante et hautement modulaire conçue avec **React 19**, **Vite** et **Tailwind CSS v4**. Elle permet de générer, prévisualiser et personnaliser un portfolio professionnel complet en temps réel via un éditeur visuel no-code intuitif et un fichier de configuration JSON centralisé.

---

### 🌟 Origine & Écosystème

- **Développeur** : Développé avec soin par **N-dev-Mada**.
- **Écosystème** : Ce projet constitue le **second produit officiel de la suite N-product**, dédiée à la conception d'outils web modernes, robustes et orientés expérience utilisateur.

---

## ✨ Fonctionnalités Clés

### 🎨 1. Éditeur Visuel Intégré (WYSIWYG / No-Code)
- **Personnalisation en direct** : Ajustez les thèmes de couleurs (palettes d'accentuation prédéfinies), les typographies Google Fonts chargées dynamiquement, le rayon des bordures et les halos d'arrière-plan avec répercussion instantanée sur le DOM.
- **Gestion des sections** : Activez, désactivez, renommez et réorganisez les sections (Accueil, À propos, Compétences, Projets, Expériences, Témoignages, Contact).
- **Modèles de profil (Presets)** : Basculez en un clic entre différents archétypes professionnels (Développeur Fullstack / Tech, Designer Créatif, Consultant Business, Chercheur Académique).
- **Import / Export JSON** : Téléchargez votre configuration sur-mesure au format `portfolio-config.json` ou chargez un fichier existant sans recompiler l'application.

### ⚡ 2. Performance & Compression d'Images Intelligente
- **Traitement côté client** : Optimisation automatique des images téléversées via l'API HTML5 Canvas.
- **Redimensionnement proportionnel** : Plafond strict à 800×800 px tout en conservant le ratio d'aspect.
- **Encodage WebP / JPEG** : Compression automatique réduisant la taille des assets sous le seuil des **150 Ko** (contre plusieurs mégaoctets pour des photos brutes), prévenant tout dépassement du quota de stockage de 5 Mo du `localStorage`.
- **Support vectoriel** : Préservation native des fichiers SVG sans altération.

### ✉️ 3. Formulaire de Contact Intelligent & Hybride
- **Validation stricte** : Contrôle syntaxique rigoureux de l'adresse e-mail selon les normes RFC (`EMAIL_REGEX`) avant envoi.
- **Support d'API distante** : Si un endpoint est configuré (`contact.form.endpoint` type Formspree, Baserow, API REST maison), le formulaire transmet les données via une requête HTTP `POST` JSON avec gestion des états de chargement et d'erreur.
- **Bascule dynamique `mailto:`** : Si aucun backend n'est renseigné, le formulaire résout automatiquement l'e-mail du destinataire (depuis les coordonnées ou réseaux du profil) et déclenche l'application de messagerie de l'utilisateur avec l'objet et le message intégralement pré-remplis.

### 🛡️ 4. Résilience & Sécurité Renforcée (P0 / P1 / P2)
- **Validation défensive des données** : Sanitisation et fusion récursive (`deepMerge`) avec valeurs de repli par défaut pour éviter tout plantage suite à une altération du cache local.
- **Gestion du quota de stockage** : Détection proactive de l'espace disponible et des erreurs `QuotaExceededError`.
- **ErrorBoundary d'urgence** : En cas d'erreur de rendu critique, un écran de secours offre un bouton de réinitialisation sécurisée qui restaure la configuration d'usine sans bloquer le visiteur.
- **Verrouillage de l'éditeur** : Protection de l'interface d'édition pour les visiteurs publics en production.

### 🚀 5. Spy Scroll Fluide & Zéro Layout Thrashing
- **Navigation 60 FPS** : Remplacement des anciens écouteurs d'événements `scroll` synchrones par une détection passive basée sur l'API native `IntersectionObserver`.
- **Aucun recalcul de géométrie** : Élimination des appels répétitifs à `offsetTop` et `offsetHeight`, assurant une fluidité absolue même sur les périphériques mobiles d'entrée de gamme.

---

## 🛠️ Stack Technique

| Technologie | Version | Rôle |
|---|---|---|
| **React** | `19.0.x` | Librairie d'interface utilisateur réactive |
| **TypeScript** | `5.7.x` | Typage statique strict et intégrité du code |
| **Vite** | `6.2.x` | Environnement de développement ultra-rapide et bundler |
| **Tailwind CSS** | `4.1.x` | Framework utilitaire CSS haute performance |
| **Motion** | `12.23.x` | Animations fluides et transitions d'interface |
| **Lucide React** | `0.546.x` | Bibliothèque d'icônes vectorielles cohérente |

---

## 🔐 Contrôle d'Accès & Variables d'Environnement

L'éditeur visuel est verrouillé par défaut en production afin de ne pas exposer les commandes d'administration aux visiteurs lambda.

### 1. Configuration via `.env`

Créez ou modifiez le fichier `.env` à la racine :

```env
# Autoriser ou masquer globalement l'éditeur visuel
VITE_ENABLE_EDITOR=true
```

- Si `VITE_ENABLE_EDITOR=false` : L'éditeur visuel (bouton flottant et raccourci clavier `Ctrl + Shift + E`) est totalement désactivé.
- En mode développement (`npm run dev`), l'éditeur reste accessible par défaut pour faciliter la personnalisation.

### 2. Accès Administrateur par URL & Persistance de Session

En production avec l'éditeur masqué, vous pouvez y accéder directement via l'URL :

- **Activer l'accès** : Ajoutez le paramètre `?admin=true` ou `?edit=true` à votre URL (ex. `https://mon-portfolio.com/?admin=true`).
- **Persistance en session** : Dès détection du paramètre, l'autorisation est enregistrée dans le `sessionStorage` (`vpb:editor_authorized`). Vous pouvez naviguer sur le site ou recharger la page sans perdre l'accès à l'éditeur.
- **Révocation manuelle** : Ajoutez `?admin=false` ou `?edit=false` pour clore la session d'édition.

---

## 🚀 Installation & Démarrage Rapide

### Prérequis
- **Node.js** : version 18.0 ou supérieure
- **npm**, **pnpm** ou **yarn**

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-nom/portfolio-universel.git
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
   L'application est disponible sur `http://localhost:3000`.

4. **Vérification TypeScript & Linting :**
   ```bash
   npm run lint
   ```

5. **Compiler pour la production :**
   ```bash
   npm run build
   ```
   Les fichiers statiques optimisés seront générés dans le dossier `dist/`.

---

## 📁 Structure du Projet & Fichier de Configuration

```
├── .env.example                       # Modèle des variables d'environnement
├── index.html                         # Point d'entrée HTML principal
├── package.json                       # Scripts et dépendances optimisées
├── tsconfig.json                      # Configuration TypeScript en mode strict
├── vite.config.ts                     # Configuration Vite et Tailwind CSS v4
└── src/
    ├── App.tsx                        # Composant racine avec ErrorBoundary et Providers
    ├── main.tsx                       # Point de montage ReactDOM
    ├── index.css                      # Thème global, styles CSS et variables d'accent
    ├── vite-env.d.ts                  # Typage strict de l'environnement Vite
    ├── data/
    │   └── portfolio-config.json      # ⭐️ Source de vérité centrale du contenu
    ├── types/
    │   └── config.ts                  # Schémas et interfaces TypeScript
    ├── lib/
    │   ├── config-context.tsx         # Contexte global, synchronisation et persistance
    │   ├── fonts.ts                   # Chargement dynamique des Google Fonts
    │   ├── themes.ts                  # Définition des palettes de couleurs
    │   ├── presets.ts                 # Profils préconfigurés (Tech, Créatif, etc.)
    │   └── utils.ts                   # Utilitaires (compression d'image, scroll, etc.)
    └── components/
        ├── layout/                    # Navbar, Footer, AmbientBackground
        ├── sections/                  # Hero, Skills, Projects, Experience, Contact…
        ├── ui/                        # Icon (Lucide), Toast, Reveal, ErrorBoundary
        └── editor/                    # Panneau de contrôle et champs d'édition
```

### 📄 Le fichier `src/data/portfolio-config.json`

Tout le contenu du site découle de ce fichier unique :
- **`identity`** : Nom, prénom, titre professionnel, avatar, bio courte.
- **`theme`** : Palette active (`preset`), police d'écriture (`font`), arrondis (`radius`), lueur d'ambiance (`ambientGlow`).
- **`sections`** : Ordre d'affichage, activation et labels des rubriques de navigation.
- **`hero`, `skills`, `projects`, `experience`, `testimonials`, `contact`** : Données détaillées de chaque section.

> **💡 Règle de masquage automatique :** Tout champ textuel vide (`""`) ou tableau vide (`[]`) désactive et masque automatiquement le composant correspondant sur le site, assurant un rendu toujours impeccable sans code superflu.

---

## 🚀 Déploiement Automatique

L'application étant une Single Page Application (SPA) optimisée par Vite, elle peut être déployée en quelques clics sur les plateformes d'hébergement modernes.

### ⚡ Déploiement sur Vercel

1. Connectez votre compte **Vercel** à votre dépôt GitHub.
2. Importez le projet `Portfolio-Universel`. Vercel détectera automatiquement l'environnement Vite :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
3. Configurez les variables d'environnement (*Environment Variables*) :
   - `VITE_ENABLE_EDITOR` = `false` (recommandé pour un déploiement public) ou `true`.
4. Cliquez sur **Deploy**. Chaque `git push` sur la branche principale déclenchera un build automatique.

### 🌐 Déploiement sur Netlify

1. Créez un nouveau site depuis Git sur **Netlify**.
2. Définissez les paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
3. Ajoutez la variable d'environnement `VITE_ENABLE_EDITOR` dans *Site configuration > Environment variables*.
4. **Gestion du routage SPA** : Pour éviter les erreurs 404 lors du rafraîchissement des sous-pages, créez un fichier `public/_redirects` contenant la règle suivante :
   ```text
   /*    /index.html   200
   ```

---

## 🤝 Crédits & Licence

- **Conception & Développement** : Réalisé par **N-dev-Mada**.
- **Écosystème** : Membre de la suite **N-product**.
- **Licence** : Ce projet est sous licence [MIT](LICENSE). Vous êtes libre de l'utiliser, le modifier et le déployer pour vos besoins personnels et professionnels.
