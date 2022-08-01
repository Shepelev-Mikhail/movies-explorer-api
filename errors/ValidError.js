const { validErrorCode } = require('../utils/constants');

class ValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = validErrorCode;
  }
}

module.exports = ValidError;
