import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Event, EventSchema } from '../event/event.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  user_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  hash?: string;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ type: [EventSchema], default: null })
  events: Event[] | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
