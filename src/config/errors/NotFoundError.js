import ApiError from './ApiError.js';
import httpStatus from '../../lib/httpStatusCodes.js';

export default class NotFoundError extends ApiError {
  constructor (
    description,
    statusCode = httpStatus.NOT_FOUND,
    name = 'Not Found Error'
  ) {
    super(name, description, statusCode);
  }
}
