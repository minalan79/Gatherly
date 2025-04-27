import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId } from 'class-validator';

export class AddEventToUserDto extends PartialType(CreateUserDto) {
  @IsMongoId({ each: true })
  event: string;
}
