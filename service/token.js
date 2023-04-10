const jwt = require('jsonwebtoken');

const Token = require('../models/token');

const { NODE_ENV, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

module.exports.generateTokens = (payload) => {
  const accessToken = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_ACCESS_SECRET : 'dev-secret',
    { expiresIn: '30m' },
  );
  const refreshToken = jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_REFRESH_SECRET : 'dev-secret',
    { expiresIn: '30d' },
  );

  return {
    accessToken,
    refreshToken,
  };
};

module.exports.saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  return token;
};

module.exports.removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
};

module.exports.findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
};
