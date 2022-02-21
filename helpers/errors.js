module.exports.CustomError = class CustomError extends Error {
  constructor (message) {
    super(message);
    this.name = 'CustomError';
  }
};

module.exports.ValidationError = class ValidationError extends Error {
  constructor ({ message, warn }) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.warn = warn;
  }
};