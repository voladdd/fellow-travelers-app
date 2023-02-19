import { IsString } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}
