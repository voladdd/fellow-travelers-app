import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Road } from './road.schema';
import { Status } from './status.schema';

export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour {
  @Prop({ required: true, max: 5 })
  maxPeopleCount: number;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.Number, ref: 'User' }] })
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
}

export const TourSchema = SchemaFactory.createForClass(Tour);
