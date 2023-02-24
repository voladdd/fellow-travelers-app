import { User, UserDocument } from '../../users/schemas/user.schema';
import { ToursAbstractService } from './../utils/other/tours.abstract.service';
import { RoadsService } from './roads.service';
import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';
import { Status, StatusDocument } from '../schemas/status.schema';
import { Road, RoadDocument } from '../schemas/road.schema';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Road.name) private roadModel: Model<RoadDocument>,
    private toursAbstractService: ToursAbstractService,
    private roadsService: RoadsService,
    private usersService: UsersService,
  ) {}

  async updateStatus(
    reqUserId: Types.ObjectId,
    tourId: Types.ObjectId,
    statusId: Types.ObjectId,
  ) {
    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new Error('Tour is not found by id');
    }

    //check if reqUser is author of tour
    await this.toursAbstractService.isAuthor(tour, reqUserId);

    //find updated status
    const updatedStatus = await this.statusModel.findById(statusId);
    if (!updatedStatus) {
      throw new Error('Status is not found by id');
    }

    //update status of tour
    //tour status business process
    // open <-> closed -> finished

    //if tour status closed
    //check if current status is open
    switch (updatedStatus.name) {
      case 'Закрыт':
        console.log('Закрыт');
        break;
      case 'Открыт':
        break;
      case 'Завершен':
        break;
      default:
        break;
    }

    //if tour status open
    //check if current status is closed

    //if tour status finished
    //check if current status is closed
  }

  async create(createTourDto: CreateTourDto) {
    //check if author exist
    const user = await this.userModel.findById(createTourDto.author);
    if (!user) {
      throw new Error('User is not found by id');
    }

    //check if road exist
    const road = await this.roadModel.findById(createTourDto.road);
    if (!road) {
      throw new Error('Road is not found by id');
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
    return await this.tourModel
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
  }

  async joinTour(tourId: Types.ObjectId, userId: Types.ObjectId) {
    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new Error('Tour is not found by id');
    }

    //find user
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User is not found by id');
    }

    //check if user already in tour
    if (await this.toursAbstractService.getUserIndex(tour, userId)) {
      throw new Error('User already in tour');
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
      throw new Error('User is not found by id');
    }

    //find tour
    const tour = await this.tourModel.findById(tourId);
    if (!tour) {
      throw new Error('Tour is not found by id');
    }

    //get user index
    const userIndex = await this.toursAbstractService.getUserIndex(
      tour,
      userId,
    );
    if (!userIndex) {
      throw new Error('User is not in tour');
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
      throw new Error('Tour is not found by id');
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
        throw new Error('User is not in tour');
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

  //get tour by userId

  //update tour

  //delete tour

  //add participant to tour

  //remove participant from tour

  //get tour participants
}
