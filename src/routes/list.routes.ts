import { Router } from 'express';

import {
  CreateListController,
  UpdateListController,
  GetListsController,
  GetListByIdController,
  DeleteListController,
  MarkListAsCompletedController,
} from '@/controllers/list';

const listRoutes = Router();

listRoutes.post('/', new CreateListController().handle);
listRoutes.put('/', new UpdateListController().handle);
listRoutes.get('/', new GetListsController().handle);
listRoutes.delete('/', new DeleteListController().handle);
listRoutes.post('/completed', new MarkListAsCompletedController().handle);

listRoutes.get('/:id', new GetListByIdController().handle);

export { listRoutes };
