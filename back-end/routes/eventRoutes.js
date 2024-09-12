// routes/eventRoutes.js
const express = require('express');
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const eventValidationRules = require('../validators/eventValidator');

const router = express.Router();

// Definisci le rotte per gli eventi
router.get('/', getAllEvents);
router.post('/', eventValidationRules(), createEvent);
router.get('/:id', getEventById);
router.put('/:id', eventValidationRules(), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
