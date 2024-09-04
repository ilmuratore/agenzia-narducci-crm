// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const clientController = require('../controllers/clientController');

// Rotte protette per i clienti
router.get('/', authController.verifyToken, clientController.getAllClients);
router.post('/', authController.verifyToken, clientController.createClient);
router.get('/:id', authController.verifyToken, clientController.getClientById);
router.get('/search/:surname/:name', authController.verifyToken, clientController.getClientBySurnameAndName);
router.put('/:id', authController.verifyToken, clientController.updateClient);
router.delete('/:id', authController.verifyToken, clientController.deleteClient);

module.exports = router;
