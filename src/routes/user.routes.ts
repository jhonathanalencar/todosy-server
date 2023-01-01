import express from 'express';

import {
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
  UpgradeUserPlanController,
} from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);

userRoutes.put('/users/:id', new UpdateUserController().handle);
userRoutes.delete('/users/:id', new DeleteUserController().handle);
userRoutes.patch('/users/:id', new UpgradeUserPlanController().handle);

export { userRoutes };
