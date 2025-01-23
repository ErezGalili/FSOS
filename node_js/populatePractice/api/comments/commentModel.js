const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A comment must have title'],
    },
    description: {
        type: String,
        minLength: [5, 'Description is minimum 20 characters'],
        maxLength: [1000, 'Description is maximum 1000 characters']
    },
    rating: {
        type: Number,
        required: [true, 'A comment must have rating'],
        min: 1,
        max: 5
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: [true, 'Product must belong to a comment']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Product must belong to a user']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', CommentSchema);
