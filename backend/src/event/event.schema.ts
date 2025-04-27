import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { User } from '../user/user.schema';

export type EventDocument = HydratedDocument<Event>;

enum EventType {
  Hybrid = 'hybrid',
  Physical = 'physical',
  Virtual = 'virtual',
}

enum EventStatus {
  Upcoming = 'upcoming',
  Progress = 'inprogress',
  Cancelled = 'cancelled',
}

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: EventType, default: EventType.Virtual })
  event_type: EventType;

  @Prop({ type: Date, required: true })
  start_time: Date;

  @Prop({ type: Date, required: true })
  end_time: Date;

  @Prop({
    type: {
      venue: { type: String },
      address: { type: String },
    },
    required: false,
    default: null,
  })
  location?: {
    venue: string;
    address: string;
  } | null;

  @Prop({ required: false, default: null })
  virtual_link?: string;

  @Prop()
  organizer: User;

  @Prop()
  attendees_count: number;

  @Prop({ type: String, enum: EventStatus, default: EventStatus.Upcoming })
  status?: EventStatus;
}

export const EventSchema = SchemaFactory.createForClass(Event);
