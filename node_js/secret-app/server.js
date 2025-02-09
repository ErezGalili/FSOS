const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRouter = require('./api/flight/FlightRouter');
const userRouter = require('./api/user/UserRouter');
const auth = require('./api/user/auth');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', userRouter);
app.use('/flights', auth, flightRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

