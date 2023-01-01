import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateUserService } from '@/services/user';

const createUserBody = z
  .object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z
      .string({
        required_error: 'Password required',
      })
      .min(6, 'Password must be at least 6 characters long'),
    passwordConfirmation: z.string({
      required_error: 'Password confirmation required',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = createUserBody.parse(request.body);

    const service = new CreateUserService();

    const { user } = await service.execute({
      name,
      email,
      password,
    });

    const {
      password: userPassword,
      comparePassword,
      ...userWithoutPassword
    } = Object.assign({}, user.toObject());

    return response.status(201).json(userWithoutPassword);
  }
}

export { CreateUserController };
