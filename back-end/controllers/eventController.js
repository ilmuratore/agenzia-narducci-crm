// controllers/eventController.js
const Event = require('../models/Event');

// Ottieni tutti gli eventi
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea un nuovo evento
exports.createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni un evento per ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Aggiorna un evento
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina un evento
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Evento non trovato' });
        }
        res.json({ message: 'Evento eliminato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};
