const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Error401 = require('../errors/error-401');
const Error400 = require('../errors/error-400');
const Error409 = require('../errors/error-409');

const {
  generateTokens,
  saveToken,
  removeToken,
  findToken,
} = require('../service/token');
const mailService = require('../service/mail');

const {
  ERR_401,
  ERR_400,
  ERR_409,
  DEV_URL,
} = require('../utils/constants');

const { NODE_ENV, FRONT_URL, JWT_REFRESH_SECRET } = process.env;

module.exports.registration = async (req, res, next) => {
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
      activationLink,
    });
    const { _id, role, isActivated } = user;

    const tokens = generateTokens({
      _id,
      role,
    });
    const { accessToken, refreshToken } = tokens;

    await saveToken(_id, refreshToken);

    await mailService.sendActivationMail(email, activationLink);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({
      email,
      role,
      isActivated,
      accessToken,
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
    const { _id, role, isActivated } = user;

    const tokens = generateTokens({
      _id,
      role,
    });
    const { accessToken, refreshToken } = tokens;

    await saveToken(_id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({
      email,
      role,
      isActivated,
      accessToken,
    });
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
    res.redirect(NODE_ENV === 'production' ? FRONT_URL : DEV_URL);
  } catch (err) {
    return next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const tokenData = await removeToken(refreshToken);
    res.clearCookie('refreshToken');
    res.send(tokenData);
  } catch (err) {
    return next(err);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error400(ERR_400);
    }

    const userData = jwt.verify(refreshToken, NODE_ENV === 'production' ? JWT_REFRESH_SECRET : 'dev-secret');
    const tokenFromDb = findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error401(ERR_401);
    }

    const user = await User.findById(userData._id);
    const {
      _id,
      role,
      email,
      isActivated,
    } = user;

    const tokens = generateTokens({
      _id,
      role,
    });
    const {
      accessToken: newAccess,
      refreshToken: newRefresh,
    } = tokens;

    await saveToken(user._id, newRefresh);

    res.cookie('refreshToken', newRefresh, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.send({
      email,
      role,
      isActivated,
      accessToken: newAccess,
    });
  } catch (err) {
    return next(err);
  }
};
