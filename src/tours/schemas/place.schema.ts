import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema()
export class Place {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
