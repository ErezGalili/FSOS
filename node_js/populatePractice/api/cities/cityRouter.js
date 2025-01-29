const express = require('express');
const router = express.Router();
const cityController = require('./cityController');

router.get('/', cityController.getAllCities);
router.post('/', cityController.createCity);

module.exports = router;