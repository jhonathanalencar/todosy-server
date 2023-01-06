import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import config from 'config';

import { UnauthenticatedError, UnauthorizedError } from '@/errors';

interface JwtPayload {
  userInfo: {
    name: string;
    email: string;
    plan: 'free' | 'pro';
  };
}

function verifyJWT(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (authHeader === undefined) {
    throw new UnauthenticatedError('Unauthorized');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    config.get<Secret>('accessTokenSecret'),
    async (err, decoded) => {
      if (err !== null) {
        throw new UnauthorizedError('Forbidden');
      }

      request.user = (decoded as JwtPayload).userInfo;

      next();
    }
  );
}

export { verifyJWT };
