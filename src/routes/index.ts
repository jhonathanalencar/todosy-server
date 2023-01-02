import { Router } from 'express';

import { userRoutes } from './user.routes';
import { listRoutes } from './list.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/list', listRoutes);

export { router };
