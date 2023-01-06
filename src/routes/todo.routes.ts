import { Router } from 'express';

import { verifyJWT } from '@/middlewares';

import {
  CreateTodoController,
  DeleteTodoController,
  GetTodosByListController,
  MarkTodoAsDoneController,
  UpdateTodoController,
} from '@/controllers/todo';

const todoRoutes = Router();

todoRoutes.use(verifyJWT);

todoRoutes.post('/', new CreateTodoController().handle);
todoRoutes.get('/', new GetTodosByListController().handle);

todoRoutes.put('/:id', new UpdateTodoController().handle);
todoRoutes.delete('/:id', new DeleteTodoController().handle);
todoRoutes.patch('/:id', new MarkTodoAsDoneController().handle);

export { todoRoutes };
