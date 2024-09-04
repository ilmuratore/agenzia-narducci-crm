// controllers/clientController.js
const Client = require('../models/Client');

// Ottieni tutti i clienti
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea un nuovo cliente
exports.createClient = async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni un cliente per ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};


// Ottieni un cliente per cognome e nome del cliente
exports.getClientBySurnameAndName = async (req, res) => {
    try {
        const client = await Client.findOne({ $or: [{ surname: req.params.surname }, { name: req.params.name }] });
        if (!client) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
}

// Aggiorna un cliente
exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina un cliente
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente non trovato' });
        }
        res.json({ message: 'Cliente eliminato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};
