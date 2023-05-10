import ApiError from './ApiError.js';
import httpStatus from '../../lib/httpStatusCodes.js';

export default class UnauthorizedError extends ApiError {
  constructor (
    description,
    statusCode = httpStatus.UNAUTHORIZED,
    name = 'Unauthorized Error'
  ) {
    super(name, description, statusCode);
  }
}
