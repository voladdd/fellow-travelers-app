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
import {
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common/decorators';
import { toMongoObjectIdPipe } from '../utils/pipes/toMongoObjectId.pipe';
import { User } from '../../utils/user.decorator';
import { UpdateStatusDto } from '../dto/update-status.dto';

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

  @Patch(':id/status')
  async updateStatus(
    @User('userId', toMongoObjectIdPipe) userId: any,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    try {
      return await this.toursService.updateStatus(
        userId,
        updateStatusDto.tourId,
        updateStatusDto.status,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/join')
  async join(
    @User('userId', toMongoObjectIdPipe) userId: any,
    @Param('id', toMongoObjectIdPipe) id: any,
  ) {
    try {
      return await this.toursService.joinTour(id, userId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/leave')
  async leave(
    @User('userId', toMongoObjectIdPipe) userId: any,
    @Param('id', toMongoObjectIdPipe) id: any,
  ) {
    try {
      return await this.toursService.leaveTour(id, userId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/kick')
  async kick(
    @User('userId', toMongoObjectIdPipe) userId: any,
    @Param('id', toMongoObjectIdPipe) id: any,
    @Query('value', toMongoObjectIdPipe) value: any,
  ) {
    try {
      return await this.toursService.kickFromTour(id, userId, value);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id', toMongoObjectIdPipe) id: any) {
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
