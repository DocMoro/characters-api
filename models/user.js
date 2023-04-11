const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Error401 = require('../errors/error-401');

const { ERR_400, ERR_401 } = require('../utils/constants');

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
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error401(ERR_401));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error401(ERR_401));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
