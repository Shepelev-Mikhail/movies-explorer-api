const { notFoundErrorCode } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundErrorCode;
  }
}

module.exports = NotFoundError;
