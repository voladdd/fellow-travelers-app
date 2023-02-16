import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTourDto } from '../dto/create-tour.dto';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const createdTour = new this.tourModel({
      ...createTourDto,
      participants: [createTourDto.author],
    });
    return await createdTour.save();
  }

  async findAll(): Promise<Tour[]> {
    return await this.tourModel.find().populate('participants').exec();
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
