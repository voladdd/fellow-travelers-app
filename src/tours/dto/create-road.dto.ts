import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateRoadDto {
  @IsString()
  placeStart: string;

  @IsString()
  placeEnd: string;

  @IsInt()
  @Min(1)
  @Max(5)
  maxPeopleCount: number;

  @IsInt()
  author: number;
}
