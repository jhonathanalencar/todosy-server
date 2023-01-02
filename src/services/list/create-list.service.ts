import { BadRequestError } from '@/errors';
import { List } from '@/models';

interface CreateListInput {
  title: string;
  userId: string;
}

class CreateListService {
  async execute(data: CreateListInput) {
    const duplicatedList = await List.findOne({ title: data.title })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedList !== null) {
      throw new BadRequestError('Duplicate list title');
    }

    const list = await List.create({
      title: data.title,
      createdBy: data.userId,
    });

    return { list };
  }
}

export { CreateListService };
