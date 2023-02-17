import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
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

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
