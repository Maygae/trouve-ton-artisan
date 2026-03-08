// backend/src/app.js
const express = require('express');
const cors = require('cors');

// Import des routeurs métiers
const categoryRoutes = require('./routes/category.routes');
const artisanRoutes = require('./routes/artisan.routes');
const specialtyRoutes = require('./routes/specialty.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

// Middlewares globaux
// Origines autorisées pour l'API
const allowedOrigins = [
  'http://localhost:3000',              // frontend en local
  // 'https://ton-site-front.netlify.app', // à décommenter et remplacer en prod
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise aussi les requêtes sans origin (ex: Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origine non autorisée par CORS'));
    },
  })
);

app.use(express.json());


// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Trouve ton artisan' });
});

// Routes métier
app.use('/api/categories', categoryRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/specialties', specialtyRoutes);
app.use('/api/contacts', contactRoutes);

// Route racine (optionnelle, juste pour éviter "Cannot GET /")
app.get('/', (req, res) => {
  res.send('API Trouve ton artisan est en ligne');
});

// Gestion d’URL non trouvée
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion d’erreurs serveur
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ message: 'Erreur serveur' });
});

module.exports = app;
