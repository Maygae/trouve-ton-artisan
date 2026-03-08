# Frontend "Trouve ton artisan"

Frontend React pour la plateforme **Trouve ton artisan** (région Auvergne-Rhône-Alpes).  
Il consomme l’API REST exposée par le backend Node.js / Express.

## 1. Technologies utilisées

- React  
- React Router  
- Bootstrap  
- Sass  

## 2. Application

L’application est une SPA (Single Page Application) avec :

- un header commun (logo, menu catégories, barre de recherche),  
- un contenu central qui change selon la route,  
- un footer commun (pages légales et coordonnées de l’antenne de Lyon).

Les données (catégories, artisans, fiches détaillées, contacts) sont récupérées via l’API :

API_URL par défaut : `http://localhost:4000/api`

## 3. Configuration

Aucune variable d’environnement spécifique côté frontend.

Il faut simplement que le backend soit démarré sur :

`http://localhost:4000/api`

Pour un déploiement, l’URL de l’API devra être adaptée dans le code (constante `API_URL` utilisée dans les composants).

## 4. Installation

Dans un terminal :

- se placer dans le dossier `frontend`  
- exécuter : `npm install`

## 5. Lancement de l’application

Dans un terminal :

- se placer dans le dossier `frontend`  
- exécuter : `npm start`

Le frontend est alors disponible sur : `http://localhost:3000`

## 6. Pages / Routes

Pages principales :

- `/` : page d’accueil  
  - rubrique « Comment trouver mon artisan ? »  
  - mise en avant d’artisans (ex. artisans du mois)

- `/recherche?q=...` : liste des artisans correspondant au terme recherché (nom, éventuellement extensible à la spécialité)

- `/categorie/:id` : liste des artisans d’une catégorie  
  - cards contenant : nom, note (étoiles), spécialité, localisation  
  - chaque card renvoie vers la fiche artisan

- `/artisan/:id` : fiche détaillée d’un artisan  
  - nom, image, note (étoiles), spécialité, localisation, « A propos »  
  - formulaire de contact (nom, email, objet, message)  
  - site web de l’artisan le cas échéant

- `/mentions-legales`, `/donnees-personnelles`, `/accessibilite`, `/cookies` :  
  - pages légales affichant le titre et « Page en construction. »

- `*` : page 404  
  - image 404, texte « Page non trouvée » et lien de retour vers l’accueil

## 7. Structure du projet

frontend/  
- public/  
  - `index.html`  
  - `manifest.json`  
  - `robots.txt`  
  - `favicon.png`  
  - `favicon-32.png`  
- src/  
  - `index.js`  
  - `App.js`  
  - `Header.jsx`  
  - `Footer.jsx`  
  - `HomePage.jsx`  
  - `ArtisansListPage.jsx`  
  - `ArtisanDetailPage.jsx`  
  - `SearchPage.jsx`  
  - `LegalPage.jsx`  
  - `NotFoundPage.jsx`  
  - `styles.scss`  
  - assets/  
    - `Logo.png`  

## 8. Styles et accessibilité

- Styles globaux écrits en Sass dans `styles.scss`, en s’appuyant sur Bootstrap.  
- Palette de couleurs conforme à l’identité de la Région Auvergne-Rhône-Alpes.  
- Attention portée aux textes alternatifs des images, aux labels de formulaires et à la structure des titres (h1, h2, etc.).

## 9. Intégration avec le backend

Le frontend consomme les routes suivantes de l’API :

- `GET /api/categories` : alimente le menu du header.  
- `GET /api/artisans` : récupère la liste des artisans (filtrage par catégorie / recherche).  
- `GET /api/artisans/:id` : récupère le détail d’un artisan.  
- `GET /api/artisans?search=...` recherche d’artisans par nom (possibilité d’étendre à la spécialité).
- `POST /api/contacts` : envoi d’un message à un artisan depuis sa fiche.

Le backend doit être démarré avant le frontend pour que les données s’affichent correctement.
