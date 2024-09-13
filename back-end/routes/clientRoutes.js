// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientBySurnameAndName, getClientWithPolicies } = require('../controllers/clientController');
const clientValidationRules = require('../validators/clientValidator');

// Rotte protette per i clienti
router.get('/', getAllClients); // ricerca di tutti gli utenti
router.get('/:id', getClientById); // ricerca di un utente per id 
router.get('/search/:surname/:name', getClientBySurnameAndName); // ricerca di un utente per cognome e nome
router.get('/:id/policies', getClientWithPolicies); // ricerca di un utente con le sue polizze
router.post('/', clientValidationRules(), createClient); // creazione di un nuovo utente
router.put('/:id', clientValidationRules(), updateClient); // aggiornamento di un utente
router.delete('/:id', deleteClient); // cancellazione di un utente


module.exports = router;
