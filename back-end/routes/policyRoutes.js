// routes/policyRoutes.js

const express = require('express');
const { getAllPolicies, createPolicy, getPolicyById, updatePolicy, deletePolicy} = require('../controllers/policyController');
const policyValidationRules = require('../validators/policyValidator');

const router = express.Router();

//Rotte per le polizze
router.get('/', getAllPolicies);
router.post('/', policyValidationRules(), createPolicy);
router.get('/:id', getPolicyById);
router.put('/:id', policyValidationRules(), updatePolicy);
router.delete('/:id', deletePolicy);


module.exports = router;
