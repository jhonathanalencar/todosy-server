import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { MarkTodoAsDoneService } from '@/services/todo';

const markTodoAsDoneParams = z.object({
  id: z.string({
    required_error: 'Todo ID is required',
  }),
});

class MarkTodoAsDoneController {
  async handle(request: Request, response: Response) {
    const { id } = markTodoAsDoneParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('Todo ID is not a valid Object ID');
    }

    const service = new MarkTodoAsDoneService();

    await service.execute({
      id,
    });

    return response.status(200).json({ message: 'Todo completed' });
  }
}

export { MarkTodoAsDoneController };
