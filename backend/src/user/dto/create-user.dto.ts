import { IsDefined, IsEmail, IsMongoId, IsOptional } from 'class-validator';
// import { IsEmailUnique } from 'src/decorators/is-email-unique.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsDefined()
  user_name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  events: string[];
}
