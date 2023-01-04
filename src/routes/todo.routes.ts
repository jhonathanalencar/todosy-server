import { Router } from 'express';

import {
  CreateTodoController,
  GetTodosByListController,
} from '@/controllers/todo';

const todoRoutes = Router();

todoRoutes.post('/', new CreateTodoController().handle);
todoRoutes.get('/', new GetTodosByListController().handle);

export { todoRoutes };
