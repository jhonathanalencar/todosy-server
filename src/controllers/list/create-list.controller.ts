import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { CreateListService } from '@/services/list';

const createListBody = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, 'Title is required'),
  userId: z
    .string({
      required_error: 'User ID is required',
    })
    .trim()
    .min(1, 'User ID is required'),
});

class CreateListController {
  async handle(request: Request, response: Response) {
    const { title, userId } = createListBody.parse(request.body);

    if (!isValidObjectId(userId)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new CreateListService();

    const { list } = await service.execute({
      title,
      userId,
    });

    return response.status(201).json(list);
  }
}

export { CreateListController };
