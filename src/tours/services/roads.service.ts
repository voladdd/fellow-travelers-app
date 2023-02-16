import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Road, RoadDocument } from '../schemas/road.schema';
import { CreateRoadDto } from '../dto/create-road.dto';

@Injectable()
export class RoadsService {
  constructor(
    @InjectModel(Road.name)
    private roadModel: Model<RoadDocument>,
  ) {}

  //find all
  async findAll(): Promise<Road[]> {
    return this.roadModel.find();
  }

  async create(createRoadDto: CreateRoadDto): Promise<Road> {
    const road = new this.roadModel(createRoadDto);
    return await road.save();
  }
}
