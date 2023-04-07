const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const User = require('../models/user');

const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');
const Error409 = require('../errors/error-409');

const { generateTokens, saveToken } = require('../service/token');

const { ERR_404, ERR_400, ERR_409 } = require('../utils/constants');

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error404(ERR_404);
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400(ERR_400));
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
      activationLink: uuid.v4(),
    }))
    .then((user) => res.send({
      email: user.email,
      role: user.role,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400(ERR_400));
      }

      if (err.code === 11000) {
        return next(new Error409(ERR_409));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const payload = {
        _id: user._id,
        role: user.role,
      };

      res.send(generateTokens(payload));
    })
    .catch(next);
};
