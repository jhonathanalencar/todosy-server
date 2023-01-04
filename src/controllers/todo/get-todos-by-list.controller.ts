import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { GetTodosByListService } from '@/services/todo';

const getTodosByListBody = z.object({
  listId: z
    .string({
      required_error: 'List ID is required',
    })
    .trim()
    .min(1, 'List ID is required'),
});

class GetTodosByListController {
  async handle(request: Request, response: Response) {
    const { listId } = getTodosByListBody.parse(request.body);

    if (!isValidObjectId(listId)) {
      throw new BadRequestError('List ID is not a valid Object ID');
    }

    const service = new GetTodosByListService();

    const { todos } = await service.execute({
      listId,
    });

    return response.status(200).json(todos);
  }
}

export { GetTodosByListController };
