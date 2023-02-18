import mongoose, { Types, ObjectId } from 'mongoose';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class toMongoObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
    const validObjectId = Types.ObjectId.isValid(value);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    const _id = new Types.ObjectId(value);

    return _id;
  }
}
