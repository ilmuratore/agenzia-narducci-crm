const express = require('express');
const router = express.Router();
const multer = require('multer');
const policyValidator = require('../validators/policyValidator');
const upload = multer({ storage: multer.memoryStorage() }); // Configurazione multer
const {createPolicy, updatePolicy, getPolicyById, deletePolicy, getAllPolicies} = require('../controllers/policyController');

// Rotte di endpoint per le polizze
router.get('/', getAllPolicies); // get all policies
router.post('/', upload.single('pdfUrl'), policyValidator, createPolicy); // create policy 
router.get('/:id', getPolicyById);
router.put('/:id', upload.single('pdfUrl'), policyValidator, updatePolicy);  // update policy 
router.delete('/:id', deletePolicy);

module.exports = router;
