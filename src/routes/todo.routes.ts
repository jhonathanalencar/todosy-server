import { Router } from 'express';

import { CreateTodoController } from '@/controllers/todo';

const todoRoutes = Router();

todoRoutes.post('/', new CreateTodoController().handle);

export { todoRoutes };
