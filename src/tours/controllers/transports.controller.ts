import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { TransportsService } from '../services/transports.service';

@Controller('tours')
export class TransportsController {
  constructor(private transportsService: TransportsService) {}

  @Get('/transports')
  async findAll() {
    try {
      return await this.transportsService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
