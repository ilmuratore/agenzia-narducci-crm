// routes/userRoutes.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestione degli utenti
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuovo utente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome utente
 *               email:
 *                 type: string
 *                 description: Email dell'utente
 *               password:
 *                 type: string
 *                 description: Password dell'utente
 *               role:
 *                 type: string
 *                 description: Ruolo dell'utente
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utente creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utente creato con successo"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Ottieni tutti gli utenti
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista utenti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifica un utente esistente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'utente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome utente
 *               email:
 *                 type: string
 *                 description: Email dell'utente
 *               password:
 *                 type: string
 *                 description: Password dell'utente
 *               role:
 *                 type: string
 *                 description: Ruolo dell'utente
 *     responses:
 *       200:
 *         description: Utente modificato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utente modificato con successo"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Utente non trovato
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un utente esistente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'utente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utente eliminato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utente eliminato con successo"
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore del server
 */


const express = require('express');
const {createUser, getUsers, updateUser, deleteUser} = require('../controllers/userController');
const userValidationRules = require('../validators/userValidator');

const router = express.Router();

router.post('/', userValidationRules(), createUser);
router.get('/', getUsers);
router.put('/:id', userValidationRules(), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

