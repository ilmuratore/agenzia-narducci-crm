// validators/userValidator.js

const { body } = require('express-validator');

const userValidationRules = () => {
    return [
        body('username').notEmpty().withMessage('Il campo username è obbligatorio').isLength({ min: 3 }).withMessage('Il campo username deve contenere almeno 3 caratteri'),
        body('email').isEmail().withMessage('Inserisci un indirizzo email valido'),
        body('password').isLength({ min: 6 }).withMessage('Il campo password deve contenere almeno 6 caratteri'),
        body('role').optional().isIn(['admin', 'agent']).withMessage('Ruolo non valido')
    ];
};

module.exports = userValidationRules;