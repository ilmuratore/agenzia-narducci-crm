// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');

// Rotte protette per gli eventi
router.get('/', authController.verifyToken, eventController.getAllEvents);
router.post('/', authController.verifyToken, eventController.createEvent);
router.get('/:id', authController.verifyToken, eventController.getEventById);
router.put('/:id', authController.verifyToken, eventController.updateEvent);
router.delete('/:id', authController.verifyToken, eventController.deleteEvent);

module.exports = router;
