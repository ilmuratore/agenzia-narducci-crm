/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API per l'autenticazione degli utenti
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login dell'utente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username dell'utente
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Password dell'utente
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login effettuato con successo, token JWT restituito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT per l'autenticazione
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Credenziali non valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenziali non valide
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Errore nel server
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotta per il login
router.post('/login', authController.login);

module.exports = router;
