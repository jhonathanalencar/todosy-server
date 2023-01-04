import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { mongo } from 'mongoose';

import { logEvents } from '@/utils';

interface CustomError extends Error {
  statusCode?: number;
}

function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  let customError = {
    name: error.name ?? 'Error',
    statusCode: error.statusCode ?? 500,
    message: error.message ?? 'Something went wrong try again later',
  };

  if (error instanceof ZodError) {
    const path = error.errors[0].path[0];

    customError = {
      name: `${error.errors[0].code}[${path}]`,
      message: error.errors[0].message,
      statusCode: 400,
    };
  }

  if (error instanceof mongo.MongoError) {
    if (error.code === 11000) {
      customError = {
        name: error.name,
        message: error.message,
        statusCode: 409,
      };
    }
  }

  logEvents(
    `${customError.name}: ${customError.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
    'errorLog.log'
  );

  response.status(customError.statusCode).json({ error: customError.message });

  next();
}

export { errorHandler };
