import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import config from 'config';

import { UnauthenticatedError, UnauthorizedError } from '@/errors';
import { RefreshService } from '@/services/auth';

interface JWTPayload {
  email: string;
}

class RefreshController {
  async handle(request: Request, response: Response) {
    const cookies = request.cookies;

    if (cookies?.jwt === undefined) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const refreshToken = cookies.jwt as string;

    const service = new RefreshService();

    jwt.verify(
      refreshToken,
      config.get<Secret>('refreshTokenSecret'),
      async (err, decoded) => {
        if (err !== null) {
          throw new UnauthorizedError('Forbidden');
        }

        const { accessToken } = await service.execute({
          email: (decoded as JWTPayload).email,
        });

        return response.status(200).json({ accessToken });
      }
    );
  }
}

export { RefreshController };
