import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  tgId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  firstName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
