import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { UpdateUserService } from '@/services/user';
import { BadRequestError } from '@/errors';

const updateUserParams = z.object({
  id: z.string({
    required_error: 'User ID is required',
  }),
});

const updateUserBody = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name is required')
      .trim(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email')
      .trim(),
    password: z
      .string()
      .trim()
      .min(6, {
        message: 'Password must be at least 6 characters long',
      })
      .nullish(),
    passwordConfirmation: z.string().trim().nullish(),
    enabled: z.boolean({
      required_error: 'User status is required',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = updateUserParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid object ID');
    }

    const { name, email, password, enabled } = updateUserBody.parse(
      request.body
    );

    const service = new UpdateUserService();

    const { updatedUser } = await service.execute({
      id,
      name,
      email,
      password,
      enabled,
    });

    const {
      comparePassword,
      password: userPassword,
      ...userWithoutPassword
    } = Object.assign({}, updatedUser.toObject());

    return response.status(201).json(userWithoutPassword);
  }
}

export { UpdateUserController };
