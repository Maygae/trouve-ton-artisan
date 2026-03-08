-- ============================================================================
-- insert_data.sql — trouve_ton_artisan
-- Auteur  : Johanne
-- Date    : 
-- Objet   : Peupler la base "trouve_ton_artisan" avec un jeu cohérent
--           basé sur le fichier source data.xlsx.
-- ============================================================================

USE trouve_ton_artisan;

START TRANSACTION;

-- --------------------------------------------------------------------------
-- 0. Remise à zéro propre des données
-- --------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE contacts;
TRUNCATE TABLE artisans;
TRUNCATE TABLE specialites;
TRUNCATE TABLE categories;

SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------------------------
-- 1. CATEGORIES
-- --------------------------------------------------------------------------
INSERT INTO categories (libelle_categorie) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- --------------------------------------------------------------------------
-- 2. SPECIALITES
-- --------------------------------------------------------------------------
-- Rappel : l’ordre des catégories est celui des INSERT ci‑dessus.
INSERT INTO specialites (libelle_specialite, id_categorie) VALUES
('Boucher',       1), -- Alimentation
('Boulanger',     1),
('Chocolatier',   1),
('Traiteur',      1),
('Chauffagiste',  2), -- Bâtiment
('Electricien',   2),
('Menuisier',     2),
('Plombier',      2),
('Bijoutier',     3), -- Fabrication
('Couturier',     3),
('Ferronier',     3),
('Coiffeur',      4), -- Services
('Fleuriste',     4),
('Toiletteur',    4),
('Webdesign',     4);

-- --------------------------------------------------------------------------
-- 3. ARTISANS
-- --------------------------------------------------------------------------
-- Les id_specialite font référence aux SPECIALITES ci‑dessus.
INSERT INTO artisans
(nom, note, ville, a_propos, email, site_web, est_top, id_specialite)
VALUES
('Boucherie Dumont', 4.5, 'Lyon',
 'Boucherie artisanale spécialisée en viandes locales et produits du terroir.',
 'boucherie.dumond@gmail.com', NULL, FALSE, 1),

('Au pain chaud', 4.8, 'Montélimar',
 'Boulangerie traditionnelle au levain naturel, pains et viennoiseries faits maison.',
 'aupainchaud@hotmail.com', NULL, TRUE, 2),

('Chocolaterie Labbé', 4.9, 'Lyon',
 'Chocolaterie artisanale spécialisée en chocolats fins, tablettes et pralinés.',
 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', TRUE, 3),

('Traiteur Truchon', 4.1, 'Lyon',
 'Traiteur pour événements familiaux et professionnels, menus sur mesure.',
 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', FALSE, 4),

('Orville Salmons', 5.0, 'Evian',
 'Chauffagiste spécialisé en solutions de chauffage écologiques et pompes à chaleur.',
 'o-salmons@live.com', NULL, TRUE, 5),

('Mont Blanc Eléctricité', 4.5, 'Chamonix',
 'Entreprise d''électricité générale pour particuliers et professionnels en montagne.',
 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', FALSE, 6),

('Boutot & fils', 4.7, 'Bourg-en-bresse',
 'Atelier de menuiserie sur mesure, agencements intérieurs et extérieurs.',
 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', FALSE, 7),

('Vallis Bellemare', 4.0, 'Vienne',
 'Plomberie générale, dépannage d''urgence et rénovation de salles de bain.',
 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', FALSE, 8),

('Claude Quinn', 4.2, 'Aix-les-bains',
 'Bijouterie artisanale, créations originales et réparations de bijoux.',
 'claude.quinn@gmail.com', NULL, FALSE, 9),

('Amitee Lécuyer', 4.5, 'Annecy',
 'Atelier de couture et retouches, créations sur mesure et costumes.',
 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', FALSE, 10),

('Emest Carignan', 5.0, 'Le Puy-en-Velay',
 'Ferronnerie d''art, portails, garde-corps et réalisations décoratives.',
 'e-carigan@hotmail.com', NULL, FALSE, 11),

('Royden Charbonneau', 3.8, 'Saint-Priest',
 'Salon de coiffure mixte, coupes classiques et modernes.',
 'r.charbonneau@gmail.com', NULL, FALSE, 12),

('Leala Dennis', 3.8, 'Chambéry',
 'Salon de coiffure spécialisé dans les colorations et soins capillaires.',
 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', FALSE, 12),

('C''est sup''hair', 4.1, 'Romans-sur-Isère',
 'Salon de coiffure tendance, conseils en image et coiffures événementielles.',
 'sup-hair@gmail.com', 'https://sup-hair.fr', FALSE, 12),

('Le monde des fleurs', 4.6, 'Annonay',
 'Fleuriste pour mariages, événements et bouquets au quotidien.',
 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', FALSE, 13),

('Valérie Laderoute', 4.5, 'Valence',
 'Toiletteur canin, soins complets et coupe au ciseau pour chiens de toutes races.',
 'v-laredoute@gmail.com', NULL, FALSE, 14),

('CM Graphisme', 4.4, 'Valence',
 'Studio de webdesign et identité visuelle pour indépendants et petites entreprises.',
 'contact@cm-graphisme.com', 'https://cm-graphisme.com', FALSE, 15);

-- --------------------------------------------------------------------------
-- 4. CONTACTS
-- --------------------------------------------------------------------------
-- Id_artisan fait référence aux artisans insérés ci‑dessus (id auto‑incrémentés).
-- Ici on suppose que les IDs générés vont de 1 à 17 dans l’ordre des INSERT.
INSERT INTO contacts
(prenom, nom, email, telephone, sujet, message, id_artisan)
VALUES
('Jean', 'Martin', 'jean.martin@example.com', '0601020304',
 'Demande de devis traiteur',
 'Bonjour, je souhaite un devis pour un repas de 40 personnes le mois prochain.',
 4),  -- Traiteur Truchon

('Sophie', 'Durand', 'sophie.durand@example.com', NULL,
 'Intervention plomberie',
 'Bonjour, j''aurais besoin d''un dépannage pour une fuite sous évier.',
 8),  -- Vallis Bellemare

('Lucas', 'Bernard', 'lucas.bernard@example.com', '0677889900',
 'Rendez-vous coiffure',
 'Bonjour, je voudrais prendre rendez-vous pour une coupe homme.',
 12), -- Royden Charbonneau

('Emma', 'Rousseau', 'emma.rousseau@example.com', '0611223344',
 'Bouquet de mariage',
 'Bonjour, je cherche un bouquet de mariée et des compositions pour la cérémonie.',
 15); -- Le monde des fleurs

COMMIT;
