require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  app: {
    port: process.env.APP_PORT || 4000,
  },
};
