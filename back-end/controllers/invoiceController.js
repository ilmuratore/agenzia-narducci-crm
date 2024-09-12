// controllers/invoiceController.js

const Invoice = require('../models/Invoice');
const { validationResult } = require('express-validator');
const logger = require('../middlewares/logger');

// Ottieni tutte le fatture
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('policyId');
        res.json(invoices);
    } catch (error) {
        logger.error(`Errore nel recupero delle fatture: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea una nuova fattura
exports.createInvoice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        logger.info(`Fattura creata con successo`);
        res.status(201).json(newInvoice);
    } catch (error) {
        logger.error(`Errore nella creazione della fattura: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni una fattura per ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('policyId');
        if (!invoice) {
            return res.status(404).json({ message: 'Fattura non trovata' });
        }
        res.json(invoice);
    } catch (error) {
        logger.error(`Errore nel recupero della fattura: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Aggiorna una fattura
exports.updateInvoice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) {
            return res.status(404).json({ message: 'Fattura non trovata' });
        }
        logger.info(`Fattura aggiornata con successo`);
        res.json(updatedInvoice);
    } catch (error) {
        logger.error(`Errore nell'aggiornamento della fattura: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina una fattura
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Fattura non trovata' });
        }
        logger.info(`Fattura eliminata con successo`);
        res.json({ message: 'Fattura eliminata con successo' });
    } catch (error) {
        logger.error(`Errore nell'eliminazione della fattura: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};
