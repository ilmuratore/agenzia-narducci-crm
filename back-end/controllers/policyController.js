// controllers/policyController.js
const { validationResult } = require('express-validator');
const Policy = require('../models/Policy');
const logger = require('../middlewares/logger'); 

// Ottieni tutte le polizze
exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate('client');
        res.json(policies);
    } catch (error) {
        logger.error('Errore nel recupero delle polizze: ', error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea una nuova polizza
exports.createPolicy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Errore di validazione nella creazione della polizza: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPolicy = new Policy(req.body);
        await newPolicy.save();
        logger.info(`Polizza creata con successo: ${newPolicy._id}`);
        res.status(201).json(newPolicy);
    } catch (error) {
        logger.error('Errore nella creazione della polizza: ', error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni una polizza per ID
exports.getPolicyById = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id).populate('client');
        if (!policy) {
            logger.warn(`Polizza non trovata con ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json(policy);
    } catch (error) {
        logger.error(`Errore nel recupero della polizza con ID ${req.params.id}: `, error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni una polizza per nome e cognome del cliente
exports.getPolicyByClientSurnameAndName = async (req, res) => {
    try {
        const policy = await Policy.findOne({ $or: [{ 'client.surname': req.params.surname }, { 'client.name': req.params.name }] }).populate('client');
        if (!policy) {
            logger.warn(`Polizza non trovata per cognome: ${req.params.surname} o nome: ${req.params.name}`);
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json(policy);
    } catch (error) {
        logger.error('Errore nel recupero della polizza per cognome e nome del cliente: ', error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Aggiorna una polizza
exports.updatePolicy = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Errore di validazione nell\'aggiornamento della polizza: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPolicy) {
            logger.warn(`Polizza non trovata con ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        logger.info(`Polizza aggiornata con successo: ${updatedPolicy._id}`);
        res.json(updatedPolicy);
    } catch (error) {
        logger.error(`Errore nell'aggiornamento della polizza con ID ${req.params.id}: `, error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina una polizza
exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndDelete(req.params.id);
        if (!policy) {
            logger.warn(`Polizza non trovata con ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        logger.info(`Polizza eliminata con successo: ${policy._id}`);
        res.json({ message: 'Polizza eliminata con successo' });
    } catch (error) {
        logger.error(`Errore nell'eliminazione della polizza con ID ${req.params.id}: `, error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};
