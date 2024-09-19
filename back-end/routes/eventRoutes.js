/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API per la gestione degli eventi
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Ottieni tutti gli eventi
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista di tutti gli eventi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Errore del server
 * 
 *   post:
 *     summary: Crea un nuovo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Ottieni un evento per ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID dell'evento
 *     responses:
 *       200:
 *         description: Evento trovato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento non trovato
 *       500:
 *         description: Errore del server
 * 
 *   put:
 *     summary: Aggiorna un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID dell'evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento aggiornato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Errore di validazione
 *       404:
 *         description: Evento non trovato
 *       500:
 *         description: Errore del server
 * 
 *   delete:
 *     summary: Elimina un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID dell'evento
 *     responses:
 *       200:
 *         description: Evento eliminato con successo
 *       404:
 *         description: Evento non trovato
 *       500:
 *         description: Errore del server
 */

const express = require('express');
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const eventValidationRules = require('../validators/eventValidator');

const router = express.Router();

// Definisci le rotte per gli eventi
router.get('/', getAllEvents);
router.post('/', eventValidationRules(), createEvent);
router.get('/:id', getEventById);
router.put('/:id', eventValidationRules(), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
