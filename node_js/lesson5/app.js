const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const productsRouter = require('./api/products/productsRouter');
const personsRouter = require('./api/persons/personsRouter');
const userRouter = require("./api/Users/UserRouter");

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/persons', personsRouter);

const uri = "mongodb+srv://ErezG:Aa123456@test.cxhcq.mongodb.net/?retryWrites=true&w=majority&appName=Test";
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

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


