import bcrypt from 'bcrypt';

import { BadRequestError, NotFoundError } from '@/errors';
import { User } from '@/models';

interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
  password?: string | null;
  enabled: boolean;
}

class UpdateUserService {
  async execute(data: UpdateUserInput) {
    const user = await User.findById(data.id).exec();

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    const duplicatedUser = await User.findOne({ email: data.email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicatedUser !== null && duplicatedUser._id.toString() !== user.id) {
      throw new BadRequestError('User with that email already exists');
    }

    user.name = data.name;
    user.email = data.email;
    user.enabled = data.enabled;

    if (data.password !== null && data.password !== undefined) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    return { updatedUser };
  }
}

export { UpdateUserService };
