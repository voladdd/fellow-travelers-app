import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  _id: number;

  @IsString()
  name: string;

  @IsString()
  firstName: string;
}
