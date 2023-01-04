import { Router } from 'express';

import { userRoutes } from './user.routes';
import { listRoutes } from './list.routes';
import { todoRoutes } from './todo.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/todos', todoRoutes);

export { router };
