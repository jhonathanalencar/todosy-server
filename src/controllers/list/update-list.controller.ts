import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { UpdateListService } from '@/services/list';

const updateListBody = z.object({
  id: z
    .string({
      required_error: 'List ID is required',
    })
    .trim()
    .min(1, 'List ID is required'),
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title is required'),
});

class UpdateListController {
  async handle(request: Request, response: Response) {
    const { id, title } = updateListBody.parse(request.body);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new UpdateListService();

    const { updatedList } = await service.execute({
      id,
      title,
    });

    return response.status(201).json(updatedList);
  }
}

export { UpdateListController };
