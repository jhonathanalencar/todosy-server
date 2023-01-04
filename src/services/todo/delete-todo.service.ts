import { NotFoundError } from '@/errors';
import { Todo } from '@/models';

interface DeleteTodoInput {
  id: string;
}

class DeleteTodoService {
  async execute(data: DeleteTodoInput) {
    const todo = await Todo.findById(data.id).exec();

    if (todo === null) {
      throw new NotFoundError('Todo not found');
    }

    await todo.deleteOne();
  }
}

export { DeleteTodoService };
