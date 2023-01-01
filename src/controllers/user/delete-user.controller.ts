import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { DeleteUserService } from '@/services/user';

const deleteUserParams = z.object({
  id: z.string({
    required_error: 'User ID is required',
  }),
});

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = deleteUserParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid object ID');
    }

    const service = new DeleteUserService();

    await service.execute({
      id,
    });

    return response.sendStatus(204);
  }
}

export { DeleteUserController };
