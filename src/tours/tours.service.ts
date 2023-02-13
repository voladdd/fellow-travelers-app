import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from './schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTourDto } from './dto/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  //create tour
  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const createdTour = new this.tourModel({
      ...createTourDto,
      participants: [createTourDto.author],
    });
    return createdTour.save();
  }

  //find all
  async findAll(): Promise<Tour[]> {
    return this.tourModel.find().populate('participants').exec();
  }

  //fill db data
  //drop db data

  //get tour by userId

  //update tour

  //delete tour

  //add participant to tour

  //remove participant from tour

  //get tour participants
}
