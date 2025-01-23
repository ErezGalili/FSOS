const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'please provide email'],
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6
    },
    firstname: String,
    lastname: String,
    photo: String,
    created: Date,
    modified: Date,
    permission: {}
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
    return next();
    }
    const salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods = {
    authenticate: function(plainTextPword) {
    console.log("this password is " + this.password);
    return bcrypt.compareSync(plainTextPword, this.password);
    },
    toJson: function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
    }
};

module.exports = mongoose.model('User', UserSchema);
