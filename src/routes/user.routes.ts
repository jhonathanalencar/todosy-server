import express from 'express';

import {
  CreateUserController,
  DeleteUserController,
  UpdateUserController,
  UpgradeUserPlanController,
} from '@/controllers/user';
import { verifyJWT } from '@/middlewares';

const userRoutes = express.Router();

userRoutes.post('/', new CreateUserController().handle);

userRoutes.use(verifyJWT);

userRoutes.put('/:id', new UpdateUserController().handle);
userRoutes.delete('/:id', new DeleteUserController().handle);
userRoutes.patch('/:id', new UpgradeUserPlanController().handle);

export { userRoutes };
