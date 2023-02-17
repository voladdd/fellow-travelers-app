import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTransportDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}
