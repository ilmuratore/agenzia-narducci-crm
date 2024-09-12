// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Rotte protette per i clienti
router.get('/', clientController.getAllClients);
router.post('/',  clientController.createClient);
router.get('/:id', clientController.getClientById);
router.get('/search/:surname/:name',  clientController.getClientBySurnameAndName);
router.put('/:id',  clientController.updateClient);
router.delete('/:id',  clientController.deleteClient);

module.exports = router;
