import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportDocument } from '../schemas/transport.schema';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport.name)
    private transportModel: Model<TransportDocument>,
  ) {}

  //find all
  async findAll(): Promise<Transport[]> {
    return await this.transportModel.find();
  }
}
