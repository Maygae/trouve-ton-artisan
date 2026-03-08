// backend/src/models/index.js
const sequelize = require('../config/database');

const Category = require('./category.model');
const Specialty = require('./specialty.model');
const Artisan = require('./artisan.model');
const Contact = require('./contact.model');

// Associations Category ↔ Specialty
Category.hasMany(Specialty, { foreignKey: 'id_categorie' });
Specialty.belongsTo(Category, { foreignKey: 'id_categorie' });

// Associations Specialty ↔ Artisan
Specialty.hasMany(Artisan, { foreignKey: 'id_specialite' });
Artisan.belongsTo(Specialty, { foreignKey: 'id_specialite' });

// Associations Artisan ↔ Contact
Artisan.hasMany(Contact, { foreignKey: 'id_artisan' });
Contact.belongsTo(Artisan, { foreignKey: 'id_artisan' });

module.exports = {
  sequelize,
  Category,
  Specialty,
  Artisan,
  Contact,
};
