// backend/src/controllers/artisan.controller.js
const { Artisan, Specialty, Category, Sequelize } = require("../models");
const { Op } = require("sequelize");

// GET /api/artisans
async function getAllArtisans(req, res) {
  try {
    const { search } = req.query;

    const where = {};

    if (search && search.trim() !== "") {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { nom: { [Op.like]: term } },
        // si tu veux aussi filtrer sur la spécialité, décommente :
        // { "$Specialty.libelle_specialite$": { [Op.like]: term } },
      ];
    }

    const artisans = await Artisan.findAll({
      where,
      include: [
        {
          model: Specialty,
          attributes: ["id_specialite", "libelle_specialite"],
          include: [
            {
              model: Category,
              attributes: ["id_categorie", "libelle_categorie"],
            },
          ],
        },
      ],
      order: [["nom", "ASC"]],
    });

    res.json(artisans);
  } catch (error) {
    console.error("Erreur getAllArtisans:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// GET /api/artisans/:id
async function getArtisanById(req, res) {
  try {
    const { id } = req.params;

    const artisan = await Artisan.findByPk(id, {
      include: [
        {
          model: Specialty,
          attributes: ["id_specialite", "libelle_specialite"],
          include: [
            {
              model: Category,
              attributes: ["id_categorie", "libelle_categorie"],
            },
          ],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("Erreur getArtisanById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  getAllArtisans,
  getArtisanById,
};
