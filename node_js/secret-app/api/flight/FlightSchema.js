const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    time: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
