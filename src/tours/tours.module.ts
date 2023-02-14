import { Module } from '@nestjs/common';
import { ToursService } from './services/tours.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './schemas/tour.schema';
import { ToursController } from './tours.controller';
import { Road, RoadSchema } from './schemas/road.schema';
import { Transport, TransportSchema } from './schemas/transport.schema';
import { Place, PlaceSchema } from './schemas/place.schema';
import { Status, StatusSchema } from './schemas/status.schema';
import { DbCollectionsService } from './services/db-collections.service';
import { TransportsService } from './services/transports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Road.name, schema: RoadSchema },
      { name: Transport.name, schema: TransportSchema },
      { name: Place.name, schema: PlaceSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  providers: [ToursService, DbCollectionsService, TransportsService],
  controllers: [ToursController],
})
export class ToursModule {}
