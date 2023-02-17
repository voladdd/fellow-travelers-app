import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TransportsService } from '../services/transports.service';
import { CreateTransportDto } from '../dto/create-transport.dto';

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

  @Post('/transports')
  async create(@Body() createTransportDto: CreateTransportDto) {
    try {
      return await this.transportsService.create(createTransportDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
