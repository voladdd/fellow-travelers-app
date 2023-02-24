import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Types } from 'mongoose';
import { toMongoObjectId } from '../../utils/transformation/toMongoObjectId';
import { IsEnum } from 'class-validator';

export enum sortDateBy {
  asc = 1,
  desc = -1,
}

export class QueryGetProfileToursDto {
  @IsOptional()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  status?: Types.ObjectId;

  @IsOptional()
  @IsEnum(sortDateBy)
  sort?: sortDateBy;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;
}
