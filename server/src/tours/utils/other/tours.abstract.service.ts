import { HydratedDocument, Types } from 'mongoose';
import { Tour } from '../../schemas/tour.schema';
import { ForbiddenException } from '@nestjs/common';

// check/is methods should initially throw exceptions, others optionally

export class ToursAbstractService {
  //if user in tour
  async getUserIndex(
    tour: HydratedDocument<Tour>,
    userId: Types.ObjectId,
  ): Promise<number | null> {
    let userIndex: number;
    if (
      !tour.participants.some((user, index) => {
        userIndex = index;
        return user._id.equals(userId);
      })
    ) {
      return null;
    }
    return userIndex;
  }

  //check if user is author of tour
  async isAuthor(
    tour: HydratedDocument<Tour>,
    userId: Types.ObjectId,
  ): Promise<void | Error> {
    if (!tour.author._id.equals(userId)) {
      throw new ForbiddenException('Author only');
    }
  }
}
