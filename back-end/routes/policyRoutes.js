// routes/policyRoutes.js
const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Rotte protette per le polizze
router.get('/',  policyController.getAllPolicies);
router.post('/',  policyController.createPolicy);
router.get('/:id',  policyController.getPolicyById);
router.get('/search/:surname/:name',  policyController.getPolicyByClientSurnameAndName);
router.put('/:id',  policyController.updatePolicy);
router.delete('/:id',  policyController.deletePolicy);

module.exports = router;
