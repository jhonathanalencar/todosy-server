import { Router } from 'express';

import { LoginController } from '@/controllers/auth';

const authRoutes = Router();

authRoutes.post('/', new LoginController().handle);

export { authRoutes };
