// backend/src/models/contact.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contact = sequelize.define(
  "Contact",
  {
    id_contact: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
    },
    objet: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_message: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // DEFAULT CURRENT_TIMESTAMP
    },
    id_artisan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);

module.exports = Contact;
