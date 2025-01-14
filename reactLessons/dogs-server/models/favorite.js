const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
  imageSrc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);