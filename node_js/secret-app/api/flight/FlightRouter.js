const express = require('express');
const router = express.Router();
const flightController = require('./FlightController');

router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);
router.post('/', flightController.createFlight);
router.patch('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

module.exports = router;
