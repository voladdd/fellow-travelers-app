import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransportsService } from '../services/transports.service';
import { CreateTransportDto } from '../dto/create-transport.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tours')
export class TransportsController {
  constructor(private transportsService: TransportsService) {}

  @Get('/transports')
  async findAll() {
    try {
      return await this.transportsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/transports')
  async create(@Body() createTransportDto: CreateTransportDto) {
    try {
      return await this.transportsService.create(createTransportDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
