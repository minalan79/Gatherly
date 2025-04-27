import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { AddEventToUserDto } from './dto/add-event-to-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    let checkEmail = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (checkEmail) throw new ForbiddenException('email is taken');

    let checkUserName = await this.userModel
      .findOne({ user_name: createUserDto.user_name })
      .exec();
    if (checkUserName) throw new ForbiddenException('user_name is taken');

    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  addEvent(id: string, addEventToUserDto: AddEventToUserDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { events: addEventToUserDto.event },
      },
      { new: true },
    );
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
