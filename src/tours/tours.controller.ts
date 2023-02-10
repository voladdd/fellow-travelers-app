import { ToursService } from './tours.service';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}
  @Post()
  async createTour(@Req() request: Request) {
    await this.toursService.create(request.body);
  }

  @Get()
  async findAll() {
    return await this.toursService.findAll();
  }
}
