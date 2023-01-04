import { Response, Request } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { MarkListAsCompletedService } from '@/services/list';

const markListAsCompletedBody = z.object({
  id: z
    .string({
      required_error: 'List ID is required',
    })
    .trim()
    .min(1, 'List ID is required'),
});

class MarkListAsCompletedController {
  async handle(request: Request, response: Response) {
    const { id } = markListAsCompletedBody.parse(request.body);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new MarkListAsCompletedService();

    await service.execute({
      id,
    });

    return response.status(200).json({ message: 'List completed' });
  }
}

export { MarkListAsCompletedController };
