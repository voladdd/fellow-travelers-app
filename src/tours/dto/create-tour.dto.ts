import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateTourDto {
  @IsString()
  description: string;

  @IsInt()
  @Min(1)
  @Max(5)
  maxPeopleCount: number;

  @IsString()
  transport: string;

  @IsInt()
  author_id: number;
}
