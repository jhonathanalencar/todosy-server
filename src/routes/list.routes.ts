import { Router } from 'express';

import { CreateListController } from '@/controllers/list';

const listRoutes = Router();

listRoutes.post('/', new CreateListController().handle);

export { listRoutes };
