import { Router } from 'express';

import {
  CreateListController,
  UpdateListController,
  GetListsController,
} from '@/controllers/list';

const listRoutes = Router();

listRoutes.post('/', new CreateListController().handle);
listRoutes.put('/', new UpdateListController().handle);
listRoutes.get('/', new GetListsController().handle);

export { listRoutes };
