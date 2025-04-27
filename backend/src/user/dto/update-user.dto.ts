import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsDefined, IsMongoId } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  user_name: string;

  @IsMongoId({ each: true })
  events: string[];
}
