import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { toMongoObjectId } from '../../utils/transformation/toMongoObjectId';
import { Types } from 'mongoose';

export class CreateTourDto {
  @IsInt()
  @Min(1)
  @Max(5)
  maxPeopleCount: number;

  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  author: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  road: Types.ObjectId;
}
