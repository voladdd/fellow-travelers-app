import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { DbCollectionsService } from '../services/db-collections.service';

@Controller('tours')
export class DbCollectionsController {
  constructor(private dbCollectionsService: DbCollectionsService) {}

  @Post('/admin/db')
  async fillCollections() {
    try {
      await this.dbCollectionsService.fillSampleData();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/admin/db')
  async dropCollections() {
    try {
      await this.dbCollectionsService.dropAllData();
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
