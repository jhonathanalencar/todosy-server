import { Router } from 'express';

import { userRoutes } from './user.routes';
import { listRoutes } from './list.routes';
import { todoRoutes } from './todo.routes';
import { authRoutes } from './auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/todos', todoRoutes);
router.use('/auth', authRoutes);

export { router };
