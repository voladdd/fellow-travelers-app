import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { StatusService } from '../services/status.service';

@Controller('tours')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get('/status')
  async findAll() {
    try {
      return await this.statusService.findAll();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
