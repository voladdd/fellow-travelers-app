import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Transport } from './transport.schema';
import { Place } from './place.schema';

export type RoadDocument = HydratedDocument<Road>;

@Schema()
export class Road {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  })
  placeStart: Place;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
  })
  placeEnd: Place;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  time: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport',
  })
  transport: Transport;
}

export const RoadSchema = SchemaFactory.createForClass(Road);
