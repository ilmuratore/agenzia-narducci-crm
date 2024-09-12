// routes/invoiceRoutes.js
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
