export default class ApiError extends Error {
  constructor (name, description, statusCode) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
