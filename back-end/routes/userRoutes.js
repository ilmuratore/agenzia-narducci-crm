
const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const userValidationRules = require('../validators/userValidator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestione degli utenti
 */

/**
 * @swagger
 * path:
 *   /api/users:
 *     post:
 *       summary: Crea un nuovo utente
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         201:
 *           description: Utente creato con successo
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         400:
 *           description: Errore di validazione
 *         500:
 *           description: Errore del server
 */
router.post('/', userValidationRules(), createUser);

/**
 * @swagger
 * path:
 *   /api/users:
 *     get:
 *       summary: Ottieni tutti gli utenti
 *       tags: [Users]
 *       responses:
 *         200:
 *           description: Lista di utenti
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *         500:
 *           description: Errore del server
 */
router.get('/', getUsers);

/**
 * @swagger
 * path:
 *   /api/users/{id}:
 *     put:
 *       summary: Modifica un utente esistente
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID dell'utente da modificare
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: Utente modificato con successo
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         400:
 *           description: Errore di validazione
 *         404:
 *           description: Utente non trovato
 *         500:
 *           description: Errore del server
 */
router.put('/:id', userValidationRules(), updateUser);

/**
 * @swagger
 * path:
 *   /api/users/{id}:
 *     delete:
 *       summary: Elimina un utente esistente
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID dell'utente da eliminare
 *       responses:
 *         200:
 *           description: Utente eliminato con successo
 *         404:
 *           description: Utente non trovato
 *         500:
 *           description: Errore del server
 */
router.delete('/:id', deleteUser);

module.exports = router;
