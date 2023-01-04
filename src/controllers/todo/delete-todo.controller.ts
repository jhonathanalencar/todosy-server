import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { DeleteTodoService } from '@/services/todo';

const deleteTodoParams = z.object({
  id: z.string({
    required_error: 'Todo ID is required',
  }),
});

class DeleteTodoController {
  async handle(request: Request, response: Response) {
    const { id } = deleteTodoParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('Todo ID is not a valid Object ID');
    }

    const service = new DeleteTodoService();

    await service.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteTodoController };
