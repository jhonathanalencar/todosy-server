import { NotFoundError } from '@/errors';
import { Todo } from '@/models';

interface MarkTodoAsDoneInput {
  id: string;
}

class MarkTodoAsDoneService {
  async execute(data: MarkTodoAsDoneInput) {
    const todo = await Todo.findById(data.id).exec();

    if (todo === null) {
      throw new NotFoundError('Todo not found');
    }

    todo.completed = new Date();

    await todo.save();
  }
}

export { MarkTodoAsDoneService };
