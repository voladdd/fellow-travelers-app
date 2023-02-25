import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { toMongoObjectId } from '../../utils/transformation/toMongoObjectId';

export class UpdateStatusDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  status: Types.ObjectId;
}
