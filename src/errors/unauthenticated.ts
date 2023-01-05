import { CustomError } from './customError';

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export { UnauthenticatedError };
