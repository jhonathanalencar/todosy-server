import { BadRequestError, NotFoundError } from '@/errors';
import { List } from '@/models';

interface UpdateListInput {
  id: string;
  title: string;
}

class UpdateListService {
  async execute(data: UpdateListInput) {
    const list = await List.findById(data.id).exec();

    if (list === null) {
      throw new NotFoundError('List not found');
    }

    const duplicatedList = await List.findOne({ title: data.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedList !== null && duplicatedList._id.toString() !== data.id) {
      throw new BadRequestError('Duplicated title');
    }

    list.title = data.title;

    const updatedList = await list.save();

    return { updatedList };
  }
}

export { UpdateListService };
