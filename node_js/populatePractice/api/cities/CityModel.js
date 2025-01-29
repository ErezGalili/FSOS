const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'City must have name'],
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('City', CitySchema);