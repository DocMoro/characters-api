const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const User = require('../models/user');

const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');
const Error409 = require('../errors/error-409');

const { generateTokens, saveToken } = require('../service/token');
const mailService = require('../service/mail');

const { ERR_404, ERR_400, ERR_409, DEV_URL } = require('../utils/constants');
const { NODE_ENV, API_URL } = process.env;

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

module.exports.createUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new Error409(ERR_409);
    }

    const hash = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await User.create({
      ...req.body,
      password: hash,
      activationLink
    });

    await mailService.sendActivationMail(email, activationLink);

    res.send({
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new Error400(ERR_400));
    }
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const tokens = generateTokens({
      _id: user._id,
      role: user.role,
    });

    await saveToken(user._id, tokens.refreshToken);
    res.cookie('refresh', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    res.send(tokens);
  } catch (err) {
    return next(err);
  }
};

module.exports.activate = async (req, res, next) => {
  try {
    const user = await User.findOne({ activationLink: req.params.link });

    if (!user) {
      throw new Error400(ERR_400);
    }
    user.isActivated = true;
    await user.save();
    res.redirect(NODE_ENV === 'production' ? API_URL : DEV_URL);
  } catch (err) {
    return next(err);
  }
};
