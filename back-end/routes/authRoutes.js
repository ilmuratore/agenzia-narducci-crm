// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotta per la registrazione
router.post('/register', authController.register);

// Rotta per il login
router.post('/login', authController.login);

module.exports = router;
