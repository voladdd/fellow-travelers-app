import { RoadsService } from './roads.service';
import { UsersService } from './../../users/users.service';
import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    private usersService: UsersService,
    private roadsService: RoadsService,
  ) {}

  async create(createTourDto: CreateTourDto) {
    //check if author exist
    const isUserExist = await this.usersService.isUserExists(
      createTourDto.author,
    );
    if (!isUserExist) {
      throw new Error('User is not founded');
    }

    //check if road exist
    const isRoadExist = await this.roadsService.isRoadExists(
      createTourDto.road,
    );
    if (!isRoadExist) {
      throw new Error('Road is not founded');
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
    //move population to findOneById
    return await this.tourModel
      .find()
      .populate([
        { path: 'author' },
        { path: 'participants' },
        { path: 'status' },
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

  async findOneById(id: string) {
    return await this.tourModel.findById(id);
  }

  //get tour by userId

  //update tour

  //delete tour

  //add participant to tour

  //remove participant from tour

  //get tour participants
}
