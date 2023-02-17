import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateTourDto {
  @IsInt()
  @Min(1)
  @Max(5)
  maxPeopleCount: number;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  road: string;
}
