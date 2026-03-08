// backend/src/controllers/specialty.controller.js
const { Specialty, Category } = require('../models');

async function getAllSpecialties(req, res) {
  try {
    const specialties = await Specialty.findAll({
      include: [
        {
          model: Category,
          attributes: ['id_categorie', 'libelle_categorie'],
        },
      ],
      order: [['libelle_specialite', 'ASC']],
    });

    res.json(specialties);
  } catch (error) {
    console.error('Erreur getAllSpecialties:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function getSpecialtyById(req, res) {
  try {
    const { id } = req.params;

    const specialty = await Specialty.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['id_categorie', 'libelle_categorie'],
        },
      ],
    });

    if (!specialty) {
      return res.status(404).json({ message: 'Spécialité non trouvée' });
    }

    res.json(specialty);
  } catch (error) {
    console.error('Erreur getSpecialtyById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  getAllSpecialties,
  getSpecialtyById,
};
