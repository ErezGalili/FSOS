const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const config = require('./config.js');
const productRouter = require("./api/products/productRouter")
const userRouter = require("./api/users/UserRouter")
const commentRouter = require("./api/comments/commentRouter")

app.use('/api/products', productRouter);
app.use('/api/users',userRouter);
app.use('/api/comments',commentRouter);

mongoose.connect(config.mongoUri, config.mongoOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res, next) => {
    res.send('Hello World');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API');
    next();
});

const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

