import { Road, RoadSchema } from './../tours/schemas/road.schema';
import { RoadsService } from 'src/tours/services/roads.service';
import { Tour, TourSchema } from './../tours/schemas/tour.schema';
import { ToursAbstractService } from './../tours/utils/other/tours.abstract.service';
import { ToursModule } from './../tours/tours.module';
import { ToursService } from './../tours/services/tours.service';
import { UsersController } from './users.controller';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tour.name, schema: TourSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
