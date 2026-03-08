============================================================================
-- schema.sql - Base trouve_ton_artisan (MariaDB / MySQL)
-- OBJECTIF :
--   Base de données destinée à gérer les artisans de la plateforme
--   "Trouve ton artisan" (région Auvergne-Rhône-Alpes).
--
-- SOURCE EXCEL :
--   Fichier data.xlsx contenant :
--     (Nom, Spécialité, Note, Ville, A_propos, Email,
--      Site_Web, Catégorie, Top)
--   → Données normalisées en 3 tables : CATEGORIES, SPECIALITES, ARTISANS.
--
-- MODÉLISATION :
--   - 1 artisan appartient à 1 spécialité
--   - 1 spécialité appartient à 1 catégorie
--   - 1 catégorie possède N spécialités
--   - 1 spécialité possède N artisans
--
-- CHOIX TECHNIQUES :
--   - Encodage : utf8mb4 (compatibilité accents et emojis)
--   - Collation : utf8mb4_unicode_ci
--   - Moteur : InnoDB (clés étrangères et intégrité référentielle)
============================================================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE categories (
    id_categorie INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    libelle_categorie VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE specialites (
    id_specialite INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    libelle_specialite VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT UNSIGNED NOT NULL,

    CONSTRAINT fk_specialites_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES categories(id_categorie)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE artisans (
    id_artisan INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note BETWEEN 0 AND 5),
    ville VARCHAR(120) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    site_web VARCHAR(255),
    est_top BOOLEAN NOT NULL DEFAULT FALSE,
    id_specialite INT UNSIGNED NOT NULL,

    CONSTRAINT fk_artisans_specialite
        FOREIGN KEY (id_specialite)
        REFERENCES specialites(id_specialite)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE contacts (
    id_contact INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL,
    objet VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    date_message DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_artisan INT UNSIGNED NOT NULL,

    CONSTRAINT fk_contacts_artisan
        FOREIGN KEY (id_artisan)
        REFERENCES artisans(id_artisan)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
