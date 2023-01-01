import { Request, Response } from 'express';
import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import { BadRequestError } from '@/errors';
import { UpgradeUserPlanService } from '@/services/user';

const upgradeUserPlanBody = z.object({
  id: z.string({
    required_error: 'User ID is required',
  }),
});

class UpgradeUserPlanController {
  async handle(request: Request, response: Response) {
    const { id } = upgradeUserPlanBody.parse(request.params);

    if (!isValidObjectId(id)) {
      throw new BadRequestError('ID is not a valid object ID');
    }

    const service = new UpgradeUserPlanService();

    const { updatedUser } = await service.execute({
      id,
    });

    const { comparePassword, password, ...userWithoutPassword } = Object.assign(
      {},
      updatedUser.toObject()
    );

    return response.status(201).json(userWithoutPassword);
  }
}

export { UpgradeUserPlanController };
