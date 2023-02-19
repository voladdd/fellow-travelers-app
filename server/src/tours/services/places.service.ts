import { CreatePlaceDto } from './../dto/create-place.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from '../schemas/place.schema';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place.name)
    private placeModel: Model<PlaceDocument>,
  ) {}

  async findAll(): Promise<Place[]> {
    return await this.placeModel.find();
  }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = new this.placeModel(createPlaceDto);
    return await place.save();
  }
}
