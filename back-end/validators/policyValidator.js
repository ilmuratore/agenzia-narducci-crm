// validators/policyValidator.js

const { body } = require('express-validator');

const policyValidationRules = () => {
    return [
        body('client')
            .optional(),
        body('policyNumber')
            .optional()
            .notEmpty()
            .withMessage('Il campo policyNumber è obbligatorio'),
        body('type')
            .optional()
            .notEmpty()
            .withMessage('Il campo type è obbligatorio')
            .isIn(['rc_auto', 'danni', 'vita', 'tcm', 'altro'])
            .withMessage('Il campo type deve essere uno tra rc_auto, danni, vita, tcm, altro'),
        body('startDate')
            .optional()
            .notEmpty()
            .withMessage('Il campo startDate è obbligatorio')
            .isISO8601()
            .withMessage('Il campo startDate deve essere una data valida'),
        body('endDate')
            .optional()
            .notEmpty()
            .withMessage('Il campo endDate è obbligatorio')
            .isISO8601()
            .withMessage('Il campo endDate deve essere una data valida'),
        body('premiumAmount')
            .optional()
            .notEmpty()
            .withMessage('Il campo premiumAmount è obbligatorio')
            .isNumeric()
            .withMessage('Il campo premiumAmount deve essere un numero'),
        body('status')
            .optional()
            .isIn(['attiva', 'scaduta', 'sospesa', 'disdetta_cliente', 'disdetta_direzione'])
            .withMessage('Il campo status deve essere uno tra attiva, scaduta, sospesa, disdetta_cliente, disdetta_direzione'),
        body('notes')
            .optional()
            .isString(),
        body('Invoice')
            .optional()
            .isMongoId()
            .withMessage('Il campo Invoice deve essere un ID valido di MongoDB'),
    ];
};

module.exports = policyValidationRules;
