import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tours')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get('/status')
  async findAll() {
    try {
      return await this.statusService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
