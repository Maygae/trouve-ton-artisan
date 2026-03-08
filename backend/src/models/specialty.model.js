const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialty = sequelize.define('Specialty', {
  id_specialite: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  libelle_specialite: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  id_categorie: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'specialites',
  timestamps: false,
});

module.exports = Specialty;
