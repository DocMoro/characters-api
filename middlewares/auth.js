const jwt = require('jsonwebtoken');

const Error401 = require('../errors/error-401');

const { ERR_401 } = require('../utils/constants');

const { NODE_ENV, JWT_ACCESS_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { Authorization } = req.headers;

  if (!Authorization || !Authorization.startsWith('Bearer ')) {
    return next(new Error401(ERR_401));
  }

  const token = Authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_ACCESS_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Error401(ERR_401));
  }

  req.user = payload;

  return next();
};
