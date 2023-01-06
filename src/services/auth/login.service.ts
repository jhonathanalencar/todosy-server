import jwt, { Secret } from 'jsonwebtoken';
import config from 'config';

import { User } from '@/models';
import { UnauthenticatedError } from '@/errors';

interface LoginInput {
  email: string;
  password: string;
}

class LoginService {
  async execute(data: LoginInput) {
    const user = await User.findOne({ email: data.email }).exec();

    if (user === null || !user.enabled) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const match = user.comparePassword(data.password);

    if (!match) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: user.name,
          plan: user.plan,
          email: user.email,
        },
      },
      config.get<Secret>('accessTokenSecret'),
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      config.get<Secret>('refreshTokenSecret'),
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }
}

export { LoginService };
