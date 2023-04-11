const { ERR_500 } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERR_500
        : message,
    });
};
