import { QueryGetProfileToursDto } from './dto/query-get-profile-tours.dto';
import { toMongoObjectIdPipe } from './../tours/utils/pipes/toMongoObjectId.pipe';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../utils/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  //users/profile/tours&status=...&sort_by=
  //users/profile/tours&status=
  //users/profile/tours
  @Get('profile/tours')
  async getProfileTours(
    @User('userId', toMongoObjectIdPipe) userId: any,
    @Query() query?: QueryGetProfileToursDto,
  ) {
    try {
      //need to get tours by specified query
      console.log(query);
      return await this.usersService.getProfileTours(userId, query);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  //users/profile
  @Get('profile')
  async getUserProfile(@User('userId', toMongoObjectIdPipe) userId: any) {
    try {
      return await this.usersService.getProfile(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  //users/:id
  @Get(':id')
  async findOne(@Param('id', toMongoObjectIdPipe) id: any) {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  //users
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
