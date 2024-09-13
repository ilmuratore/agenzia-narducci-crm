// controllers/clientController.js
const { validationResult } = require('express-validator');
const Client = require('../models/Client');
const Policy = require('../models/Policy');
const logger = require('../middlewares/logger');

// Ottieni tutti i clienti
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().lean(); 
        res.json(clients);
    } catch (error) {
        logger.error(`Errore nel recupero dei clienti: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea un nuovo cliente
const createClient = async (req, res) => {
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
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).lean();
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
const getClientBySurnameAndName = async (req, res) => {
    try {
        const client = await Client.findOne({
            surname: req.params.surname,
            name: req.params.name
        }).lean();
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
const updateClient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (req.body.dateOfBirth) {
            req.body.dateOfBirth = new Date(req.body.dateOfBirth).toISOString();
        }

        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
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
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id).lean();
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

// Funzione per ottenere un cliente con le sue polizze
const getClientWithPolicies = async (req, res) => {
    try {
        const clientId = req.params.id;

        const client = await Client.findById(clientId).lean();
        if (!client) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }

        const policies = await Policy.find({ client: clientId }).lean();

        res.json({ client, policies });
    } catch (error) {
        logger.error(`Errore nel recupero del cliente e delle polizze: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

module.exports = { 
    getAllClients, 
    createClient, 
    getClientById, 
    getClientBySurnameAndName, 
    updateClient, 
    deleteClient, 
    getClientWithPolicies 
};
