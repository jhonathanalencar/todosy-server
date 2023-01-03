import { BadRequestError, NotFoundError } from '@/errors';
import { List } from '@/models';

interface DeleteListInput {
  id: string;
}

class DeleteListService {
  async execute(data: DeleteListInput) {
    const list = await List.findById(data.id).exec();

    if (list === null) {
      throw new NotFoundError('List not found');
    }

    if (list.todos.length > 0) {
      throw new BadRequestError('List has assigned todos');
    }

    await list.deleteOne();
  }
}

export { DeleteListService };
