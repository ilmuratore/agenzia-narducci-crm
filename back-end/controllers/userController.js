// controllers/userController.js

const User = require('../models/User');
const {validationResult} = require('express-validator');
const logger = require('../middlewares/logger');

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

module.exports = {createUser};