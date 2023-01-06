import jwt, { Secret } from 'jsonwebtoken';
import config from 'config';

import { UnauthenticatedError } from '@/errors';
import { User } from '@/models';

interface RefreshInput {
  email: string;
}

class RefreshService {
  async execute(data: RefreshInput) {
    const user = await User.findOne({ email: data.email }).lean().exec();

    if (user === null) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          name: user.name,
          email: user.email,
          plan: user.plan,
        },
      },
      config.get<Secret>('accessTokenSecret'),
      {
        expiresIn: '15m',
      }
    );

    return { accessToken };
  }
}

export { RefreshService };
