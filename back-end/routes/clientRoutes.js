// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientBySurnameAndName } = require('../controllers/clientController');
const clientValidationRules = require('../validators/clientValidator');

// Rotte protette per i clienti
router.get('/', getAllClients);
router.post('/', clientValidationRules(), createClient);
router.get('/:id', getClientById);
router.get('/search/:surname/:name', getClientBySurnameAndName);
router.put('/:id', clientValidationRules(), updateClient);
router.delete('/:id', deleteClient);


module.exports = router;
