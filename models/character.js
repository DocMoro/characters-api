const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spells: [{
    type: mongoose.ObjectId,
  }],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('character', characterSchema);
