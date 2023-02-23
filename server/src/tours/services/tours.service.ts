import { ToursAbstractService } from './../utils/other/tours.abstract.service';
import { RoadsService } from './roads.service';
import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    private toursAbstractService: ToursAbstractService,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    private usersService: UsersService,
    private roadsService: RoadsService,
  ) {}

  async create(createTourDto: CreateTourDto) {
    //check if author exist
    await this.toursAbstractService.findObjectById(
      this.usersService,
      createTourDto.author,
      'user',
    );

    //check if road exist
    await this.toursAbstractService.findObjectById(
      this.roadsService,
      createTourDto.road,
      'road',
    );

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
    //move population to findOneById
    return await this.tourModel
      .find()
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

  async findOneById(id: Types.ObjectId) {
    return await this.toursAbstractService.findObjectById(
      this.tourModel,
      id,
      'Tour',
    );
  }

  async joinTour(tourId: Types.ObjectId, userId: Types.ObjectId) {
    //find tour
    const tour = await this.toursAbstractService.findObjectById(
      this.tourModel,
      tourId,
      'tour',
    );

    //find user
    const user = await this.toursAbstractService.findObjectById(
      this.usersService,
      userId,
      'user',
    );

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
    await this.toursAbstractService.findObjectById(
      this.usersService,
      userId,
      'user',
    );

    //find tour
    const tour = await this.toursAbstractService.findObjectById(
      this.tourModel,
      tourId,
      'tour',
    );

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
    const tour = await this.toursAbstractService.findObjectById(
      this.tourModel,
      tourId,
      'tour',
    );

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
