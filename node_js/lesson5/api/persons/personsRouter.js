const express = require('express');
const router = express.Router();
const personsController = require('./personsController');

router.get('/', personsController.get);
router.post('/', personsController.post);
router.get('/:id', personsController.getOne);
router.patch('/:id', personsController.patch);
router.delete('/:id', personsController.delete);

module.exports = router;