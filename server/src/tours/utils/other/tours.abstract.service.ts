import { User } from 'src/users/schemas/user.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Tour, TourDocument } from '../../schemas/tour.schema';
import { UsersService } from 'src/users/users.service';
import { RoadsService } from 'src/tours/services/roads.service';
import { Road } from 'src/tours/schemas/road.schema';

export class ToursAbstractService {
  async findObjectById<Type extends UsersService | RoadsService>(
    object: Type,
    id: Types.ObjectId,
    errObjName: string,
  ): Promise<User>;
  async findObjectById(
    object: Model<TourDocument>,
    id: Types.ObjectId,
    errObjName: string,
  ): Promise<HydratedDocument<Tour>>;
  async findObjectById<Type extends UsersService | RoadsService>(
    object: Model<TourDocument> | Type,
    id: Types.ObjectId,
    errObjName = 'Object',
  ): Promise<User | Road | HydratedDocument<Tour>> {
    const obj = await object.findById(id);
    if (!obj) {
      throw new Error(`${errObjName} is not founded`);
    }
    return obj;
  }

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
}
