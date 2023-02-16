import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { PlacesService } from '../services/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';

@Controller('tours')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get('/places')
  async findAll() {
    try {
      return await this.placesService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/places')
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      return await this.placesService.create(createPlaceDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
