const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./api/flight/FlightRouter');
const userRoutes = require('./api/user/UserRouter');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/flight', flightRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flightDB', {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});