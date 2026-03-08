// backend/src/routes/artisan.routes.js
const express = require('express');
const {
  getAllArtisans,
  getArtisanById,
} = require('../controllers/artisan.controller');

const router = express.Router();

// GET /api/artisans
router.get('/', getAllArtisans);

// GET /api/artisans/:id
router.get('/:id', getArtisanById);

module.exports = router;
