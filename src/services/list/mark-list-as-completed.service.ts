import { NotFoundError } from '@/errors';
import { List } from '@/models';

interface MarkListAsCompletedInput {
  id: string;
}

class MarkListAsCompletedService {
  async execute(data: MarkListAsCompletedInput) {
    const list = await List.findById(data.id).exec();

    if (list === null) {
      throw new NotFoundError('List not found');
    }

    list.completed = new Date();

    await list.save();
  }
}

export { MarkListAsCompletedService };
