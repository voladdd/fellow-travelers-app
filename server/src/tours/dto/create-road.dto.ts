import { Transform } from 'class-transformer';
import { IsString, MinDate } from 'class-validator';

export class CreateRoadDto {
  @IsString()
  placeRoadStart: string;

  @IsString()
  placeRoadEnd: string;

  @IsString()
  placeMeeting: string;

  @Transform(({ value }) => new Date(value))
  @MinDate(() => new Date())
  timeMeeting: Date;

  @Transform(({ value }) => new Date(value))
  @MinDate(() => new Date())
  timeStart: Date;

  @IsString()
  transport: string;
}
