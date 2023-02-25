import { Controller, HttpException, Post } from '@nestjs/common';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { DbCollectionsService } from '../services/db-collections.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tours')
export class DbCollectionsController {
  constructor(private dbCollectionsService: DbCollectionsService) {}

  @Post('/admin/db')
  async fillCollections() {
    try {
      await this.dbCollectionsService.fillSampleData();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/admin/db')
  async dropCollections() {
    try {
      await this.dbCollectionsService.dropAllData();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
