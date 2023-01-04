import { Router } from 'express';

import {
  CreateTodoController,
  DeleteTodoController,
  GetTodosByListController,
  UpdateTodoController,
} from '@/controllers/todo';

const todoRoutes = Router();

todoRoutes.post('/', new CreateTodoController().handle);
todoRoutes.get('/', new GetTodosByListController().handle);

todoRoutes.put('/:id', new UpdateTodoController().handle);
todoRoutes.delete('/:id', new DeleteTodoController().handle);

export { todoRoutes };
