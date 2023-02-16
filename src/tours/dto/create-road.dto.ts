import { IsDateString, IsString } from 'class-validator';

export class CreateRoadDto {
  @IsString()
  placeRoadStart: string;

  @IsString()
  placeRoadEnd: string;

  @IsString()
  placeMeeting: string;

  @IsDateString()
  timeMeeting: Date;

  @IsDateString()
  timeStart: Date;

  @IsString()
  transport: string;
}
