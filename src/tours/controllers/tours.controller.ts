import { Schema } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';
import { JoinTourDto } from '../dto/join-tour.dto';
import { ToursService } from '../services/tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { toMongoObjectIdPipe } from '../utils/pipes/toMongoObjectId.pipe';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Post()
  async create(@Body() createTourDto: CreateTourDto) {
    try {
      return await this.toursService.create(createTourDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: new Error(error),
      });
    }
  }

  @Post(':id/join')
  async join(
    @Param('id', toMongoObjectIdPipe) id: any,
    @Body() joinTourDto: JoinTourDto,
  ) {
    try {
      return await this.toursService.joinTour(id, joinTourDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/leave')
  async leave(
    @Param('id', toMongoObjectIdPipe) id: any,
    @Body() joinTourDto: JoinTourDto,
  ) {
    try {
      return await this.toursService.leaveTour(id, joinTourDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOneById(@Param('id', toMongoObjectIdPipe) id: any) {
    try {
      return await this.toursService.findOneById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
