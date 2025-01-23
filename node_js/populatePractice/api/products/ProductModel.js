const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A product must have title'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        minlength: [5, 'Description must be at least 5 characters'],
        maxlength: [1000, 'Description is maximum 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'A product must have price'],
        min: [0, 'price must be above 0'],
        max: [10000, 'price must be below 10000']
    },
    imageCover:{
        type:String,
        required:[true,'A tour must have a cover image']
        },
        images:[String],
        suppliers:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'user'
        }
        ],
    created: Date
});

ProductSchema.pre('save', function(next) {
    if (!this.created) {
        this.created = new Date();
    }
    next();
});

ProductSchema.pre(/^find/, async function(next){
    this.populate({
        path:'suppliers',
        select:'-password -passwordChangedAt -passwordResetToken'
    })
    next();
})

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;