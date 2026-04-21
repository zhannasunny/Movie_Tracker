const mongoose = require('mongoose');

const savedItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: String,
  poster_path: String,
  media_type: String, // "movie" or "tv"
  release_date: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  myList: [savedItemSchema],
});

module.exports = mongoose.model('User', userSchema);