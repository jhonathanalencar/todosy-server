import express from 'express';

import { CreateUserController, UpdateUserController } from '@/controllers/user';

const userRoutes = express.Router();

userRoutes.post('/users', new CreateUserController().handle);

userRoutes.put('/users/:id', new UpdateUserController().handle);

export { userRoutes };
