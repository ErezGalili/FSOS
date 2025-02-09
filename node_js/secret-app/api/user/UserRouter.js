const express = require('express');
const router = express.Router();
const userController = require('./UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;