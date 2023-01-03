import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { DeleteListService } from '@/services/list';

const deleteListBody = z.object({
  id: z
    .string({
      required_error: 'List ID is required',
    })
    .trim()
    .min(1, 'List ID is required'),
});

class DeleteListController {
  async handle(request: Request, response: Response) {
    const { id } = deleteListBody.parse(request.body);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new DeleteListService();

    await service.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteListController };
