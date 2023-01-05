import { Response, Request } from 'express';
import { z } from 'zod';

import { LoginService } from '@/services/auth';

const loginBody = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .min(1, 'Email is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(1, 'Password is required'),
});

class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = loginBody.parse(request.body);

    const service = new LoginService();

    const { accessToken, refreshToken } = await service.execute({
      email,
      password,
    });

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return response.status(200).json({ accessToken });
  }
}

export { LoginController };
