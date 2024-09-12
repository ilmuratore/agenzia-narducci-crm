// controllers/clientController.js
const { validationResult } = require('express-validator');
const Client = require('../models/Client');
const logger = require('../middlewares/logger');

// Ottieni tutti i clienti
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        logger.error(`Errore nel recupero dei clienti: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea un nuovo cliente
exports.createClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newClient = new Client(req.body);
        await newClient.save();
        logger.info(`Cliente ${newClient.name} creato con successo`);
        res.status(201).json(newClient);
    } catch (error) {
        logger.error(`Errore nella creazione del cliente: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni un cliente per ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            logger.warn(`Cliente con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(client);
    } catch (error) {
        logger.error(`Errore nel recupero del cliente per ID: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni un cliente per cognome e nome
exports.getClientBySurnameAndName = async (req, res) => {
    try {
        const client = await Client.findOne({
            surname: req.params.surname,
            name: req.params.name
        });
        if (!client) {
            logger.warn(`Cliente con nome ${req.params.name} e cognome ${req.params.surname} non trovato`);
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(client);
    } catch (error) {
        logger.error(`Errore nel recupero del cliente per cognome e nome: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Aggiorna un cliente
exports.updateClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (req.body.dateOfBirth) {
            req.body.dateOfBirth = convertDate(req.body.dateOfBirth);
        }

        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedClient) {
            logger.warn(`Cliente con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        logger.info(`Cliente con ID ${req.params.id} aggiornato con successo`);
        res.json(updatedClient);
    } catch (error) {
        logger.error(`Errore nell'aggiornamento del cliente: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina un cliente
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            logger.warn(`Cliente con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        logger.info(`Cliente con ID ${req.params.id} eliminato con successo`);
        res.json({ message: 'Cliente eliminato con successo' });
    } catch (error) {
        logger.error(`Errore nell'eliminazione del cliente: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Funzione per convertire la data in formato ISO
const convertDate = (date) => {
    return new Date(date).toISOString();
};
