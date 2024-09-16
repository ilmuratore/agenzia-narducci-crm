// routes/policyRoutes.js

const express = require('express');
const { getAllPolicies, createPolicy, getPolicyById, updatePolicy, deletePolicy } = require('../controllers/policyController');
const policyValidationRules = require('../validators/policyValidator');
const upload = require('../config/s3');

const router = express.Router();

const uploadMiddleware = upload.single('pdfFile');


//Rotte per le polizze
router.get('/', getAllPolicies);
router.post('/', uploadMiddleware, policyValidationRules(), createPolicy);
router.get('/:id', getPolicyById);
router.put('/:id', policyValidationRules(), updatePolicy);
router.delete('/:id', deletePolicy);


module.exports = router;
