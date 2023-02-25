import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { PlacesService } from '../services/places.service';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tours')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get('/places')
  async findAll() {
    try {
      return await this.placesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/places')
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      return await this.placesService.create(createPlaceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
