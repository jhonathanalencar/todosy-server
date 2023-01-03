import { Router } from 'express';

import {
  CreateListController,
  UpdateListController,
  GetListsController,
  GetListByIdController,
} from '@/controllers/list';

const listRoutes = Router();

listRoutes.post('/', new CreateListController().handle);
listRoutes.put('/', new UpdateListController().handle);
listRoutes.get('/', new GetListsController().handle);

listRoutes.get('/:id', new GetListByIdController().handle);

export { listRoutes };
