import { User } from '../../models/user.model';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute(data: CreateUserInput) {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser !== null) {
      throw new Error('User with that email already exists');
    }

    const user = await User.create(data);

    return { user };
  }
}

export { CreateUserService };
