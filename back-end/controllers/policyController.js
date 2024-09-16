// controllers/policyController.js
const { validationResult } = require('express-validator');
const Policy = require('../models/Policy');
const logger = require('../middlewares/logger'); 
const upload = require('../config/s3').single('File');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// variabili globali per la configurazione di S3

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
// METODI CRUD STANDARD 

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

<<<<<<< HEAD
=======
// Crea una nuova polizza V2
exports.createPolicy = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Errore di validazione nella creazione della polizza: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    upload(req, res, async (err) => {
        if (err) {
            logger.error('Errore durante l\'upload del file: ', err);
            return res.status(500).json({ message: 'Errore durante l\'upload del file' });
        }
        if (!req.file) {
            logger.warn('File PDF obbligatorio non caricato.');
            return res.status(400).json({ message: 'Il file PDF è obbligatorio' });
        }
        try {
            const newPolicy = new Policy({
                ...req.body,
                pdfUrl: req.file.location
            });
            await newPolicy.save();
            logger.info(`Polizza creata con successo: ${newPolicy._id}`);
            res.status(201).json(newPolicy);
        } catch (error) {
            logger.error('Errore nella creazione della polizza: ', error);
            res.status(500).json({ message: 'Errore nel server' });
        }
    });
};

>>>>>>> 671b9bf66016fd306815b0ba5ff08e9d2acbba71
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

// Crea una nuova polizza V3
exports.createPolicy = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Errore durante l\'upload del file' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'Il file PDF è obbligatorio' });
        }
        try {
            const newPolicy = new Policy({
                ...req.body,
                pdfUrl: req.file.location
            });
            await newPolicy.save();
            if (req.body.client) {
                await Client.findByIdAndUpdate(req.body.client, {
                    $push: { policies: newPolicy._id }
                });
            }
            res.status(201).json(newPolicy);
        } catch (error) {
            res.status(500).json({ message: 'Errore nel server' });
        }
    });
};


// Aggiorna una polizza V2 
exports.updatePolicy = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Errore di validazione nell\'aggiornamento della polizza: ', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    upload(req, res, async (err) => {
        if (err) {
            logger.error('Errore durante l\'upload del file: ', err);
            return res.status(500).json({ message: 'Errore durante l\'upload del file' });
        }
        if (!req.file) {
            logger.warn('File PDF obbligatorio non caricato.');
            return res.status(400).json({ message: 'Il file PDF è obbligatorio' });
        }
        try {
            const updatedPolicyData = {
                ...req.body,
                pdfUrl: req.file.location
            };
            const updatedPolicy = await Policy.findByIdAndUpdate(req.params.id, updatedPolicyData, { new: true });
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
    });
};

// Elimina una polizza V2
exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);
        if (!policy) {
            logger.warn(`Polizza non trovata con ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Polizza non trovata' });
        }
        if (policy.pdfUrl) {
            const fileName = policy.pdfUrl.split('/').pop();
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName
            };
            await s3.send(new DeleteObjectCommand(deleteParams));
        }
        await Policy.findByIdAndDelete(req.params.id);
        logger.info(`Polizza eliminata con successo: ${req.params.id}`);
        res.json({ message: 'Polizza eliminata con successo' });
    } catch (error) {
        logger.error(`Errore nell'eliminazione della polizza con ID ${req.params.id}: `, error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};


// METODI DI RICERCA PERSONALIZZATI 
