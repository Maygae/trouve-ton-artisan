// backend/src/controllers/category.controller.js
const { Category, Specialty, Artisan } = require('../models');

// GET /api/categories
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Specialty,
          attributes: ['id_specialite', 'libelle_specialite'],
          include: [
            {
              model: Artisan,
              attributes: ['id_artisan', 'nom', 'ville'],
            },
          ],
        },
      ],
      order: [['libelle_categorie', 'ASC']],
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

// GET /api/categories/:id
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Specialty,
          attributes: ['id_specialite', 'libelle_specialite'],
          include: [
            {
              model: Artisan,
              attributes: ['id_artisan', 'nom', 'ville'],
            },
          ],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Erreur getCategoryById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
};
