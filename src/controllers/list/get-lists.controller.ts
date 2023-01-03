import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { GetListsService } from '@/services/list';

const getListsBody = z.object({
  userId: z
    .string({
      required_error: 'User ID is required',
    })
    .trim()
    .min(1, 'User ID is required'),
});

class GetListsController {
  async handle(request: Request, response: Response) {
    const { userId } = getListsBody.parse(request.body);

    if (!isValidObjectId(userId)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new GetListsService();

    const { lists } = await service.execute({
      userId,
    });

    return response.status(200).json(lists);
  }
}

export { GetListsController };
