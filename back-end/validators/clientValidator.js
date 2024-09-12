// validators/clientValidator.js
const { body } = require('express-validator');

const clientValidationRules = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('Il campo nome è obbligatorio')
            .isLength({ min: 2 })
            .withMessage('Il campo nome deve contenere almeno 2 caratteri'),
        body('surname')
            .notEmpty()
            .withMessage('Il campo cognome è obbligatorio')
            .isLength({ min: 2 })
            .withMessage('Il campo cognome deve contenere almeno 2 caratteri'),
        body('fiscalCode')
            .notEmpty()
            .withMessage('Il campo codice fiscale è obbligatorio')
            .isLength({ min: 16, max: 16 })
            .withMessage('Il campo codice fiscale deve contenere 16 caratteri')
            .matches(/^[A-Z0-9]+$/i)
            .withMessage('Il codice fiscale deve contenere solo lettere e numeri'),
        body('email')
            .notEmpty()
            .withMessage('Il campo email è obbligatorio')
            .isEmail()
            .withMessage('Inserisci un indirizzo email valido'),
        body('phone')
            .notEmpty()
            .withMessage('Il campo telefono è obbligatorio')
            .isMobilePhone(['it-IT']) 
            .withMessage('Inserisci un numero di telefono valido'),
        body('address')
            .notEmpty()
            .withMessage('Il campo indirizzo è obbligatorio'),
        body('dateOfBirth')
            .notEmpty()
            .withMessage('Il campo data di nascita è obbligatorio')
            .isDate()
            .withMessage('Inserisci una data di nascita valida'),
        body('notes')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Il campo note non può superare i 500 caratteri')
    ];
};

module.exports = clientValidationRules;
