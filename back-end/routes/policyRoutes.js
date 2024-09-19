/**
 * @swagger
 * tags:
 *   name: Policies
 *   description: API per la gestione delle polizze assicurative
 */

/**
 * @swagger
 * /policies:
 *   get:
 *     summary: Ottieni tutte le polizze
 *     tags: [Policies]
 *     responses:
 *       200:
 *         description: Lista di tutte le polizze
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Policy'
 *       404:
 *         description: Nessuna polizza trovata
 *       500:
 *         description: Errore del server
 *
 *   post:
 *     summary: Crea una nuova polizza
 *     tags: [Policies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               policyNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               contributor:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               splitType:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               premiumAmount:
 *                 type: number
 *               invoiceAmount:
 *                 type: number
 *               status:
 *                 type: string
 *               policyNotes:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Polizza creata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       400:
 *         description: Errore di validazione
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /policies/{id}:
 *   get:
 *     summary: Ottieni una polizza per ID
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della polizza
 *     responses:
 *       200:
 *         description: Polizza trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       404:
 *         description: Polizza non trovata
 *       500:
 *         description: Errore del server
 * 
 *   put:
 *     summary: Aggiorna una polizza
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della polizza
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               policyNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               contributor:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               splitType:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               premiumAmount:
 *                 type: number
 *               invoiceAmount:
 *                 type: number
 *               status:
 *                 type: string
 *               policyNotes:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Polizza aggiornata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       400:
 *         description: Errore di validazione
 *       404:
 *         description: Polizza non trovata
 *       500:
 *         description: Errore del server
 * 
 *   delete:
 *     summary: Elimina una polizza
 *     tags: [Policies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID della polizza
 *     responses:
 *       200:
 *         description: Polizza eliminata con successo
 *       404:
 *         description: Polizza non trovata
 *       500:
 *         description: Errore del server
 */

const express = require('express');
const { createPolicy, updatePolicy, getPolicyById, deletePolicy, getAllPolicies } = require('../controllers/policyController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const policyValidator = require('../validators/policyValidator');

const router = express.Router();

router.get('/', getAllPolicies);
router.post('/', upload.single('pdfUrl'), policyValidator, createPolicy);
router.get('/:id', getPolicyById);
router.put('/:id', upload.single('pdfUrl'), policyValidator, updatePolicy);
router.delete('/:id', deletePolicy);

module.exports = router;
