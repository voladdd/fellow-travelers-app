import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Types, Date } from 'mongoose';
import { toMongoObjectId } from '../../utils/transformation/toMongoObjectId';
import { toDate } from '../../utils/transformation/toDate';
import { Equals } from 'class-validator';
import { IsEnum } from 'class-validator';

enum sortDateBy {
  asc = 'asc',
  desc = 'desc',
}

export class QueryGetProfileToursDto {
  @IsOptional()
  @Type(() => Types.ObjectId)
  @Transform(toMongoObjectId)
  status: Types.ObjectId;

  @IsOptional()
  @IsEnum(sortDateBy)
  sort: sortDateBy;
}
