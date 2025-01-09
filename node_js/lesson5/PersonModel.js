const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'A person must have name'],
        unique: false,
        trim: true
    },
    family: {
        type: String,
        required: [true, 'A person must have last name'],
        minlength: [2, 'Family is minimum 20 characters'],
        maxlength: [1000, 'Family is maximum 1000 characters']
    },
    city: {
        type: String,
        required: [true, 'A person must live somewhere'],
        minlength: [2, 'City is minimum 20 characters'],
        maxlength: [1000, 'City is maximum 1000 characters']
    },
    country: {
        type: String,
        required: [true, 'A person must live somewhere'],
        minlength: [2, 'Country is minimum 20 characters'],
        maxlength: [1000, 'Country is maximum 1000 characters']
    },
    salary: {
        type: Number,
        required: [true, 'A person must have salary'],
        min: [0, 'price must be above 0'],
        max: [100000000, 'price must be below 100000000']
    },
    created: Date
});

ProductSchema.pre('save', function(next) {
    if (!this.created) {
        this.created = new Date();
    }
    next();
});

const Persons = mongoose.model('persons', ProductSchema);
module.exports = Persons;