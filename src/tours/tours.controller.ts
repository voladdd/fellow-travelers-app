import { RoadsService } from './services/roads.service';
import { StatusService } from './services/status.service';
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
import { Body, Delete, Param } from '@nestjs/common/decorators';
import { PlacesService } from './services/places.service';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('tours')
export class ToursController {
  constructor(
    private toursService: ToursService,
    private dbCollectionsService: DbCollectionsService,
    private transportsService: TransportsService,
    private statusService: StatusService,
    private placesService: PlacesService,
    private roadsService: RoadsService,
  ) {}

  @Post()
  async toursCreate(@Body() createTourDto: CreateTourDto) {
    try {
      await this.toursService.create(createTourDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async toursFindOneById(@Param('id') id: string) {
    try {
      return await this.toursService.findOneById(id);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async toursFindAll() {
    try {
      return await this.toursService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/transports')
  async transportsFindAll() {
    try {
      return await this.transportsService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/places')
  async placesFindAll() {
    try {
      return await this.placesService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/places')
  async placesCreate(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      return await this.placesService.create(createPlaceDto);
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/roads')
  async roadsFindAll() {
    try {
      return await this.roadsService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/status')
  async statusFindAll() {
    try {
      return await this.statusService.findAll();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/admin/db')
  async fillCollections() {
    try {
      await this.dbCollectionsService.fillSampleData();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/admin/db')
  async dropCollections() {
    try {
      await this.dbCollectionsService.dropAllData();
    } catch (error) {
      console.log(error._message);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
