/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API per la gestione delle fatture
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Ottieni tutte le fatture
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Lista di tutte le fatture
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Errore del server
 * 
 *   post:
 *     summary: Crea una nuova fattura
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Fattura creata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Ottieni una fattura per ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della fattura
 *     responses:
 *       200:
 *         description: Fattura trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore del server
 * 
 *   put:
 *     summary: Aggiorna una fattura
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della fattura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Fattura aggiornata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Errore di validazione
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore del server
 * 
 *   delete:
 *     summary: Elimina una fattura
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della fattura
 *     responses:
 *       200:
 *         description: Fattura eliminata con successo
 *       404:
 *         description: Fattura non trovata
 *       500:
 *         description: Errore del server
 */

const express = require('express');
const { getAllInvoices, createInvoice, getInvoiceById, updateInvoice, deleteInvoice } = require('../controllers/invoiceController');
const invoiceValidationRules = require('../validators/invoiceValidator');

const router = express.Router();

// Rotte per le fatture
router.get('/', getAllInvoices);
router.post('/', invoiceValidationRules(), createInvoice);
router.get('/:id', getInvoiceById);
router.put('/:id', invoiceValidationRules(), updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
