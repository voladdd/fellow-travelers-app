import { User, UserDocument } from '../../users/schemas/user.schema';
import { ToursAbstractService } from './../utils/other/tours.abstract.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tour, TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';
import { Status, StatusDocument } from '../schemas/status.schema';
import { Road, RoadDocument } from '../schemas/road.schema';
import { TourStatusNames } from '../utils/other/tours.enums';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Road.name) private roadModel: Model<RoadDocument>,
    private toursAbstractService: ToursAbstractService,
  ) {}

  async updateStatus(
    reqUserId: Types.ObjectId,
    tourId: Types.ObjectId,
    statusId: Types.ObjectId,
  ) {
    //find tour
    const tour = await this.tourModel
      .findById(tourId)
      .populate([
        {
          path: 'status',
          model: 'Status',
        },
      ])
      .exec();
    if (!tour) {
      throw new NotFoundException(`Tour #${tourId} not found`);
    }
    const currentStatus = tour.status.name;

    //check if reqUser is author of tour
    await this.toursAbstractService.isAuthor(tour, reqUserId);

    //find updated status
    const toStatus = await this.statusModel.findById(statusId);
    if (!toStatus) {
      throw new NotFoundException(`Status #${statusId} not found`);
    }

    //update status of tour
    //tour status business process
    //open <-> closed -> finished
    let isUpdated = false;
    switch (toStatus.name) {
      //if toStatus closed
      case TourStatusNames.Closed:
        //check if current status is open
        if (currentStatus === TourStatusNames.Opened) {
          isUpdated = true;
        }
        break;
      //if toStatus open
      case TourStatusNames.Opened:
        //check if current status is closed
        if (currentStatus === TourStatusNames.Closed) {
          isUpdated = true;
        }
        break;
      //if toStatus finished
      case TourStatusNames.Finished:
        //check if current status is closed
        if (currentStatus === TourStatusNames.Closed) {
          isUpdated = true;
        }
        break;
    }
    //if not allowed update throw error
    if (!isUpdated) {
      throw new BadRequestException('Can`t update status');
    }
    //else update & return tour
    tour.depopulate('status');
    await tour.updateOne({ status: toStatus.id });
    return tour;
  }

  async create(createTourDto: CreateTourDto) {
    //check if author exist
    const user = await this.userModel.findById(createTourDto.author);
    if (!user) {
      throw new NotFoundException(`User #${createTourDto.author} not found`);
    }

    //check if road exist
    const road = await this.roadModel.findById(createTourDto.road);
    if (!road) {
      throw new NotFoundException(`Road #${createTourDto.road} not found`);
    }

    //saving model
    const createdTour = new this.tourModel({
      ...createTourDto,
      participants: [createTourDto.author],
      status: '63ea6c2ddf57c8a68d5913b8',
    });
    await createdTour.save();

    return createdTour.toJSON();
  }

  async findAll(): Promise<Tour[]> {
    return await this.tourModel.find();
  }

  async findOneById(id: Types.ObjectId) {
    const tour = await this.tourModel
      .findById(id)
      .populate([
        { path: 'author', model: 'User' },
        { path: 'participants', model: 'User' },
        { path: 'status', model: 'Status' },
        {
          path: 'road',
          populate: [
            { path: 'placeRoadStart', model: 'Place' },
            { path: 'placeRoadEnd', model: 'Place' },
            { path: 'placeMeeting', model: 'Place' },
            { path: 'transport', model: 'Transport' },
          ],
        },
      ])
      .exec();
    if (!tour) {
      throw new NotFoundException(`Tour #${id} not found`);
    }
    return tour;
  }

  async joinTour(tourId: Types.ObjectId, userId: Types.ObjectId) {
    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour #${tourId} not found`);
    }

    //find user
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    //check if user already in tour
    if (await this.toursAbstractService.getUserIndex(tour, userId)) {
      throw new BadRequestException(`User #${userId} already in tour`);
    }

    //add user in tour
    tour.participants.push(user);
    await tour.save();
    return tour.toJSON();
  }

  async leaveTour(tourId: Types.ObjectId, userId: Types.ObjectId) {
    //check if user exist
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour #${tourId} not found`);
    }

    //get user index
    const userIndex = await this.toursAbstractService.getUserIndex(
      tour,
      userId,
    );
    if (!userIndex) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    //remove user from tour
    tour.participants = [
      ...tour.participants.slice(0, userIndex),
      ...tour.participants.slice(userIndex + 1),
    ];
    await tour.save();

    return tour.toJSON();
  }

  async kickFromTour(
    tourId: Types.ObjectId,
    reqUserId: Types.ObjectId,
    kickUserId: Types.ObjectId,
  ) {
    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new NotFoundException(`Tour #${tourId} not found`);
    }

    //check if reqUser and kickUser participating in Tour
    const [reqUserIndex, kickUserIndex] = [
      { id: reqUserId },
      { id: kickUserId },
    ].map(async (user) => {
      const userIndex = await this.toursAbstractService.getUserIndex(
        tour,
        user.id,
      );
      if (!userIndex) {
        throw new NotFoundException(`User #${user.id} not found`);
      }
      return userIndex;
    });

    //check if reqUser is author of tour
    await this.toursAbstractService.isAuthor(tour, reqUserId);

    //remove user from tour
    tour.participants = [
      ...tour.participants.slice(0, await kickUserIndex),
      ...tour.participants.slice((await kickUserIndex) + 1),
    ];

    await tour.save();

    return tour.toJSON();
  }
}
