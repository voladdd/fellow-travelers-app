import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tour } from 'src/tours/schemas/tour.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }] })
  tours: Tour[];
}

export const UserSchema = SchemaFactory.createForClass(User);
