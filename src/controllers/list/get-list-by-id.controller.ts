import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { GetListByIdService } from '@/services/list';

const getListByIdParams = z.object({
  id: z.string({
    required_error: 'List ID is required',
  }),
});

class GetListByIdController {
  async handle(request: Request, response: Response) {
    const { id } = getListByIdParams.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid Object ID');
    }

    const service = new GetListByIdService();

    const { list } = await service.execute({
      id,
    });

    return response.status(200).json(list);
  }
}

export { GetListByIdController };
