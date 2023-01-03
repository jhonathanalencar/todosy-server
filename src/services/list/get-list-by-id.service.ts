import { NotFoundError } from '@/errors';
import { List } from '@/models';

interface GetListByIdInput {
  id: string;
}

class GetListByIdService {
  async execute(data: GetListByIdInput) {
    const list = await List.findById(data.id).lean().exec();

    if (list === null) {
      throw new NotFoundError('List not found');
    }

    return { list };
  }
}

export { GetListByIdService };
