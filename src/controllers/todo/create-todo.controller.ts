import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { CreateTodoService } from '@/services/todo';

const createTodoBody = z.object({
  task: z
    .string({
      required_error: 'Task is required',
    })
    .trim()
    .min(1, 'Task is required'),
  userId: z
    .string({
      required_error: 'User ID is required',
    })
    .trim()
    .min(1, 'User ID is required'),
  listId: z
    .string({
      required_error: 'List ID is required',
    })
    .trim()
    .min(1, 'List ID is required'),
});

class CreateTodoController {
  async handle(request: Request, response: Response) {
    const { task, userId, listId } = createTodoBody.parse(request.body);

    if (!isValidObjectId(userId) || !isValidObjectId(listId)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new CreateTodoService();

    const { todo } = await service.execute({
      task,
      userId,
      listId,
    });

    return response.status(201).json(todo);
  }
}

export { CreateTodoController };
