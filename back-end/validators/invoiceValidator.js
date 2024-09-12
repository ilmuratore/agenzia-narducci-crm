// validators/invoiceValidator.js
const { body } = require('express-validator');

const invoiceValidationRules = () => {
    return [
        body('policyId').notEmpty().withMessage('Il campo policyId è obbligatorio').isMongoId().withMessage('policyId non valido'),
        body('amount').notEmpty().withMessage('Il campo amount è obbligatorio').isFloat({ gt: 0 }).withMessage('L\'importo deve essere un numero maggiore di zero'),
        body('date').optional().isISO8601().withMessage('Inserisci una data valida (ISO8601)')
    ];
};

module.exports = invoiceValidationRules;
