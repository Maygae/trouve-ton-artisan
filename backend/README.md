# API "Trouve ton artisan" – Backend

Backend Node.js / Express pour la plateforme **Trouve ton artisan** (région Auvergne-Rhône-Alpes).  
Il expose une API REST au-dessus d’une base MariaDB/MySQL.

## 1. Technologies utilisées

- Node.js  
- Express  
- Sequelize (ORM)  
- MariaDB / MySQL  
- dotenv  

## 2. Base de données

Base : trouve_ton_artisan

Tables principales :

- categories (id_categorie, libelle_categorie)  
- specialites (id_specialite, libelle_specialite, id_categorie)  
- artisans (id_artisan, nom, note, ville, a_propos, email, site_web, est_top, id_specialite)  
- contacts (id_contact, nom, email, objet, message, date_message, id_artisan)

Relations :

- 1 catégorie possède N spécialités  
- 1 spécialité possède N artisans  
- 1 artisan possède N messages de contact  

## 3. Configuration

Fichier .env à la racine du backend, avec par exemple :

DB_HOST=localhost  
DB_PORT=3306  
DB_NAME=trouve_ton_artisan  
DB_USER=root  
DB_PASS=  
APP_PORT=4000  

## 4. Installation

Dans un terminal :

- se placer dans le dossier backend  
- exécuter : npm install  

Assurez-vous que la base trouve_ton_artisan est créée et initialisée avec le script SQL schema.sql.

## 5. Lancement du serveur

Dans un terminal :

- se placer dans le dossier backend  
- exécuter : npm start  

L’API est alors disponible sur : http://localhost:4000

## 6. Routes de l’API

Santé :

- GET /api/health : vérifie que l’API répond  

Catégories :

- GET /api/categories : liste des catégories  
- GET /api/categories/:id : détail d’une catégorie  

Spécialités :

- GET /api/specialties : liste des spécialités  
- GET /api/specialties/:id : détail d’une spécialité  

Artisans :

- GET /api/artisans : liste des artisans  
- GET /api/artisans/:id : détail d’un artisan  

Contacts :

- GET /api/contacts : liste des messages de contact  
- POST /api/contacts : création d’un message de contact  

Exemple de corps JSON attendu pour POST /api/contacts :
nom, email, objet, message, id_artisan

## 7. Structure du projet

backend/  
- src/  
  - app.js  
  - config/  
    - config.js  
    - database.js  
  - models/  
    - index.js  
    - category.model.js  
    - specialty.model.js  
    - artisan.model.js  
    - contact.model.js  
  - controllers/  
    - category.controller.js  
    - specialty.controller.js  
    - artisan.controller.js  
    - contact.controller.js  
  - routes/  
    - category.routes.js  
    - specialty.routes.js  
    - artisan.routes.js  
    - contact.routes.js  

## 8. Sécurité

- Les informations sensibles (identifiants de base de données, mot de passe, port) sont stockées dans le fichier `.env`, qui ne doit pas être versionné.
- Les en-têtes CORS sont activés via un middleware. En production, l’origine pourra être restreinte au domaine du frontend.
- Les données reçues sont vérifiées côté serveur (types attendus, champs obligatoires) avant insertion en base.

## 9. Intégration avec le frontend

Le frontend React consomme les routes suivantes :

- `GET /api/categories` pour alimenter le menu du header.
- `GET /api/artisans` et `GET /api/artisans/:id` pour afficher les listes d’artisans et les fiches détaillées.
- `GET /api/artisans?search=...` pour la recherche par nom (possibilité d’étendre à la spécialité).
- `POST /api/contacts` pour envoyer un message à un artisan depuis le formulaire de contact de la fiche artisan.
