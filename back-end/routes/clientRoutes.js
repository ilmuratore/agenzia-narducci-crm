// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const { createClient, getAllClients, getClientById, updateClient, deleteClient, getClientsByName, getClientsBySurname, getClientsByFullName } = require('../controllers/clientController');
const clientValidationRules = require('../validators/clientValidator');

// Rotte protette per i clienti
router.get('/', getAllClients); // ricerca di tutti gli utenti
router.get('/:id', getClientById); // ricerca di un utente per id 
router.post('/', clientValidationRules(), createClient); // creazione di un nuovo utente
router.put('/:id', clientValidationRules(), updateClient); // aggiornamento di un utente
router.delete('/:id', deleteClient); // cancellazione di un utente

// Rotte per metodi personalizzati per la ricerca di clienti
router.get('/name/:name', getClientsByName); // ricerca di un utente per nome
router.get('/surname/:surname', getClientsBySurname); // ricerca di un utente per cognome
router.get('/fullname/:name/:surname', getClientsByFullName); // ricerca di un utente per nome e cognome


module.exports = router;
