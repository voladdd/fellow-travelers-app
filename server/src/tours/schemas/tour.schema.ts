import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Road } from './road.schema';
import { Status } from './status.schema';

export type TourDocument = HydratedDocument<Tour>;

@Schema({ timestamps: true })
export class Tour {
  @Prop({ required: true, max: 5 })
  maxPeopleCount: number;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Road',
  })
  road: Road;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
