import { RoadsService } from '../services/roads.service';
import { CreateTourDto } from '../dto/create-tour.dto';
import { ToursService } from '../services/tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Post()
  async create(@Body() createTourDto: CreateTourDto) {
    try {
      await this.toursService.create(createTourDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    try {
      return await this.toursService.findOneById(id);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
