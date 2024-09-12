// controllers/eventController.js
const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const logger = require('../middlewares/logger');

// Ottieni tutti gli eventi
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        logger.error(`Errore nel recupero degli eventi: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea un nuovo evento
exports.createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        logger.info(`Evento "${newEvent.title}" creato con successo`);
        res.status(201).json(newEvent);
    } catch (error) {
        logger.error(`Errore nella creazione dell'evento: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni un evento per ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            logger.warn(`Evento con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        res.json(event);
    } catch (error) {
        logger.error(`Errore nel recupero dell'evento per ID: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Aggiorna un evento
exports.updateEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            logger.warn(`Evento con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        logger.info(`Evento con ID ${req.params.id} aggiornato con successo`);
        res.json(updatedEvent);
    } catch (error) {
        logger.error(`Errore nell'aggiornamento dell'evento: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina un evento
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            logger.warn(`Evento con ID ${req.params.id} non trovato`);
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        logger.info(`Evento con ID ${req.params.id} eliminato con successo`);
        res.json({ message: 'Evento eliminato con successo' });
    } catch (error) {
        logger.error(`Errore nell'eliminazione dell'evento: ${error.message}`);
        res.status(500).json({ message: 'Errore nel server' });
    }
};
