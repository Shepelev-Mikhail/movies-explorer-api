const { defaultErrorCode } = require('../utils/constants');

const defaultErrorHandler = (err, req, res, next) => {
  const { statusCode = defaultErrorCode, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === defaultErrorCode
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = defaultErrorHandler;
