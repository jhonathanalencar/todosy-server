import { NotFoundError } from '@/errors';
import { User } from '@/models';

interface UpgradeUserPlanInput {
  id: string;
}

class UpgradeUserPlanService {
  async execute(data: UpgradeUserPlanInput) {
    const user = await User.findById(data.id).exec();

    if (user === null) {
      throw new NotFoundError('User not found');
    }

    user.plan = 'pro';

    const updatedUser = await user.save();

    return { updatedUser };
  }
}

export { UpgradeUserPlanService };
