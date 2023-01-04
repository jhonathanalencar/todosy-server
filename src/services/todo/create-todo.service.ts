import { Todo } from '@/models';

interface CreateTodoInput {
  task: string;
  userId: string;
  listId: string;
}

class CreateTodoService {
  async execute(data: CreateTodoInput) {
    const todo = await Todo.create({
      task: data.task,
      createdBy: data.userId,
      createdOn: data.listId,
    });

    return { todo };
  }
}

export { CreateTodoService };
