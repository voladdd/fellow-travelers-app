import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransportDocument = HydratedDocument<Transport>;

@Schema()
export class Transport {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
