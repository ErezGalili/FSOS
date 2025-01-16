const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const productsRouter = require('./api/products/productsRouter');
const personsRouter = require('./api/persons/personsRouter');
const userRouter = require("./api/Users/UserRouter");

app.use('/api/products', productsRouter);
app.use('/api/persons', personsRouter);
app.use('/api/users', userRouter);

const uri = "mongodb://127.0.0.1:27017/test";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api', (req, res) => {
    res.send('API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


