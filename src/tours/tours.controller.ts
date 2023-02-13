import { CreateTourDto } from './dto/create-tour.dto';
import { ToursService } from './tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body, Delete } from '@nestjs/common/decorators';

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
  async findAllTours() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Post('/admin/db')
  async fillCollections() {
    try {
      await this.toursService.fillCollections();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Delete('/admin/db')
  async dropCollections() {
    try {
      await this.toursService.dropCollections();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
