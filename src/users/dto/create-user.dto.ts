import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  tgId: number;

  @IsString()
  name: string;

  @IsString()
  firstName: string;
}
