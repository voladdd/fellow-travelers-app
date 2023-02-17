import { StatusController } from './controllers/status.controller';
import { PlacesController } from './controllers/places.contoller';
import { Module } from '@nestjs/common';
import { ToursService } from './services/tours.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './schemas/tour.schema';
import { ToursController } from './controllers/tours.controller';
import { Road, RoadSchema } from './schemas/road.schema';
import { Transport, TransportSchema } from './schemas/transport.schema';
import { Place, PlaceSchema } from './schemas/place.schema';
import { Status, StatusSchema } from './schemas/status.schema';
import { DbCollectionsService } from './services/db-collections.service';
import { TransportsService } from './services/transports.service';
import { StatusService } from './services/status.service';
import { PlacesService } from './services/places.service';
import { RoadsService } from './services/roads.service';
import { DbCollectionsController } from './controllers/db-collections.controller';
import { TransportsController } from './controllers/transports.controller';
import { RoadsController } from './controllers/roads.controller';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Road.name, schema: RoadSchema },
      { name: Transport.name, schema: TransportSchema },
      { name: Place.name, schema: PlaceSchema },
      { name: Status.name, schema: StatusSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UsersService,
    ToursService,
    DbCollectionsService,
    TransportsService,
    StatusService,
    PlacesService,
    RoadsService,
  ],
  //Need to specify controllers from longest paths to shortest
  controllers: [
    DbCollectionsController,
    TransportsController,
    PlacesController,
    StatusController,
    RoadsController,
    ToursController,
  ],
})
export class ToursModule {}
