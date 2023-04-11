const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'user',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('token', tokenSchema);
