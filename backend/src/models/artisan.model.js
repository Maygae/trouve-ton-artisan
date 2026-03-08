// backend/src/models/artisan.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(190),
    allowNull: false,
    unique: true,
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  est_top: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  id_specialite: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'artisans',
  timestamps: false,
});

module.exports = Artisan;
