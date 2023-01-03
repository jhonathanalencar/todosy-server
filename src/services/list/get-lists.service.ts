import { List } from '@/models';

interface GetListsInput {
  userId: string;
}

class GetListsService {
  async execute(data: GetListsInput) {
    const lists = await List.find({ createdBy: data.userId }).lean().exec();

    return { lists };
  }
}

export { GetListsService };
