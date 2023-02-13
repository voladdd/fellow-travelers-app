import { Injectable } from '@nestjs/common';
import { Tour, TourDocument } from './schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTourDto } from './dto/create-tour.dto';
import { Transport } from './schemas/transport.schema';
import { TransportData } from './utils/filling_data/transport';
import { Place, PlaceDocument } from './schemas/place.schema';
import { PlaceData } from './utils/filling_data/place';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Transport.name) private transportModel: Model<TourDocument>,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  //Data at db
  //fill collections data
  async fillCollections(): Promise<any> {
    return await Promise.all([
      this.transportModel.insertMany(TransportData),
      this.placeModel.insertMany(PlaceData),
    ]);
  }
  //drop collections data
  async dropCollections(): Promise<any> {
    return await Promise.all([
      this.transportModel.collection.drop(),
      this.placeModel.collection.drop(),
    ]);
  }

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

  //get tour by userId

  //update tour

  //delete tour

  //add participant to tour

  //remove participant from tour

  //get tour participants
}
