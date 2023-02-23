import { ToursService } from './../tours/services/tours.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findByTgId(tgId: number): Promise<User | null> {
    const user = await this.userModel.findOne({ tgId });
    return user;
  }

  async findById(id: Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async isUserExists(_id: string): Promise<boolean> {
    const user = await this.userModel.exists({ _id });
    return user ? true : false;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getProfile(id: Types.ObjectId) {
    return await this.userModel.findOne({ _id: id });
  }

  async getProfileTours(id: Types.ObjectId) {}
}
