// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const policyController = require('../controllers/policyController');

// Rotte protette per le polizze
router.get('/', authController.verifyToken, policyController.getAllPolicies);
router.post('/', authController.verifyToken, policyController.createPolicy);
router.get('/:id', authController.verifyToken, policyController.getPolicyById);
router.get('/search/:surname/:name', authController.verifyToken, policyController.getPolicyByClientSurnameAndName);
router.put('/:id', authController.verifyToken, policyController.updatePolicy);
router.delete('/:id', authController.verifyToken, policyController.deletePolicy);

module.exports = router;
