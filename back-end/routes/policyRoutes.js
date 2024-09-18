const express = require('express');
const router = express.Router();
const multer = require('multer');
const policyValidator = require('../validators/policyValidator');
const upload = multer(); 
const {createPolicy, updatePolicy, getPolicyById, deletePolicy, getAllPolicy} = require('../controllers/policyController');

// Rotte di endpoint per le polizze
router.get('/', getAllPolicy);
router.post('/', upload.single('pdf'), policyValidator, createPolicy);
router.get('/:id', getPolicyById);
router.put('/:id', upload.single('pdf'), policyValidator, updatePolicy);
router.delete('/:id', deletePolicy);

module.exports = router;
