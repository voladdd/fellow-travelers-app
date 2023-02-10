import { CreateTourDto } from './dto/create-tour.dto';
import { ToursService } from './tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}
  @Post()
  async createTour(@Body() createTourDto: CreateTourDto) {
    try {
      await this.toursService.create(createTourDto);
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
