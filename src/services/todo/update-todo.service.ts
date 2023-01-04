import { BadRequestError, NotFoundError } from '@/errors';
import { Todo } from '@/models';

interface UpdateTodoInput {
  id: string;
  task: string;
}

class UpdateTodoService {
  async execute(data: UpdateTodoInput) {
    const todo = await Todo.findById(data.id).exec();

    if (todo === null) {
      throw new NotFoundError('Todo not found');
    }

    const duplicatedTodo = await Todo.findOne({ task: data.task })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedTodo !== null && duplicatedTodo._id.toString() !== todo.id) {
      throw new BadRequestError('Duplicate task');
    }

    todo.task = data.task;

    const updatedTodo = await todo.save();

    return { updatedTodo };
  }
}

export { UpdateTodoService };
