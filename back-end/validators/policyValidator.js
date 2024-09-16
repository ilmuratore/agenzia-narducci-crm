// validators/policyValidator.js
const { body } = require('express-validator');

const policyValidationRules = () => {
    return [
        body('client').optional(),
        body('policyNumber')
            .notEmpty().withMessage('Il campo policyNumber è obbligatorio'),
        body('type')
            .notEmpty().withMessage('Il campo type è obbligatorio')
            .isIn(['rc_auto', 'danni', 'vita', 'tcm', 'altro'])
            .withMessage('Il campo type deve essere uno tra rc_auto, danni, vita, tcm, altro'),
        body('startDate')
            .notEmpty().withMessage('Il campo startDate è obbligatorio')
            .isISO8601().withMessage('Il campo startDate deve essere una data valida'),
        body('endDate')
            .notEmpty().withMessage('Il campo endDate è obbligatorio')
            .isISO8601().withMessage('Il campo endDate deve essere una data valida'),
        body('premiumAmount')
            .notEmpty().withMessage('Il campo premiumAmount è obbligatorio')
            .isNumeric().withMessage('Il campo premiumAmount deve essere un numero'),
        body('invoiceAmount')
            .notEmpty().withMessage('Il campo invoiceAmount è obbligatorio')
            .isNumeric().withMessage('Il campo invoiceAmount deve essere un numero'),
        body('status')
            .isIn(['attiva', 'scaduta', 'sospesa', 'disdetta_cliente', 'disdetta_direzione'])
            .withMessage('Il campo status deve essere uno tra attiva, scaduta, sospesa, disdetta_cliente, disdetta_direzione'),
        body('contributor')
            .notEmpty().withMessage('Il campo contributo è obbligatorio')
            .isIn(['valerio', "d'ambrosio", 'tiziana', 'prisco', 'luciano', 'agenzia'])
            .withMessage('Il campo broker deve essere uno valido'),
        body('paymentMethod')
            .notEmpty().withMessage('Il campo paymentMethod è obbligatorio')
            .isIn(['contanti', 'pos', 'bonifico', 'finanziamento'])
            .withMessage('Il campo paymentMethod deve essere uno tra contanti, pos, bonifico, finanziamento'),
        body('splitType')
            .notEmpty().withMessage('Il campo installmentType è obbligatorio')
            .isIn(['annuale', 'semestrale'])
            .withMessage('Il campo splitType deve essere uno tra annuale e semestrale'),
        body('policyNotes').optional().isString(),
        body('Invoice')
            .optional()
            .isMongoId().withMessage('Il campo Invoice deve essere un ID valido di MongoDB'),
    ];
};

module.exports = policyValidationRules;
