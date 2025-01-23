const express = require('express');
const CommentRouter = express.Router();
const commentController = require('./commentController');
const { protectSystem } = require('../users/AuthController');

CommentRouter.post('/', protectSystem, commentController.create);
CommentRouter.get('/', commentController.getAll);

module.exports = CommentRouter;