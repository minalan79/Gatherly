import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  findOne(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
