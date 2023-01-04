import { Response, Request } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { UpdateTodoService } from '@/services/todo';

const updateTodoParams = z.object({
  id: z.string({
    required_error: 'Todo ID is required',
  }),
});

const updateTodoBody = z.object({
  task: z
    .string({
      required_error: 'Task is required',
    })
    .trim()
    .min(1, 'Task is required'),
});

class UpdateTodoController {
  async handle(request: Request, response: Response) {
    const { id } = updateTodoParams.parse(request.params);
    const { task } = updateTodoBody.parse(request.body);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new UpdateTodoService();

    const { updatedTodo } = await service.execute({
      id,
      task,
    });

    return response.status(201).json(updatedTodo);
  }
}

export { UpdateTodoController };
