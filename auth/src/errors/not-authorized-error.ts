import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
  // 401 -> not authorized
  statusCode = 401;

  constructor() {
    super('Not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}

export { NotAuthorizedError };