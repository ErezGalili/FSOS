const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

router.get('/', productsController.get);
router.post('/', productsController.post);
router.get('/:id', productsController.getOne);
router.patch('/:id', productsController.patch);
router.delete('/:id', productsController.delete);

module.exports = router;