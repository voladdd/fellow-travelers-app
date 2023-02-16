import { RoadsService } from '../services/roads.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateRoadDto } from '../dto/create-road.dto';

@Controller('tours')
export class RoadsController {
  constructor(private roadsService: RoadsService) {}

  @Get('/roads')
  async findAll() {
    try {
      return await this.roadsService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/roads')
  async create(@Body() createRoadDto: CreateRoadDto) {
    try {
      return await this.roadsService.create(createRoadDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
