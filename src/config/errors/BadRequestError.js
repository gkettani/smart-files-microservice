import ApiError from './ApiError.js';
import httpStatus from '../../lib/httpStatusCodes.js';

export default class BadRequestError extends ApiError {
  constructor (
    description,
    statusCode = httpStatus.BAD_REQUEST,
    name = 'Bad Request Error'
  ) {
    super(name, description, statusCode);
  }
}
