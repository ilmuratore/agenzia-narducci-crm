/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API per la gestione dei clienti
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Ottieni tutti i clienti
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista di tutti i clienti
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Errore del server
 * 
 *   post:
 *     summary: Crea un nuovo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Cliente creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Ottieni un cliente per ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente trovato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore del server
 * 
 *   put:
 *     summary: Aggiorna un cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Cliente aggiornato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Errore di validazione
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore del server
 * 
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminato con successo
 *       404:
 *         description: Cliente non trovato
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /clients/name/{name}:
 *   get:
 *     summary: Cerca clienti per nome
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del cliente
 *     responses:
 *       200:
 *         description: Clienti trovati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       404:
 *         description: Clienti non trovati
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /clients/surname/{surname}:
 *   get:
 *     summary: Cerca clienti per cognome
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: surname
 *         schema:
 *           type: string
 *         required: true
 *         description: Cognome del cliente
 *     responses:
 *       200:
 *         description: Clienti trovati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       404:
 *         description: Clienti non trovati
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /clients/fullname/{name}/{surname}:
 *   get:
 *     summary: Cerca clienti per nome e cognome
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome del cliente
 *       - in: path
 *         name: surname
 *         schema:
 *           type: string
 *         required: true
 *         description: Cognome del cliente
 *     responses:
 *       200:
 *         description: Clienti trovati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       404:
 *         description: Clienti non trovati
 *       500:
 *         description: Errore del server
 */

const express = require('express');
const router = express.Router();
const { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientsByName, getClientsBySurname, getClientsByFullName } = require('../controllers/clientController');
const clientValidationRules = require('../validators/clientValidator');

// Rotte protette per i clienti
router.get('/', getAllClients); // ricerca di tutti gli utenti
router.get('/:id', getClientById); // ricerca di un utente per id 
router.post('/', clientValidationRules(), createClient); // creazione di un nuovo utente
router.put('/:id', clientValidationRules(), updateClient); // aggiornamento di un utente
router.delete('/:id', deleteClient); // cancellazione di un utente

// Rotte per metodi personalizzati per la ricerca di clienti
router.get('/name/:name', getClientsByName); // ricerca di un utente per nome
router.get('/surname/:surname', getClientsBySurname); // ricerca di un utente per cognome
router.get('/fullname/:name/:surname', getClientsByFullName); // ricerca di un utente per nome e cognome

module.exports = router;
