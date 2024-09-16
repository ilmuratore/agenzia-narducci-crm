// routes/policyRoutes.js

const express = require('express');
const { getAllPolicies, createPolicy, getPolicyById, updatePolicy, deletePolicy, getPolicyByClientSurnameAndName } = require('../controllers/policyController');
const policyValidationRules = require('../validators/policyValidator');

const router = express.Router();

//Rotte per le polizze
router.get('/', getAllPolicies);
router.post('/', policyValidationRules(), createPolicy);
router.get('/:id', getPolicyById);
router.put('/:id', policyValidationRules(), updatePolicy);
router.delete('/:id', deletePolicy);
router.get('/client/:surname/:name', getPolicyByClientSurnameAndName); // metodo per ottenere le polizze di un cliente tramite cognome e nome + query 


module.exports = router;
