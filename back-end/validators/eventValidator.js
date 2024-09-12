// validators/eventValidator.js
const { body } = require('express-validator');

const eventValidationRules = () => {
    return [
        body('user').notEmpty().withMessage('Il campo user è obbligatorio').isMongoId().withMessage('ID utente non valido'),
        body('title').notEmpty().withMessage('Il campo titolo è obbligatorio').isLength({ min: 3 }).withMessage('Il titolo deve contenere almeno 3 caratteri'),
        body('description').optional().isLength({ max: 500 }).withMessage('La descrizione non può superare i 500 caratteri'),
        body('date').notEmpty().withMessage('Il campo data è obbligatorio').isISO8601().withMessage('Inserisci una data valida (ISO8601)'),
        body('reminder').optional().isBoolean().withMessage('Il campo reminder deve essere booleano')
    ];
};

module.exports = eventValidationRules;
