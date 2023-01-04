import { NotFoundError } from '@/errors';
import { List, Todo } from '@/models';

interface GetTodosByListInput {
  listId: string;
}

class GetTodosByListService {
  async execute(data: GetTodosByListInput) {
    const list = await List.findById(data.listId).lean().exec();

    if (list === null) {
      throw new NotFoundError('List not found');
    }

    const todos = await Todo.find({ createdOn: list._id }).lean().exec();

    return { todos };
  }
}

export { GetTodosByListService };
