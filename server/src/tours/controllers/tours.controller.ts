import { JoinTourDto } from './../dto/join-tour.dto';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { CreateTourDto } from '../dto/create-tour.dto';
import { ToursService } from '../services/tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body, Param, UseGuards, Request } from '@nestjs/common/decorators';
import { toMongoObjectIdPipe } from '../utils/pipes/toMongoObjectId.pipe';

//using guard to provide valid auth data about user via bearer, who sended this request
@UseGuards(JwtAuthGuard)
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
  async join(@Request() req: any, @Param('id', toMongoObjectIdPipe) id: any) {
    try {
      const { user }: { user: JoinTourDto } = req;
      return await this.toursService.joinTour(id, user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/leave')
  async leave(@Request() req, @Param('id', toMongoObjectIdPipe) id: any) {
    try {
      return await this.toursService.leaveTour(id, req.user);
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
