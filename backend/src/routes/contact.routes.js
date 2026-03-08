// backend/src/routes/contact.routes.js
const express = require('express');
const { createContact, getContacts } = require('../controllers/contact.controller');

const router = express.Router();

router.post('/', createContact);
router.get('/', getContacts);

module.exports = router;
