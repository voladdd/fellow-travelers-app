import { StatusData } from '../utils/filling_data/status';
import { Injectable } from '@nestjs/common';
import { TourDocument } from '../schemas/tour.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport } from '../schemas/transport.schema';
import { TransportData } from '../utils/filling_data/transport';
import { Place, PlaceDocument } from '../schemas/place.schema';
import { PlaceData } from '../utils/filling_data/place';
import { Status, StatusDocument } from '../schemas/status.schema';

@Injectable()
export class DbCollectionsService {
  constructor(
    @InjectModel(Transport.name) private transportModel: Model<TourDocument>,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) {}

  //Data at db
  //fill collections data
  async fillSampleData(): Promise<any> {
    return await Promise.all([
      this.transportModel.insertMany(TransportData),
      this.placeModel.insertMany(PlaceData),
      this.statusModel.insertMany(StatusData),
    ]);
  }

  //drop collections data
  async dropAllData(): Promise<any> {
    return await Promise.all([
      this.transportModel.collection.drop(),
      this.placeModel.collection.drop(),
      this.statusModel.collection.drop(),
    ]);
  }
}
