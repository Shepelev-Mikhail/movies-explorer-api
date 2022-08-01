const { unauthorizedErrorCode } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorizedErrorCode;
  }
}

module.exports = UnauthorizedError;
