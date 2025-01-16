const express = require('express')
const userRouter = express.Router();
const userController = require('./UserController')
const authController = require('./AuthController')

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/', userController.getUsers);
userRouter.post('/',userController.createUser);
userRouter.get('/:id',userController.getUserById);
userRouter.patch('/:id',userController.updateUserById);
userRouter.delete('/:id',userController.deleteUserById);

module.exports = userRouter;

