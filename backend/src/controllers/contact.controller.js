// backend/src/controllers/contact.controller.js
const { Contact } = require("../models");

// fonction simple pour vérifier l'email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contacts
async function createContact(req, res) {
  try {
    const { nom, email, objet, message, id_artisan } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !email || !objet || !message || !id_artisan) {
      return res.status(400).json({
        message:
          "Champs obligatoires manquants (nom, email, objet, message, id_artisan)",
      });
    }

    // Vérification du format de l'email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // Vérification de la longueur des champs (pour éviter les abus)
    if (nom.length > 100) {
      return res.status(400).json({
        message: "Le nom ne doit pas dépasser 100 caractères",
      });
    }

    if (objet.length > 150) {
      return res.status(400).json({
        message: "L'objet ne doit pas dépasser 150 caractères",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        message: "Le message ne doit pas dépasser 2000 caractères",
      });
    }

    const contact = await Contact.create({
      nom,
      email,
      objet,
      message,
      id_artisan,
      // date_message est rempli automatiquement par la BDD
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("Erreur createContact:", error);
    // Message générique, on ne renvoie pas le détail de l'erreur au client
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// GET /api/contacts
async function getContacts(req, res) {
  try {
    const contacts = await Contact.findAll({
      order: [["date_message", "DESC"]],
    });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Erreur getContacts:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

module.exports = {
  createContact,
  getContacts,
};
