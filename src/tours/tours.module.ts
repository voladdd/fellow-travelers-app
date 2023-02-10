import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './schemas/tour.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
  ],
  providers: [ToursService],
  exports: [ToursService],
  controllers: [],
})
export class ToursModule {}
