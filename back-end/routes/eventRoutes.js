// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Rotte protette per gli eventi
router.get('/',  eventController.getAllEvents);
router.post('/',  eventController.createEvent);
router.get('/:id',  eventController.getEventById);
router.put('/:id',  eventController.updateEvent);
router.delete('/:id',  eventController.deleteEvent);

module.exports = router;
