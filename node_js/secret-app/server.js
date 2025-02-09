const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const flightRoutes = require('./api/flight/FlightRouter');
const userRoutes = require('./api/user/UserRouter');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/flight', flightRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

