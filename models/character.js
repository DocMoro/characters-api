const mongoose = require('mongoose');
const { spellSchema } = require('./spell');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spells: [spellSchema],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('character', characterSchema);
