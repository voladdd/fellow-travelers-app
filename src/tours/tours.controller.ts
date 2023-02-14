import { TransportsService } from './services/transports.service';
import { DbCollectionsService } from './services/db-collections.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { ToursService } from './services/tours.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Body, Delete } from '@nestjs/common/decorators';

@Controller('tours')
export class ToursController {
  constructor(
    private toursService: ToursService,
    private dbCollectionsService: DbCollectionsService,
    private transportsService: TransportsService,
  ) {}

  @Post()
  async createTour(@Body() createTourDto: CreateTourDto) {
    try {
      await this.toursService.create(createTourDto);
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  //Get requests
  @Get()
  async toursfindAll() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Get('/transports')
  async transportsfindAll() {
    try {
      return await this.transportsService.findAll();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  // @Get('/places')
  // async findAllPlaces() {
  //   try {
  //     return await this.toursService.findAllPlaces();
  //   } catch (error) {
  //     throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
  //       cause: error,
  //     });
  //   }
  // }

  // @Get('/status')
  // async findAllStatus() {
  //   try {
  //     return await this.toursService.findAllStatus();
  //   } catch (error) {
  //     throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
  //       cause: error,
  //     });
  //   }
  // }

  // @Get('/status')
  // async findTourById() {
  //   try {
  //     return await this.toursService.findAllStatus();
  //   } catch (error) {
  //     throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
  //       cause: error,
  //     });
  //   }
  // }

  @Post('/admin/db')
  async fillCollections() {
    try {
      await this.dbCollectionsService.fillSampleData();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  @Delete('/admin/db')
  async dropCollections() {
    try {
      await this.dbCollectionsService.dropAllData();
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }
}
