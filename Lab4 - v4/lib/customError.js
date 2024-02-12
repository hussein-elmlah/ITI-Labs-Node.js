class CustomError extends Error {
  constructor(message, status, context) {
    super(message);
    this.status = status;
    this.context = context;
  }
}

module.exports = CustomError;