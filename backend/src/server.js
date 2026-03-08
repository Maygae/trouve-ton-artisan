require('dotenv').config();         

const config = require('./config/config');
const app = require('./app');
const { sequelize } = require('./models');

// On lit le port depuis la config, elle-même basée sur process.env.APP_PORT
const port = config.app.port || process.env.APP_PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion MySQL + Sequelize OK');

    app.listen(port, () => {
      console.log(`API démarrée sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
    process.exit(1);
  }
})();
