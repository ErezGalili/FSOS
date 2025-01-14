const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  profilePic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Favorites',
  },
});

module.exports = mongoose.model('Users', userSchema);


