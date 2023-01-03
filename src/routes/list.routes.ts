import { Router } from 'express';

import { CreateListController, UpdateListController } from '@/controllers/list';

const listRoutes = Router();

listRoutes.post('/', new CreateListController().handle);
listRoutes.put('/', new UpdateListController().handle);

export { listRoutes };
