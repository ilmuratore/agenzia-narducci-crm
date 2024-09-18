// validators/policyValidator.js

const { body } = require('express-validator');
const { validate } = require('../middlewares/validate');

const policyValidator = [
  body('policyNumber')
    .isInt({ min: 1}).withMessage('Il numero di polizza deve essere un intero positivo.')
    .notEmpty().withMessage('Il numero di polizza è obbligatorio.'),
  
  body('type')
    .isIn(['rc_auto', 'danni', 'vita', 'tcm', 'altro'])
    .withMessage('Tipo di polizza non valido.'),

  body('startDate')
    .isDate().withMessage('La data di inizio deve essere una data valida.'),

  body('endDate')
    .isDate().withMessage('La data di fine deve essere una data valida.')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error('La data di fine deve essere successiva alla data di inizio.');
      }
      return true;
    }),

  body('premiumAmount')
    .isFloat({ gt: 0 }).withMessage('Il premio deve essere un numero maggiore di 0.'),
  


  validate
];

module.exports = policyValidator;
