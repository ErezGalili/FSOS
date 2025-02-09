const express = require('express');
const router = express.Router();
const userController = require('./UserController');
const auth = require('./auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/', auth, userController.getUsers);
router.post('/switch/:id', auth, userController.switchUser); // New endpoint
router.get('/:id', auth, userController.getUser);
router.patch('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;