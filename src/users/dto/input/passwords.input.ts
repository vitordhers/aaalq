import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class Passwords {
  @Field()
  password: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  cpassword: boolean;
}
