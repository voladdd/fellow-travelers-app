import { RoadsService } from '../services/roads.service';
import { Controller, Get, HttpException, Post } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { CreateRoadDto } from '../dto/create-road.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tours')
export class RoadsController {
  constructor(private roadsService: RoadsService) {}

  @Get('/roads')
  async findAll() {
    try {
      return await this.roadsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/roads')
  async create(@Body() createRoadDto: CreateRoadDto) {
    try {
      return await this.roadsService.create(createRoadDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
