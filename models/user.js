const mongoose = require('mongoose');
const validator = require('validator');

const { ERR_400 } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: ERR_400,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: 'User',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
