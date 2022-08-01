const { defaultErrorCode, serverError } = require('../utils/constants');

const defaultErrorHandler = (err, req, res, next) => {
  const { statusCode = defaultErrorCode, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === defaultErrorCode
        ? serverError
        : message,
    });
  next();
};

module.exports = defaultErrorHandler;
