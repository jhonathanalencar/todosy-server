import { NotFoundError } from '@/errors';
import { User } from '@/models';

interface DeleteUserInput {
  id: string;
}

class DeleteUserService {
  async execute(data: DeleteUserInput) {
    const user = await User.findById(data.id).exec();

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    const deletedUser = await user.deleteOne();

    return { deletedUser };
  }
}

export { DeleteUserService };
