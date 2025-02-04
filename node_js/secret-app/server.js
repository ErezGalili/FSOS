const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRouter = require('./api/flight/FlightRouter');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/flightDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/flights', flightRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

