// backend/src/routes/specialty.routes.js
const express = require('express');
const {
  getAllSpecialties,
  getSpecialtyById,
} = require('../controllers/specialty.controller');

const router = express.Router();

// GET /api/specialties
router.get('/', getAllSpecialties);

// GET /api/specialties/:id
router.get('/:id', getSpecialtyById);

module.exports = router;
