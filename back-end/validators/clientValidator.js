// validators/clientValidator.js
const { body } = require('express-validator');

const clientValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Il campo nome è obbligatorio')
            .isLength({ min: 1 }).withMessage('Il campo nome deve contenere almeno 2 caratteri'),
        body('surname')
            .trim()
            .notEmpty().withMessage('Il campo cognome è obbligatorio')
            .isLength({ min: 1 }).withMessage('Il campo cognome deve contenere almeno 2 caratteri'),
        body('fiscalCode')
            .trim()
            .notEmpty().withMessage('Il campo codice fiscale è obbligatorio')
            .isLength({ min: 16, max: 16 }).withMessage('Il campo codice fiscale deve contenere 16 caratteri')
            .matches(/^[A-Z0-9]+$/i).withMessage('Il codice fiscale deve contenere solo lettere e numeri'),
        body('email')
            .trim()
            .notEmpty().withMessage('Il campo email è obbligatorio')
            .isEmail().withMessage('Inserisci un indirizzo email valido usando questo formato xxx@dominio.xx')
            .normalizeEmail(),
        body('phone')
            .trim()
            .notEmpty().withMessage('Il campo telefono è obbligatorio')
            .isMobilePhone(['it-IT']).withMessage('Inserisci un numero di telefono valido usando questo formato +39xxxxxxxxxx'),
        body('address')
            .trim()
            .notEmpty().withMessage('Il campo indirizzo è obbligatorio'),
        body('dateOfBirth')
            .trim()
            .notEmpty().withMessage('Il campo data di nascita è obbligatorio')
            .isISO8601().withMessage('Inserisci una data di nascita valida usando questo formato YYYY-MM-DD'),
        body('clientNotes')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('Il campo note non può superare i 500 caratteri')
            .escape(),
        body('policies').optional().isArray().withMessage('Il campo policies deve essere un array'),
        body('policies.*').optional().isMongoId().withMessage('Ogni elemento di policies deve essere un ID valido di MongoDB'),
    ];
};

module.exports = clientValidationRules;
