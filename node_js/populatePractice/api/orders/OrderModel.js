const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Order must belong to a user']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: [true, 'Order must belong to a product']
    },
    quantity: {
        type: Number,
        required: [true, 'Order must have quantity'],
        min: 1,
        max: 100
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

OrderSchema.pre(/^find/, async function(next){
    this.populate({
        path: 'user',
        select: 'name'
    }).populate({
        path: 'product',
        select: 'title'
    });
    next();
});

const CitySchema = new Schema({
    name: {
        type: String,
        required: [true, 'City must have name'],
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('City', CitySchema);
module.exports = mongoose.model('Order', OrderSchema);
