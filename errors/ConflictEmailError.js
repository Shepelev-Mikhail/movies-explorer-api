const { conflictEmailErrorCode } = require('../utils/constants');

class ConflictEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictEmailErrorCode;
  }
}

module.exports = ConflictEmailError;
