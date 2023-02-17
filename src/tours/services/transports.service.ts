import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportDocument } from '../schemas/transport.schema';
import { CreateTransportDto } from '../dto/create-transport.dto';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport.name)
    private transportModel: Model<TransportDocument>,
  ) {}

  async findAll(): Promise<Transport[]> {
    return await this.transportModel.find();
  }

  async create(createTransportDto: CreateTransportDto): Promise<Transport> {
    const transport = new this.transportModel(createTransportDto);
    return await transport.save();
  }
}
