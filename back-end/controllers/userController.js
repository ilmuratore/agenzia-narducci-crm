// controllers/userController.js

const User = require('../models/User');
const {validationResult} = require('express-validator');
const logger = require('../middlewares/logger');

// Creazione di un nuovo utente ( POST) /api/users
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({errors: errors.array()});
    }

    const {username, email, password, role} = req.body;

    try {
        const user = new User({username, email, password, role});
        await user.save();
        logger.info(`Utente ${username} creato con successo`);
        res.status(201).json({message: 'Utente creato con successo', user});
    } catch (error) {
        logger.error(`Errore nella creazione dell'utente: ${error.message}`);
        res.status(500).json({message: 'Errore nel server'});
    }
    
};

// Ottieni la lista di tutti gli utenti ( GET) /api/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        logger.info('Lista utenti recuperata con successo');
        res.status(200).json(users);
    } catch (error) {
        logger.error(`Errore nel recupero della lista utenti: ${error.message}`);
        res.status(500).json({message: 'Errore nel server'});
    }
};

// Modifica un utente esistente ( PUT) /api/users/:id
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Errore di validazione: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findByIdAndUpdate(id, { username, email, password, role }, { new: true });
        if (!user) {
            return res.status(404).json({message: 'Utente non trovato'});
        }
        logger.info(`Utente con ID ${id} modificato con successo`);
        res.status(200).json({message: 'Utente modificato con successo', user});
    } catch (error) {
        logger.error(`Errore nella modifica dell'utente: ${error.message}`);
        res.status(500).json({message: 'Errore nel server'});
    }
};

// Elimina un utente esistente ( DELETE) /api/users/:id
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({message: 'Utente non trovato'});
        }
        logger.info(`Utente con ID ${id} eliminato con successo`);
        res.status(200).json({message: 'Utente eliminato con successo'});
    } catch (error) {
        logger.error(`Errore nell'eliminazione dell'utente: ${error.message}`);
        res.status(500).json({message: 'Errore nel server'});
    }
};


module.exports = {createUser, getUsers, updateUser, deleteUser};