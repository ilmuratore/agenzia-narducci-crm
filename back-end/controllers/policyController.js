// controllers/policyController.js
const Policy = require('../models/Policy');

// Ottieni tutte le polizze
exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate('client');
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Crea una nuova polizza
exports.createPolicy = async (req, res) => {
    try {
        const newPolicy = new Policy(req.body);
        await newPolicy.save();
        res.status(201).json(newPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni una polizza per ID
exports.getPolicyById = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id).populate('client');
        if (!policy) {
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json(policy);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Ottieni una polizza per nome e cognome del cliente
exports.getPolicyByClientSurnameAndName = async (req, res) => {
    try {
        const policy = await Policy.findOne({ $or: [{ 'client.surname': req.params.surname }, { 'client.name': req.params.name }] }).populate('client');
        if (!policy) {
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json(policy);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};


// Aggiorna una polizza
exports.updatePolicy = async (req, res) => {
    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPolicy) {
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json(updatedPolicy);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};

// Elimina una polizza
exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndDelete(req.params.id);
        if (!policy) {
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        res.json({ message: 'Polizza eliminata con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel server' });
    }
};
