import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
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
