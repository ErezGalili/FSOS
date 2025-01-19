const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const config = require('.env');
const productsRouter = require('./api/products/productsRouter');
const personsRouter = require('./api/persons/personsRouter');
const userRouter = require("./api/Users/UserRouter");

app.use('/api/products', productsRouter);
app.use('/api/persons', personsRouter);
app.use('/api/users', userRouter);

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


